import { useEffect } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'

export interface KeyboardNavigationProps {
  enabled?: boolean
  allowNext?: boolean
  allowPrevious?: boolean
  allowSkip?: boolean
  nextKeys?: string[]
  previousKeys?: string[]
  skipKeys?: string[]
}

export function useKeyboardNavigation({
  enabled = true,
  allowNext = true,
  allowPrevious = true,
  allowSkip = true,
  nextKeys = ['ArrowRight', 'Enter', ' '],
  previousKeys = ['ArrowLeft'],
  skipKeys = ['Escape'],
}: KeyboardNavigationProps = {}) {
  const { nextStep, previousStep, skipStep, isFirstStep, isLastStep } = useOnboarding()

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere with input fields
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      if (allowNext && nextKeys.includes(event.key) && !isLastStep) {
        event.preventDefault()
        nextStep()
      } else if (allowPrevious && previousKeys.includes(event.key) && !isFirstStep) {
        event.preventDefault()
        previousStep()
      } else if (allowSkip && skipKeys.includes(event.key)) {
        event.preventDefault()
        skipStep()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    enabled,
    allowNext,
    allowPrevious,
    allowSkip,
    nextKeys,
    previousKeys,
    skipKeys,
    nextStep,
    previousStep,
    skipStep,
    isFirstStep,
    isLastStep,
  ])
}

export function KeyboardNavigation(props: KeyboardNavigationProps) {
  useKeyboardNavigation(props)
  return null
}
