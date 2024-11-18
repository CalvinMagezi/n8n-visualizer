'use client'

import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <motion.div 
      className="flex items-center justify-center w-full py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
        <p className="text-sm text-gray-text">Generating your workflow...</p>
      </div>
    </motion.div>
  )
}