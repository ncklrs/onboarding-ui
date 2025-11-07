import type { ReactNode } from 'react'

export interface OnboardingTheme {
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

export interface OnboardingStep {
  id: string
  title: string
  description?: string
  content: ReactNode
  icon?: ReactNode
}

export interface OnboardingContainerProps {
  steps: OnboardingStep[]
  currentStep?: number
  onStepChange?: (step: number) => void
  onComplete?: () => void
  theme?: OnboardingTheme
  showProgress?: boolean
  showStepIndicator?: boolean
  className?: string
  children?: ReactNode
}

export interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  theme?: OnboardingTheme
  variant?: 'bar' | 'dots' | 'minimal'
  className?: string
}

export interface OnboardingNavigationProps {
  currentStep: number
  totalSteps: number
  onNext?: () => void
  onPrevious?: () => void
  onSkip?: () => void
  onComplete?: () => void
  theme?: OnboardingTheme
  nextLabel?: string
  previousLabel?: string
  skipLabel?: string
  completeLabel?: string
  showSkip?: boolean
  className?: string
}
