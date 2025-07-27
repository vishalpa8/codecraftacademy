'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code, BookOpen, Users, Award, Zap, Shield, Clock, Bell } from 'lucide-react'
import Modal from '@/components/ui/Modal'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CodeCraft Academy</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#languages" className="text-gray-600 hover:text-blue-600 transition-colors">
                Languages
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <Link href="/auth/login" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/courses/javascript-fundamentals" className="btn-primary">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Programming with
            <span className="text-blue-600"> Interactive Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn JavaScript, Python, React, and more with our hands-on, project-based approach. 
            Write code, see results instantly, and build real-world applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary text-lg px-8 py-3">
              Browse Courses
            </Link>
            <Link href="/auth/register" className="btn-secondary text-lg px-8 py-3">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CodeCraft Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Code Editor</h3>
              <p className="text-gray-600">
                Write code in a professional IDE with syntax highlighting, autocomplete, and real-time error detection.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Code Execution</h3>
              <p className="text-gray-600">
                Run your code immediately in a secure sandbox environment. See results instantly.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning Paths</h3>
              <p className="text-gray-600">
                Follow carefully crafted curricula from beginner to advanced levels with hands-on projects.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Learning</h3>
              <p className="text-gray-600">
                Connect with peers, share code, and learn together in a supportive community.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certification System</h3>
              <p className="text-gray-600">
                Earn industry-recognized certificates with blockchain verification for your achievements.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
              <p className="text-gray-600">
                Built with enterprise-grade security and designed to scale with your learning needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn Multiple Programming Languages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with JavaScript and expand to other languages as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'JavaScript', 
                color: 'bg-yellow-100', 
                textColor: 'text-yellow-800', 
                icon: 'JS',
                href: '/courses/javascript-fundamentals',
                available: true,
                description: 'Learn the fundamentals of JavaScript programming with interactive exercises and real-world projects.'
              },
              { 
                name: 'Python', 
                color: 'bg-blue-100', 
                textColor: 'text-blue-800', 
                icon: 'Py',
                href: '#',
                available: false,
                description: 'Master Python programming from basics to advanced concepts including data science and web development.'
              },
              { 
                name: 'React', 
                color: 'bg-cyan-100', 
                textColor: 'text-cyan-800', 
                icon: '⚛',
                href: '#',
                available: false,
                description: 'Build modern web applications with React, including hooks, context, and advanced state management.'
              },
              { 
                name: 'Node.js', 
                color: 'bg-green-100', 
                textColor: 'text-green-800', 
                icon: 'Node',
                href: '#',
                available: false,
                description: 'Learn server-side JavaScript with Node.js, Express, and build full-stack applications.'
              },
            ].map((lang) => (
              <div key={lang.name}>
                {lang.available ? (
                  <Link href={lang.href} className={`${lang.color} rounded-xl p-6 text-center block hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}>
                    <div className="text-2xl font-bold mb-2">{lang.icon}</div>
                    <h3 className={`text-lg font-semibold ${lang.textColor}`}>{lang.name}</h3>
                    <p className="text-green-600 mt-2 font-medium">Start Learning →</p>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedLanguage(lang.name)
                      setModalOpen(true)
                    }}
                    className={`${lang.color} rounded-xl p-6 text-center w-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}
                  >
                    <div className="text-2xl font-bold mb-2">{lang.icon}</div>
                    <h3 className={`text-lg font-semibold ${lang.textColor}`}>{lang.name}</h3>
                    <p className="text-gray-600 mt-2">Coming Soon</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have transformed their careers with CodeCraft Academy
          </p>
          <Link href="/auth/register" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-lg font-semibold">CodeCraft Academy</span>
              </div>
              <p className="text-gray-400">
                Empowering the next generation of developers through interactive learning.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#languages" className="hover:text-white transition-colors">Languages</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeCraft Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${selectedLanguage} - Coming Soon!`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedLanguage} Course is Coming Soon!
          </h3>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you the best {selectedLanguage} learning experience. 
            Be the first to know when it's ready!
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Notify Me When Available
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Maybe Later
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              In the meantime, why not start with our JavaScript course?
            </p>
            <Link 
              href="/courses/javascript-fundamentals"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2"
            >
              <Bell className="w-4 h-4 mr-1" />
              Start Learning JavaScript
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
} 