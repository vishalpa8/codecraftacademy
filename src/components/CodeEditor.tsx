'use client'

import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Download, Copy, Check } from 'lucide-react'
import { Button } from './ui/Button'

interface CodeEditorProps {
  language?: string
  defaultValue?: string
  theme?: 'vs-dark' | 'light'
  height?: string
  onCodeChange?: (value: string) => void
  onRun?: (code: string) => void
  readOnly?: boolean
}

export default function CodeEditor({
  language = 'javascript',
  defaultValue = '// Write your code here\nconsole.log("Hello, World!");',
  theme = 'vs-dark',
  height = '400px',
  onCodeChange,
  onRun,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  // Reset editor when defaultValue changes (new step)
  useEffect(() => {
    setCode(defaultValue)
    setOutput('')
    if (editorRef.current) {
      editorRef.current.setValue(defaultValue)
    }
  }, [defaultValue])

  const handleCodeChange = (value: string = '') => {
    setCode(value)
    onCodeChange?.(value)
  }

  const runCode = async () => {
    if (!code.trim()) return

    setIsRunning(true)
    setOutput('')

    try {
      // If onRun callback is provided, use it for all languages
      if (onRun) {
        onRun(code)
      } else {
        // Fallback to internal execution if no onRun callback provided
        if (language === 'javascript') {
          const originalConsoleLog = console.log
          const logs: string[] = []

          // Override console.log to capture output
          console.log = (...args: any[]) => {
            logs.push(args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '))
          }

          // Execute the code
          eval(code)

          // Restore console.log
          console.log = originalConsoleLog

          setOutput(logs.join('\n'))
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(defaultValue)
    setOutput('')
    if (editorRef.current) {
      editorRef.current.setValue(defaultValue)
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language === 'javascript' ? 'js' : language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">
            {language.toUpperCase()}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            className="text-gray-400 hover:text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="text-gray-400 hover:text-white"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCode}
            className="text-gray-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning || readOnly}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <Editor
          height={height}
          language={language}
          theme={theme}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: readOnly,
            automaticLayout: true,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            wordBasedSuggestions: true,
          }}
        />
      </div>

      {/* Output Panel */}
      {output && (
        <div className="border-t border-gray-700">
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-300">Output</span>
          </div>
          <div className="p-4 bg-gray-900">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
} 