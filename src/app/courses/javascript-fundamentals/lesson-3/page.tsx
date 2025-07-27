'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BookOpen, Code } from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import { handleChallengeExecution } from '@/lib/lessonUtils'

export default function OperatorsLessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isChallengeSolved, setIsChallengeSolved] = useState(false)

  const lessonData = {
    title: 'Operators and Expressions',
    description: 'Learn about arithmetic, comparison, and logical operators in JavaScript',
    steps: [
      {
        id: 1,
        title: 'What are Operators?',
        content: 'Operators are symbols that perform operations on values. They allow you to manipulate data and create expressions.',
        type: 'reading',
      },
      {
        id: 2,
        title: 'Arithmetic Operators',
        content: `
          <p>Arithmetic operators perform mathematical operations:</p>
          <ul>
            <li><code>+</code> - Addition</li>
            <li><code>-</code> - Subtraction</li>
            <li><code>*</code> - Multiplication</li>
            <li><code>/</code> - Division</li>
            <li><code>%</code> - Modulus (remainder)</li>
            <li><code>**</code> - Exponentiation</li>
          </ul>
          <p><strong>Challenge:</strong> Calculate the area of a rectangle.</p>
        `,
        type: 'coding',
        defaultCode: `// Calculate the area of a rectangle
let length = 10;
let width = 5;
let area = ; // Calculate area here
console.log("Area:", area);`,
        expectedOutput: 'Area: 50',
        challenge: 'Calculate the area of a rectangle (length × width)',
      },
      {
        id: 3,
        title: 'Comparison Operators',
        content: 'Comparison operators compare values and return a boolean: ==, ===, !=, !==, >, <, >=, <=',
        type: 'coding',
      },
      {
        id: 4,
        title: 'Logical Operators',
        content: 'Logical operators combine boolean values: &&, ||, !',
        type: 'coding',
      },
    ],
  }

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleCodeRun = (code: string) => {
    const currentStepData = lessonData.steps[currentStep]
    const expected = currentStepData.expectedOutput
    
    if (expected) {
      // Use centralized challenge execution utility
      const result = handleChallengeExecution(code, expected)
      
      setCodeOutput(result.userOutput)
      setIsChallengeSolved(result.isCorrect)
      
      if (result.isCorrect && !completedSteps.includes(currentStepData.id)) {
        handleStepComplete(currentStepData.id)
      }
    }
  }

  const resetProgress = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setCodeOutput('')
    setIsChallengeSolved(false)
  }

  const nextStep = () => {
    if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = lessonData.steps[currentStep]

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {lessonData.steps.length}
            </div>
            <button
              onClick={resetProgress}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              title="Reset lesson progress"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                  language="javascript"
                  defaultValue={currentStepData.defaultCode}
                  height="300px"
                  onCodeChange={() => {}}
                  onRun={handleCodeRun}
                />
                
                {/* Challenge Status */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    {/* Challenge Description */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">Challenge:</h4>
                      <p className="text-blue-800 text-sm">{currentStepData.challenge}</p>
                    </div>
                    
                    {/* Output Display */}
                    {codeOutput && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-1">Output:</h4>
                        <pre className="text-sm text-gray-700 bg-white p-2 rounded border">{codeOutput}</pre>
                      </div>
                    )}
                    
                    {/* Challenge Status */}
                    <div className="space-y-3">
                      {isChallengeSolved ? (
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">✅ Challenge solved!</span>
                          {!completedSteps.includes(currentStepData.id) && (
                            <button
                              onClick={() => handleStepComplete(currentStepData.id)}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      ) : codeOutput ? (
                        <div className="space-y-2">
                          <div className="flex items-center text-amber-600">
                            <span className="text-sm font-medium">⚠️ Almost there! Check your output carefully</span>
                          </div>
                          
                          {/* Show expected vs actual */}
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-blue-50 p-2 rounded border border-blue-200">
                              <div className="font-medium text-blue-800 mb-1">Your Output:</div>
                              <pre className="text-blue-700 bg-white p-1 rounded">{codeOutput}</pre>
                            </div>
                            <div className="bg-purple-50 p-2 rounded border border-purple-200">
                              <div className="font-medium text-purple-800 mb-1">Expected Output:</div>
                              <pre className="text-purple-700 bg-white p-1 rounded">{currentStepData.expectedOutput}</pre>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-600">
                            💡 Tip: Check your code carefully. Make sure you're printing exactly what's expected.
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-600 text-sm">
                          Run your code to test the challenge
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Previous
              </button>

              <div className="flex items-center space-x-4">
                {completedSteps.includes(currentStepData.id) && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
                
                {currentStep < lessonData.steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </button>
                ) : (
                  <Link href="/courses/javascript-fundamentals/lesson-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Progress</h3>
              <div className="space-y-3">
                {lessonData.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      currentStep === index 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                      <p className="text-xs text-gray-500 capitalize">{step.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 