import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register Chart.js components
Chart.register(...registerables);

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#111827',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#374151',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#6B7280',
  },
  chartContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gridItem: {
    width: '50%',
    padding: 5,
  },
});

interface PDFReportProps {
  report: {
    name: string;
    overallProgress: number;
    strengths: string[];
    areasForImprovement: string[];
    learningStyle: string;
    recentActivity: {
      date: string;
      activity: string;
      duration: number;
    }[];
    recommendations: {
      type: string;
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
    }[];
  };
  chartData: {
    line: any;
    bar: any;
    pie: any;
  };
}

// Component to render charts as images
const ChartImage: React.FC<{ chartRef: React.RefObject<HTMLCanvasElement> }> = ({ chartRef }) => {
  const [imageData, setImageData] = React.useState<string>('');

  React.useEffect(() => {
    const captureChart = async () => {
      if (chartRef.current) {
        const canvas = chartRef.current;
        const image = canvas.toDataURL('image/png');
        setImageData(image);
      }
    };

    captureChart();
  }, [chartRef]);

  return imageData ? (
    <Image src={imageData} style={{ width: '100%', height: 200 }} />
  ) : null;
};

// Main PDF Document component
const PDFDocument: React.FC<PDFReportProps> = ({ report, chartData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{report.name}'s Report</Text>
      
      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Overall Progress</Text>
        <Text style={styles.text}>{report.overallProgress}%</Text>
      </View>

      {/* Strengths and Areas for Improvement */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.title}>Strengths</Text>
          {report.strengths.map((strength, index) => (
            <Text key={index} style={styles.text}>• {strength}</Text>
          ))}
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.title}>Areas for Improvement</Text>
          {report.areasForImprovement.map((area, index) => (
            <Text key={index} style={styles.text}>• {area}</Text>
          ))}
        </View>
      </View>

      {/* Learning Style */}
      <View style={styles.section}>
        <Text style={styles.title}>Learning Style</Text>
        <Text style={styles.text}>{report.learningStyle}</Text>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.title}>Recent Activity</Text>
        {report.recentActivity.map((activity, index) => (
          <Text key={index} style={styles.text}>
            {activity.activity} - {activity.duration} minutes
          </Text>
        ))}
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.title}>Recommendations</Text>
        {report.recommendations.map((rec, index) => (
          <View key={index} style={{ marginBottom: 5 }}>
            <Text style={styles.text}>• {rec.title}</Text>
            <Text style={[styles.text, { fontSize: 10 }]}>{rec.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Helper function to sanitize filename
const sanitizeFilename = (filename: string) => {
  // Only remove the _Report.pdf suffix and replace underscores with spaces
  return filename
    .replace(/_Report\.pdf$/, '')
    .replace(/_/g, ' ');
};

// Hook to handle PDF generation
export const usePDFGenerator = () => {
  const generatePDF = async (
    element: HTMLElement,
    filename: string,
    chartData: any
  ) => {
    try {
      // Remove Roboto font loading
      // Create a container for the report
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '800px';
      container.style.padding = '30px';
      container.style.backgroundColor = 'white';
      container.style.fontFamily = "Arial, Tahoma, sans-serif";
      container.className = 'pdf-root';
      document.body.appendChild(container);

      // Add title with proper character encoding
      const title = document.createElement('h1');
      title.textContent = sanitizeFilename(filename) + "'s Learning Report";
      title.style.fontSize = '20px';
      title.style.fontWeight = 'bold';
      title.style.color = '#111827';
      title.style.marginBottom = '20px';
      title.style.fontFamily = "Arial, Tahoma, sans-serif";
      title.className = 'pdf-title';
      container.appendChild(title);

      // Clone the report content
      const reportContent = element.cloneNode(true) as HTMLElement;
      reportContent.style.fontFamily = "Arial, Tahoma, sans-serif";
      reportContent.className += ' pdf-container';
      
      // Remove the download button from the clone
      const downloadButton = reportContent.querySelector('button');
      if (downloadButton) {
        downloadButton.remove();
      }

      // Find the chart containers in the original content
      const chartContainers = reportContent.querySelectorAll('.chart-container');
      
      // Replace each chart container with a new canvas
      chartContainers.forEach((container, index) => {
        const chartType = index === 0 ? 'line' : index === 1 ? 'bar' : 'pie';
        const canvas = document.createElement('canvas');
        
        // Adjust canvas size based on container width
        const containerElement = container as HTMLElement;
        const containerWidth = containerElement.clientWidth || 300;
        const aspectRatio = 0.5;
        canvas.width = containerWidth;
        canvas.height = containerWidth * aspectRatio;
        
        container.innerHTML = '';
        containerElement.style.width = '100%';
        containerElement.style.height = 'auto';
        containerElement.style.minHeight = '150px';
        containerElement.style.maxHeight = '180px';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
          type: chartType,
          data: chartData[chartType],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                  font: {
                    size: 9,
                    family: 'Arial, Tahoma, sans-serif'
                  },
                  boxWidth: 10,
                  padding: 6
                }
              }
            },
            scales: chartType !== 'pie' ? {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                  font: {
                    size: 8,
                    family: 'Arial, Tahoma, sans-serif'
                  },
                  maxRotation: 0,
                  padding: 3
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 8,
                    family: 'Arial, Tahoma, sans-serif'
                  },
                  maxRotation: 45,
                  padding: 3
                }
              }
            } : undefined
          }
        });

        setTimeout(() => {
          chart.update('none');
        }, 500);
      });

      // Add the modified content to our container
      container.appendChild(reportContent);

      // Apply styles to maintain layout with reduced sizes and set font
      const style = document.createElement('style');
      style.textContent = `
        body, .pdf-root, .pdf-container, .pdf-title {
          font-family: Arial, Tahoma, sans-serif !important;
        }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .gap-4 { gap: 0.75rem; }
        .space-y-4 > * + * { margin-top: 0.75rem; }
        .p-4 { padding: 0.75rem; }
        .p-6 { padding: 1rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .bg-white { background-color: white; }
        .bg-\\[\\#EEF2FF\\] { background-color: #EEF2FF; }
        .bg-\\[\\#FFFBEB\\] { background-color: #FFFBEB; }
        .bg-\\[\\#F3F4F6\\] { background-color: #F3F4F6; }
        .bg-\\[\\#EFF6FF\\] { background-color: #EFF6FF; }
        .bg-\\[\\#F5F3FF\\] { background-color: #F5F3FF; }
        .bg-\\[\\#ECFDF5\\] { background-color: #ECFDF5; }
        .text-sm { font-size: 0.75rem; }
        .font-medium { font-weight: 500; }
        .mb-2 { margin-bottom: 0.375rem; }
        .mb-4 { margin-bottom: 0.75rem; }
        .mt-4 { margin-top: 0.75rem; }
        .chart-container { 
          position: relative;
          width: 100%;
          height: auto;
          min-height: 150px;
          max-height: 180px;
          background: white;
          margin: 8px 0;
          padding: 8px;
        }
      `;
      container.appendChild(style);

      // Wait for font to load before rendering
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Capture the entire container
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        windowHeight: container.scrollHeight
      });

      // Create PDF with proper encoding
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      pdf.setFont('helvetica');

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add content to PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      // Cleanup
      document.body.removeChild(container);

      // Save PDF with sanitized filename
      pdf.save(sanitizeFilename(filename) + '_Report.pdf');
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  };

  return { generatePDF };
};

export default usePDFGenerator; 