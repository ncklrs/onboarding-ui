# Onboarding UI

A beautiful, Apple-inspired React component library for creating stunning onboarding experiences. Built with TypeScript, Tailwind CSS, and shadcn/ui.

![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![React 19](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## Features

- 🎨 **Clean, Apple-inspired Design** - Minimalist and elegant UI/UX
- 🎯 **Fully Customizable** - Easy theme customization with props
- 📱 **Responsive** - Works perfectly on all screen sizes
- 🔧 **TypeScript Support** - Full type safety out of the box
- ⚡ **Built with Modern Tools** - React 19, Vite, Tailwind CSS, shadcn/ui
- 🎭 **Multiple Progress Variants** - Bar, dots, and minimal styles
- 🌗 **Dark Mode Ready** - Built-in dark mode support
- 📦 **Rich Component Library** - 10+ components and templates
- 🎬 **Media Support** - Image and video-based onboarding
- 📝 **Form Templates** - Ready-to-use user setup flows

## Demo

Run the interactive demo locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to explore:
- **Basic Onboarding** - Classic flow with 6 theme options
- **Feature Tour** - Showcase features with cards and checklists
- **User Setup** - Profile creation with forms and preferences

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd onboarding-ui

# Install dependencies
npm install
```

## Quick Start

### Basic Example

```tsx
import { OnboardingContainer, OnboardingStep } from './components/onboarding'
import { Sparkles } from 'lucide-react'

function App() {
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Get started with our app',
      icon: <Sparkles className="h-8 w-8" />,
      content: (
        <div>
          <p>Welcome to our amazing application!</p>
        </div>
      ),
    },
  ]

  return (
    <OnboardingContainer
      steps={steps}
      onComplete={() => console.log('Onboarding complete!')}
    />
  )
}
```

### With Custom Theme

```tsx
import { OnboardingContainer } from './components/onboarding'

const customTheme = {
  primaryColor: '#3b82f6',
  accentColor: '#60a5fa',
}

<OnboardingContainer
  steps={steps}
  theme={customTheme}
  onComplete={() => console.log('Done!')}
/>
```

## Components

### Core Components

#### OnboardingContainer

Main container component that manages the onboarding flow.

```tsx
<OnboardingContainer
  steps={steps}
  currentStep={0}
  onStepChange={(step) => console.log(step)}
  onComplete={() => console.log('Complete')}
  theme={{ primaryColor: '#3b82f6' }}
  showProgress={true}
  showStepIndicator={true}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `OnboardingStep[]` | Required | Array of onboarding steps |
| `currentStep` | `number` | `0` | Current step index (controlled) |
| `onStepChange` | `(step: number) => void` | - | Callback when step changes |
| `onComplete` | `() => void` | - | Callback when onboarding completes |
| `theme` | `OnboardingTheme` | - | Custom theme configuration |
| `showProgress` | `boolean` | `true` | Show/hide progress indicator |
| `showStepIndicator` | `boolean` | `true` | Show/hide step icons |
| `className` | `string` | - | Additional CSS classes |

#### OnboardingMedia

Container with support for images and videos.

```tsx
import { OnboardingMedia } from './components/onboarding'

<OnboardingMedia
  steps={[
    {
      id: 'intro',
      title: 'Welcome',
      media: {
        type: 'image',
        src: '/hero.jpg',
        position: 'left', // 'top' | 'bottom' | 'left' | 'right'
      },
      content: <p>Your content here</p>,
    },
  ]}
/>
```

#### OnboardingProgress

Standalone progress indicator with multiple variants.

```tsx
import { OnboardingProgress } from './components/onboarding'

// Bar variant (default)
<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="bar"
/>

// Dots variant
<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="dots"
/>

// Minimal variant
<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="minimal"
/>
```

#### OnboardingNavigation

Customizable navigation buttons.

```tsx
import { OnboardingNavigation } from './components/onboarding'

<OnboardingNavigation
  currentStep={0}
  totalSteps={4}
  onNext={() => {}}
  onPrevious={() => {}}
  onSkip={() => {}}
  nextLabel="Continue"
  previousLabel="Back"
  skipLabel="Skip"
  showSkip={true}
/>
```

### Templates

Pre-built templates for common onboarding patterns.

#### FeatureTour

Showcase features in a grid layout.

