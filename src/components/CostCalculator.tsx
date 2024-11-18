'use client'

import { useState } from 'react'
import { DollarSign, Calculator } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { WorkflowNode } from '@/types/workflow'

interface CostCalculatorProps {
  nodes: WorkflowNode[]
}

interface CostBreakdown {
  implementation: number
  monthly: number
  yearly: number
}

export function CostCalculator({ nodes }: CostCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const calculateCosts = (): CostBreakdown => {
    const baseImplementationCost = 500
    const baseMonthlyMaintenance = 50
    
    const costs = nodes.reduce((acc, node) => {
      const complexity = {
        trigger: 1.2,
        action: 1,
        filter: 0.8,
        loop: 1.5,
        condition: 1.3
      }[node.type]

      acc.implementation += baseImplementationCost * complexity
      acc.monthly += baseMonthlyMaintenance * complexity
      return acc
    }, { implementation: 0, monthly: 0, yearly: 0 })

    costs.yearly = costs.monthly * 12

    return {
      implementation: Math.round(costs.implementation),
      monthly: Math.round(costs.monthly),
      yearly: Math.round(costs.yearly)
    }
  }

  const costs = calculateCosts()

  return (
    <div className="relative w-full sm:w-auto">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-lg hover:bg-brand-blue/30 transition-all duration-300 hover:shadow-neon-blue"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Cost Analysis</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 sm:right-auto mt-2 w-full sm:w-72 bg-primary-bg border-2 border-brand-blue/20 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4">
              <h3 className="text-brand-blue font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Cost Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-text text-sm">Implementation</span>
                  <span className="text-brand-gray font-medium text-sm">
                    ${costs.implementation.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-text text-sm">Monthly Maintenance</span>
                  <span className="text-brand-gray font-medium text-sm">
                    ${costs.monthly.toLocaleString()}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-text/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-text text-sm">Yearly Maintenance</span>
                    <span className="text-brand-blue font-semibold neon-text-blue text-sm">
                      ${costs.yearly.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-xs text-gray-text">
                *Costs are estimated based on workflow complexity and number of nodes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}