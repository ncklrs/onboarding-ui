import { useOnboardingContext } from '../context/OnboardingContext'

/**
 * Hook to access onboarding state and methods
 * Must be used within OnboardingProvider
 */
export function useOnboarding() {
  const context = useOnboardingContext()

  return {
    // Current state
    currentStep: context.state.currentStep,
    currentStepData: context.state.steps[context.state.currentStep],
    totalSteps: context.state.steps.length,
    isComplete: context.state.isComplete,
    progress: ((context.state.currentStep + 1) / context.state.steps.length) * 100,

    // Step info
    isFirstStep: context.state.currentStep === 0,
    isLastStep: context.state.currentStep === context.state.steps.length - 1,
    visitedSteps: Array.from(context.state.visitedSteps),
    completedSteps: Array.from(context.state.completedSteps),
    skippedSteps: Array.from(context.state.skippedSteps),

    // Navigation
    goToStep: context.goToStep,
    nextStep: context.nextStep,
    previousStep: context.previousStep,
    skipStep: context.skipStep,

    // Data
    setStepData: context.setStepData,
    getStepData: context.getStepData,
    getAllStepData: context.getAllStepData,

    // Completion
    markStepComplete: context.markStepComplete,
    markStepSkipped: context.markStepSkipped,
    completeOnboarding: context.completeOnboarding,

    // Metadata
    duration: context.state.startTime && context.state.endTime
      ? context.state.endTime - context.state.startTime
      : context.state.startTime
      ? Date.now() - context.state.startTime
      : 0,
  }
}
