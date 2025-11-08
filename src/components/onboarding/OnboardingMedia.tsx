import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import type { OnboardingContainerProps } from './types'
import { OnboardingProgress } from './OnboardingProgress'
import { OnboardingNavigation } from './OnboardingNavigation'

interface MediaStep extends Omit<OnboardingContainerProps['steps'][0], 'content'> {
  media?: {
    type: 'image' | 'video'
    src: string
    alt?: string
    position?: 'top' | 'bottom' | 'left' | 'right'
  }
  content?: React.ReactNode
}

interface OnboardingMediaProps extends Omit<OnboardingContainerProps, 'steps'> {
  steps: MediaStep[]
  mediaClassName?: string
}

export function OnboardingMedia({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  theme,
  showProgress = true,
  showStepIndicator = true,
  mediaClassName,
  className,
}: OnboardingMediaProps) {
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
  const mediaPosition = step.media?.position || 'top'
  const isVerticalLayout = mediaPosition === 'top' || mediaPosition === 'bottom'

  const containerStyle = {
    ...(theme?.backgroundColor ? { backgroundColor: theme.backgroundColor } : {}),
    ...(theme?.textColor ? { color: theme.textColor } : {}),
  }

  const renderMedia = () => {
    if (!step.media) return null

    return (
      <div
        className={cn(
          'overflow-hidden rounded-xl',
          isVerticalLayout ? 'w-full' : 'w-1/2',
          mediaClassName
        )}
      >
        {step.media.type === 'image' ? (
          <img
            src={step.media.src}
            alt={step.media.alt || step.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={step.media.src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        )}
      </div>
    )
  }

  const renderContent = () => (
    <div className={cn('flex flex-col', isVerticalLayout ? 'w-full' : 'w-1/2')}>
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

      {step.content && <div className="mt-4">{step.content}</div>}
    </div>
  )

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-4xl rounded-2xl bg-background p-8 shadow-lg',
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

      <div
        className={cn(
          'mb-8 flex gap-8',
          isVerticalLayout ? 'flex-col' : 'flex-row items-center',
          mediaPosition === 'right' && 'flex-row-reverse',
          mediaPosition === 'bottom' && 'flex-col-reverse'
        )}
      >
        {renderMedia()}
        {renderContent()}
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
