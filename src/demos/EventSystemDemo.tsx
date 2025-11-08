import { useState, useCallback } from 'react'
import {
  OnboardingProvider,
  useOnboarding,
  useOnboardingEvents,
  useStepData,
  type OnboardingStep,
  type OnboardingEventData,
} from '../index'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { Database, Bell, CheckCircle } from 'lucide-react'

// Component that uses the onboarding hooks
function OnboardingContent() {
  const {
    currentStep,
    currentStepData,
    totalSteps,
    progress,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    skipStep,
    completeOnboarding,
    getAllStepData,
  } = useOnboarding()

  const { data, updateData } = useStepData(currentStepData.id)

  const handleInputChange = (key: string, value: string) => {
    updateData({ [key]: value })
  }

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding()
    } else {
      nextStep()
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentStepData.title}</CardTitle>
          {currentStepData.description && (
            <p className="text-sm text-muted-foreground">
              {currentStepData.description}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStepData.content}

          {/* Example: Collect data on specific steps */}
          {currentStepData.id === 'profile' && (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={(data as any)?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={(data as any)?.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {!isFirstStep && (
            <Button variant="outline" onClick={previousStep}>
              Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {!isLastStep && (
            <Button variant="ghost" onClick={skipStep}>
              Skip
            </Button>
          )}
          <Button onClick={handleNext}>
            {isLastStep ? 'Complete' : 'Continue'}
          </Button>
        </div>
      </div>

      {/* Debug: Show collected data */}
      <details className="rounded-lg bg-secondary/50 p-4">
        <summary className="cursor-pointer font-medium">
          Debug: View Collected Data
        </summary>
        <pre className="mt-2 overflow-auto text-xs">
          {JSON.stringify(getAllStepData(), null, 2)}
        </pre>
      </details>
    </div>
  )
}

// Component that listens to events
function EventMonitor() {
  const [events, setEvents] = useState<OnboardingEventData[]>([])

  // Listen to all events
  useOnboardingEvents('all', useCallback((event: OnboardingEventData) => {
    setEvents(prev => [...prev.slice(-9), event]) // Keep last 10 events
  }, []))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle className="text-lg">Event Monitor</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No events yet. Start interacting with the onboarding...
            </p>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-2 rounded-lg bg-secondary/50 p-2 text-xs"
              >
                <Badge variant="secondary" className="mt-0.5">
                  {event.type}
                </Badge>
                <div className="flex-1">
                  {event.stepId && <div>Step: {event.stepId}</div>}
                  {event.direction && <div>Direction: {event.direction}</div>}
                  {event.stepData && (
                    <div className="mt-1 text-muted-foreground">
                      Data: {JSON.stringify(event.stepData)}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Component that shows completion status
function CompletionTracker() {
  const { visitedSteps, completedSteps, skippedSteps } = useOnboarding()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <CardTitle className="text-lg">Progress Tracker</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-sm font-medium">Visited Steps</div>
          <div className="text-2xl font-bold">{visitedSteps.length}</div>
        </div>
        <Separator />
        <div>
          <div className="text-sm font-medium">Completed Steps</div>
          <div className="text-2xl font-bold">{completedSteps.length}</div>
        </div>
        <Separator />
        <div>
          <div className="text-sm font-medium">Skipped Steps</div>
          <div className="text-2xl font-bold">{skippedSteps.length}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main demo component
export function EventSystemDemo() {
  const [allEvents, setAllEvents] = useState<OnboardingEventData[]>([])

  const demoSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'This demo showcases the event system',
      content: (
        <div className="space-y-4">
          <p>
            This demo showcases the powerful event system and hooks. Watch the
            event monitor on the right to see events being published.
          </p>
          <div className="rounded-lg bg-secondary/50 p-4">
            <h4 className="mb-2 font-medium">Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Real-time event publishing</li>
              <li>• State management hooks</li>
              <li>• Step data collection</li>
              <li>• Completion tracking</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      title: 'Your Profile',
      description: 'Enter your information',
      content: <p>Fill in your details below. Data is automatically collected.</p>,
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize your experience',
      content: (
        <div className="space-y-4">
          <p>Your preferences help us customize your experience.</p>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-2xl">🎨</div>
                  <div className="font-medium">Design</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-2xl">💻</div>
                  <div className="font-medium">Development</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'All Done!',
      description: 'You\'re ready to go',
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl">🎉</div>
          <p>
            Check out the event log to see all the events that were published
            during your journey.
          </p>
        </div>
      ),
    },
  ]

  const handleEvent = useCallback((event: OnboardingEventData) => {
    setAllEvents(prev => [...prev, event])
    console.log('Onboarding Event:', event)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Database className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Event System Demo</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time event publishing and state management
          </p>
        </div>

        <OnboardingProvider
          steps={demoSteps}
          onEvent={handleEvent}
          onComplete={() => {
            console.log('Onboarding completed!')
            console.log('All collected events:', allEvents)
          }}
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main onboarding */}
            <div className="lg:col-span-2">
              <OnboardingContent />
            </div>

            {/* Side panels */}
            <div className="space-y-6">
              <EventMonitor />
              <CompletionTracker />
            </div>
          </div>
        </OnboardingProvider>
      </div>
    </div>
  )
}
