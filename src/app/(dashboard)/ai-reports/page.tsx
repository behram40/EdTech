'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  BookOpenIcon,
  DocumentTextIcon,
  StarIcon as StarIconSolid,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { usePDFGenerator } from '@/components/PDFReport';
import { students as sharedStudents } from '@/data/students';
import { useRouter } from 'next/navigation'
import { mockUserData, mockStudentData } from '../data/mockData'
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

interface StudentReport {
  id: string
  name: string
  overallProgress: number
  strengths: string[]
  areasForImprovement: string[]
  learningStyle: string
  recentActivity: {
    date: string
    activity: string
    duration: number
  }[]
  recommendations: {
    type: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
  }[]
}

interface TeacherReport {
  classId: string
  className: string
  averageProgress: number
  topPerformers: {
    id: string
    name: string
    progress: number
    strengths: string[]
  }[]
  strugglingStudents: {
    id: string
    name: string
    progress: number
    areasForHelp: string[]
  }[]
  classInsights: {
    topic: string
    averageUnderstanding: number
    commonMisconceptions: string[]
  }[]
  recommendations: {
    type: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
  }[]
}

// 10 Turkish names without special characters
const turkishNames = [
  'Aslan Demir',
  'Melis Polat',
  'Selin Arslan',
  'Kenan Yaman',
  'Sibel Aydin',
  'Deniz Korkmaz',
  'Efe Baran',
  'Aylin Sari',
  'Burak Erden',
  'Lale Tamer'
];

const priorities = ['high', 'medium', 'low'] as const;

// Single source of truth: students array
const students: StudentReport[] = turkishNames.map((name, idx) => ({
  id: (idx + 1).toString(),
  name,
  overallProgress: 80 + (idx % 5) * 3 + (idx % 2 === 0 ? 2 : 0),
  strengths: [
    'Problem Solving',
    'Critical Thinking',
    idx % 2 === 0 ? 'Active Participation' : 'Creativity'
  ],
  areasForImprovement: [
    idx % 2 === 0 ? 'Time Management' : 'Public Speaking',
    idx % 3 === 0 ? 'Note Taking' : 'Group Work'
  ],
  learningStyle: [
    'Visual and Kinesthetic',
    'Auditory',
    'Reading and Writing',
    'Logical/Mathematical',
    'Interpersonal'
  ][idx % 5],
    recentActivity: [
      {
        date: '2024-03-15',
        activity: 'Completed Algebra Quiz',
      duration: 45 - idx
      },
      {
        date: '2024-03-14',
        activity: 'Watched Geometry Video',
      duration: 30 + idx
      }
    ],
    recommendations: [
      {
      type: idx % 2 === 0 ? 'exercise' : 'activity',
      title: idx % 2 === 0 ? 'Practice Time Management' : 'Presentation Practice',
      description: idx % 2 === 0 ? 'Complete timed problem sets to improve speed and efficiency' : 'Join the debate club to improve public speaking skills',
      priority: priorities[idx % 3]
    }
  ]
}));

// Simulate logged-in student
const loggedInStudentName = 'Aslan Demir';
const exampleReports = students.filter(s => s.name === loggedInStudentName);
const mockStudentReports = exampleReports;

// Teacher report references students by id
const mockTeacherReports: TeacherReport[] = [
  {
    classId: 'MATH101',
    className: 'Advanced Mathematics',
    averageProgress: 78,
    topPerformers: [
      {
        id: students[0].id,
        name: students[0].name,
        progress: students[0].overallProgress,
        strengths: students[0].strengths
      },
      {
        id: students[1].id,
        name: students[1].name,
        progress: students[1].overallProgress,
        strengths: students[1].strengths
      },
      {
        id: students[2].id,
        name: students[2].name,
        progress: students[2].overallProgress,
        strengths: students[2].strengths
      }
    ],
    strugglingStudents: [
      {
        id: students[3].id,
        name: students[3].name,
        progress: students[3].overallProgress,
        areasForHelp: students[3].areasForImprovement
      },
      {
        id: students[4].id,
        name: students[4].name,
        progress: students[4].overallProgress,
        areasForHelp: students[4].areasForImprovement
      }
    ],
    classInsights: [
      {
        topic: 'Quadratic Equations',
        averageUnderstanding: 75,
        commonMisconceptions: [
          'Confusing positive and negative roots',
          'Incorrect application of the quadratic formula'
        ]
      }
    ],
    recommendations: [
      {
        type: 'lesson',
        title: 'Review Quadratic Formula',
        description: 'Plan a review session focusing on common misconceptions',
        priority: 'high'
      }
    ]
  }
];

