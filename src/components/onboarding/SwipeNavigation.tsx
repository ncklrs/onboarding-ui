import { useEffect, useRef } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'

export interface SwipeNavigationProps {
  enabled?: boolean
  threshold?: number
  preventScroll?: boolean
}

export function useSwipeNavigation({
  enabled = true,
  threshold = 50,
  preventScroll = false,
}: SwipeNavigationProps = {}) {
  const { nextStep, previousStep, isFirstStep, isLastStep } = useOnboarding()
  const touchStart = useRef({ x: 0, y: 0 })
  const touchEnd = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }

      if (preventScroll) {
        const deltaX = Math.abs(touchEnd.current.x - touchStart.current.x)
        const deltaY = Math.abs(touchEnd.current.y - touchStart.current.y)

        // Prevent scroll if horizontal swipe
        if (deltaX > deltaY) {
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = () => {
      const deltaX = touchEnd.current.x - touchStart.current.x
      const deltaY = Math.abs(touchEnd.current.y - touchStart.current.y)

      // Only trigger if horizontal swipe is larger than vertical
      if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && !isFirstStep) {
          // Swipe right - previous
          previousStep()
        } else if (deltaX < 0 && !isLastStep) {
          // Swipe left - next
          nextStep()
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, threshold, preventScroll, nextStep, previousStep, isFirstStep, isLastStep])
}

export function SwipeNavigation(props: SwipeNavigationProps) {
  useSwipeNavigation(props)
  return null
}
