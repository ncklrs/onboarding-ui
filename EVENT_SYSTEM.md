# Event System & State Management

The Onboarding UI library includes a powerful event system and state management solution that allows you to track user interactions, collect data, and respond to onboarding events in real-time.

## Overview

The event system consists of:

- **OnboardingProvider** - Context provider for state management
- **Event Emitter** - Publishes events for all onboarding actions
- **Hooks** - React hooks to consume state and listen to events
- **Event Types** - Predefined event types for all onboarding actions

## Quick Start

### 1. Wrap Your App with OnboardingProvider

```tsx
import { OnboardingProvider } from '@onboarding-ui/react'

function App() {
  const steps = [
    { id: 'welcome', title: 'Welcome', content: <div>...</div> },
    { id: 'setup', title: 'Setup', content: <div>...</div> },
  ]

  return (
    <OnboardingProvider
      steps={steps}
      onComplete={() => console.log('Done!')}
      onEvent={(event) => console.log('Event:', event)}
    >
      <YourOnboardingFlow />
    </OnboardingProvider>
  )
}
```

### 2. Use Hooks to Access State

```tsx
import { useOnboarding } from '@onboarding-ui/react'

function YourOnboardingFlow() {
  const {
    currentStep,
    totalSteps,
    progress,
    nextStep,
    previousStep,
    getAllStepData,
  } = useOnboarding()

  return (
    <div>
      <p>Step {currentStep + 1} of {totalSteps}</p>
      <p>Progress: {progress}%</p>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}
```

## Event Types

All events published by the system:

```typescript
OnboardingEventType.STEP_ENTER          // User entered a step
OnboardingEventType.STEP_EXIT           // User exited a step
OnboardingEventType.STEP_COMPLETE       // Step marked as complete
OnboardingEventType.STEP_SKIP           // User skipped a step
OnboardingEventType.NAVIGATION_NEXT     // Next button clicked
OnboardingEventType.NAVIGATION_PREVIOUS // Back button clicked
OnboardingEventType.ONBOARDING_START    // Onboarding started
OnboardingEventType.ONBOARDING_COMPLETE // Onboarding finished
OnboardingEventType.DATA_COLLECT        // Data collected from step
OnboardingEventType.ERROR               // Error occurred
```

## Hooks

### useOnboarding()

Access onboarding state and methods.

```tsx
const {
  // State
  currentStep,        // Current step index
  currentStepData,    // Current step object
  totalSteps,         // Total number of steps
  isComplete,         // Is onboarding complete?
  progress,           // Progress percentage (0-100)
  isFirstStep,        // Is this the first step?
  isLastStep,         // Is this the last step?
  visitedSteps,       // Array of visited step IDs
  completedSteps,     // Array of completed step IDs
  skippedSteps,       // Array of skipped step IDs

  // Navigation
  goToStep,           // Go to specific step
  nextStep,           // Go to next step
  previousStep,       // Go to previous step
  skipStep,           // Skip current step

  // Data Management
  setStepData,        // Set data for a step
  getStepData,        // Get data for a step
  getAllStepData,     // Get all collected data

  // Completion
  markStepComplete,   // Mark step as complete
  markStepSkipped,    // Mark step as skipped
  completeOnboarding, // Complete the onboarding

  // Metadata
  duration,           // Time spent in onboarding (ms)
} = useOnboarding()
```

### useOnboardingEvents()

Listen to specific event types.

```tsx
import { useOnboardingEvents, OnboardingEventType } from '@onboarding-ui/react'

function MyComponent() {
  // Listen to step enter events
  useOnboardingEvents(OnboardingEventType.STEP_ENTER, (event) => {
    console.log('Entered step:', event.stepId)
    // Send analytics
    analytics.track('Step Viewed', {
      stepId: event.stepId,
      stepIndex: event.stepIndex,
    })
  })

  // Listen to all events
  useOnboardingEvents('all', (event) => {
    console.log('Event:', event.type, event)
  })
}
```

### Convenience Event Hooks

```tsx
import {
  useOnStepEnter,
  useOnStepExit,
  useOnStepComplete,
  useOnStepSkip,
  useOnDataCollect,
  useOnOnboardingComplete,
} from '@onboarding-ui/react'

function MyComponent() {
  useOnStepEnter((event) => {
    console.log('Step entered:', event.stepId)
  })

  useOnDataCollect((event) => {
    console.log('Data collected:', event.stepData)
    // Save to backend
    saveUserData(event.stepId, event.stepData)
  })

  useOnOnboardingComplete((event) => {
    console.log('Onboarding complete!', event.metadata)
    // Redirect user
    router.push('/dashboard')
  })
}
```

### useStepData()

Manage data for a specific step.

```tsx
import { useStepData } from '@onboarding-ui/react'

function ProfileStep() {
  const { data, updateData, complete, isCompleted } = useStepData('profile')

  return (
    <div>
      <input
        value={data?.name || ''}
        onChange={(e) => updateData({ name: e.target.value })}
      />
      <input
        value={data?.email || ''}
        onChange={(e) => updateData({ email: e.target.value })}
      />
      <button onClick={() => complete()}>
        Complete Step
      </button>
    </div>
  )
}
```

