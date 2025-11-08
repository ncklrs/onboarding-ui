import type { OnboardingStep } from '../components/onboarding/types'

// Event types as const object
export const OnboardingEventType = {
  STEP_ENTER: 'step_enter',
  STEP_EXIT: 'step_exit',
  STEP_COMPLETE: 'step_complete',
  STEP_SKIP: 'step_skip',
  NAVIGATION_NEXT: 'navigation_next',
  NAVIGATION_PREVIOUS: 'navigation_previous',
  ONBOARDING_START: 'onboarding_start',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  DATA_COLLECT: 'data_collect',
  ERROR: 'error',
} as const

export type OnboardingEventType = typeof OnboardingEventType[keyof typeof OnboardingEventType]

// Event data interfaces
export interface OnboardingEventData {
  type: OnboardingEventType
  timestamp: number
  stepId?: string
  stepIndex?: number
  stepData?: Record<string, unknown>
  direction?: 'forward' | 'backward'
  metadata?: Record<string, unknown>
}

export interface StepEventData extends OnboardingEventData {
  step: OnboardingStep
  stepIndex: number
  stepId: string
  totalSteps: number
  progress: number
}

export interface DataCollectionEvent extends OnboardingEventData {
  stepId: string
  data: Record<string, unknown>
  isValid?: boolean
}

// Event listener type
export type OnboardingEventListener = (event: OnboardingEventData) => void

// Event emitter class
export class OnboardingEventEmitter {
  private listeners: Map<OnboardingEventType | 'all', Set<OnboardingEventListener>>

  constructor() {
    this.listeners = new Map()
  }

  on(eventType: OnboardingEventType | 'all', listener: OnboardingEventListener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(listener)

    // Return unsubscribe function
    return () => this.off(eventType, listener)
  }

  off(eventType: OnboardingEventType | 'all', listener: OnboardingEventListener): void {
    const listeners = this.listeners.get(eventType)
    if (listeners) {
      listeners.delete(listener)
    }
  }

  emit(event: OnboardingEventData): void {
    // Emit to specific event type listeners
    const typeListeners = this.listeners.get(event.type)
    if (typeListeners) {
      typeListeners.forEach(listener => listener(event))
    }

    // Emit to 'all' listeners
    const allListeners = this.listeners.get('all')
    if (allListeners) {
      allListeners.forEach(listener => listener(event))
    }
  }

  removeAllListeners(eventType?: OnboardingEventType | 'all'): void {
    if (eventType) {
      this.listeners.delete(eventType)
    } else {
      this.listeners.clear()
    }
  }
}

// Helper to create event
export function createEvent(
  type: OnboardingEventType,
  data?: Partial<OnboardingEventData>
): OnboardingEventData {
  return {
    type,
    timestamp: Date.now(),
    ...data,
  }
}

// Helper to create step event
export function createStepEvent(
  type: OnboardingEventType,
  step: OnboardingStep,
  stepIndex: number,
  totalSteps: number,
  additionalData?: Partial<StepEventData>
): StepEventData {
  return {
    type,
    timestamp: Date.now(),
    step,
    stepIndex,
    stepId: step.id,
    totalSteps,
    progress: ((stepIndex + 1) / totalSteps) * 100,
    ...additionalData,
  }
}
