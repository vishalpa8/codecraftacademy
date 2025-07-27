'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BookOpen, Code } from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/Button'
import FeedbackModal from '@/components/FeedbackModal'
import { useLessonManager, type LessonData } from '@/lib/lessonUtils'

export default function LessonPage() {
  const lessonData: LessonData = {
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming language',
    steps: [
      {
        id: 1,
        title: 'What is JavaScript?',
        content: `
          <p>JavaScript is a programming language that was originally created to make web pages interactive. Today, it's used for:</p>
          <ul>
            <li>Web development (frontend and backend)</li>
            <li>Mobile app development</li>
            <li>Desktop applications</li>
            <li>Game development</li>
          </ul>
          <p>JavaScript is one of the most popular programming languages in the world!</p>
        `,
        type: 'reading',
      },
      {
        id: 2,
        title: 'Your First JavaScript Code',
        content: `
          <p>Let's write your first JavaScript code! In the editor below, you need to complete the code.</p>
          <p><code>console.log()</code> is a function that prints text to the console (output area).</p>
          <p><strong>Challenge:</strong> Complete the code to print "Hello, World!" to the console.</p>
        `,
        type: 'coding',
        defaultCode: '// Complete this code to print "Hello, World!"\nconsole.log("");',
        expectedOutput: 'Hello, World!',
        challenge: 'Print "Hello, World!" to the console',
      },
      {
        id: 3,
        title: 'Variables',
        content: `
          <p>Variables are containers for storing data values. In JavaScript, you can declare variables using:</p>
          <ul>
            <li><code>let</code> - for variables that can change</li>
            <li><code>const</code> - for variables that cannot change</li>
            <li><code>var</code> - old way (not recommended)</li>
          </ul>
          <p><strong>Challenge:</strong> Create two variables and print their sum.</p>
        `,
        type: 'coding',
        defaultCode: `// Create two variables and print their sum
let num1 = 10;
let num2 = 5;`,
        expectedOutput: 'Sum: 15',
        challenge: 'Create two variables and print their sum',
      },
    ],
  }

  // Use the centralized lesson manager
  const {
    state,
    actions,
    currentStepData,
    progress,
    isStepCompleted,
    canAccessStep,
    getChallengeStatus
  } = useLessonManager(lessonData)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/courses/javascript-fundamentals" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{lessonData.title}</h1>
                <p className="text-sm text-gray-600">{lessonData.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Step {state.currentStep + 1} of {lessonData.steps.length}
              </div>
              <button
                onClick={actions.resetProgress}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                title="Reset lesson progress"
              >
                Reset Progress
              </button>
              <div className="flex items-center space-x-1">
                {lessonData.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    {isStepCompleted(step.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    {index < lessonData.steps.length - 1 && (
                      <div className="w-4 h-0.5 bg-gray-300 mx-1"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                {currentStepData.type === 'reading' ? (
                  <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                ) : (
                  <Code className="w-6 h-6 text-green-600 mr-3" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentStepData.title}
                </h2>
              </div>
              
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentStepData.content }}
              />
            </div>

            {/* Code Editor */}
            {currentStepData.type === 'coding' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Practice Exercise
                </h3>
                <CodeEditor
                  key={`step-${currentStepData.id}`}
                  language="javascript"
                  defaultValue={currentStepData.defaultCode}
                  height="300px"
                  onCodeChange={actions.setUserCode}
                  onRun={actions.handleCodeRun}
                />
                
                {/* Challenge Description */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1">Challenge:</h4>
                    <p className="text-blue-800 text-sm">{currentStepData.challenge}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={actions.prevStep}
                disabled={state.currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

                                 <div className="flex items-center space-x-4">
                     {isStepCompleted(currentStepData.id) ? (
                       <div className="flex items-center text-green-600">
                         <CheckCircle className="w-5 h-5 mr-2" />
                         <span className="text-sm font-medium">Completed</span>
                       </div>
                     ) : currentStepData.type === 'coding' ? (
                       <div className="flex items-center text-amber-600">
                         <span className="text-sm font-medium">Complete this step to continue</span>
                       </div>
                     ) : (
                       <div className="flex items-center text-blue-600">
                         <span className="text-sm font-medium">Click Next to continue</span>
                       </div>
                     )}
                
                {state.currentStep < lessonData.steps.length - 1 ? (
                  <Button 
                    onClick={actions.nextStep}
                    disabled={currentStepData.type === 'coding' && !isStepCompleted(currentStepData.id)}
                    className={currentStepData.type === 'coding' && !isStepCompleted(currentStepData.id) ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Link href="/courses/javascript-fundamentals/lesson-2">
                    <Button>
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Progress</h3>
              <div className="space-y-3">
                                     {lessonData.steps.map((step, index) => {
                       const isAccessible = canAccessStep(index)
                       const isCurrent = state.currentStep === index
                       const isCompleted = isStepCompleted(step.id)
                       
                       return (
                         <div
                           key={step.id}
                           className={`flex items-center p-3 rounded-lg transition-colors ${
                             isCurrent
                               ? 'bg-blue-50 border border-blue-200'
                               : isAccessible
                               ? 'hover:bg-gray-50 cursor-pointer'
                               : 'opacity-50 cursor-not-allowed'
                           }`}
                           onClick={() => isAccessible && actions.setCurrentStep(index)}
                         >
                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                             {isCompleted ? (
                               <CheckCircle className="w-5 h-5 text-green-600" />
                             ) : isAccessible ? (
                               <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                             ) : (
                               <span className="text-sm font-medium text-gray-400">🔒</span>
                             )}
                           </div>
                           <div className="flex-1">
                             <h4 className={`text-sm font-medium ${
                               isAccessible ? 'text-gray-900' : 'text-gray-500'
                             }`}>
                               {step.title}
                             </h4>
                             <p className="text-xs text-gray-500 capitalize">{step.type}</p>
                             {!isAccessible && (
                               <p className="text-xs text-gray-400 mt-1">
                                 Complete previous steps first
                               </p>
                             )}
                           </div>
                         </div>
                       )
                     })}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Take your time to understand each concept</li>
                <li>• Practice the code examples</li>
                <li>• Don't be afraid to experiment</li>
                <li>• Use the console to see your output</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-3">
                <Link 
                  href="/docs/javascript-basics"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  📚 JavaScript Documentation
                </Link>
                <Link 
                  href="/community"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  💬 Ask for Help
                </Link>
                <Link 
                  href="/practice"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  🎯 Practice Exercises
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={state.showFeedbackModal}
        onClose={actions.handleModalClose}
        isCorrect={state.isChallengeSolved}
        userOutput={state.codeOutput}
        expectedOutput={currentStepData.expectedOutput || ''}
        challenge={currentStepData.challenge || ''}
      />
    </div>
  )
} 