function getRandomStats() {
  // Generate random but believable stats for demo
  const attendance = Math.floor(Math.random() * 10) + 90; // 90-99%
  const grades = [
    { subject: 'Mathematics', grade: Math.floor(Math.random() * 20) + 80 },
    { subject: 'Science', grade: Math.floor(Math.random() * 20) + 75 },
    { subject: 'Language Arts', grade: Math.floor(Math.random() * 20) + 70 },
    { subject: 'Social Studies', grade: Math.floor(Math.random() * 20) + 65 },
    { subject: 'Arts & Music', grade: Math.floor(Math.random() * 20) + 80 },
  ];
  const progressHistory = Array.from({ length: 6 }, (_, i) => ({
    month: `2024-${(3 - i).toString().padStart(2, '0')}`,
    progress: Math.floor(Math.random() * 10) + 80 - i * 2
  })).reverse();
  return { attendance, grades, progressHistory };
}

// Function to prepare HTML for PDF generation
function prepareHtmlForPdf(element: HTMLElement, title: string, chartData: any): string {
  const container = element.cloneNode(true) as HTMLElement;
  
  // Remove interactive elements
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => button.remove());
  
  // Create the full HTML document with proper styling
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-filler@2.0.0/dist/chartjs-plugin-filler.min.js"></script>
        <style>
          * {
            font-family: 'Noto Sans', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 20mm;
            background: white;
            color: #111827;
          }
          .chart-container {
            position: relative;
            width: 100%;
            height: 300px; /* Increased height for better visibility */
            background: white;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          canvas {
            width: 100% !important;
            height: 100% !important;
            display: block !important;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #111827;
          }
          .bg-white {
            background-color: white;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .p-4 {
            padding: 1rem;
          }
          .p-6 {
            padding: 1.5rem;
          }
          .space-y-4 > * + * {
            margin-top: 1rem;
          }
          .grid {
            display: grid;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .gap-4 {
            gap: 1rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .font-medium {
            font-weight: 500;
          }
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .mt-4 {
            margin-top: 1rem;
          }
          .flex {
            display: flex;
          }
          .items-center {
            align-items: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .space-x-2 > * + * {
            margin-left: 0.5rem;
          }
          .space-x-3 > * + * {
            margin-left: 0.75rem;
          }
          .mr-2 {
            margin-right: 0.5rem;
          }
          .text-[#111827] {
            color: #111827;
          }
          .text-[#374151] {
            color: #374151;
          }
          .text-[#6B7280] {
            color: #6B7280;
          }
          .bg-[#EEF2FF] {
            background-color: #EEF2FF;
          }
          .bg-[#FFFBEB] {
            background-color: #FFFBEB;
          }
          .bg-[#F3F4F6] {
            background-color: #F3F4F6;
          }
          .bg-[#EFF6FF] {
            background-color: #EFF6FF;
          }
          .bg-[#F5F3FF] {
            background-color: #F5F3FF;
          }
          .bg-[#ECFDF5] {
            background-color: #ECFDF5;
          }
          .text-[#312E81] {
            color: #312E81;
          }
          .text-[#4338CA] {
            color: #4338CA;
          }
          .text-[#78350F] {
            color: #78350F;
          }
          .text-[#92400E] {
            color: #92400E;
          }
          .text-[#1E40AF] {
            color: #1E40AF;
          }
          .text-[#5B21B6] {
            color: #5B21B6;
          }
          .text-[#065F46] {
            color: #065F46;
          }
          .border {
            border-width: 1px;
          }
          .border-[#E5E7EB] {
            border-color: #E5E7EB;
          }
        </style>
        <script>
          // Chart data
          const chartData = ${JSON.stringify(chartData)};

          // Initialize charts when DOM is ready
          document.addEventListener('DOMContentLoaded', async function() {
            // Register the Filler plugin
            Chart.register(Chart.Filler);
            
            // Wait a bit to ensure everything is loaded
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Initialize charts
            const canvases = document.querySelectorAll('canvas');
            const chartPromises = Array.from(canvases).map(async (canvas, index) => {
              const ctx = canvas.getContext('2d', { willReadFrequently: true });
              if (!ctx) return;

              let chart;
              if (index === 0) {
                // Line chart
                chart = new Chart(ctx, {
                  type: 'line',
                  data: chartData.line,
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'bottom'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }
                });
              } else if (index === 1) {
                // Bar chart
                chart = new Chart(ctx, {
                  type: 'bar',
                  data: chartData.bar,
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'bottom'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }
                });
              } else if (index === 2) {
                // Pie chart
                chart = new Chart(ctx, {
                  type: 'pie',
                  data: chartData.pie,
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'bottom'
                      },
                      tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                      }
                    }
                  }
                });
              }

              // Force a repaint and wait for it to complete
              if (chart) {
                chart.update('none');
                await new Promise(resolve => setTimeout(resolve, 500));
              }
            });
  
  // Wait for all charts to be rendered
            await Promise.all(chartPromises);
            
            // Force a final repaint of all canvases
            canvases.forEach(canvas => {
              const ctx = canvas.getContext('2d', { willReadFrequently: true });
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  });
        </script>
      </head>
      <body>
        <h1>${title}</h1>
        ${container.outerHTML}
      </body>
    </html>
  `;
}

// Function to generate PDF using Puppeteer API
async function generatePDF(element: HTMLElement, filename: string, chartData: any) {
  try {
    console.log('Starting PDF generation for:', filename);
    console.log('Element ID:', element.id);
    console.log('Element content length:', element.innerHTML.length);
    console.log('Chart data:', JSON.stringify(chartData, null, 2));

    const title = filename.replace('_Report.pdf', '');
    console.log('Preparing HTML with title:', title);

    // Verify element has content
    if (!element.innerHTML.trim()) {
      throw new Error('Report element is empty');
    }

    // Verify charts are present
    const charts = element.querySelectorAll('canvas');
    console.log('Number of charts found:', charts.length);
    if (charts.length === 0) {
      throw new Error('No charts found in the report');
    }

    const html = prepareHtmlForPdf(element, title, chartData);
    console.log('HTML prepared, length:', html.length);

    // Verify HTML content
    if (!html.includes('<canvas')) {
      throw new Error('Generated HTML does not contain chart elements');
    }

    console.log('Sending request to PDF generation API...');
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, filename }),
    });

    console.log('API Response status:', response.status);
    const responseText = await response.text();
    console.log('API Response text:', responseText);

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.details || errorData.error || 'Failed to generate PDF';
      } catch (e) {
        errorMessage = responseText || 'Failed to generate PDF';
      }
      throw new Error(`PDF generation failed: ${errorMessage}`);
    }

    // Convert response text to blob
    const blob = new Blob([responseText], { type: 'application/pdf' });
    console.log('PDF blob size:', blob.size);
    
    if (blob.size === 0) {
      throw new Error('Generated PDF is empty (0 bytes)');
    }
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('PDF generation completed successfully');
    return true;
  } catch (error: unknown) {
    console.error('PDF Generation Error Details:', {
      name: error instanceof Error ? error.name : 'Unknown Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      element: {
        id: element.id,
        contentLength: element.innerHTML.length,
        hasCharts: element.querySelectorAll('canvas').length
      }
    });
    
    // Show a more detailed error message to the user
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}`
      : 'An unexpected error occurred while generating the PDF';
    throw new Error(errorMessage);
  }
}

