'use client'

import { useState } from 'react'
import { use } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpenIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface Lesson {
  id: number
  title: string
  type: 'video' | 'reading' | 'quiz'
  duration: string
  completed: boolean
  description: string
  content?: string
}

interface Course {
  id: number
  title: string
  description: string
  category: string
  image: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  lessons: Lesson[]
  materials: {
    title: string
    type: 'pdf' | 'video' | 'link'
    url: string
  }[]
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  id: number
  title: string
  questions: QuizQuestion[]
}

// Mock course data with comprehensive content for all courses
const mockCourses: { [key: string]: Course } = {
  '1': {
    id: 1,
    title: 'Advanced Mathematics for Young Minds',
    description: 'Build upon your strong math foundation with more challenging concepts and problem-solving exercises.',
    category: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Dr. Sarah Johnson',
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    lessons: [
      {
        id: 1,
        title: 'Introduction to Advanced Algebra',
        type: 'video',
        duration: '15:30',
        completed: true,
        description: 'Learn the fundamentals of algebraic expressions and equations.',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 2,
        title: 'Solving Quadratic Equations',
        type: 'reading',
        duration: '20 min',
        completed: true,
        description: 'Master the techniques for solving quadratic equations.',
        content: `
          <h2>Solving Quadratic Equations</h2>
          <p>A quadratic equation is an equation of the form ax² + bx + c = 0, where a, b, and c are constants.</p>
          
          <h3>Methods to Solve:</h3>
          <ol>
            <li>Factoring</li>
            <li>Completing the Square</li>
            <li>Quadratic Formula</li>
          </ol>

          <h3>Example:</h3>
          <p>Solve: x² + 5x + 6 = 0</p>
          <p>Step 1: Factor the equation</p>
          <p>(x + 2)(x + 3) = 0</p>
          <p>Step 2: Set each factor equal to zero</p>
          <p>x + 2 = 0 or x + 3 = 0</p>
          <p>Step 3: Solve for x</p>
          <p>x = -2 or x = -3</p>
        `
      },
      {
        id: 3,
        title: 'Practice Quiz: Quadratic Equations',
        type: 'quiz',
        duration: '10 min',
        completed: false,
        description: 'Test your understanding of quadratic equations.'
      }
    ],
    materials: [
      {
        title: 'Course Textbook',
        type: 'pdf',
        url: '#'
      },
      {
        title: 'Practice Problems Set',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  '2': {
    id: 2,
    title: 'Science Explorers: Hands-on Experiments',
    description: 'Take your science skills to the next level with exciting experiments and scientific investigations.',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Prof. Michael Chen',
    progress: 40,
    totalLessons: 10,
    completedLessons: 4,
    lessons: [
      {
        id: 1,
        title: 'Introduction to Scientific Method',
        type: 'reading',
        duration: '15 min',
        completed: true,
        description: 'Learn the fundamental steps of the scientific method.',
        content: `
          <h2>The Scientific Method</h2>
          <p>The scientific method is a systematic approach to research that involves:</p>
          <ol>
            <li>Making observations</li>
            <li>Asking questions</li>
            <li>Forming hypotheses</li>
            <li>Conducting experiments</li>
            <li>Analyzing data</li>
            <li>Drawing conclusions</li>
          </ol>

          <h3>Example Experiment:</h3>
          <p>Question: How does temperature affect plant growth?</p>
          <p>Hypothesis: Plants grow faster in warmer temperatures.</p>
          <p>Variables:</p>
          <ul>
            <li>Independent: Temperature</li>
            <li>Dependent: Plant growth</li>
            <li>Control: Same plant species, soil, water, light</li>
          </ul>
        `
      },
      {
        id: 2,
        title: 'Basic Chemistry Lab Safety',
        type: 'video',
        duration: '12:45',
        completed: true,
        description: 'Essential safety guidelines for conducting experiments.',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 3,
        title: 'Quiz: Lab Safety and Scientific Method',
        type: 'quiz',
        duration: '10 min',
        completed: false,
        description: 'Test your understanding of lab safety and scientific method.'
      }
    ],
    materials: [
      {
        title: 'Lab Safety Manual',
        type: 'pdf',
        url: '#'
      },
      {
        title: 'Experiment Worksheets',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  '3': {
    id: 3,
    title: 'Creative Writing Workshop',
    description: 'Develop your writing skills through fun storytelling and creative expression activities.',
    category: 'Language Arts',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Ms. Emily Parker',
    progress: 25,
    totalLessons: 8,
    completedLessons: 2,
    lessons: [
      {
        id: 1,
        title: 'Elements of a Story',
        type: 'reading',
        duration: '20 min',
        completed: true,
        description: 'Learn the basic elements that make up a good story.',
        content: `
          <h2>Story Elements</h2>
          <p>Every good story contains these essential elements:</p>
          <ol>
            <li><strong>Characters:</strong> The people or animals in the story</li>
            <li><strong>Setting:</strong> Where and when the story takes place</li>
            <li><strong>Plot:</strong> The sequence of events in the story</li>
            <li><strong>Conflict:</strong> The problem the characters face</li>
            <li><strong>Theme:</strong> The main message or lesson</li>
          </ol>

          <h3>Example Analysis:</h3>
          <p>In "The Three Little Pigs":</p>
          <ul>
            <li>Characters: Three pigs and the big bad wolf</li>
            <li>Setting: A forest with three houses</li>
            <li>Plot: Pigs build houses, wolf tries to blow them down</li>
            <li>Conflict: Wolf vs. Pigs</li>
            <li>Theme: Hard work and preparation pay off</li>
          </ul>
        `
      },
      {
        id: 2,
        title: 'Character Development',
        type: 'video',
        duration: '18:20',
        completed: true,
        description: 'Learn how to create interesting and believable characters.',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 3,
        title: 'Writing Exercise: Create a Character',
        type: 'quiz',
        duration: '15 min',
        completed: false,
        description: 'Practice creating a character profile.'
      }
    ],
    materials: [
      {
        title: 'Writing Prompts Collection',
        type: 'pdf',
        url: '#'
      },
      {
        title: 'Character Development Worksheet',
        type: 'pdf',
        url: '#'
      }
    ]
  },
  '4': {
    id: 4,
    title: 'Introduction to Coding for Kids',
    description: 'Learn the basics of programming through fun, interactive games and projects.',
    category: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Mr. David Wilson',
    progress: 15,
    totalLessons: 10,
    completedLessons: 1,
    lessons: [
      {
        id: 1,
        title: 'What is Programming?',
        type: 'reading',
        duration: '15 min',
        completed: true,
        description: 'Introduction to basic programming concepts.',
        content: `
          <h2>Introduction to Programming</h2>
          <p>Programming is like giving instructions to a computer to perform tasks.</p>
          
          <h3>Basic Concepts:</h3>
          <ol>
            <li><strong>Sequences:</strong> Instructions that happen in order</li>
            <li><strong>Loops:</strong> Instructions that repeat</li>
            <li><strong>Conditions:</strong> Instructions that only happen if something is true</li>
          </ol>

          <h3>Example in Scratch-like pseudocode:</h3>
          <pre>
when green flag clicked
repeat 4 times
  move 100 steps
  turn 90 degrees
end
          </pre>
          <p>This code draws a square by:</p>
          <ol>
            <li>Moving forward 100 steps</li>
            <li>Turning right 90 degrees</li>
            <li>Repeating these steps 4 times</li>
          </ol>
        `
      },
      {
        id: 2,
        title: 'Your First Program',
        type: 'video',
        duration: '20:15',
        completed: false,
        description: 'Create a simple animation using block-based programming.',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 3,
        title: 'Quiz: Programming Basics',
        type: 'quiz',
        duration: '10 min',
        completed: false,
        description: 'Test your understanding of basic programming concepts.'
      }
    ],
    materials: [
      {
        title: 'Programming Reference Guide',
        type: 'pdf',
        url: '#'
      },
      {
        title: 'Practice Projects',
        type: 'pdf',
        url: '#'
      }
    ]
  }
}

// Add course-specific quiz data
const mockQuizzes: { [key: string]: Quiz } = {
  '1': {
    id: 1,
    title: 'Quadratic Equations Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the standard form of a quadratic equation?',
        options: [
          'ax + b = 0',
          'ax² + bx + c = 0',
          'ax³ + bx² + cx + d = 0',
          'ax² + bx = 0'
        ],
        correctAnswer: 1,
        explanation: 'The standard form of a quadratic equation is ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.'
      },
      {
        id: 2,
        question: 'What are the solutions to x² + 5x + 6 = 0?',
        options: [
          'x = 2, x = 3',
          'x = -2, x = -3',
          'x = 2, x = -3',
          'x = -2, x = 3'
        ],
        correctAnswer: 1,
        explanation: 'The equation factors to (x + 2)(x + 3) = 0, so x = -2 or x = -3.'
      },
      {
        id: 3,
        question: 'Which method is best for solving x² + 6x + 9 = 0?',
        options: [
          'Factoring',
          'Completing the Square',
          'Quadratic Formula',
          'All methods work equally well'
        ],
        correctAnswer: 0,
        explanation: 'This is a perfect square trinomial that can be easily factored as (x + 3)² = 0.'
      }
    ]
  },
  '2': {
    id: 2,
    title: 'Scientific Method and Lab Safety Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the first step in the scientific method?',
        options: [
          'Form a hypothesis',
          'Make observations',
          'Conduct experiments',
          'Analyze data'
        ],
        correctAnswer: 1,
        explanation: 'The scientific method begins with making observations about the natural world.'
      },
      {
        id: 2,
        question: 'Which of the following is NOT a proper lab safety practice?',
        options: [
          'Wearing safety goggles',
          'Eating in the lab',
          'Following instructions carefully',
          'Reporting accidents immediately'
        ],
        correctAnswer: 1,
        explanation: 'Eating in the lab is never allowed as it could lead to contamination or ingestion of harmful substances.'
      },
      {
        id: 3,
        question: 'In an experiment about plant growth, what would be the independent variable?',
        options: [
          'The height of the plants',
          'The amount of water given',
          'The type of soil used',
          'The color of the leaves'
        ],
        correctAnswer: 1,
        explanation: 'The independent variable is what the experimenter changes (amount of water) to observe its effect on the dependent variable (plant growth).'
      }
    ]
  },
  '3': {
    id: 3,
    title: 'Creative Writing Elements Quiz',
    questions: [
      {
        id: 1,
        question: 'Which of the following is NOT a basic element of a story?',
        options: [
          'Characters',
          'Setting',
          'Bibliography',
          'Plot'
        ],
        correctAnswer: 2,
        explanation: 'A bibliography is not a story element. The basic elements of a story are characters, setting, plot, conflict, and theme.'
      },
      {
        id: 2,
        question: 'What is the main difference between a static and dynamic character?',
        options: [
          'Static characters are always good, dynamic characters are always bad',
          'Static characters don\'t change, dynamic characters change throughout the story',
          'Static characters are minor, dynamic characters are major',
          'Static characters are realistic, dynamic characters are unrealistic'
        ],
        correctAnswer: 1,
        explanation: 'A static character remains the same throughout the story, while a dynamic character undergoes significant changes in personality or outlook.'
      },
      {
        id: 3,
        question: 'Which of these best describes the theme of a story?',
        options: [
          'The sequence of events',
          'The time and place of the story',
          'The main message or lesson',
          'The problem the characters face'
        ],
        correctAnswer: 2,
        explanation: 'The theme is the central message or lesson that the author wants to convey to the reader.'
      }
    ]
  },
  '4': {
    id: 4,
    title: 'Programming Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'What is a sequence in programming?',
        options: [
          'A set of instructions that repeat',
          'A set of instructions that happen in order',
          'A set of instructions that only happen if something is true',
          'A set of instructions that never execute'
        ],
        correctAnswer: 1,
        explanation: 'A sequence is a set of instructions that are executed one after another in a specific order.'
      },
      {
        id: 2,
        question: 'What does a loop do in programming?',
        options: [
          'Stops the program',
          'Repeats a set of instructions',
          'Makes decisions',
          'Stores data'
        ],
        correctAnswer: 1,
        explanation: 'A loop is used to repeat a set of instructions multiple times until a certain condition is met.'
      },
      {
        id: 3,
        question: 'In the code "repeat 4 times: move 100 steps, turn 90 degrees", what shape will be drawn?',
        options: [
          'Triangle',
          'Square',
          'Circle',
          'Rectangle'
        ],
        correctAnswer: 1,
        explanation: 'The code will draw a square because it moves forward 100 steps and turns 90 degrees four times, creating four equal sides and four right angles.'
      }
    ]
  }
}

