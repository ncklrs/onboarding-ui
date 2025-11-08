import { createContext, useContext, useState, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import type { OnboardingStep, OnboardingTheme } from '../components/onboarding/types'
import { OnboardingEventEmitter, OnboardingEventType, type OnboardingEventData } from '../lib/events'

export interface StepData {
  stepId: string
  data: Record<string, unknown>
  timestamp: number
  completed: boolean
}

export interface OnboardingState {
  currentStep: number
  steps: OnboardingStep[]
  theme?: OnboardingTheme
  isComplete: boolean
  stepData: Map<string, StepData>
  visitedSteps: Set<string>
  completedSteps: Set<string>
  skippedSteps: Set<string>
  startTime?: number
  endTime?: number
}

export interface OnboardingContextValue {
  state: OnboardingState
  eventEmitter: OnboardingEventEmitter

  // Navigation
  goToStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  skipStep: () => void

  // Data management
  setStepData: (stepId: string, data: Record<string, unknown>) => void
  getStepData: (stepId: string) => StepData | undefined
  getAllStepData: () => Record<string, StepData>

  // Completion
  markStepComplete: (stepId: string) => void
  markStepSkipped: (stepId: string) => void
  completeOnboarding: () => void

  // Event listeners
  addEventListener: (type: OnboardingEventType | 'all', listener: (event: OnboardingEventData) => void) => () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export interface OnboardingProviderProps {
  children: ReactNode
  steps: OnboardingStep[]
  initialStep?: number
  theme?: OnboardingTheme
  onComplete?: () => void
  onStepChange?: (step: number, direction: 'forward' | 'backward') => void
  onEvent?: (event: OnboardingEventData) => void
}

export function OnboardingProvider({
  children,
  steps,
  initialStep = 0,
  theme,
  onComplete,
  onStepChange,
  onEvent,
}: OnboardingProviderProps) {
  const eventEmitterRef = useRef(new OnboardingEventEmitter())
  const [state, setState] = useState<OnboardingState>({
    currentStep: initialStep,
    steps,
    theme,
    isComplete: false,
    stepData: new Map(),
    visitedSteps: new Set([steps[initialStep]?.id]),
    completedSteps: new Set(),
    skippedSteps: new Set(),
    startTime: Date.now(),
  })

  // Subscribe to all events and forward to onEvent callback
  if (onEvent) {
    eventEmitterRef.current.on('all', onEvent)
  }

  const goToStep = useCallback((newStep: number) => {
    if (newStep < 0 || newStep >= steps.length) return

    const oldStep = state.currentStep
    const direction = newStep > oldStep ? 'forward' : 'backward'

    setState(prev => ({
      ...prev,
      currentStep: newStep,
      visitedSteps: new Set([...prev.visitedSteps, steps[newStep].id]),
    }))

    eventEmitterRef.current.emit({
      type: OnboardingEventType.STEP_EXIT,
      timestamp: Date.now(),
      stepId: steps[oldStep].id,
      stepIndex: oldStep,
      direction,
    })

    eventEmitterRef.current.emit({
      type: OnboardingEventType.STEP_ENTER,
      timestamp: Date.now(),
      stepId: steps[newStep].id,
      stepIndex: newStep,
      direction,
    })

    onStepChange?.(newStep, direction)
  }, [steps, state.currentStep, onStepChange])

  const nextStep = useCallback(() => {
    if (state.currentStep < steps.length - 1) {
      eventEmitterRef.current.emit({
        type: OnboardingEventType.NAVIGATION_NEXT,
        timestamp: Date.now(),
        stepId: steps[state.currentStep].id,
        stepIndex: state.currentStep,
      })
      goToStep(state.currentStep + 1)
    }
  }, [state.currentStep, steps.length, goToStep, steps])

  const previousStep = useCallback(() => {
    if (state.currentStep > 0) {
      eventEmitterRef.current.emit({
        type: OnboardingEventType.NAVIGATION_PREVIOUS,
        timestamp: Date.now(),
        stepId: steps[state.currentStep].id,
        stepIndex: state.currentStep,
      })
      goToStep(state.currentStep - 1)
    }
  }, [state.currentStep, goToStep, steps])

  const skipStep = useCallback(() => {
    const stepId = steps[state.currentStep].id
    setState(prev => ({
      ...prev,
      skippedSteps: new Set([...prev.skippedSteps, stepId]),
    }))

    eventEmitterRef.current.emit({
      type: OnboardingEventType.STEP_SKIP,
      timestamp: Date.now(),
      stepId,
      stepIndex: state.currentStep,
    })

    if (state.currentStep < steps.length - 1) {
      goToStep(state.currentStep + 1)
    }
  }, [state.currentStep, steps, goToStep])

  const setStepData = useCallback((stepId: string, data: Record<string, unknown>) => {
    const stepData: StepData = {
      stepId,
      data,
      timestamp: Date.now(),
      completed: false,
    }

    setState(prev => {
      const newStepData = new Map(prev.stepData)
      newStepData.set(stepId, stepData)
      return { ...prev, stepData: newStepData }
    })

    eventEmitterRef.current.emit({
      type: OnboardingEventType.DATA_COLLECT,
      timestamp: Date.now(),
      stepId,
      stepData: data,
    })
  }, [])

  const getStepData = useCallback((stepId: string) => {
    return state.stepData.get(stepId)
  }, [state.stepData])

  const getAllStepData = useCallback(() => {
    const result: Record<string, StepData> = {}
    state.stepData.forEach((value, key) => {
      result[key] = value
    })
    return result
  }, [state.stepData])

  const markStepComplete = useCallback((stepId: string) => {
    setState(prev => {
      const newStepData = new Map(prev.stepData)
      const existing = newStepData.get(stepId)
      if (existing) {
        newStepData.set(stepId, { ...existing, completed: true })
      }

      return {
        ...prev,
        stepData: newStepData,
        completedSteps: new Set([...prev.completedSteps, stepId]),
      }
    })

    eventEmitterRef.current.emit({
      type: OnboardingEventType.STEP_COMPLETE,
      timestamp: Date.now(),
      stepId,
    })
  }, [])

  const markStepSkipped = useCallback((stepId: string) => {
    setState(prev => ({
      ...prev,
      skippedSteps: new Set([...prev.skippedSteps, stepId]),
    }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setState(prev => ({
      ...prev,
      isComplete: true,
      endTime: Date.now(),
    }))

    eventEmitterRef.current.emit({
      type: OnboardingEventType.ONBOARDING_COMPLETE,
      timestamp: Date.now(),
      metadata: {
        duration: state.startTime ? Date.now() - state.startTime : 0,
        completedSteps: state.completedSteps.size,
        skippedSteps: state.skippedSteps.size,
        totalSteps: steps.length,
      },
    })

    onComplete?.()
  }, [onComplete, state.startTime, state.completedSteps.size, state.skippedSteps.size, steps.length])

  const addEventListener = useCallback((
    type: OnboardingEventType | 'all',
    listener: (event: OnboardingEventData) => void
  ) => {
    return eventEmitterRef.current.on(type, listener)
  }, [])

  const value: OnboardingContextValue = {
    state,
    eventEmitter: eventEmitterRef.current,
    goToStep,
    nextStep,
    previousStep,
    skipStep,
    setStepData,
    getStepData,
    getAllStepData,
    markStepComplete,
    markStepSkipped,
    completeOnboarding,
    addEventListener,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider')
  }
  return context
}
