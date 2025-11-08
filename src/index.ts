// Core Onboarding Components
export {
  OnboardingContainer,
  OnboardingMedia,
  OnboardingProgress,
  OnboardingNavigation,
  HotspotTour,
} from './components/onboarding'

// Navigation & Interaction
export {
  KeyboardNavigation,
  useKeyboardNavigation,
  SwipeNavigation,
  useSwipeNavigation,
  AutoAdvance,
  useAutoAdvance,
} from './components/onboarding'

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
} from './components/onboarding'

// Context & State Management
export { OnboardingProvider, useOnboardingContext } from './context/OnboardingContext'
export type { OnboardingState, OnboardingContextValue, StepData } from './context/OnboardingContext'

// Hooks
export {
  useOnboarding,
  useOnboardingEvents,
  useOnboardingMultiEvents,
  useOnStepEnter,
  useOnStepExit,
  useOnStepComplete,
  useOnStepSkip,
  useOnDataCollect,
  useOnOnboardingComplete,
  useStepData,
  useCurrentStepData,
} from './hooks'

// Event System
export { OnboardingEventEmitter, OnboardingEventType, createEvent, createStepEvent } from './lib/events'
export type { OnboardingEventData, StepEventData, DataCollectionEvent, OnboardingEventListener } from './lib/events'

// Types
export type {
  OnboardingTheme,
  OnboardingStep,
  OnboardingContainerProps,
  OnboardingProgressProps,
  OnboardingNavigationProps,
  UserSetupData,
} from './components/onboarding'

// UI Components
export { Button } from './components/ui/button'
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card'
export { Input } from './components/ui/input'
export { Badge } from './components/ui/badge'
export { Separator } from './components/ui/separator'
export { Avatar } from './components/ui/avatar'

// Utilities
export { cn } from './lib/utils'

// Analytics
export {
  OnboardingAnalytics,
  GoogleAnalyticsAdapter,
  SegmentAdapter,
  MixpanelAdapter,
  AmplitudeAdapter,
  ConsoleAdapter,
} from './lib/analytics'
export type { AnalyticsAdapter } from './lib/analytics'

// Branching & Conditional Logic
export {
  evaluateSteps,
  conditions,
  createBranch,
  resolveBranches,
} from './lib/branching'
export type {
  StepCondition,
  BranchingContext,
  ConditionalStep,
  Branch,
} from './lib/branching'
