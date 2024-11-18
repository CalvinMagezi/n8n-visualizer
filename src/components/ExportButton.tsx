'use client'

import { useState, useCallback } from 'react'
import { Download, Image, FileDown, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'

interface ExportButtonProps {
  workflowRef: React.RefObject<HTMLDivElement>
}

export function ExportButton({ workflowRef }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const exportWorkflow = useCallback(async (format: 'png' | 'pdf') => {
    if (!workflowRef.current) return
    
    try {
      setIsExporting(true)
      const dataUrl = await htmlToImage.toPng(workflowRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#131619'
      })

      if (format === 'png') {
        const link = document.createElement('a')
        link.download = 'workflow.png'
        link.href = dataUrl
        link.click()
      } else {
        const img = new Image()
        img.src = dataUrl
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [img.width, img.height]
          })
          
          pdf.addImage(
            dataUrl,
            'PNG',
            0,
            0,
            img.width,
            img.height,
            undefined,
            'FAST'
          )
          
          pdf.save('workflow.pdf')
        }
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
      setIsOpen(false)
    }
  }, [workflowRef])

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-brand-green/20 text-brand-green rounded-lg hover:bg-brand-green/30 transition-all duration-300 hover:shadow-neon-green"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Export</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-primary-bg border-2 border-brand-green/20 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button
              onClick={() => exportWorkflow('png')}
              disabled={isExporting}
              className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-brand-green/10 text-brand-gray disabled:opacity-50 text-sm sm:text-base"
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              Export as PNG
            </button>
            <button
              onClick={() => exportWorkflow('pdf')}
              disabled={isExporting}
              className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-brand-green/10 text-brand-gray disabled:opacity-50 text-sm sm:text-base"
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              Export as PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}