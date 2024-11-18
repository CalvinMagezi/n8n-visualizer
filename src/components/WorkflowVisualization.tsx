'use client'

import { useRef } from 'react'
import { Circle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { WorkflowData } from '@/types/workflow'
import { ExportButton } from './ExportButton'
import { CostCalculator } from './CostCalculator'

interface WorkflowVisualizationProps extends WorkflowData {}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function WorkflowVisualization({ nodes, edges }: WorkflowVisualizationProps) {
  const workflowRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <CostCalculator nodes={nodes} />
        <ExportButton workflowRef={workflowRef} />
      </div>
      
      <motion.div 
        ref={workflowRef}
        className="w-full max-w-4xl mx-auto bg-primary-bg border-2 border-brand-green/20 rounded-lg p-4 sm:p-6 overflow-x-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-start sm:items-center justify-start sm:justify-center min-w-[320px]">
          {nodes.map((node, index) => (
            <motion.div 
              key={node.id} 
              className="relative workflow-node w-full sm:w-auto"
              variants={item}
            >
              <div className="flex items-center sm:flex-col gap-4 sm:gap-0">
                <motion.div 
                  className="w-full sm:w-48 p-4 bg-primary-bg border-2 border-brand-blue/20 rounded-lg hover:shadow-neon-blue transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-medium neon-text-blue">{node.type}</span>
                  </div>
                  <p className="text-sm text-brand-gray">{node.label}</p>
                  {node.description && (
                    <p className="mt-2 text-xs text-gray-text">{node.description}</p>
                  )}
                </motion.div>
                {index < nodes.length - 1 && (
                  <motion.div 
                    className="sm:absolute sm:-right-6 sm:top-1/2 sm:transform sm:-translate-y-1/2 rotate-90 sm:rotate-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 * (index + 1) }}
                  >
                    <ArrowRight className="w-4 h-4 text-brand-green" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}