```tsx
import { FeatureTour } from './components/onboarding'
import { Code, Palette, Zap } from 'lucide-react'

<FeatureTour
  columns={3}
  features={[
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Developer Friendly',
      description: 'Built with TypeScript',
      badge: 'New',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Customizable',
      description: 'Full theme control',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Fast',
      description: 'Optimized performance',
    },
  ]}
/>
```

#### Checklist

Interactive checklist component.

```tsx
import { Checklist } from './components/onboarding'

<Checklist
  items={[
    { text: 'Install the package', completed: true },
    { text: 'Configure theme', completed: true },
    { text: 'Create first flow', completed: false },
  ]}
/>
```

#### UserSetupForm

Profile creation form with avatar support.

```tsx
import { UserSetupForm } from './components/onboarding'

<UserSetupForm
  onSubmit={(data) => {
    console.log('User data:', data)
    // { name, email, role, avatar }
  }}
/>
```

#### PreferencesSelector

Multi-select preference cards.

```tsx
import { PreferencesSelector } from './components/onboarding'
import { Code, Palette } from 'lucide-react'

const [selected, setSelected] = useState<string[]>([])

<PreferencesSelector
  title="Choose your interests"
  options={[
    {
      id: 'design',
      label: 'Design',
      description: 'UI/UX and visual design',
      icon: <Palette className="h-5 w-5" />,
    },
    {
      id: 'dev',
      label: 'Development',
      description: 'Code and technical content',
      icon: <Code className="h-5 w-5" />,
    },
  ]}
  selected={selected}
  onSelectionChange={setSelected}
  multiSelect={true}
/>
```

### UI Components

Additional components included:

- **Button** - Customizable buttons with variants
- **Card** - Container components with header, content, footer
- **Input** - Form input fields
- **Badge** - Label badges with variants
- **Separator** - Visual dividers
- **Avatar** - User avatars with fallback

## Theming

### Built-in Themes

```tsx
const themes = {
  default: {},
  blue: {
    primaryColor: '#3b82f6',
    accentColor: '#60a5fa',
  },
  purple: {
    primaryColor: '#a855f7',
    accentColor: '#c084fc',
  },
  green: {
    primaryColor: '#22c55e',
    accentColor: '#4ade80',
  },
  red: {
    primaryColor: '#ef4444',
    accentColor: '#f87171',
  },
  orange: {
    primaryColor: '#f97316',
    accentColor: '#fb923c',
  },
}
```

### Custom Theme

```tsx
interface OnboardingTheme {
  primaryColor?: string      // Main button color
  secondaryColor?: string    // Secondary elements
  backgroundColor?: string   // Container background
  textColor?: string        // Text color
  accentColor?: string      // Accent elements
}

const myTheme: OnboardingTheme = {
  primaryColor: '#8b5cf6',
  accentColor: '#a78bfa',
  backgroundColor: '#fafafa',
  textColor: '#1f2937',
}
```

### Dark Mode

Enable dark mode by adding the `dark` class to your root element:

```tsx
<div className="dark">
  <OnboardingContainer steps={steps} />
</div>
```

## Advanced Usage

### Controlled Step State

```tsx
const [currentStep, setCurrentStep] = useState(0)

<OnboardingContainer
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
/>
```

### Step Completion Tracking

```tsx
const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

<OnboardingContainer
  steps={steps}
  onStepChange={(step) => {
    const stepId = steps[step].id
    setCompletedSteps(prev => new Set([...prev, stepId]))
  }}
/>
```

### Media-based Onboarding

```tsx
import { OnboardingMedia } from './components/onboarding'

<OnboardingMedia
  steps={[
    {
      id: 'welcome',
      title: 'Welcome',
      media: {
        type: 'video',
        src: '/intro.mp4',
        position: 'left',
      },
      content: <p>Watch our introduction</p>,
    },
    {
      id: 'features',
      title: 'Features',
      media: {
        type: 'image',
        src: '/features.png',
        position: 'right',
      },
      content: <FeatureTour features={features} />,
    },
  ]}
/>
```

### Complete User Setup Flow

