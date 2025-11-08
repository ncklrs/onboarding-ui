import type { OnboardingStep } from '../components/onboarding/types'

/**
 * Condition function that determines if a step should be shown
 */
export type StepCondition = (context: BranchingContext) => boolean | Promise<boolean>

/**
 * Context available to conditions
 */
export interface BranchingContext {
  currentStep: number
  stepData: Map<string, Record<string, unknown>>
  completedSteps: Set<string>
  skippedSteps: Set<string>
  visitedSteps: Set<string>
  getUserData: (stepId: string) => Record<string, unknown> | undefined
}

/**
 * Step with conditional rendering
 */
export interface ConditionalStep extends OnboardingStep {
  condition?: StepCondition
  fallbackStep?: string
}

/**
 * Branch configuration
 */
export interface Branch {
  id: string
  condition: StepCondition
  steps: OnboardingStep[]
}

/**
 * Evaluates conditions and returns filtered steps
 */
export async function evaluateSteps(
  steps: ConditionalStep[],
  context: BranchingContext
): Promise<OnboardingStep[]> {
  const filteredSteps: OnboardingStep[] = []

  for (const step of steps) {
    if (!step.condition) {
      filteredSteps.push(step)
      continue
    }

    const shouldShow = await step.condition(context)
    if (shouldShow) {
      filteredSteps.push(step)
    } else if (step.fallbackStep) {
      const fallback = steps.find((s) => s.id === step.fallbackStep)
      if (fallback) {
        filteredSteps.push(fallback)
      }
    }
  }

  return filteredSteps
}

/**
 * Common condition helpers
 */
export const conditions = {
  /**
   * Show step if data exists for a specific step
   */
  hasData: (stepId: string, key?: string) => (context: BranchingContext) => {
    const data = context.getUserData(stepId)
    if (!data) return false
    if (!key) return Object.keys(data).length > 0
    return key in data && data[key] !== undefined && data[key] !== ''
  },

  /**
   * Show step if data matches a value
   */
  dataEquals: (stepId: string, key: string, value: unknown) => (context: BranchingContext) => {
    const data = context.getUserData(stepId)
    return data?.[key] === value
  },

  /**
   * Show step if data is one of the values
   */
  dataIn: (stepId: string, key: string, values: unknown[]) => (context: BranchingContext) => {
    const data = context.getUserData(stepId)
    return data && values.includes(data[key])
  },

  /**
   * Show step if step was completed
   */
  stepCompleted: (stepId: string) => (context: BranchingContext) => {
    return context.completedSteps.has(stepId)
  },

  /**
   * Show step if step was skipped
   */
  stepSkipped: (stepId: string) => (context: BranchingContext) => {
    return context.skippedSteps.has(stepId)
  },

  /**
   * Show step if step was visited
   */
  stepVisited: (stepId: string) => (context: BranchingContext) => {
    return context.visitedSteps.has(stepId)
  },

  /**
   * Show step if all conditions are true (AND)
   */
  all: (...conditions: StepCondition[]) => async (context: BranchingContext) => {
    for (const condition of conditions) {
      const result = await condition(context)
      if (!result) return false
    }
    return true
  },

  /**
   * Show step if any condition is true (OR)
   */
  any: (...conditions: StepCondition[]) => async (context: BranchingContext) => {
    for (const condition of conditions) {
      const result = await condition(context)
      if (result) return true
    }
    return false
  },

  /**
   * Show step if condition is false (NOT)
   */
  not: (condition: StepCondition) => async (context: BranchingContext) => {
    const result = await condition(context)
    return !result
  },

  /**
   * Always show the step
   */
  always: () => () => true,

  /**
   * Never show the step
   */
  never: () => () => false,

  /**
   * Show step based on custom logic
   */
  custom: (fn: (context: BranchingContext) => boolean | Promise<boolean>) => fn,
}

/**
 * Create a branching flow
 */
export function createBranch(id: string, condition: StepCondition, steps: OnboardingStep[]): Branch {
  return { id, condition, steps }
}

/**
 * Resolve branches and return the appropriate steps
 */
export async function resolveBranches(
  branches: Branch[],
  context: BranchingContext
): Promise<OnboardingStep[]> {
  for (const branch of branches) {
    const shouldTake = await branch.condition(context)
    if (shouldTake) {
      return branch.steps
    }
  }

  // Return empty if no branch matches
  return []
}
