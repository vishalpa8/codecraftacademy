'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BookOpen, Code, Target } from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/Button'
import { handleChallengeExecution } from '@/lib/lessonUtils'

export default function VariablesLessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [userCode, setUserCode] = useState('')
  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isChallengeSolved, setIsChallengeSolved] = useState(false)

  const lessonData = {
    title: 'Variables and Data Types',
    description: 'Learn how to declare variables and work with different data types in JavaScript',
    steps: [
      {
        id: 1,
        title: 'What are Variables?',
        content: `
          <p>Variables are containers for storing data values. Think of them as labeled boxes where you can put different types of information.</p>
          <p>In JavaScript, you can declare variables using three keywords:</p>
          <ul>
            <li><code>let</code> - for variables that can change (recommended for most cases)</li>
            <li><code>const</code> - for variables that cannot change (constants)</li>
            <li><code>var</code> - old way (not recommended in modern JavaScript)</li>
          </ul>
          <p><strong>Example:</strong></p>
          <pre><code>let name = "John";
const age = 25;
var oldWay = "not recommended";</code></pre>
        `,
        type: 'reading',
      },
      {
        id: 2,
        title: 'String Data Type',
        content: `
          <p>Strings are used to store text. They can be created using single quotes, double quotes, or backticks.</p>
          <p><strong>Examples:</strong></p>
          <pre><code>let firstName = "John";
let lastName = 'Doe';
let message = \`Hello, \${firstName}!\`; // Template literal</code></pre>
          <p><strong>Challenge:</strong> Create a string variable with your name and print a greeting.</p>
        `,
        type: 'coding',
        defaultCode: `// Create a string variable and concatenate it
let firstName = "John";
let lastName = "Doe";
let fullName = ; // Combine firstName and lastName here
console.log("Full name:", fullName);`,
        expectedOutput: 'Full name: John Doe',
        challenge: 'Combine firstName and lastName to create fullName',
      },
      {
        id: 3,
        title: 'Number Data Type',
        content: `
          <p>Numbers in JavaScript can be integers or decimals (floating-point numbers).</p>
          <p><strong>Examples:</strong></p>
          <pre><code>let age = 25;           // Integer
let price = 19.99;      // Decimal
let temperature = -5;    // Negative number</code></pre>
          <p>JavaScript also supports special number values:</p>
          <ul>
            <li><code>Infinity</code> - represents infinity</li>
            <li><code>-Infinity</code> - represents negative infinity</li>
            <li><code>NaN</code> - "Not a Number" (result of invalid math operations)</li>
          </ul>
        `,
        type: 'coding',
        defaultCode: `// Calculate the average of three numbers
let num1 = 10;
let num2 = 20;
let num3 = 30;
let average = ; // Calculate the average here
console.log("Average:", average);`,
        expectedOutput: 'Average: 20',
        challenge: 'Calculate the average of three numbers',
      },
      {
        id: 4,
        title: 'Boolean Data Type',
        content: `
          <p>Booleans represent true or false values. They are often used in conditional statements.</p>
          <p><strong>Examples:</strong></p>
          <pre><code>let isStudent = true;
let isWorking = false;
let hasPermission = true;</code></pre>
          <p>Boolean values are commonly used with comparison operators:</p>
          <pre><code>let age = 18;
let canVote = age >= 18; // true
let isMinor = age < 18;  // false</code></pre>
        `,
        type: 'coding',
        defaultCode: `// Boolean variables
let isStudent = true;
let isWorking = false;
let age = 20;
let canDrive = age >= 16;

console.log("Is student:", isStudent);
console.log("Is working:", isWorking);
console.log("Can drive:", canDrive);`,
        expectedOutput: 'Is student: true\nIs working: false\nCan drive: true',
      },
      {
        id: 5,
        title: 'Undefined and Null',
        content: `
          <p>JavaScript has two special data types for representing "no value":</p>
          <ul>
            <li><code>undefined</code> - variable declared but not assigned a value</li>
            <li><code>null</code> - explicitly assigned "no value"</li>
          </ul>
          <p><strong>Examples:</strong></p>
          <pre><code>let notDefined;        // undefined
let emptyValue = null;  // null</code></pre>
          <p>It's important to understand the difference between these two!</p>
        `,
        type: 'coding',
        defaultCode: `// Undefined and null
let notDefined;
let emptyValue = null;

console.log("notDefined:", notDefined);
console.log("emptyValue:", emptyValue);
console.log("Type of notDefined:", typeof notDefined);
console.log("Type of emptyValue:", typeof emptyValue);`,
        expectedOutput: 'notDefined: undefined\nemptyValue: null\nType of notDefined: undefined\nType of emptyValue: object',
      },
      {
        id: 6,
        title: 'Type Checking',
        content: `
          <p>You can check the data type of a variable using the <code>typeof</code> operator.</p>
          <p><strong>Examples:</strong></p>
          <pre><code>typeof "hello"     // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (this is a known JavaScript quirk!)</code></pre>
          <p>Try checking the types of different variables!</p>
        `,
        type: 'coding',
        defaultCode: `// Type checking
let name = "JavaScript";
let version = 2024;
let isAwesome = true;
let notDefined;

console.log("Type of name:", typeof name);
console.log("Type of version:", typeof version);
console.log("Type of isAwesome:", typeof isAwesome);
console.log("Type of notDefined:", typeof notDefined);`,
        expectedOutput: 'Type of name: string\nType of version: number\nType of isAwesome: boolean\nType of notDefined: undefined',
      },
      {
        id: 7,
        title: 'Practice Exercise',
        content: `
          <p>Now let's practice what we've learned! Create variables for a person's information:</p>
          <ul>
            <li>Name (string)</li>
            <li>Age (number)</li>
            <li>Is student (boolean)</li>
            <li>Favorite programming language (string)</li>
          </ul>
          <p>Then print them all using console.log()</p>
        `,
        type: 'coding',
        defaultCode: `// Practice Exercise: Create variables for a person
// Your code here
let name = "Your Name";
let age = 25;
let isStudent = true;
let favoriteLanguage = "JavaScript";

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Favorite Language:", favoriteLanguage);`,
        expectedOutput: 'Name: Your Name\nAge: 25\nIs Student: true\nFavorite Language: JavaScript',
      },
    ],
  }

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleCodeRun = (code: string) => {
    setUserCode(code)
    
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
    setUserCode('')
  }

  const nextStep = () => {
    if (currentStep < lessonData.steps.length - 1) {
      // Auto-complete reading steps when moving to next
      if (currentStepData.type === 'reading' && !completedSteps.includes(currentStepData.id)) {
        handleStepComplete(currentStepData.id)
      }
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
                Step {currentStep + 1} of {lessonData.steps.length}
              </div>
              <button
                onClick={resetProgress}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                title="Reset lesson progress"
              >
                Reset Progress
              </button>
              <div className="flex items-center space-x-1">
                {lessonData.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    {completedSteps.includes(step.id) ? (
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
                className="text-gray-700 leading-relaxed prose prose-gray max-w-none"
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
                  onCodeChange={setUserCode}
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

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                {completedSteps.includes(currentStepData.id) && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
                
                {currentStep < lessonData.steps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Link href="/courses/javascript-fundamentals/lesson-3">
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

            {/* Key Concepts */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Key Concepts</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Variables store data values</li>
                <li>• Use <code>let</code> for changeable values</li>
                <li>• Use <code>const</code> for constants</li>
                <li>• Strings store text</li>
                <li>• Numbers store integers and decimals</li>
                <li>• Booleans store true/false</li>
                <li>• <code>typeof</code> checks data types</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-3">
                <Link 
                  href="/docs/javascript-variables"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  📚 Variables Documentation
                </Link>
                <Link 
                  href="/docs/javascript-data-types"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  📖 Data Types Guide
                </Link>
                <Link 
                  href="/practice/variables"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  🎯 Practice Exercises
                </Link>
                <Link 
                  href="/community"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  💬 Ask for Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 