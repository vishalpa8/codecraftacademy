'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Play,
  CheckCircle,
  Circle,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react'

export default function DashboardPage() {
  const [currentCourse] = useState({
    title: 'JavaScript Fundamentals',
    progress: 65,
    currentLesson: 'Functions and Scope',
    totalLessons: 24,
    completedLessons: 16,
  })

  const [recentCourses] = useState([
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      progress: 65,
      lessons: 24,
      completed: 16,
      image: '🟡',
    },
    {
      id: 2,
      title: 'React Basics',
      description: 'Build interactive user interfaces with React',
      progress: 0,
      lessons: 18,
      completed: 0,
      image: '⚛️',
    },
    {
      id: 3,
      title: 'Node.js Backend',
      description: 'Create server-side applications with Node.js',
      progress: 0,
      lessons: 22,
      completed: 0,
      image: '🟢',
    },
  ])

  const [achievements] = useState([
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true },
    { id: 2, title: 'Code Warrior', description: 'Complete 10 lessons', icon: '⚔️', earned: true },
    { id: 3, title: 'JavaScript Master', description: 'Complete JavaScript course', icon: '👑', earned: false },
    { id: 4, title: 'Streak Master', description: 'Learn for 7 days in a row', icon: '🔥', earned: false },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CodeCraft Academy</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">JD</span>
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Continue your learning journey where you left off
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <Link href="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all courses
                </Link>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">🟡</span>
                      <h3 className="text-lg font-semibold text-gray-900">{currentCourse.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{currentCourse.currentLesson}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{currentCourse.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentCourse.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {currentCourse.completedLessons} of {currentCourse.totalLessons} lessons completed
                      </div>
                      <Link 
                        href="/courses/javascript-fundamentals/lesson-17"
                        className="btn-primary flex items-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Courses</h2>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl mr-4">{course.image}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {course.completed}/{course.lessons} lessons
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/courses/${course.id}`}
                      className="text-blue-600 hover:text-blue-700 ml-4"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Lessons Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">16</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Study Time</span>
                  </div>
                  <span className="font-semibold text-gray-900">8.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-600 mr-3" />
                    <span className="text-gray-700">Achievements</span>
                  </div>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Current Streak</span>
                  </div>
                  <span className="font-semibold text-gray-900">5 days</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <span className="text-lg">{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/practice"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Code className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Practice Coding</span>
                </Link>
                <Link 
                  href="/challenges"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Target className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700">Daily Challenges</span>
                </Link>
                <Link 
                  href="/community"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Community</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 