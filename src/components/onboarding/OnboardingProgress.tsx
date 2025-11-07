import { cn } from '../../lib/utils'
import type { OnboardingProgressProps } from './types'

export function OnboardingProgress({
  currentStep,
  totalSteps,
  theme,
  variant = 'bar',
  className,
}: OnboardingProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center gap-2', className)}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-300',
              index === currentStep
                ? 'w-8 bg-foreground'
                : index < currentStep
                ? 'bg-foreground/60'
                : 'bg-foreground/20'
            )}
            style={
              index <= currentStep && theme?.primaryColor
                ? { backgroundColor: theme.primaryColor }
                : undefined
            }
          />
        ))}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('text-center text-sm text-muted-foreground', className)}>
        {currentStep + 1} / {totalSteps}
      </div>
    )
  }

  // Default: bar variant
  return (
    <div className={cn('w-full', className)}>
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            ...(theme?.primaryColor ? { backgroundColor: theme.primaryColor } : {}),
          }}
        />
      </div>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  )
}
