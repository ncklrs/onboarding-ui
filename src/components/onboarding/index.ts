// Core Components
export { OnboardingContainer } from './OnboardingContainer'
export { OnboardingProgress } from './OnboardingProgress'
export { OnboardingNavigation } from './OnboardingNavigation'
export { OnboardingMedia } from './OnboardingMedia'
export { HotspotTour } from './HotspotTour'
export { KeyboardShortcutsOverlay } from './KeyboardShortcutsOverlay'
export type {
  OnboardingTheme,
  OnboardingStep,
  OnboardingContainerProps,
  OnboardingProgressProps,
  OnboardingNavigationProps,
} from './types'

// Navigation & Interaction
export { KeyboardNavigation, useKeyboardNavigation } from './KeyboardNavigation'
export { SwipeNavigation, useSwipeNavigation } from './SwipeNavigation'
export { AutoAdvance, useAutoAdvance } from './AutoAdvance'

// Templates
export {
  FeatureTour,
  Checklist,
  UserSetupForm,
  PreferencesSelector,
  WelcomeScreen,
  PermissionsRequest,
  SuccessScreen,
  VideoTutorial,
} from './templates'
export type { UserSetupData } from './templates'
