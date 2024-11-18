'use client'

import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { WorkflowVisualization } from './WorkflowVisualization'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { WorkflowData } from '@/types/workflow'

export function WorkflowInput() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [workflow, setWorkflow] = useState<WorkflowData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setError(null)
    setWorkflow(null)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      
      const data = await response.json()
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate workflow')
      }
      
      setWorkflow(data.workflow)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      className="flex flex-col gap-6 sm:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col gap-2">
          <motion.div 
            className="flex items-center gap-2 text-brand-green"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-base sm:text-lg font-semibold neon-text-green">Describe your workflow</h2>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your workflow... (e.g., Every morning at 9 AM, check emails and send important ones to Slack)"
              className="w-full h-24 sm:h-32 p-3 sm:p-4 pr-12 bg-primary-bg border-2 border-gray-text/20 rounded-lg focus:border-brand-green focus:ring-1 focus:ring-brand-green text-brand-gray placeholder:text-gray-text text-sm sm:text-base resize-none transition-all duration-300"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 p-2 bg-brand-green/20 text-brand-green rounded-lg hover:bg-brand-green/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-neon-green"
            >
              {isLoading ? <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <motion.div 
            className="w-full max-w-3xl mx-auto p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p className="text-sm sm:text-base text-red-400">{error}</p>
          </motion.div>
        )}
        
        {workflow && !isLoading && (
          <WorkflowVisualization
            nodes={workflow.nodes}
            edges={workflow.edges}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}