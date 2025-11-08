import { useState, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

export interface HotspotStep {
  target: string | HTMLElement // CSS selector or element
  title: string
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  offset?: number
  spotlight?: boolean
  action?: ReactNode
}

export interface HotspotTourProps {
  steps: HotspotStep[]
  currentStep?: number
  onStepChange?: (step: number) => void
  onComplete?: () => void
  showOverlay?: boolean
  highlightPadding?: number
  className?: string
}

export function HotspotTour({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  showOverlay = true,
  highlightPadding = 8,
  className,
}: HotspotTourProps) {
  const [internalStep, setInternalStep] = useState(0)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const currentStep = controlledStep ?? internalStep
  const step = steps[currentStep]

  useEffect(() => {
    if (!step) return

    const updatePosition = () => {
      const target =
        typeof step.target === 'string'
          ? document.querySelector(step.target)
          : step.target

      if (!target || !tooltipRef.current) return

      const rect = (target as HTMLElement).getBoundingClientRect()
      setTargetRect(rect)

      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const placement = step.placement || 'auto'
      const offset = step.offset || 16

      let top = 0
      let left = 0

      // Calculate position based on placement
      switch (placement) {
        case 'top':
          top = rect.top - tooltipRect.height - offset
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          top = rect.bottom + offset
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.left - tooltipRect.width - offset
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.right + offset
          break
        case 'auto':
          // Smart positioning
          const spaceBelow = window.innerHeight - rect.bottom
          const spaceAbove = rect.top
          if (spaceBelow > tooltipRect.height + offset) {
            top = rect.bottom + offset
          } else if (spaceAbove > tooltipRect.height + offset) {
            top = rect.top - tooltipRect.height - offset
          } else {
            top = rect.top + rect.height / 2 - tooltipRect.height / 2
          }
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
      }

      // Keep within viewport
      if (left < 10) left = 10
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10
      }
      if (top < 10) top = 10
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipRect.height - 10
      }

      setTooltipPosition({ top, left })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [step, currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setInternalStep(nextStep)
      onStepChange?.(nextStep)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setInternalStep(prevStep)
      onStepChange?.(prevStep)
    }
  }

  const handleSkip = () => {
    onComplete?.()
  }

  if (!step) return null

  return createPortal(
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className="pointer-events-none fixed inset-0 z-[9998] bg-black/50 transition-opacity"
          style={{ opacity: 1 }}
        />
      )}

      {/* Spotlight */}
      {step.spotlight && targetRect && (
        <div
          className="pointer-events-none fixed z-[9999] rounded-lg ring-4 ring-white/50"
          style={{
            top: targetRect.top - highlightPadding,
            left: targetRect.left - highlightPadding,
            width: targetRect.width + highlightPadding * 2,
            height: targetRect.height + highlightPadding * 2,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={cn(
          'fixed z-[10000] w-80 max-w-[calc(100vw-20px)] rounded-lg bg-background p-6 shadow-2xl',
          className
        )}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <button
          onClick={handleSkip}
          className="absolute right-2 top-2 rounded-md p-1 hover:bg-secondary"
          aria-label="Close tour"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <div className="mt-2 text-sm text-muted-foreground">{step.content}</div>
        </div>

        {step.action && <div className="mb-4">{step.action}</div>}

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                Back
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex justify-center gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all',
                index === currentStep
                  ? 'w-6 bg-primary'
                  : index < currentStep
                  ? 'bg-primary/60'
                  : 'bg-muted'
              )}
            />
          ))}
        </div>
      </div>
    </>,
    document.body
  )
}
