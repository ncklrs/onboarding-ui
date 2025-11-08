import { useEffect } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'

export interface AutoAdvanceProps {
  enabled?: boolean
  duration?: number // milliseconds
  pauseOnHover?: boolean
  skipLastStep?: boolean
}

export function useAutoAdvance({
  enabled = false,
  duration = 5000,
  pauseOnHover = true,
  skipLastStep = true,
}: AutoAdvanceProps = {}) {
  const { nextStep, isLastStep } = useOnboarding()

  useEffect(() => {
    if (!enabled || (skipLastStep && isLastStep)) return

    let timeout: ReturnType<typeof setTimeout>
    let isPaused = false

    const advance = () => {
      if (!isPaused && !isLastStep) {
        nextStep()
      }
    }

    const handleMouseEnter = () => {
      if (pauseOnHover) {
        isPaused = true
      }
    }

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        isPaused = false
        timeout = setTimeout(advance, duration)
      }
    }

    timeout = setTimeout(advance, duration)

    if (pauseOnHover) {
      document.addEventListener('mouseenter', handleMouseEnter)
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      clearTimeout(timeout)
      if (pauseOnHover) {
        document.removeEventListener('mouseenter', handleMouseEnter)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [enabled, duration, pauseOnHover, skipLastStep, nextStep, isLastStep])
}

export function AutoAdvance(props: AutoAdvanceProps) {
  useAutoAdvance(props)
  return null
}
