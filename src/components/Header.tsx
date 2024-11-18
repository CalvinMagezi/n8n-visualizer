'use client'

import { Bot, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-primary-bg border-b border-gray-text/10 py-4 sm:py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-2 rounded-lg bg-brand-green/10 border border-brand-green/20">
              <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold neon-text-green">AI Workflow Visualizer</h1>
              <p className="text-sm text-gray-text">Transform text into actionable automation diagrams</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium neon-text-blue">AI-Powered</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}