### useCurrentStepData()

Same as `useStepData()` but for the current step.

```tsx
import { useCurrentStepData } from '@onboarding-ui/react'

function CurrentStep() {
  const { data, updateData, complete } = useCurrentStepData()

  // Automatically scoped to current step
}
```

## Complete Examples

### Example 1: Analytics Integration

```tsx
import {
  OnboardingProvider,
  useOnboardingEvents,
  OnboardingEventType,
} from '@onboarding-ui/react'

function AnalyticsWrapper({ children }) {
  useOnboardingEvents('all', (event) => {
    // Send all events to analytics
    analytics.track('Onboarding Event', {
      eventType: event.type,
      stepId: event.stepId,
      stepIndex: event.stepIndex,
      timestamp: event.timestamp,
    })
  })

  return children
}

function App() {
  return (
    <OnboardingProvider steps={steps}>
      <AnalyticsWrapper>
        <OnboardingFlow />
      </AnalyticsWrapper>
    </OnboardingProvider>
  )
}
```

### Example 2: Save Progress to Backend

```tsx
import { useOnboarding, useOnDataCollect } from '@onboarding-ui/react'

function SaveProgressHandler() {
  const { getAllStepData } = useOnboarding()

  useOnDataCollect(async (event) => {
    // Save data whenever it's collected
    await fetch('/api/onboarding/save', {
      method: 'POST',
      body: JSON.stringify({
        stepId: event.stepId,
        data: event.stepData,
        allData: getAllStepData(),
      }),
    })
  })

  return null // This is just a handler component
}
```

### Example 3: Multi-Step Form with Validation

```tsx
import { useOnboarding, useStepData } from '@onboarding-ui/react'

function ProfileForm() {
  const { nextStep } = useOnboarding()
  const { data, updateData, complete } = useStepData('profile')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate
    if (!data?.name || !data?.email) {
      alert('Please fill all fields')
      return
    }

    // Mark complete and move to next step
    complete()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={data?.name || ''}
        onChange={(e) => updateData({ name: e.target.value })}
        required
      />
      <input
        type="email"
        value={data?.email || ''}
        onChange={(e) => updateData({ email: e.target.value })}
        required
      />
      <button type="submit">Continue</button>
    </form>
  )
}
```

### Example 4: Custom Completion Logic

```tsx
import { useOnboarding, useOnOnboardingComplete } from '@onboarding-ui/react'

function OnboardingFlow() {
  const { getAllStepData } = useOnboarding()

  useOnOnboardingComplete(async (event) => {
    const allData = getAllStepData()

    // Save final data
    await fetch('/api/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify({
        ...allData,
        duration: event.metadata?.duration,
        completedAt: new Date().toISOString(),
      }),
    })

    // Show success message
    toast.success('Onboarding complete!')

    // Redirect
    window.location.href = '/dashboard'
  })

  return <YourOnboardingUI />
}
```

### Example 5: Progress Persistence

```tsx
import { useEffect } from 'react'
import { useOnboarding } from '@onboarding-ui/react'

function ProgressPersistence() {
  const {
    currentStep,
    getAllStepData,
    visitedSteps,
    completedSteps,
    skippedSteps,
  } = useOnboarding()

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      currentStep,
      stepData: getAllStepData(),
      visitedSteps,
      completedSteps,
      skippedSteps,
      timestamp: Date.now(),
    }

    localStorage.setItem('onboarding-progress', JSON.stringify(progress))
  }, [currentStep, getAllStepData, visitedSteps, completedSteps, skippedSteps])

  return null
}

// Resume from saved progress
function App() {
  const savedProgress = JSON.parse(
    localStorage.getItem('onboarding-progress') || '{}'
  )

  return (
    <OnboardingProvider
      steps={steps}
      initialStep={savedProgress.currentStep || 0}
    >
      <ProgressPersistence />
      <OnboardingFlow />
    </OnboardingProvider>
  )
}
```

## Event Data Structure

All events include:

```typescript
interface OnboardingEventData {
  type: OnboardingEventType      // Event type
  timestamp: number               // Unix timestamp
  stepId?: string                 // Step identifier
  stepIndex?: number              // Step index
  stepData?: Record<string, any>  // Step data (for DATA_COLLECT)
  direction?: 'forward' | 'backward' // Navigation direction
  metadata?: Record<string, any>  // Additional metadata
}
```

## Best Practices

1. **Use Provider at App Root** - Wrap your onboarding flow with `OnboardingProvider` as high up as possible

2. **Separate Concerns** - Use separate components for event handling (analytics, saving) vs UI

3. **Type Your Data** - Use TypeScript generics with `useStepData<T>()` for type-safe data

4. **Handle Errors** - Listen to `ERROR` events to handle edge cases gracefully

5. **Clean Up** - Event listeners auto-cleanup on unmount, but be mindful in complex scenarios

6. **Persist State** - Save progress to localStorage or backend for better UX

7. **Analytics** - Track all events for insights into user behavior

## API Reference

See the main README for full API documentation.
