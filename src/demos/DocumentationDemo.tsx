import type { OnboardingStep } from '../components/onboarding'
import {
  WelcomeScreen,
  PermissionsRequest,
  SuccessScreen,
  FeatureTour,
  Checklist,
  PreferencesSelector,
} from '../components/onboarding'
import { useState } from 'react'
import {
  Sparkles,
  Zap,
  Code,
  Palette,
  Keyboard,
  Hand,
  Clock,
  Target,
  BarChart,
  GitBranch,
  Database,
  CheckCircle2,
  Video,
  ShieldCheck,
  Award,
  Users,
  Settings,
} from 'lucide-react'

export function DocumentationDemo(): OnboardingStep[] {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [permissions, setPermissions] = useState({
    notifications: false,
    location: false,
    camera: false,
  })

  return [
    // Welcome Screen
    {
      id: 'welcome',
      title: 'Welcome to Onboarding UI',
      description: 'The Ultimate React Onboarding Component Library',
      content: (
        <WelcomeScreen
          title="Welcome to Onboarding UI"
          subtitle="The Ultimate React Onboarding Library"
          description={
            <div className="space-y-4">
              <p>
                A beautiful, Apple-inspired React component library for creating
                stunning onboarding experiences. Built with TypeScript, Tailwind CSS,
                and shadcn/ui.
              </p>
              <p className="text-sm">
                This demo showcases all 100+ features in an interactive experience.
              </p>
            </div>
          }
          features={[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: 'Beautiful Design',
              description: 'Apple-inspired UI/UX with clean aesthetics',
            },
            {
              icon: <Code className="h-6 w-6" />,
              title: 'TypeScript First',
              description: 'Full type safety and IntelliSense support',
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: '100+ Features',
              description: 'Everything you need for amazing onboarding',
            },
          ]}
        />
      ),
    },

    // Core Components
    {
      id: 'core-components',
      title: 'Core Components',
      description: 'Essential building blocks',
      icon: <Palette className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Core Components</h2>
          <FeatureTour
            columns={2}
            features={[
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'OnboardingContainer',
                description:
                  'Main container with progress tracking and navigation controls',
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: 'OnboardingProgress',
                description: '3 variants: bar, dots, and minimal indicators',
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: 'OnboardingMedia',
                description: 'Image & video support with 4 positioning options',
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'HotspotTour',
                description: 'Interactive product tours with spotlight highlighting',
              },
            ]}
          />
        </div>
      ),
    },

    // Navigation & Interaction
    {
      id: 'navigation',
      title: 'Navigation & Interaction',
      description: 'Keyboard, touch, and auto-advance',
      icon: <Keyboard className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Navigation Features</h2>
          <div className="rounded-lg bg-primary/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Try using keyboard shortcuts in this demo:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <kbd className="rounded bg-muted px-2 py-1">→</kbd> Next step
              </li>
              <li>
                <kbd className="rounded bg-muted px-2 py-1">←</kbd> Previous step
              </li>
              <li>
                <kbd className="rounded bg-muted px-2 py-1">Enter</kbd> Next step
              </li>
              <li>
                <kbd className="rounded bg-muted px-2 py-1">Esc</kbd> Skip step
              </li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Hand className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Swipe Navigation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Touch-friendly gestures for mobile devices with configurable thresholds
              </p>
            </div>

            <div className="rounded-lg bg-green-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Auto-Advance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatic progression with timers and pause-on-hover support
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Advanced Templates
    {
      id: 'templates',
      title: 'Advanced Templates',
      description: 'Pre-built components for common patterns',
      icon: <Award className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Advanced Templates</h2>
          <FeatureTour
            columns={3}
            features={[
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'WelcomeScreen',
                description: 'Hero landing with logo, features grid, and CTAs',
                badge: 'Popular',
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: 'PermissionsRequest',
                description: 'Visual permission cards with grant tracking',
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: 'SuccessScreen',
                description: 'Celebration screen with confetti and stats',
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: 'VideoTutorial',
                description: 'Video player with transcript and progress',
              },
              {
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: 'Checklist',
                description: 'Interactive task completion tracking',
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'UserSetupForm',
                description: 'Profile creation with avatar upload',
              },
            ]}
          />
        </div>
      ),
    },

    // Permissions Demo
    {
      id: 'permissions',
      title: 'Request Permissions',
      description: 'Example permissions flow',
      content: (
        <PermissionsRequest
          title="App Permissions"
          description="We need a few permissions to provide you with the best experience"
          permissions={[
            {
              id: 'notifications',
              icon: <Sparkles className="h-6 w-6" />,
              title: 'Notifications',
              description: 'Get updates about your progress',
              required: true,
              granted: permissions.notifications,
            },
            {
              id: 'location',
              icon: <Target className="h-6 w-6" />,
              title: 'Location',
              description: 'Personalize content for your area',
              required: false,
              granted: permissions.location,
            },
            {
              id: 'camera',
              icon: <Video className="h-6 w-6" />,
              title: 'Camera',
              description: 'Upload profile pictures',
              required: false,
              granted: permissions.camera,
            },
          ]}
          onGrant={(permissionId: string) => {
            setPermissions((prev) => ({ ...prev, [permissionId]: true }))
          }}
          onGrantAll={() => {
            setPermissions({ notifications: true, location: true, camera: true })
          }}
        />
      ),
    },

    // Preferences
    {
      id: 'preferences',
      title: 'Choose Your Interests',
      description: 'Customize your experience',
      icon: <Settings className="h-8 w-8" />,
      content: (
        <PreferencesSelector
          title="What are you interested in?"
          options={[
            {
              id: 'design',
              label: 'Design',
              description: 'UI/UX and visual design',
              icon: <Palette className="h-5 w-5" />,
            },
            {
              id: 'development',
              label: 'Development',
              description: 'Code and technical content',
              icon: <Code className="h-5 w-5" />,
            },
            {
              id: 'analytics',
              label: 'Analytics',
              description: 'Data and insights',
              icon: <BarChart className="h-5 w-5" />,
            },
            {
              id: 'performance',
              label: 'Performance',
              description: 'Speed and optimization',
              icon: <Zap className="h-5 w-5" />,
            },
          ]}
          selected={selectedPreferences}
          onSelectionChange={setSelectedPreferences}
          multiSelect={true}
        />
      ),
    },

    // Event System
    {
      id: 'events',
      title: 'Event System',
      description: 'Comprehensive state management',
      icon: <Database className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Event System & State Management</h2>
          <div className="rounded-lg bg-purple-500/5 p-6">
            <h3 className="mb-4 text-lg font-semibold">10 Event Types</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'STEP_ENTER',
                'STEP_EXIT',
                'STEP_COMPLETE',
                'STEP_SKIP',
                'NAVIGATION_NEXT',
                'NAVIGATION_PREVIOUS',
                'ONBOARDING_START',
                'ONBOARDING_COMPLETE',
                'DATA_COLLECT',
                'ERROR',
              ].map((event) => (
                <div
                  key={event}
                  className="rounded bg-background px-3 py-2 text-sm font-mono"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>

          <Checklist
            items={[
              {
                text: 'OnboardingProvider for global state',
                completed: true,
              },
              {
                text: 'useOnboarding hook for state access',
                completed: true,
              },
              {
                text: 'useOnboardingEvents for event listening',
                completed: true,
              },
              {
                text: 'useStepData for per-step data management',
                completed: true,
              },
              {
                text: 'Convenience hooks for each event type',
                completed: true,
              },
            ]}
          />
        </div>
      ),
    },

    // Analytics
    {
      id: 'analytics',
      title: 'Analytics Integration',
      description: 'Track everything',
      icon: <BarChart className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics Integration</h2>
          <p className="text-muted-foreground">
            Universal analytics tracker supporting multiple providers simultaneously
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-orange-500/5 p-4">
              <h3 className="mb-2 font-semibold">Built-in Adapters</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Google Analytics (gtag)</li>
                <li>• Segment (analytics.js)</li>
                <li>• Mixpanel</li>
                <li>• Amplitude</li>
                <li>• Console (debug)</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-500/5 p-4">
              <h3 className="mb-2 font-semibold">Track Everything</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Step views & duration</li>
                <li>• Navigation actions</li>
                <li>• Skip & completion rates</li>
                <li>• Data collection events</li>
                <li>• Error tracking</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-background p-4">
            <pre className="overflow-x-auto text-xs">
              <code>{`import { OnboardingAnalytics, GoogleAnalyticsAdapter } from '@onboarding-ui/react'

const analytics = new OnboardingAnalytics()
analytics.addAdapter(new GoogleAnalyticsAdapter('GA-XXXXX'))

// Track all events automatically
<OnboardingProvider onEvent={(event) => analytics.trackEvent(event)}>
  <YourOnboarding />
</OnboardingProvider>`}</code>
            </pre>
          </div>
        </div>
      ),
    },

    // Branching
    {
      id: 'branching',
      title: 'Conditional Branching',
      description: 'Dynamic flows based on user data',
      icon: <GitBranch className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Conditional Branching</h2>
          <p className="text-muted-foreground">
            Create dynamic onboarding flows that adapt based on user data and interactions
          </p>

          <div className="rounded-lg bg-green-500/5 p-6">
            <h3 className="mb-4 text-lg font-semibold">Branch Conditions</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'dataEquals()',
                'hasData()',
                'stepCompleted()',
                'all(...conditions)',
                'any(...conditions)',
                'not(condition)',
              ].map((condition) => (
                <div
                  key={condition}
                  className="rounded bg-background px-3 py-2 text-sm font-mono"
                >
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-background p-4">
            <pre className="overflow-x-auto text-xs">
              <code>{`import { evaluateSteps, conditions } from '@onboarding-ui/react'

const steps = [
  {
    id: 'profile',
    title: 'Create Profile',
    content: <UserSetupForm />
  },
  {
    id: 'pro-features',
    title: 'Pro Features',
    condition: conditions.dataEquals('profile', 'userType', 'pro'),
    content: <ProFeatures />
  },
  {
    id: 'basic-features',
    title: 'Basic Features',
    condition: conditions.not(
      conditions.dataEquals('profile', 'userType', 'pro')
    ),
    content: <BasicFeatures />
  }
]`}</code>
            </pre>
          </div>
        </div>
      ),
    },

    // Success Screen
    {
      id: 'success',
      title: 'Congratulations!',
      description: 'You explored all features',
      content: (
        <SuccessScreen
          title="You're Now an Expert!"
          message="You've explored all 100+ features of Onboarding UI"
          showConfetti={true}
          stats={[
            { label: 'Features Explored', value: '100+' },
            { label: 'Components', value: '14+' },
            { label: 'Templates', value: '8' },
            { label: 'Event Types', value: '10' },
          ]}
          actions={[
            {
              label: 'Get Started',
              onClick: () => console.log('Get started clicked'),
              variant: 'default' as const,
            },
            {
              label: 'View Documentation',
              onClick: () => console.log('Docs clicked'),
              variant: 'outline' as const,
            },
          ]}
        />
      ),
    },
  ]
}
