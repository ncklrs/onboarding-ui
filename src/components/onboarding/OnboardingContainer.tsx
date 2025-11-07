import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import type { OnboardingContainerProps } from './types'
import { OnboardingProgress } from './OnboardingProgress'
import { OnboardingNavigation } from './OnboardingNavigation'

export function OnboardingContainer({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  theme,
  showProgress = true,
  showStepIndicator = true,
  className,
}: OnboardingContainerProps) {
  const [internalStep, setInternalStep] = useState(0)
  const currentStep = controlledStep ?? internalStep

  useEffect(() => {
    if (controlledStep !== undefined) {
      setInternalStep(controlledStep)
    }
  }, [controlledStep])

  const handleStepChange = (newStep: number) => {
    setInternalStep(newStep)
    onStepChange?.(newStep)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1)
    }
  }

  const handleComplete = () => {
    onComplete?.()
  }

  const step = steps[currentStep]

  const containerStyle = {
    ...(theme?.backgroundColor ? { backgroundColor: theme.backgroundColor } : {}),
    ...(theme?.textColor ? { color: theme.textColor } : {}),
  }

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-2xl rounded-2xl bg-background p-8 shadow-lg',
        className
      )}
      style={containerStyle}
    >
      {showProgress && (
        <div className="mb-8">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={steps.length}
            theme={theme}
            variant="bar"
          />
        </div>
      )}

      <div className="mb-8 min-h-[400px]">
        {showStepIndicator && step.icon && (
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-secondary p-4 text-foreground">
              {step.icon}
            </div>
          </div>
        )}

        <div className="mb-4 text-center">
          <h2 className="mb-2 text-3xl font-semibold tracking-tight">
            {step.title}
          </h2>
          {step.description && (
            <p className="text-muted-foreground">{step.description}</p>
          )}
        </div>

        <div className="mt-8">{step.content}</div>
      </div>

      <OnboardingNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSkip={handleSkip}
        onComplete={handleComplete}
        theme={theme}
      />
    </div>
  )
}
