import { useEffect } from 'react'
import { useOnboardingContext } from '../context/OnboardingContext'
import { OnboardingEventType, type OnboardingEventData } from '../lib/events'

/**
 * Hook to listen to onboarding events
 * Must be used within OnboardingProvider
 */
export function useOnboardingEvents(
  eventType: OnboardingEventType | 'all',
  callback: (event: OnboardingEventData) => void
) {
  const { addEventListener } = useOnboardingContext()

  useEffect(() => {
    const unsubscribe = addEventListener(eventType, callback)
    return unsubscribe
  }, [eventType, callback, addEventListener])
}

/**
 * Hook to listen to multiple event types
 */
export function useOnboardingMultiEvents(
  eventTypes: (OnboardingEventType | 'all')[],
  callback: (event: OnboardingEventData) => void
) {
  const { addEventListener } = useOnboardingContext()

  useEffect(() => {
    const unsubscribes = eventTypes.map(type => addEventListener(type, callback))
    return () => {
      unsubscribes.forEach(unsub => unsub())
    }
  }, [eventTypes, callback, addEventListener])
}

/**
 * Convenience hooks for specific events
 */
export function useOnStepEnter(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.STEP_ENTER, callback)
}

export function useOnStepExit(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.STEP_EXIT, callback)
}

export function useOnStepComplete(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.STEP_COMPLETE, callback)
}

export function useOnStepSkip(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.STEP_SKIP, callback)
}

export function useOnDataCollect(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.DATA_COLLECT, callback)
}

export function useOnOnboardingComplete(callback: (event: OnboardingEventData) => void) {
  useOnboardingEvents(OnboardingEventType.ONBOARDING_COMPLETE, callback)
}