export default function AIReportsPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'school-admin' | 'admin'>('student')
  const [userData, setUserData] = useState<any>(null)
  const [studentReport, setStudentReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)
  const [teacherStudentEmails, setTeacherStudentEmails] = useState<string[]>([])

  // Get all students from mockStudentData
  const allStudents = userRole === 'teacher'
    ? teacherStudentEmails.map(email => mockStudentData[email as keyof typeof mockStudentData]).filter(Boolean)
    : Object.values(mockStudentData)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserData(user)
        if (user.userType === 'teacher') {
          setUserRole('teacher')
          // Get assigned students for this teacher
          const teacherData = mockUserData[user.email as keyof typeof mockUserData] as any
          if (teacherData && teacherData.studentEmails) {
            setTeacherStudentEmails(teacherData.studentEmails as string[])
            if (!selectedStudentEmail && (teacherData.studentEmails as string[]).length > 0) {
              setSelectedStudentEmail((teacherData.studentEmails as string[])[0])
            }
          }
        } else if (user.userType === 'school-admin') {
          setUserRole('teacher') // treat as teacher for view logic
          setTeacherStudentEmails(Object.keys(mockStudentData))
          if (!selectedStudentEmail && Object.keys(mockStudentData).length > 0) {
            setSelectedStudentEmail(Object.keys(mockStudentData)[0])
          }
        } else if (user.userType === 'student') {
          setUserRole('student')
          setSelectedStudentEmail(user.email)
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router, selectedStudentEmail])

  useEffect(() => {
    if (selectedStudentEmail) {
      const studentSpecificData = mockStudentData[selectedStudentEmail as keyof typeof mockStudentData]
      if (studentSpecificData) {
        setStudentReport({
          id: selectedStudentEmail,
          name: studentSpecificData.name,
          overallProgress: studentSpecificData.statistics.overallProgress,
          strengths: studentSpecificData.aiReports.strengths,
          areasForImprovement: studentSpecificData.aiReports.areasForImprovement,
          learningStyle: studentSpecificData.aiReports.learningStyle,
          recentActivity: studentSpecificData.enrolledCourses.map((course: any) => ({
            date: course.lastAccessed,
            activity: `Accessed ${course.title}`,
            duration: 30 // Default duration
          })),
          recommendations: studentSpecificData.aiReports.recommendations.map((rec: string, index: number) => ({
            type: 'activity',
            title: rec,
            description: rec,
            priority: index === 0 ? 'high' : index === 1 ? 'medium' : 'low'
          }))
        })
      }
    }
  }, [selectedStudentEmail])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    )
  }

  // Show error state if no user data
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found. Please log in.</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handlePrintReport = async () => {
    if (!reportRef.current || !studentReport) return

    const chartData = {
      line: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Progress',
          data: [65, 70, 75, 80, 85, studentReport.overallProgress],
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true
        }]
      },
      bar: {
        labels: ['Math', 'Science', 'Reading', 'Writing', 'Social Studies'],
        datasets: [{
          label: 'Subject Performance',
          data: [85, 90, 88, 92, 87],
          backgroundColor: '#4F46E5'
        }]
      },
      pie: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: ['#4F46E5', '#818CF8', '#C7D2FE']
        }]
      }
    }

    try {
      await generatePDF(reportRef.current, `${studentReport.name}_Report.pdf`, chartData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF report. Please try again.')
    }
  }

  const renderStudentView = () => (
    <div ref={reportRef} className="space-y-6">
      {studentReport && (
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <UserGroupIcon className="h-6 w-6 text-[#4F46E5]" />
              <h3 className="text-lg font-medium text-[#111827]">{studentReport.name}</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="text-sm font-medium text-[#6B7280]">Progress</div>
                <div className="ml-2 text-lg font-semibold text-[#4F46E5]">{studentReport.overallProgress}%</div>
              </div>
              <button
                onClick={handlePrintReport}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <DocumentTextIcon className="h-5 w-5" />
                <span>Print Report</span>
              </button>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="mt-6 mb-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Progress Over Time</h4>
            <div className="h-64">
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Progress',
                    data: [65, 70, 75, 80, 85, studentReport.overallProgress],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#EEF2FF] rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#312E81] mb-2">Strengths</h4>
                <ul className="space-y-1">
                  {studentReport.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-[#4338CA]">
                      <StarIconSolid className="h-4 w-4 text-[#6366F1] mr-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FFFBEB] rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#78350F] mb-2">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {studentReport.areasForImprovement.map((area: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-[#92400E]">
                      <LightBulbIcon className="h-4 w-4 text-[#D97706] mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#F3F4F6] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#111827] mb-2">Learning Style</h4>
              <p className="text-sm text-[#374151]">{studentReport.learningStyle}</p>
            </div>

            {/* Subject Performance Chart */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Subject Performance</h4>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ['Math', 'Science', 'Reading', 'Writing', 'Social Studies'],
                    datasets: [{
                      label: 'Performance',
                      data: [85, 90, 88, 92, 87],
                      backgroundColor: '#4F46E5'
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">AI Recommendations</h4>
              <div className="space-y-3">
                {studentReport.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 ${
                      rec.priority === 'high' ? 'bg-red-500' :
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{rec.title}</h5>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderTeacherView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Select a Student</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {allStudents.map((student) => (
            <button
              key={student.email}
              onClick={() => setSelectedStudentEmail(student.email)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                selectedStudentEmail === student.email
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {student.name} <span className="text-xs text-gray-400 ml-1">({student.email})</span>
            </button>
          ))}
        </div>
        {studentReport && renderStudentView()}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Learning Reports</h1>
            <p className="mt-1 text-sm text-gray-500">
              AI-powered insights and recommendations for {userRole === 'student' ? 'student' : 'class'} performance
            </p>
          </div>
        </div>

        {userRole === 'student' && renderStudentView()}
        {userRole === 'teacher' && renderTeacherView()}
      </div>
    </div>
  )
} 