import { useState, useCallback, useEffect } from 'react'

export interface LessonStep {
  id: number
  title: string
  content: string
  type: 'reading' | 'coding'
  defaultCode?: string
  expectedOutput?: string
  challenge?: string
}

export interface LessonData {
  title: string
  description: string
  steps: LessonStep[]
}

export interface LessonState {
  currentStep: number
  completedSteps: number[]
  userCode: string
  codeOutput: string
  isChallengeSolved: boolean
  showFeedbackModal: boolean
}

export interface LessonActions {
  handleStepComplete: (stepId: number) => void
  handleCodeRun: (code: string) => void
  resetProgress: () => void
  nextStep: () => void
  prevStep: () => void
  setCurrentStep: (step: number) => void
  setUserCode: (code: string) => void
  setCodeOutput: (output: string) => void
  setIsChallengeSolved: (solved: boolean) => void
  setShowFeedbackModal: (show: boolean) => void
  handleModalClose: () => void
}

export interface ChallengeResult {
  isCorrect: boolean
  userOutput: string
  expectedOutput: string
  userLines: string[]
  expectedLines: string[]
  debug: {
    rawUserOutput: string
    rawExpectedOutput: string
    cleanedUserOutput: string
    cleanedExpectedOutput: string
    lineCountMatch: boolean
    lineComparison: Array<{ userLine: string; expectedLine: string; matches: boolean }>
  }
}

/**
 * Validates if user code output matches expected output
 * Handles line-by-line comparison with comprehensive logging
 */
function validateChallengeOutput(
  userOutput: string,
  expectedOutput: string
): ChallengeResult {
  // Clean and normalize outputs
  const cleanUserOutput = userOutput.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const cleanExpectedOutput = expectedOutput.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  
  // Split by lines and filter empty lines
  const userLines = cleanUserOutput.split('\n').map(line => line.trim()).filter(line => line)
  const expectedLines = cleanExpectedOutput.split('\n').map(line => line.trim()).filter(line => line)
  
  // Compare line counts
  const lineCountMatch = userLines.length === expectedLines.length
  
  // Compare each line
  const lineComparison = userLines.map((userLine, index) => {
    const expectedLine = expectedLines[index] || ''
    return {
      userLine,
      expectedLine,
      matches: userLine === expectedLine
    }
  })
  
  // Check if all lines match
  const isCorrect = lineCountMatch && lineComparison.every(comparison => comparison.matches)
  
  // Create debug information
  const debug = {
    rawUserOutput: userOutput,
    rawExpectedOutput: expectedOutput,
    cleanedUserOutput: cleanUserOutput,
    cleanedExpectedOutput: cleanExpectedOutput,
    lineCountMatch,
    lineComparison
  }
  

  
  return {
    isCorrect,
    userOutput: cleanUserOutput,
    expectedOutput: cleanExpectedOutput,
    userLines,
    expectedLines,
    debug
  }
}

/**
 * Executes JavaScript code and captures console.log output
 */
function executeCode(code: string): string {
  let output = ''
  
  // Override console.log to capture output
  const originalLog = console.log
  console.log = (...args) => {
    output += args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ') + '\n'
    originalLog.apply(console, args)
  }
  
  try {
    // Execute the code
    eval(code)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    output += `Error: ${errorMessage}\n`
  } finally {
    // Restore original console.log
    console.log = originalLog
  }
  
  return output
}

  /**
   * Handles the complete challenge execution and validation flow
   */
  export function handleChallengeExecution(
    code: string,
    expectedOutput: string
  ): ChallengeResult {
    // Execute the code
    const userOutput = executeCode(code)

    // Validate the output
    const result = validateChallengeOutput(userOutput, expectedOutput)

    return result
  }

/**
 * Comprehensive lesson management utility hook
 * Consolidates ALL reusable methods from lesson files
 */
