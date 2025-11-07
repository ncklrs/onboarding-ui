import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import type { OnboardingNavigationProps } from './types'

export function OnboardingNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
  theme,
  nextLabel = 'Continue',
  previousLabel = 'Back',
  skipLabel = 'Skip',
  completeLabel = 'Get Started',
  showSkip = true,
  className,
}: OnboardingNavigationProps) {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete()
    } else if (onNext) {
      onNext()
    }
  }

  const buttonStyle = theme?.primaryColor
    ? {
        backgroundColor: theme.primaryColor,
        color: theme.textColor || '#ffffff',
      }
    : undefined

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex gap-2">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            {previousLabel}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {showSkip && !isLastStep && (
          <Button variant="ghost" onClick={onSkip}>
            {skipLabel}
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="gap-1"
          style={buttonStyle}
        >
          {isLastStep ? completeLabel : nextLabel}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