```tsx
const setupSteps = [
  {
    id: 'profile',
    title: 'Create Profile',
    content: <UserSetupForm onSubmit={handleUserData} />,
  },
  {
    id: 'preferences',
    title: 'Set Preferences',
    content: (
      <PreferencesSelector
        options={preferenceOptions}
        selected={selected}
        onSelectionChange={setSelected}
      />
    ),
  },
  {
    id: 'complete',
    title: 'All Set!',
    content: <CompletionSummary />,
  },
]
```

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type {
  OnboardingStep,
  OnboardingTheme,
  OnboardingContainerProps,
  OnboardingProgressProps,
  OnboardingNavigationProps,
  UserSetupData,
} from './components/onboarding'
```

## Event System & State Management

The library includes a powerful event system for tracking user interactions and managing state.

### OnboardingProvider

Wrap your app with the provider for state management:

```tsx
import { OnboardingProvider } from '@onboarding-ui/react'

<OnboardingProvider
  steps={steps}
  onComplete={() => console.log('Done!')}
  onEvent={(event) => {
    console.log('Event:', event)
    // Send to analytics
    analytics.track(event.type, event)
  }}
>
  <YourOnboarding />
</OnboardingProvider>
```

### Hooks

Access onboarding state and listen to events:

```tsx
import {
  useOnboarding,
  useOnboardingEvents,
  useStepData,
  OnboardingEventType,
} from '@onboarding-ui/react'

function YourComponent() {
  // Access state
  const {
    currentStep,
    totalSteps,
    progress,
    nextStep,
    getAllStepData,
  } = useOnboarding()

  // Listen to events
  useOnboardingEvents(OnboardingEventType.STEP_ENTER, (event) => {
    console.log('Step entered:', event.stepId)
  })

  // Manage step data
  const { data, updateData, complete } = useStepData('profile')

  return (
    <input
      value={data?.name || ''}
      onChange={(e) => updateData({ name: e.target.value })}
    />
  )
}
```

### Event Types

Listen to these events:

- `STEP_ENTER` - User entered a step
- `STEP_EXIT` - User exited a step
- `STEP_COMPLETE` - Step marked complete
- `STEP_SKIP` - User skipped a step
- `NAVIGATION_NEXT` / `NAVIGATION_PREVIOUS` - Navigation actions
- `ONBOARDING_COMPLETE` - Onboarding finished
- `DATA_COLLECT` - Data collected from step

### Convenience Hooks

```tsx
import {
  useOnStepEnter,
  useOnDataCollect,
  useOnOnboardingComplete,
} from '@onboarding-ui/react'

// Track analytics
useOnStepEnter((event) => {
  analytics.track('Step Viewed', { stepId: event.stepId })
})

// Save data to backend
useOnDataCollect(async (event) => {
  await saveToBackend(event.stepId, event.stepData)
})

// Handle completion
useOnOnboardingComplete((event) => {
  router.push('/dashboard')
})
```

**See [EVENT_SYSTEM.md](./EVENT_SYSTEM.md) for complete documentation and examples.**

## Tech Stack

- **React 19** - Latest React features
- **TypeScript 5.9** - Type safety
- **Vite 7** - Fast build tool
- **Tailwind CSS 3** - Utility-first CSS
- **shadcn/ui** - High-quality components
- **Lucide React** - Beautiful icons
- **class-variance-authority** - Component variants

## Project Structure

```
onboarding-ui/
├── src/
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── OnboardingContainer.tsx
│   │   │   ├── OnboardingMedia.tsx
│   │   │   ├── OnboardingProgress.tsx
│   │   │   ├── OnboardingNavigation.tsx
│   │   │   ├── templates/
│   │   │   │   ├── FeatureTour.tsx
│   │   │   │   ├── UserSetup.tsx
│   │   │   │   └── index.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── badge.tsx
│   │       ├── separator.tsx
│   │       └── avatar.tsx
│   ├── demos/
│   │   ├── BasicDemo.tsx
│   │   ├── FeatureDemo.tsx
│   │   └── UserSetupDemo.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Examples

Check the `src/demos` directory for complete examples:

- **BasicDemo.tsx** - Classic onboarding with theme switcher
- **FeatureDemo.tsx** - Feature showcase with checklist
- **UserSetupDemo.tsx** - User profile and preferences setup

## Best Practices

1. **Keep steps concise** - 3-5 steps is ideal for most onboarding flows
2. **Use icons** - Visual indicators improve user experience
3. **Allow skipping** - Let users skip non-essential steps
4. **Show progress** - Always display progress indicators
5. **Mobile-first** - Test on mobile devices early
6. **Theme consistency** - Match your brand colors
7. **Test flows** - Validate the entire onboarding experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

Built with inspiration from Apple's design philosophy and powered by:
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