export default function CourseDetailsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const course = mockCourses[courseId] || mockCourses['1']
  const quiz = mockQuizzes[courseId] || mockQuizzes['1']
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [activeTab, setActiveTab] = useState<'lessons' | 'materials'>('lessons')
  const [quizState, setQuizState] = useState<'not-started' | 'in-progress' | 'completed'>('not-started')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    if (lesson.type === 'quiz') {
      setQuizState('not-started')
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setScore(0)
    }
  }

  const startQuiz = () => {
    setQuizState('in-progress')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1)
    }
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizState('completed')
    }
  }

  const resetQuiz = () => {
    setQuizState('not-started')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Course Header */}
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-sm opacity-90">{course.description}</p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Course Progress</h2>
            <span className="text-sm font-medium text-indigo-600">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${course.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center">
                <AcademicCapIcon className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-indigo-900">Instructor</span>
              </div>
              <p className="mt-1 text-sm text-indigo-700">{course.instructor}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900">Progress</span>
              </div>
              <p className="mt-1 text-sm text-green-700">{course.progress}% Complete</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-900">Time Spent</span>
              </div>
              <p className="mt-1 text-sm text-yellow-700">4.5 hours</p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'lessons'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Lessons
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'materials'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Materials
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'lessons' ? (
              <div className="space-y-4">
                {course.lessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedLesson?.id === lesson.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {lesson.type === 'video' && (
                          <PlayCircleIcon className="h-6 w-6 text-red-500 mt-1" />
                        )}
                        {lesson.type === 'reading' && (
                          <BookOpenIcon className="h-6 w-6 text-blue-500 mt-1" />
                        )}
                        {lesson.type === 'quiz' && (
                          <DocumentTextIcon className="h-6 w-6 text-green-500 mt-1" />
                        )}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{lesson.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                        {lesson.completed ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {course.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {material.type === 'pdf' && (
                        <DocumentTextIcon className="h-6 w-6 text-red-500" />
                      )}
                      {material.type === 'video' && (
                        <PlayCircleIcon className="h-6 w-6 text-blue-500" />
                      )}
                      {material.type === 'link' && (
                        <LightBulbIcon className="h-6 w-6 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium text-gray-900">{material.title}</span>
                    </div>
                    <a
                      href={material.url}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Content Sidebar */}
      <div className="lg:col-span-1">
        {selectedLesson ? (
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedLesson.title}</h3>
            {selectedLesson.type === 'video' && selectedLesson.content && (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={selectedLesson.content}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {selectedLesson.type === 'reading' && selectedLesson.content && (
              <div
                className="prose prose-sm max-w-none 
                  prose-headings:text-gray-900 
                  prose-p:text-gray-800 
                  prose-strong:text-gray-900 
                  prose-code:text-indigo-600 
                  prose-code:bg-indigo-50 
                  prose-code:px-1 
                  prose-code:py-0.5 
                  prose-code:rounded 
                  prose-pre:bg-gray-900 
                  prose-pre:text-gray-100
                  [&_p]:bg-white
                  [&_p]:p-2
                  [&_p]:rounded
                  [&_p]:border
                  [&_p]:border-gray-200
                  [&_ol]:space-y-2
                  [&_ol_li]:bg-white
                  [&_ol_li]:p-2
                  [&_ol_li]:rounded
                  [&_ol_li]:border
                  [&_ol_li]:border-gray-200
                  [&_ol_li]:shadow-sm
                  [&_ol_li]:text-gray-800
                  [&_h2]:text-xl
                  [&_h2]:font-semibold
                  [&_h2]:text-gray-900
                  [&_h2]:mt-6
                  [&_h2]:mb-4
                  [&_h3]:text-lg
                  [&_h3]:font-medium
                  [&_h3]:text-gray-900
                  [&_h3]:mt-4
                  [&_h3]:mb-3"
                dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
              />
            )}
            {selectedLesson.type === 'quiz' && (
              <div className="space-y-6">
                {quizState === 'not-started' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      This quiz will test your understanding of {course.title}. There are {quiz.questions.length} questions.
                    </p>
                    <button
                      onClick={startQuiz}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
                {quizState === 'in-progress' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                      <span>Score: {score}</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-900 font-medium">{quiz.questions[currentQuestion].question}</p>
                      <div className="space-y-2">
                        {quiz.questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => !showExplanation && handleAnswerSelect(index)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedAnswer === index
                                ? index === quiz.questions[currentQuestion].correctAnswer
                                  ? 'bg-green-50 border-green-500 text-green-700'
                                  : 'bg-red-50 border-red-500 text-red-700'
                                : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                            } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {showExplanation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{quiz.questions[currentQuestion].explanation}</p>
                          <button
                            onClick={handleNextQuestion}
                            className="mt-4 w-full flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {currentQuestion < quiz.questions.length - 1 ? (
                              <>
                                Next Question
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              'Finish Quiz'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {quizState === 'completed' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-gray-900">Quiz Completed!</h4>
                      <p className="mt-2 text-3xl font-bold text-indigo-600">
                        {score} / {quiz.questions.length}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {score === quiz.questions.length
                          ? 'Perfect score! Excellent work!'
                          : score >= quiz.questions.length / 2
                          ? 'Good job! Keep practicing!'
                          : 'Keep studying and try again!'}
                      </p>
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
            Select a lesson to view its content
          </div>
        )}
      </div>
    </div>
  )
} 