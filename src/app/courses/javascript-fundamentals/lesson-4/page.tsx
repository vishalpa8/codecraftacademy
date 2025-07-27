'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BookOpen, Code, Target } from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/Button'
import { handleChallengeExecution } from '@/lib/lessonUtils'

export default function ControlFlowLessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [userCode, setUserCode] = useState('')

  const lessonData = {
    title: 'Control Flow: Conditionals',
    description: 'Learn how to make decisions in your code using if statements, else clauses, and switch statements',
    steps: [
      {
        id: 1,
        title: 'What is Control Flow?',
        content: `
          <p>Control flow determines the order in which your code executes. It allows your program to make decisions and execute different code based on conditions.</p>
          <p>In JavaScript, you can control the flow of your program using:</p>
          <ul>
            <li><strong>if statements</strong> - execute code if a condition is true</li>
            <li><strong>else clauses</strong> - execute code if the condition is false</li>
            <li><strong>else if clauses</strong> - check additional conditions</li>
            <li><strong>switch statements</strong> - execute different code for different values</li>
          </ul>
          <p>Let's explore each of these in detail!</p>
        `,
        type: 'reading',
      },
      {
        id: 2,
        title: 'If Statements',
        content: `
          <p>The <code>if</code> statement executes a block of code only if a specified condition is true.</p>
          <p><strong>Syntax:</strong></p>
          <pre><code>if (condition) {
  // code to execute if condition is true
}</code></pre>
          <p><strong>Example:</strong></p>
          <pre><code>let age = 18;

if (age >= 18) {
  console.log("You are an adult");
}</code></pre>
          <p>The condition must evaluate to a boolean value (true or false). If the condition is true, the code inside the curly braces will execute.</p>
        `,
        type: 'coding',
        defaultCode: `// If statements
let temperature = 25;
let isRaining = false;

if (temperature > 20) {
  console.log("It's warm outside");
}

if (isRaining) {
  console.log("Don't forget your umbrella");
}

// Using variables in conditions
let score = 85;
if (score >= 80) {
  console.log("Great job! You passed!");
}`,
        expectedOutput: "It's warm outside\nGreat job! You passed!",
      },
      {
        id: 3,
        title: 'Else Clauses',
        content: `
          <p>The <code>else</code> clause executes code when the <code>if</code> condition is false.</p>
          <p><strong>Syntax:</strong></p>
          <pre><code>if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}</code></pre>
          <p><strong>Example:</strong></p>
          <pre><code>let age = 16;

if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("You cannot vote yet");
}</code></pre>
          <p>This creates a binary decision - either the condition is true (execute if block) or false (execute else block).</p>
        `,
        type: 'coding',
        defaultCode: `// If-else statements
let age = 16;
let score = 75;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}

if (score >= 80) {
  console.log("Excellent!");
} else {
  console.log("Keep practicing!");
}

// Multiple conditions
let time = 14; // 2 PM

if (time < 12) {
  console.log("Good morning!");
} else {
  console.log("Good afternoon!");
}`,
        expectedOutput: 'You are a minor\nKeep practicing!\nGood afternoon!',
      },
      {
        id: 4,
        title: 'Else If Clauses',
        content: `
          <p>The <code>else if</code> clause allows you to check multiple conditions in sequence.</p>
          <p><strong>Syntax:</strong></p>
          <pre><code>if (condition1) {
  // code if condition1 is true
} else if (condition2) {
  // code if condition2 is true
} else if (condition3) {
  // code if condition3 is true
} else {
  // code if all conditions are false
}</code></pre>
          <p><strong>Example:</strong></p>
          <pre><code>let grade = 85;

if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else {
  console.log("F");
}</code></pre>
          <p>Only the first true condition will execute. Once a condition is true, the rest are skipped.</p>
        `,
        type: 'coding',
        defaultCode: `// Else if statements
let grade = 85;
let temperature = 15;
let time = 22; // 10 PM

// Grade checking
if (grade >= 90) {
  console.log("Grade: A");
} else if (grade >= 80) {
  console.log("Grade: B");
} else if (grade >= 70) {
  console.log("Grade: C");
} else if (grade >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// Temperature checking
if (temperature > 30) {
  console.log("It's hot!");
} else if (temperature > 20) {
  console.log("It's warm");
} else if (temperature > 10) {
  console.log("It's cool");
} else {
  console.log("It's cold!");
}

// Time of day
if (time < 12) {
  console.log("Good morning!");
} else if (time < 18) {
  console.log("Good afternoon!");
} else if (time < 22) {
  console.log("Good evening!");
} else {
  console.log("Good night!");
}`,
        expectedOutput: 'Grade: B\nIt\'s cool\nGood night!',
      },
      {
        id: 5,
        title: 'Switch Statements',
        content: `
          <p>Switch statements provide an alternative to multiple <code>else if</code> statements when comparing a single value against multiple options.</p>
          <p><strong>Syntax:</strong></p>
          <pre><code>switch (expression) {
  case value1:
    // code to execute
    break;
  case value2:
    // code to execute
    break;
  default:
    // code to execute if no case matches
}</code></pre>
          <p><strong>Example:</strong></p>
          <pre><code>let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Weekend is coming!");
    break;
  default:
    console.log("Regular day");
}</code></pre>
          <p><strong>Important:</strong> Don't forget the <code>break</code> statement, or execution will "fall through" to the next case!</p>
        `,
        type: 'coding',
        defaultCode: `// Switch statements
let day = "Wednesday";
let month = 3;

// Day of week
switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Middle of the week");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// Month names
switch (month) {
  case 1:
    console.log("January");
    break;
  case 2:
    console.log("February");
    break;
  case 3:
    console.log("March");
    break;
  case 4:
    console.log("April");
    break;
  case 5:
    console.log("May");
    break;
  case 6:
    console.log("June");
    break;
  default:
    console.log("Other month");
}`,
        expectedOutput: 'Middle of the week\nMarch',
      },
      {
        id: 6,
        title: 'Logical Operators in Conditions',
        content: `
          <p>You can combine multiple conditions using logical operators (<code>&&</code>, <code>||</code>, <code>!</code>).</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li><code>&&</code> (AND) - both conditions must be true</li>
            <li><code>||</code> (OR) - at least one condition must be true</li>
            <li><code>!</code> (NOT) - inverts the condition</li>
          </ul>
          <p>This allows you to create more complex decision-making logic.</p>
        `,
        type: 'coding',
        defaultCode: `// Logical operators in conditions
let age = 25;
let hasLicense = true;
let hasCar = false;
let isStudent = true;
let isWorking = false;

// AND operator
if (age >= 18 && hasLicense) {
  console.log("You can drive legally");
} else {
  console.log("You cannot drive legally");
}

// OR operator
if (isStudent || isWorking) {
  console.log("You are either a student or working");
}

// NOT operator
if (!hasCar) {
  console.log("You don't have a car");
}

// Complex conditions
if (age >= 18 && hasLicense && hasCar) {
  console.log("You can drive your own car");
} else if (age >= 18 && hasLicense && !hasCar) {
  console.log("You can drive but need to borrow a car");
} else {
  console.log("You cannot drive");
}

// Multiple conditions with parentheses
let temperature = 25;
let isRaining = false;
let isWeekend = true;

if ((temperature > 20 && !isRaining) || isWeekend) {
  console.log("Good day for outdoor activities");
} else {
  console.log("Stay indoors");
}`,
        expectedOutput: 'You can drive legally\nYou are either a student or working\nYou don\'t have a car\nYou can drive but need to borrow a car\nGood day for outdoor activities',
      },
      {
        id: 7,
        title: 'Practice Exercise',
        content: `
          <p>Now let's practice creating a grading system! Create a program that:</p>
          <ol>
            <li>Takes a student's score (0-100)</li>
            <li>Assigns a letter grade (A, B, C, D, F)</li>
            <li>Provides feedback based on the grade</li>
            <li>Uses both if-else and switch statements</li>
          </ol>
          <p>Make it comprehensive and user-friendly!</p>
        `,
        type: 'coding',
        defaultCode: `// Practice Exercise: Grading System
let score = 87;
let letterGrade = "";

// Determine letter grade using if-else
if (score >= 90) {
  letterGrade = "A";
} else if (score >= 80) {
  letterGrade = "B";
} else if (score >= 70) {
  letterGrade = "C";
} else if (score >= 60) {
  letterGrade = "D";
} else {
  letterGrade = "F";
}

console.log("Score:", score);
console.log("Letter Grade:", letterGrade);

// Provide feedback using switch
switch (letterGrade) {
  case "A":
    console.log("Excellent! Outstanding performance!");
    break;
  case "B":
    console.log("Good job! Keep up the good work!");
    break;
  case "C":
    console.log("Satisfactory. Room for improvement.");
    break;
  case "D":
    console.log("Needs improvement. Consider extra help.");
    break;
  case "F":
    console.log("Failed. Please retake the course.");
    break;
  default:
    console.log("Invalid grade");
}

// Additional feedback based on score range
if (score >= 95) {
  console.log("🌟 Exceptional achievement!");
} else if (score >= 85) {
  console.log("👍 Strong performance!");
} else if (score >= 75) {
  console.log("✅ Meets expectations");
} else if (score >= 65) {
  console.log("⚠️ Below expectations");
} else {
  console.log("❌ Significant improvement needed");
}`,
        expectedOutput: 'Score: 87\nLetter Grade: B\nGood job! Keep up the good work!\n👍 Strong performance!',
      },
    ],
  }

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isChallengeSolved, setIsChallengeSolved] = useState(false)

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
                
                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    {completedSteps.includes(currentStepData.id) 
                      ? "✅ Step reached!" 
                      : "Run your code to mark this step as reached"
                    }
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
                  <Link href="/courses/javascript-fundamentals/lesson-5">
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
                <li>• if statements execute code conditionally</li>
                <li>• else provides alternative execution</li>
                <li>• else if checks multiple conditions</li>
                <li>• switch statements for value comparison</li>
                <li>• Use break in switch statements</li>
                <li>• Logical operators combine conditions</li>
                <li>• Conditions must evaluate to boolean</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-3">
                <Link 
                  href="/docs/javascript-conditionals"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  📚 Conditionals Documentation
                </Link>
                <Link 
                  href="/docs/javascript-control-flow"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  📖 Control Flow Guide
                </Link>
                <Link 
                  href="/practice/conditionals"
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