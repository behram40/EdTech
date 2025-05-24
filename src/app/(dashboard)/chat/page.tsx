'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PaperAirplaneIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

interface ChatMessage {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

// Add comprehensive mock responses for the AI chat
const mockResponses: { [key: string]: string } = {
  'hello': "Hello! I'm your AI learning assistant. I'm here to help you with your studies, answer questions, and guide your learning journey. What would you like to explore today?",
  'hi': "Hi there! I'm excited to help you learn. Whether you need help with specific subjects, want to explore new topics, or need study guidance, I'm here for you. What's on your mind?",
  'help': "I can help you with:\n• Understanding complex concepts\n• Breaking down difficult topics\n• Providing study strategies\n• Recommending learning resources\n• Answering subject-specific questions\n• Creating study plans\n• Explaining step-by-step solutions\n\nWhat would you like help with?",
  'math': "I can help you with Mathematics! Here are some topics we can explore:\n• Algebra and equations\n• Calculus and derivatives\n• Geometry and trigonometry\n• Statistics and probability\n• Problem-solving strategies\n\nWhich area would you like to focus on?",
  'science': "Let's explore Science together! We can cover:\n• Physics principles and applications\n• Chemistry concepts and reactions\n• Biology and life sciences\n• Scientific method and experiments\n• Real-world applications\n\nWhat interests you most?",
  'programming': "I'd love to help you with Programming! We can work on:\n• Coding fundamentals\n• Data structures and algorithms\n• Web development\n• Problem-solving techniques\n• Best practices and debugging\n\nWhat would you like to learn?",
  'study tips': "Here are some effective study strategies:\n• Active recall and spaced repetition\n• Mind mapping and visual learning\n• Practice testing and self-quizzing\n• Breaking down complex topics\n• Creating study schedules\n\nWould you like me to explain any of these in detail?",
  'progress': "Based on your learning profile:\n• You're excelling in Mathematics (92%)\n• Strong performance in Programming (88%)\n• Good progress in Physics (75%)\n• Areas for growth in Chemistry (65%)\n\nWould you like specific recommendations for any of these subjects?",
  'recommendations': "Based on your learning style and performance, I recommend:\n• Interactive coding challenges for Programming\n• Visual physics simulations for better understanding\n• Step-by-step math problem solving\n• Hands-on chemistry experiments\n\nWhich area would you like to explore first?",
  'difficult': "I understand that some topics can be challenging. Let's break it down:\n• What specific concept are you finding difficult?\n• What have you tried so far?\n• What's your current understanding?\n\nTogether, we can find a way to make it clearer!",
  'thanks': "You're welcome! I'm here to support your learning journey. Don't hesitate to ask if you need any clarification or have more questions!",
  'bye': "Goodbye! Remember, learning is a journey, and I'm here to help whenever you need it. Keep up the great work!",
  'default': "I'm your AI learning assistant, and I'm here to help you learn and grow. You can ask me about:\n• Specific subjects (Math, Science, Programming)\n• Study strategies and techniques\n• Learning resources and materials\n• Problem-solving approaches\n• Progress tracking and recommendations\n\nWhat would you like to explore?"
}

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatSessions')
      return saved ? JSON.parse(saved).map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })) : []
    }
    return []
  })
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  // Get current session messages
  const currentSession = chatSessions.find(session => session.id === currentSessionId)
  const chatMessages = currentSession?.messages || []

  // Save chat sessions to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setChatSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
  }

  const deleteChatSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      setChatSessions(prev => prev.filter(session => session.id !== sessionId))
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null)
      }
    }
  }

  const updateChatTitle = (sessionId: string, newTitle: string) => {
    setChatSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, title: newTitle, updatedAt: new Date() }
        : session
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentSessionId) return

    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    }

    // Update session with new message
    setChatSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        // Update title if it's the first message
        const newTitle = session.messages.length === 0 
          ? message.slice(0, 30) + (message.length > 30 ? '...' : '')
          : session.title
        return {
          ...session,
          title: newTitle,
          messages: [...session.messages, userMessage],
          updatedAt: new Date()
        }
      }
      return session
    }))
    setMessage('')

    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      // Find the best matching response
      const userInput = message.toLowerCase().trim()
      let response = mockResponses.default
      
      // Check for exact matches first
      if (mockResponses[userInput]) {
        response = mockResponses[userInput]
      } else {
        // Check for partial matches
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

      // Update session with AI response
      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, aiMessage],
            updatedAt: new Date()
          }
        }
        return session
      }))
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat History Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-50 border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatSessions.map(session => (
            <div
              key={session.id}
              className={`group flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer ${
                currentSessionId === session.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setCurrentSessionId(session.id)}
            >
              <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.title}
                </p>
                <p className="text-xs text-gray-500">
                  {session.updatedAt.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteChatSession(session.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {currentSession && (
            <div className="flex-1 px-4">
              <input
                type="text"
                value={currentSession.title}
                onChange={(e) => updateChatTitle(currentSession.id, e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium"
              />
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentSession ? (
            <>
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
                      onClick={() => {
                        setChatSessions(prev => prev.map(session => {
                          if (session.id === currentSessionId) {
                            return {
                              ...session,
                              messages: session.messages.filter(m => m.id !== msg.id)
                            }
                          }
                          return session
                        }))
                      }}
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
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Start a new chat</p>
                <p className="text-sm">Click the "New Chat" button to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        {currentSession && (
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit}>
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
        )}
      </div>
    </div>
  )
} 