export function useLessonManager(lessonData: LessonData) {
  // State management with progress saving
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lesson-current-step')
      return saved ? parseInt(saved) : 0
    }
    return 0
  })
  
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lesson-completed-steps')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  const [userCode, setUserCode] = useState('')
  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isChallengeSolved, setIsChallengeSolved] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  // Get current step data
  const currentStepData = lessonData.steps[currentStep]

  // Enhanced step completion with progress saving
  const handleStepComplete = useCallback((stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      const newCompletedSteps = [...completedSteps, stepId]
      setCompletedSteps(newCompletedSteps)
      // Save progress
      if (typeof window !== 'undefined') {
        localStorage.setItem('lesson-completed-steps', JSON.stringify(newCompletedSteps))
      }
    }
  }, [completedSteps])
  


  // Enhanced code execution with modal feedback
  const handleCodeRun = useCallback((code: string) => {
    setUserCode(code)
    
    const expected = currentStepData.expectedOutput
    
    if (expected) {
      // Use centralized challenge execution utility
      const result = handleChallengeExecution(code, expected)
      
      setCodeOutput(result.userOutput)
      setIsChallengeSolved(result.isCorrect)
      
      // Show modal for both success and wrong answers
      setShowFeedbackModal(true)
      
      // Mark as completed if correct
      if (result.isCorrect && !completedSteps.includes(currentStepData.id)) {
        handleStepComplete(currentStepData.id)
      }
    }
  }, [currentStepData, completedSteps, handleStepComplete])

  // Enhanced progress reset with logging
  const resetProgress = useCallback(() => {
    setCurrentStep(0)
    setCompletedSteps([])
    setUserCode('')
    setCodeOutput('')
    setIsChallengeSolved(false)
    setShowFeedbackModal(false)
    
    // Clear saved progress
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lesson-current-step')
      localStorage.removeItem('lesson-completed-steps')
    }
  }, [])

  // Enhanced navigation with auto-completion
  const nextStep = useCallback(() => {
    if (currentStep < lessonData.steps.length - 1) {
      // Check if current step is completed before allowing next
      const currentStepId = currentStepData.id
      if (!completedSteps.includes(currentStepId)) {
        // For reading steps, mark as completed when user clicks Next
        if (currentStepData.type === 'reading') {
          handleStepComplete(currentStepId)
        } else {
          // For coding steps, require challenge completion
          return
        }
      }
      
      const nextStepIndex = currentStep + 1
      setCurrentStep(nextStepIndex)
      
      // Save current step progress
      if (typeof window !== 'undefined') {
        localStorage.setItem('lesson-current-step', nextStepIndex.toString())
      }
      
      // Reset editor state for new step
      setUserCode('')
      setCodeOutput('')
      setIsChallengeSolved(false)
      setShowFeedbackModal(false)
    }
  }, [currentStep, lessonData.steps.length, currentStepData, completedSteps, handleStepComplete])

  // Enhanced previous step navigation
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1
      setCurrentStep(prevStepIndex)
      
      // Reset editor state for new step
      setUserCode('')
      setCodeOutput('')
      setIsChallengeSolved(false)
      setShowFeedbackModal(false)
    }
  }, [currentStep])

  // Progress calculation
  const progress = Math.round((completedSteps.length / lessonData.steps.length) * 100)

  // Step status helpers
  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId)
  
  // Check if step can be accessed (all previous steps completed)
  const canAccessStep = (stepIndex: number) => {
    // First step is always accessible
    if (stepIndex === 0) return true
    
    // For other steps, check if all previous steps are completed
    for (let i = 0; i < stepIndex; i++) {
      const stepId = lessonData.steps[i].id
      if (!completedSteps.includes(stepId)) {
        return false
      }
    }
    return true
  }

  // Challenge status helpers
  const getChallengeStatus = () => {
    if (isChallengeSolved) {
      return { status: 'solved', message: '✅ Challenge solved!', color: 'green' }
    } else if (codeOutput) {
      return { status: 'attempted', message: '⚠️ Almost there! Check your output carefully', color: 'amber' }
    } else {
      return { status: 'not-attempted', message: 'Run your code to test the challenge', color: 'gray' }
    }
  }

  // Export state and actions
  const state: LessonState = {
    currentStep,
    completedSteps,
    userCode,
    codeOutput,
    isChallengeSolved,
    showFeedbackModal
  }

  // Handle modal close with auto-advance
  const handleModalClose = useCallback(() => {
    setShowFeedbackModal(false)
    // Auto-advance to next step only if challenge was solved
    if (isChallengeSolved && currentStep < lessonData.steps.length - 1) {
      nextStep()
    }
  }, [isChallengeSolved, currentStep, lessonData.steps.length, nextStep])

  // Enhanced setCurrentStep with progress saving and editor reset
  const setCurrentStepWithSave = useCallback((step: number) => {
    setCurrentStep(step)
    // Save current step progress
    if (typeof window !== 'undefined') {
      localStorage.setItem('lesson-current-step', step.toString())
    }
    
    // Reset editor state for new step
    setUserCode('')
    setCodeOutput('')
    setIsChallengeSolved(false)
    setShowFeedbackModal(false)
  }, [])

  const actions: LessonActions = {
    handleStepComplete,
    handleCodeRun,
    resetProgress,
    nextStep,
    prevStep,
    setCurrentStep: setCurrentStepWithSave,
    setUserCode,
    setCodeOutput,
    setIsChallengeSolved,
    setShowFeedbackModal,
    handleModalClose
  }

  return {
    state,
    actions,
    currentStepData,
    progress,
    isStepCompleted,
    canAccessStep,
    getChallengeStatus,
    lessonData
  }
}

 