'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PaperAirplaneIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  LightBulbIcon,
  StarIcon as StarIconSolid,
  PlayCircleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  UserCircleIcon,
  TrashIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface RecommendedCourse {
  id: number
  title: string
  description: string
  category: string
  level: string
  matchScore: number
  image: string
  reason: string
  prerequisites: string[]
  instructor: string
}

interface RecommendedLesson {
  id: number
  title: string
  description: string
  type: 'video' | 'reading' | 'quiz' | 'exercise'
  duration: string
  courseId: number
  courseTitle: string
  category: string
  reason: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  learningStyle: string[]
  tags: string[]
}

interface ChatMessage {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface SupportMessage {
  id: number
  text: string
  isSupport: boolean
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

interface EnrolledCourse {
  id: number
  title: string
  progress: number
  category: string
  grade?: string
}

interface StudentPerformance {
  name: string
  enrolledCourses: EnrolledCourse[]
  strengths: string[]
  learningStyle: string[]
  interests: string[]
  recentActivity: {
    type: string
    subject: string
    score: number
    date: string
  }[]
}

// Update the studentPerformance to use the correct type
const studentPerformance: StudentPerformance = {
  name: "Behram Dilek",
  enrolledCourses: [
    { id: 1, title: "Advanced Mathematics", progress: 85, category: "Mathematics", grade: "A" },
    { id: 2, title: "Physics Fundamentals", progress: 65, category: "Physics", grade: "B" },
    { id: 3, title: "Programming Basics", progress: 92, category: "Programming", grade: "A+" }
  ],
  strengths: [
    "Problem-solving in Mathematics",
    "Algorithm Design",
    "Data Analysis"
  ],
  learningStyle: ["Visual", "Practical"],
  interests: ["Programming", "Mathematics", "Physics"],
  recentActivity: [
    { type: "quiz", subject: "Mathematics", score: 88, date: "2024-02-15" },
    { type: "assignment", subject: "Physics", score: 72, date: "2024-02-14" },
    { type: "project", subject: "Programming", score: 95, date: "2024-02-13" }
  ]
}

// Mock data for recommended content
const recommendedContent: RecommendedCourse[] = [
  {
    id: 1,
    title: 'Advanced Mathematics for Young Minds',
    description: 'Build upon your strong math foundation with more challenging concepts and problem-solving exercises.',
    category: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    reason: 'Based on your excellent performance in basic mathematics',
    matchScore: 95,
    level: 'Intermediate',
    prerequisites: ['Completion of Basic Mathematics', 'Grade A in current math course'],
    instructor: 'Dr. John Doe'
  },
  {
    id: 2,
    title: 'Science Explorers: Hands-on Experiments',
    description: 'Take your science skills to the next level with exciting experiments and scientific investigations.',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    reason: 'Matches your interest in science and hands-on learning style',
    matchScore: 90,
    level: 'Intermediate',
    prerequisites: ['Completion of Introduction to Science', 'Interest in experiments'],
    instructor: 'Dr. Jane Smith'
  },
  {
    id: 3,
    title: 'Creative Writing Workshop',
    description: 'Develop your writing skills through fun storytelling and creative expression activities.',
    category: 'Language Arts',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    reason: 'Recommended to improve your creative writing skills',
    matchScore: 85,
    level: 'Beginner',
    prerequisites: ['Basic reading skills', 'Interest in storytelling'],
    instructor: 'Ms. Emily Johnson'
  },
  {
    id: 4,
    title: 'Introduction to Coding for Kids',
    description: 'Learn the basics of programming through fun, interactive games and projects.',
    category: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    reason: 'Matches your interest in technology and problem-solving skills',
    matchScore: 88,
    level: 'Beginner',
    prerequisites: ['Basic computer skills', 'Interest in technology'],
    instructor: 'Mr. Michael Brown'
  }
]

// Mock data for recommended lessons
const recommendedLessons: RecommendedLesson[] = [
  {
    id: 1,
    title: 'Advanced Problem Solving Techniques',
    description: 'Learn advanced strategies for solving complex mathematical problems.',
    type: 'video',
    duration: '15:30',
    courseId: 1,
    courseTitle: 'Advanced Mathematics for Young Minds',
    category: 'Mathematics',
    reason: 'Based on your strong performance in basic mathematics',
    difficulty: 'Medium',
    learningStyle: ['Visual', 'Hands-on'],
    tags: ['Problem Solving', 'Critical Thinking', 'Mathematics']
  },
  {
    id: 2,
    title: 'Interactive Science Experiments',
    description: 'Hands-on experiments to understand scientific concepts better.',
    type: 'exercise',
    duration: '45 min',
    courseId: 2,
    courseTitle: 'Science Explorers: Hands-on Experiments',
    category: 'Science',
    reason: 'Matches your hands-on learning style and interest in science',
    difficulty: 'Easy',
    learningStyle: ['Hands-on', 'Visual'],
    tags: ['Experiments', 'Science', 'Practical Learning']
  },
  {
    id: 3,
    title: 'Creative Writing Fundamentals',
    description: 'Basic techniques to improve your creative writing skills.',
    type: 'reading',
    duration: '20 min',
    courseId: 3,
    courseTitle: 'Creative Writing Workshop',
    category: 'Language Arts',
    reason: 'Recommended to improve your creative writing skills',
    difficulty: 'Easy',
    learningStyle: ['Reading', 'Writing'],
    tags: ['Writing', 'Creativity', 'Language Arts']
  },
  {
    id: 4,
    title: 'Introduction to Programming Concepts',
    description: 'Learn basic programming concepts through interactive examples.',
    type: 'video',
    duration: '25:00',
    courseId: 4,
    courseTitle: 'Introduction to Coding for Kids',
    category: 'Computer Science',
    reason: 'Matches your interest in technology and problem-solving skills',
    difficulty: 'Medium',
    learningStyle: ['Visual', 'Interactive'],
    tags: ['Programming', 'Technology', 'Problem Solving']
  }
]

// Add mock responses for the learning assistant
const mockResponses: { [key: string]: string } = {
  'hello': "Hello! I'm your learning assistant. How can I help you with your studies today?",
  'hi': "Hi there! I'm here to help you with your learning journey. What would you like to know?",
  'help': "I can help you with:\n• Understanding course concepts\n• Finding relevant learning resources\n• Tracking your progress\n• Recommending study materials\n• Answering questions about your courses\n\nWhat would you like help with?",
  'progress': "Based on your current performance:\n• You're doing well in Mathematics (85%)\n• Your Programming skills are strong (92%)\n• You could improve in Physics (65%)\n\nWould you like specific recommendations for any of these areas?",
  'recommendations': "I've analyzed your learning style and performance. Here are some suggestions:\n• Try more interactive exercises for Physics\n• Consider video lessons for complex Math concepts\n• Practice coding challenges to strengthen Programming\n\nWhich area would you like to focus on?",
  'math': "For Mathematics, I recommend:\n• Review the calculus fundamentals\n• Practice with interactive problem sets\n• Watch video explanations of complex concepts\n\nWould you like me to find specific resources for any of these?",
  'physics': "To improve in Physics:\n• Start with the basic mechanics concepts\n• Use visual simulations for better understanding\n• Practice with real-world applications\n\nI can help you find specific lessons if you'd like.",
  'programming': "For Programming, you're doing great! To maintain your progress:\n• Try more advanced algorithms\n• Explore different programming paradigms\n• Work on real-world projects\n\nWould you like specific project ideas?",
  'thanks': "You're welcome! Let me know if you need any other help with your studies.",
  'bye': "Goodbye! Remember, I'm here whenever you need help with your learning journey.",
  'default': "I'm your learning assistant, and I'm here to help you with your studies. You can ask me about:\n• Your course progress\n• Learning recommendations\n• Specific subjects (Math, Physics, Programming)\n• Study tips and resources\n\nWhat would you like to know?"
}

// Recommendation algorithm types and utilities
interface LessonScore {
  lesson: RecommendedLesson
  score: number
  factors: {
    performance: number
    learningStyle: number
    improvement: number
    interest: number
  }
}

// Simple recommendation algorithm
function calculateLessonRecommendations(
  lessons: RecommendedLesson[],
  performance: typeof studentPerformance
): LessonScore[] {
  return lessons.map(lesson => {
    const factors = {
      // Performance factor: Higher score if student is doing well in the same category
      performance: performance.enrolledCourses.some(course => 
        course.category === lesson.category && course.grade !== undefined && course.grade.toLowerCase() === 'a'
      ) ? 1.5 : 1.0,

      // Learning style factor: Higher score if lesson matches student's learning style
      learningStyle: lesson.learningStyle.some(style =>
        performance.learningStyle.some(perfStyle =>
          perfStyle.toLowerCase() === style.toLowerCase()
        )
      ) ? 1.3 : 1.0,

      // Improvement factor: Higher score if lesson helps with areas for improvement
      improvement: performance.strengths.some(strength => 
        lesson.tags.some(tag => tag.toLowerCase().includes(strength.toLowerCase()))
      ) ? 1.4 : 1.0,

      // Interest factor: Higher score if lesson matches student's interests
      interest: performance.interests.some(interest => 
        lesson.category.toLowerCase().includes(interest.toLowerCase()) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      ) ? 1.2 : 1.0
    }

    // Calculate total score (weighted average of factors)
    const score = (
      factors.performance * 0.3 +
      factors.learningStyle * 0.3 +
      factors.improvement * 0.2 +
      factors.interest * 0.2
    ) * 100

    return {
      lesson,
      score: Math.round(score),
      factors
    }
  }).sort((a, b) => b.score - a.score) // Sort by score in descending order
}

// Mock data for all available lessons (expanded from recommended lessons)
const allLessons: RecommendedLesson[] = [
  // ... existing recommended lessons ...
  {
    id: 5,
    title: 'Public Speaking Basics',
    description: 'Learn fundamental techniques for effective public speaking.',
    type: 'video',
    duration: '20:00',
    courseId: 5,
    courseTitle: 'Communication Skills Workshop',
    category: 'Language Arts',
    reason: 'Helps improve public speaking skills',
    difficulty: 'Easy',
    learningStyle: ['Speaking', 'Interactive'],
    tags: ['Public Speaking', 'Communication', 'Presentation']
  },
  {
    id: 6,
    title: 'Advanced Science Concepts',
    description: 'Dive deeper into scientific theories and principles.',
    type: 'reading',
    duration: '30 min',
    courseId: 2,
    courseTitle: 'Science Explorers: Hands-on Experiments',
    category: 'Science',
    reason: 'Builds on your strong science foundation',
    difficulty: 'Hard',
    learningStyle: ['Reading', 'Visual'],
    tags: ['Science', 'Theory', 'Advanced Concepts']
  },
  {
    id: 7,
    title: 'Math Problem Solving Workshop',
    description: 'Practice solving complex mathematical problems with step-by-step guidance.',
    type: 'exercise',
    duration: '40 min',
    courseId: 1,
    courseTitle: 'Advanced Mathematics for Young Minds',
    category: 'Mathematics',
    reason: 'Enhances your problem-solving skills',
    difficulty: 'Medium',
    learningStyle: ['Hands-on', 'Visual'],
    tags: ['Mathematics', 'Problem Solving', 'Practice']
  }
]

// Mock support messages
const initialSupportMessages: SupportMessage[] = [
  {
    id: 1,
    text: "Hello! I'm your support assistant. How can I help you today?",
    isSupport: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  }
]

export default function StudentDashboard() {
  const [showRecommendationDetails, setShowRecommendationDetails] = useState<number | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(true) // AI assistant sidebar
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages')
      return saved ? JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) : []
    }
    return []
  })
  const [isTyping, setIsTyping] = useState(false)

  // Support chat modal state
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [supportMessage, setSupportMessage] = useState('')
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('supportMessages')
      return saved ? JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) : initialSupportMessages
    }
    return initialSupportMessages
  })
  const [isSupportTyping, setIsSupportTyping] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
      localStorage.setItem('supportMessages', JSON.stringify(supportMessages))
    }
  }, [chatMessages, supportMessages])

  // Calculate recommendations using the algorithm
  const lessonRecommendations = calculateLessonRecommendations(allLessons, studentPerformance)

  // AI assistant chat submit
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    }
    setChatMessages(prev => [...prev, userMessage])
    setMessage('')

    setIsTyping(true)
    setTimeout(() => {
      const userInput = message.toLowerCase().trim()
      let response = mockResponses.default
      if (mockResponses[userInput]) {
        response = mockResponses[userInput]
      } else {
        for (const [key, value] of Object.entries(mockResponses)) {
          if (userInput.includes(key)) {
            response = value
            break
          }
        }
      }
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  // Support chat submit
  const [supportReplyCount, setSupportReplyCount] = useState(0)

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportMessage.trim()) return
    const userMessage: SupportMessage = {
      id: Date.now(),
      text: supportMessage,
      isSupport: false,
      timestamp: new Date()
    }
    setSupportMessages(prev => [...prev, userMessage])
    setSupportMessage('')
    setIsSupportTyping(true)
    setTimeout(() => {
      let supportReplyText = ''
      if (supportReplyCount === 0) {
        supportReplyText = "Hi, this is Deniz from support. How can I help you today?"
      } else if (supportReplyCount % 2 === 1) {
        supportReplyText = "I'm here to assist you with any questions or issues you have."
      } else {
        supportReplyText = "Thank you for reaching out! Our support team will get back to you soon."
      }
      const supportReply: SupportMessage = {
        id: Date.now() + 1,
        text: supportReplyText,
        isSupport: true,
        timestamp: new Date()
      }
      setSupportMessages(prev => [...prev, supportReply])
      setIsSupportTyping(false)
      setSupportReplyCount(c => c + 1)
    }, 1800)
  }

  const handleDeleteMessage = (messageId: number) => {
    setChatMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setChatMessages([])
    }
  }

  // Support chat message delete
  const handleDeleteSupportMessage = (messageId: number) => {
    setSupportMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const handleClearSupportChat = () => {
    if (window.confirm('Are you sure you want to clear the support chat history?')) {
      setSupportMessages(initialSupportMessages)
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current Performance Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-indigo-900 mb-2">Current Courses</h3>
              <div className="space-y-3">
                {studentPerformance.enrolledCourses.map(course => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-sm text-indigo-700">{course.title}</span>
                    <span className="text-sm font-medium text-indigo-900">{course.progress}%</span>
                    {course.grade !== undefined && (
                      <span className="text-sm text-gray-500">
                        Grade: {course.grade}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900 mb-2">Areas of Strength</h3>
              <div className="space-y-2">
                {studentPerformance.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center">
                    <StarIconSolid className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Lessons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recommended Lessons</h2>
            <button
              onClick={() => setShowRecommendationDetails(showRecommendationDetails === null ? -1 : null)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {showRecommendationDetails === null ? 'Show Details' : 'Hide Details'}
            </button>
          </div>
          <div className="space-y-4">
            {lessonRecommendations.map((recommendation) => (
              <Link href={`/courses/${recommendation.lesson.courseId}?lesson=${recommendation.lesson.id}`} key={recommendation.lesson.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-indigo-600">{recommendation.lesson.category}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{recommendation.lesson.duration}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className={`text-sm font-medium ${
                          recommendation.lesson.difficulty === 'Easy' ? 'text-green-600' :
                          recommendation.lesson.difficulty === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {recommendation.lesson.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-indigo-600">
                          Match Score: {recommendation.score}%
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{recommendation.lesson.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{recommendation.lesson.description}</p>
                      
                      {showRecommendationDetails !== null && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Why this lesson?</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-600 w-32">Performance:</span>
                              <span className={`font-medium ${
                                recommendation.factors.performance > 1 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {recommendation.factors.performance > 1 ? 'Strong match' : 'Neutral'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-32">Learning Style:</span>
                              <span className={`font-medium ${
                                recommendation.factors.learningStyle > 1 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {recommendation.factors.learningStyle > 1 ? 'Matches your style' : 'Neutral'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-32">Improvement:</span>
                              <span className={`font-medium ${
                                recommendation.factors.improvement > 1 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {recommendation.factors.improvement > 1 ? 'Helps weak areas' : 'Neutral'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 w-32">Interest:</span>
                              <span className={`font-medium ${
                                recommendation.factors.interest > 1 ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {recommendation.factors.interest > 1 ? 'Matches interests' : 'Neutral'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 mb-3">
                        {recommendation.lesson.learningStyle.map((style, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-start">
                          <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-800">{recommendation.lesson.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {recommendation.lesson.type === 'video' && (
                        <PlayCircleIcon className="h-8 w-8 text-red-500" />
                      )}
                      {recommendation.lesson.type === 'reading' && (
                        <BookOpenIcon className="h-8 w-8 text-blue-500" />
                      )}
                      {recommendation.lesson.type === 'quiz' && (
                        <DocumentTextIcon className="h-8 w-8 text-green-500" />
                      )}
                      {recommendation.lesson.type === 'exercise' && (
                        <AcademicCapIcon className="h-8 w-8 text-purple-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedContent.map((content) => (
              <Link href={`/courses/${content.id}`} key={content.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                      {content.category}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                      Match Score: {content.matchScore}%
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                      <span className="text-sm font-medium text-indigo-600">{content.level}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{content.description}</p>
                    
                    <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                      <div className="flex items-start">
                        <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">{content.reason}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Prerequisites:</h4>
                      <ul className="space-y-1">
                        {content.prerequisites.map((prereq, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <div className={`${isChatOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-l border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-medium text-gray-900">Learning Assistant</h3>
              <p className="text-sm text-gray-500">Ask me anything!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {chatMessages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} group`}
            >
              <div className="relative">
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    msg.isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="text-sm">
                      {line}
                    </p>
                  ))}
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleChatSubmit}>
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your learning assistant..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Support Chat Widget (Bottom Right) */}
      {isSupportOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-96 max-w-full bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200"
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftIcon className="h-6 w-6 text-indigo-600" />
              <span className="font-medium text-gray-900">Support Chat</span>
            </div>
            <button onClick={() => setIsSupportOpen(false)} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '400px' }}>
            {supportMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isSupport ? 'justify-start' : 'justify-end'} group`}>
                <div className="relative">
                  <div className={`max-w-[85%] rounded-lg p-3 ${msg.isSupport ? 'bg-indigo-100 text-indigo-900' : 'bg-indigo-600 text-white'}`}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className="text-sm">{line}</p>
                    ))}
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteSupportMessage(msg.id)}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {isSupportTyping && (
              <div className="flex justify-start">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-5 w-5 text-indigo-400" />
                    <span className="text-sm text-gray-700">Support is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <form onSubmit={handleSupportSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={supportMessage}
                  onChange={e => setSupportMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!supportMessage.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
            {supportMessages.length > 1 && (
              <button
                onClick={handleClearSupportChat}
                className="mt-2 text-xs text-gray-400 hover:text-red-500"
              >
                Clear Support Chat
              </button>
            )}
          </div>
        </div>
      )}

      {/* Help Button (Support Chat Trigger) */}
      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </button>
    </div>
  )
} 