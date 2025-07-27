'use client'

import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Button } from './ui/Button'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  isCorrect: boolean
  userOutput: string
  expectedOutput: string
  challenge: string
}

export default function FeedbackModal({
  isOpen,
  onClose,
  isCorrect,
  userOutput,
  expectedOutput,
  challenge
}: FeedbackModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {isCorrect ? (
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isCorrect ? 'Excellent! 🎉' : 'Keep Trying!'}
              </h3>
              <p className="text-sm text-gray-600">
                {isCorrect ? 'Challenge completed successfully' : 'Your code needs some adjustments'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isCorrect ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Challenge Solved!</h4>
                <p className="text-gray-600">Your code produced the correct output.</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Correct Output</span>
                </div>
                <pre className="text-sm text-green-700 bg-white p-3 rounded-lg border border-green-200 font-mono">
                  {userOutput}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-3">💪</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Almost There!</h4>
                <p className="text-gray-600">Check your output against the expected result.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Your Output</span>
                  </div>
                  <pre className="text-sm text-red-700 bg-white p-3 rounded-lg border border-red-200 font-mono">
                    {userOutput}
                  </pre>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Expected Output</span>
                  </div>
                  <pre className="text-sm text-green-700 bg-white p-3 rounded-lg border border-green-200 font-mono">
                    {expectedOutput}
                  </pre>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start space-x-2">
                  <div className="text-blue-600 mt-0.5">💡</div>
                  <div>
                    <h5 className="text-sm font-medium text-blue-900 mb-1">Tips:</h5>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Check for exact spelling and punctuation</li>
                      <li>• Verify there are no extra spaces</li>
                      <li>• Ensure correct case (uppercase/lowercase)</li>
                      <li>• Use the exact quotes required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          {isCorrect ? (
            <Button 
              onClick={onClose} 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              Continue
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button 
                onClick={onClose} 
                variant="outline"
                className="px-6 py-2"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 