// app/components/ToolPage.tsx
"use client";

import { useState } from 'react'

interface ToolPageProps {
  title: string;
  description: string;
  tool: 'frame-mail' | 'sheet-formula' | 'reframe-sentence' | 'offer-maker';
  inputLabel: string;
}

export default function ToolPage({ title, description, tool, inputLabel }: ToolPageProps) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, tool }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        throw new Error(data.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again.');
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-300">{title}</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
        <form onSubmit={handleSubmit} className="mb-8">
          <label htmlFor="prompt" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">{inputLabel}</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={4}
            placeholder="Enter your text here..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            {isLoading ? 'Processing...' : 'Generate'}
          </button>
        </form>
        {result && (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">Result:</h2>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
