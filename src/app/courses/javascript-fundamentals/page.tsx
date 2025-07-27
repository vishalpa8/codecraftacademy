'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Play, 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Code, 
  Target,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react'

interface Lesson {
  id: number
  title: string
  description: string
  duration: number
  type: 'reading' | 'coding' | 'quiz' | 'project'
  isCompleted: boolean
  isLocked: boolean
  slug: string
}

export default function JavaScriptFundamentalsPage() {
  const [enrolled, setEnrolled] = useState(true)
  const [progress, setProgress] = useState(0) // Start with 0% progress

  const courseData = {
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming with hands-on exercises and real-world projects.',
    duration: 480, // minutes
    lessons: 16,
    difficulty: 'Beginner',
    rating: 4.8,
    students: 1247,
    language: 'JavaScript',
    image: '🟡',
    instructor: 'CodeCraft Academy Team',
    lastUpdated: '2024-01-15',
  }

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn what JavaScript is and why it\'s important in modern web development.',
      duration: 15,
      type: 'reading',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-1'
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      description: 'Understand how to declare variables and work with different data types.',
      duration: 25,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-2'
    },
    {
      id: 3,
      title: 'Operators and Expressions',
      description: 'Learn about arithmetic, comparison, and logical operators.',
      duration: 30,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-3'
    },
    {
      id: 4,
      title: 'Control Flow: Conditionals',
      description: 'Master if statements, else clauses, and switch statements.',
      duration: 35,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-4'
    },
    {
      id: 5,
      title: 'Loops and Iteration',
      description: 'Learn for loops, while loops, and do-while loops.',
      duration: 40,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-5'
    },
    {
      id: 6,
      title: 'Functions Basics',
      description: 'Create and use functions to organize and reuse code.',
      duration: 45,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-6'
    },
    {
      id: 7,
      title: 'Arrays and Array Methods',
      description: 'Work with arrays and their built-in methods.',
      duration: 50,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-7'
    },
    {
      id: 8,
      title: 'Objects and Properties',
      description: 'Create and manipulate objects in JavaScript.',
      duration: 45,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-8'
    },
    {
      id: 9,
      title: 'Scope and Closures',
      description: 'Understand variable scope and closure concepts.',
      duration: 40,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-9'
    },
    {
      id: 10,
      title: 'Error Handling',
      description: 'Learn try-catch blocks and error handling best practices.',
      duration: 30,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-10'
    },
    {
      id: 11,
      title: 'DOM Manipulation',
      description: 'Interact with HTML elements using JavaScript.',
      duration: 55,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-11'
    },
    {
      id: 12,
      title: 'Events and Event Handling',
      description: 'Handle user interactions and browser events.',
      duration: 45,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-12'
    },
    {
      id: 13,
      title: 'Async JavaScript: Callbacks',
      description: 'Understand asynchronous programming with callbacks.',
      duration: 35,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-13'
    },
    {
      id: 14,
      title: 'Promises and Async/Await',
      description: 'Modern approaches to handling asynchronous operations.',
      duration: 50,
      type: 'coding',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-14'
    },
    {
      id: 15,
      title: 'Mini Project: Todo App',
      description: 'Build a complete todo application using all concepts learned.',
      duration: 60,
      type: 'project',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-15'
    },
    {
      id: 16,
      title: 'Final Assessment',
      description: 'Test your knowledge with a comprehensive quiz.',
      duration: 30,
      type: 'quiz',
      isCompleted: false,
      isLocked: false,
      slug: 'lesson-16'
    }
  ]

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="w-5 h-5" />
      case 'coding':
        return <Code className="w-5 h-5" />
      case 'quiz':
        return <Target className="w-5 h-5" />
      case 'project':
        return <Award className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getLessonColor = (type: string) => {
    switch (type) {
      case 'reading':
        return 'text-blue-600 bg-blue-100'
      case 'coding':
        return 'text-green-600 bg-green-100'
      case 'quiz':
        return 'text-purple-600 bg-purple-100'
      case 'project':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-6">
            <div className="text-4xl">{courseData.image}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{courseData.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDuration(courseData.duration)}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{courseData.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{courseData.students} students enrolled</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{courseData.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  <span>{courseData.difficulty}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{progress}%</div>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Core JavaScript concepts and syntax</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Variables, data types, and operators</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Control flow and loops</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Functions and scope</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Arrays and objects</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">DOM manipulation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Event handling</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Asynchronous JavaScript</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center p-4 rounded-lg border transition-colors ${
                      lesson.isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : lesson.isLocked
                        ? 'bg-gray-50 border-gray-200 opacity-60'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-4">
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{lesson.id}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className={`font-medium ${
                          lesson.isCompleted ? 'text-green-800' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </h3>
                        <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLessonColor(lesson.type)}`}>
                          {getLessonIcon(lesson.type)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{formatDuration(lesson.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {lesson.isCompleted ? (
                        <span className="text-green-600 text-sm font-medium">Completed</span>
                      ) : lesson.isLocked ? (
                        <span className="text-gray-400 text-sm">Locked</span>
                      ) : (
                        <Link 
                          href={`/courses/javascript-fundamentals/${lesson.slug}`}
                          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Start
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{courseData.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{courseData.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{courseData.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{courseData.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium text-green-600">Included</span>
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Lessons Completed</span>
                    <span className="font-medium">4 of 16</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Time Spent</span>
                    <span className="font-medium">1h 15m</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/courses/javascript-fundamentals/lesson-5"
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Learning
                </Link>
                <Link 
                  href="/practice"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Practice Exercises
                </Link>
                <Link 
                  href="/community"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Ask Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 