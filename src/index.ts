// Core Onboarding Components
export {
  OnboardingContainer,
  OnboardingMedia,
  OnboardingProgress,
  OnboardingNavigation,
  HotspotTour,
  KeyboardShortcutsOverlay,
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

// 🚀 NEW: Animations with Framer Motion
export {
  getAnimationVariants,
  getTransition,
  springConfigs,
  easings,
  fadeVariants,
  slideVariants,
  scaleVariants,
  blurVariants,
  flipVariants,
  bounceVariants,
  zoomVariants,
  rotateVariants,
  staggerChildren,
  hoverScale,
  tapScale,
  hoverGlow,
  progressVariants,
  confettiAnimation,
  shakeVariants,
  pulseVariants,
} from './lib/animations'
export type { AnimationType, AnimationDirection, AnimationConfig } from './lib/animations'

// 🎮 NEW: Gamification System
export { GamificationSystem, getLevel, getPointsToNextLevel, formatTime } from './lib/gamification'
export type { Achievement, OnboardingStats, GamificationConfig } from './lib/gamification'

// 💾 NEW: Persistence & Resume
export { OnboardingPersistence, CrossTabSync, getTimeSinceLastVisit } from './lib/persistence'
export type { OnboardingProgress as OnboardingProgressData, PersistenceConfig } from './lib/persistence'

// 📳 NEW: Haptic Feedback
export { haptics, useHapticFeedback, onboardingHaptics } from './lib/haptics'
export type { HapticPattern } from './lib/haptics'

// 🎨 NEW: Premium Themes
export { premiumThemes, getTheme, getThemeNames, getThemesByCategory, applyTheme, generateThemeCSS } from './lib/themes'

// 🎉 NEW: Enhanced Confetti
export { ConfettiSystem, confetti, confettiPresets } from './lib/confetti'
export type { ConfettiShape, ConfettiType, ConfettiParticle, ConfettiConfig } from './lib/confetti'

