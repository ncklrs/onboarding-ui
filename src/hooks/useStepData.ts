import { useCallback } from 'react'
import { useOnboardingContext } from '../context/OnboardingContext'

/**
 * Hook to manage data for a specific step
 * Must be used within OnboardingProvider
 */
export function useStepData<T = Record<string, unknown>>(stepId: string) {
  const { getStepData, setStepData, markStepComplete } = useOnboardingContext()

  const data = getStepData(stepId)?.data as T | undefined

  const updateData = useCallback((newData: Partial<T> | ((prev: T | undefined) => T)) => {
    const currentData = getStepData(stepId)?.data as T | undefined
    const updatedData = typeof newData === 'function'
      ? newData(currentData)
      : { ...currentData as object, ...newData as object } as T

    setStepData(stepId, updatedData as Record<string, unknown>)
  }, [stepId, getStepData, setStepData])

  const complete = useCallback((finalData?: Partial<T>) => {
    if (finalData) {
      updateData(finalData)
    }
    markStepComplete(stepId)
  }, [stepId, updateData, markStepComplete])

  const isCompleted = useCallback(() => {
    return getStepData(stepId)?.completed ?? false
  }, [stepId, getStepData])

  return {
    data,
    updateData,
    complete,
    isCompleted: isCompleted(),
  }
}

/**
 * Hook to get data for the current step
 */
export function useCurrentStepData<T = Record<string, unknown>>() {
  const { state } = useOnboardingContext()
  const currentStepId = state.steps[state.currentStep]?.id
  return useStepData<T>(currentStepId)
}
