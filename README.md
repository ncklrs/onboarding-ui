# Onboarding UI

A beautiful, Apple-inspired React component library for creating stunning onboarding experiences. Built with TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 **Clean, Apple-inspired Design** - Minimalist and elegant UI/UX
- 🎯 **Fully Customizable** - Easy theme customization with props
- 📱 **Responsive** - Works perfectly on all screen sizes
- 🔧 **TypeScript Support** - Full type safety out of the box
- ⚡ **Built with Modern Tools** - React, Vite, Tailwind CSS, shadcn/ui
- 🎭 **Multiple Progress Variants** - Bar, dots, and minimal styles
- 🌗 **Dark Mode Ready** - Built-in dark mode support

## Demo

Run the demo locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the interactive demo showcasing all features and customization options.

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd onboarding-ui

# Install dependencies
npm install
```

## Usage

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
    // Add more steps...
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
import { OnboardingContainer, OnboardingTheme } from './components/onboarding'

const customTheme: OnboardingTheme = {
  primaryColor: '#3b82f6',
  accentColor: '#60a5fa',
}

function App() {
  return (
    <OnboardingContainer
      steps={steps}
      theme={customTheme}
      onComplete={() => console.log('Done!')}
    />
  )
}
```

### Progress Variants

The library supports three progress indicator styles:

```tsx
<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="bar"      // Default: progress bar
/>

<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="dots"     // Dots indicator
/>

<OnboardingProgress
  currentStep={0}
  totalSteps={4}
  variant="minimal"  // Simple counter (1 / 4)
/>
```

## Component API

### OnboardingContainer

Main container component that manages the onboarding flow.

#### Props

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

### OnboardingStep

Step configuration object.

```typescript
interface OnboardingStep {
  id: string
  title: string
  description?: string
  content: ReactNode
  icon?: ReactNode
}
```

### OnboardingTheme

Theme customization object.

```typescript
interface OnboardingTheme {
  primaryColor?: string      // Main button color
  secondaryColor?: string    // Secondary elements
  backgroundColor?: string   // Container background
  textColor?: string        // Text color
  accentColor?: string      // Accent elements
}
```

### OnboardingNavigation

Navigation component with back, skip, and continue buttons.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStep` | `number` | Required | Current step index |
| `totalSteps` | `number` | Required | Total number of steps |
| `onNext` | `() => void` | - | Next button handler |
| `onPrevious` | `() => void` | - | Back button handler |
| `onSkip` | `() => void` | - | Skip button handler |
| `onComplete` | `() => void` | - | Complete button handler |
| `theme` | `OnboardingTheme` | - | Custom theme |
| `nextLabel` | `string` | `'Continue'` | Next button text |
| `previousLabel` | `string` | `'Back'` | Back button text |
| `skipLabel` | `string` | `'Skip'` | Skip button text |
| `completeLabel` | `string` | `'Get Started'` | Complete button text |
| `showSkip` | `boolean` | `true` | Show/hide skip button |

## Customization Examples

### Color Themes

The demo includes several pre-configured themes:

**Ocean Blue**
```typescript
{
  primaryColor: '#3b82f6',
  accentColor: '#60a5fa',
}
```

**Royal Purple**
```typescript
{
  primaryColor: '#a855f7',
  accentColor: '#c084fc',
}
```

**Forest Green**
```typescript
{
  primaryColor: '#22c55e',
  accentColor: '#4ade80',
}
```

### Dark Mode

The components support dark mode through Tailwind's dark mode classes. Simply add the `dark` class to your root element:

```tsx
<div className="dark">
  <OnboardingContainer steps={steps} />
</div>
```

## Tech Stack

- **React 19** - Latest React features
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS 3** - Utility-first CSS
- **shadcn/ui** - High-quality components
- **Lucide React** - Beautiful icons
- **class-variance-authority** - Component variants

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

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

## File Structure

```
onboarding-ui/
├── src/
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── OnboardingContainer.tsx
│   │   │   ├── OnboardingProgress.tsx
│   │   │   ├── OnboardingNavigation.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
