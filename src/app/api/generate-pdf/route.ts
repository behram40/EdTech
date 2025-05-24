import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Helper function to write logs
function writeLog(message: string) {
  const logPath = path.join(process.cwd(), 'pdf-generation.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { html, filename } = await req.json();
    
    writeLog('Starting PDF generation process');
    writeLog(`Filename: ${filename}`);
    
    if (!html) {
      writeLog('Error: No HTML content provided');
      return NextResponse.json(
        { error: 'No HTML content provided' },
        { status: 400 }
      );
    }

    // Log and validate HTML content
    writeLog(`HTML content length: ${html.length}`);
    writeLog(`HTML preview: ${html.substring(0, 500)}...`);
    
    // Basic HTML validation
    if (!html.includes('<html') || !html.includes('<body')) {
      writeLog('Error: Invalid HTML structure - missing html or body tags');
      return NextResponse.json(
        { error: 'Invalid HTML structure' },
        { status: 400 }
      );
    }

    writeLog('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    writeLog('Browser page created');

    // Enable console logging from the page
    page.on('console', msg => writeLog(`Page log: ${msg.text()}`));
    page.on('pageerror', error => writeLog(`Page error: ${error.message}`));

    // Set a reasonable viewport
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1
    });
    writeLog('Viewport set');

    // Inject required scripts
    writeLog('Injecting Chart.js...');
    await page.addScriptTag({
      url: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'
    });

    // Set content and wait for network to be idle
    try {
      writeLog('Setting page content...');
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      writeLog('Page content set successfully');
    } catch (error) {
      writeLog(`Error setting content: ${error instanceof Error ? error.message : String(error)}`);
      throw new Error(`Failed to set page content: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Wait for fonts and images
    writeLog('Waiting for fonts and images...');
    await page.evaluateHandle('document.fonts.ready');
    await page.evaluate(async () => {
      const images = Array.from(document.getElementsByTagName('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      }));
    });
    writeLog('Fonts and images loaded');

    // Verify content is present and visible
    writeLog('Checking content visibility...');
    const contentCheck = await page.evaluate(() => {
      const body = document.body;
      const textContent = body.textContent || '';
      const canvases = document.querySelectorAll('canvas');
      
      // Get all elements and their computed styles
      const elements = Array.from(body.querySelectorAll('*'));
      const visibleElements = elements.filter(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               parseFloat(style.opacity) > 0 &&
               rect.width > 0 &&
               rect.height > 0;
      });

      // Check canvas elements specifically
      const canvasStatus = Array.from(canvases).map(canvas => {
        const ctx = canvas.getContext('2d');
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const hasContent = imageData ? imageData.data.some(pixel => pixel !== 0) : false;
        const style = window.getComputedStyle(canvas);
        const rect = canvas.getBoundingClientRect();
        
        return {
          id: canvas.id,
          width: canvas.width,
          height: canvas.height,
          hasContent,
          isVisible: style.display !== 'none' && 
                    style.visibility !== 'hidden' && 
                    parseFloat(style.opacity) > 0,
          dimensions: {
            clientWidth: rect.width,
            clientHeight: rect.height
          }
        };
      });

      return {
        hasText: textContent.trim().length > 0,
        textContentLength: textContent.length,
        hasCharts: canvases.length,
        visibleElementsCount: visibleElements.length,
        bodyDimensions: {
          width: body.scrollWidth,
          height: body.scrollHeight,
          clientWidth: body.clientWidth,
          clientHeight: body.clientHeight
        },
        canvasStatus,
        html: body.innerHTML.substring(0, 1000) // Log first 1000 chars of HTML
      };
    });

    writeLog('Content check results:');
    writeLog(JSON.stringify(contentCheck, null, 2));

    if (contentCheck.visibleElementsCount === 0) {
      writeLog('Error: No visible elements found in the page');
      throw new Error('No visible elements found in the page');
    }

    if (contentCheck.hasCharts === 0) {
      writeLog('Error: No chart elements found in the page');
      throw new Error('No chart elements found in the page');
    }

    // Wait for charts to render with verification
    writeLog('Waiting for charts to render...');
    await page.evaluate(async () => {
      // Wait for Chart.js to be available
      while (typeof (window as any).Chart === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Register the Filler plugin
      (window as any).Chart.register((window as any).Chart.Filler);

      // Wait for all canvases to be rendered
      const canvases = document.querySelectorAll('canvas');
      await Promise.all(Array.from(canvases).map(async (canvas) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Make sure canvas is visible
        canvas.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';

        // Wait for chart to be rendered (max 5 seconds)
        for (let i = 0; i < 50; i++) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          if (imageData.data.some(pixel => pixel !== 0)) {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Force a repaint
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }));
    });
    writeLog('Charts rendered');

    // Take a screenshot for debugging
    writeLog('Taking debug screenshot...');
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
      path: 'debug-screenshot.png'
    });
    writeLog(`Debug screenshot taken, size: ${screenshot.length} bytes`);

    // Additional wait to ensure everything is stable
    writeLog('Waiting for content to stabilize...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF with specific options
    writeLog('Generating PDF...');
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; padding: 10px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    });
    writeLog(`PDF generated, size: ${pdf.length} bytes`);

    // Verify PDF was generated
    if (pdf.length === 0) {
      writeLog('Error: Generated PDF is empty');
      throw new Error('Generated PDF is empty');
    }

    // Close browser
    writeLog('Closing browser...');
    await browser.close();
    browser = null;

    writeLog('PDF generation completed successfully');
    // Return PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error: unknown) {
    writeLog(`Error during PDF generation: ${error instanceof Error ? error.message : String(error)}`);
    
    // Ensure browser is closed
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        writeLog(`Error closing browser: ${closeError instanceof Error ? closeError.message : String(closeError)}`);
      }
    }

    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 