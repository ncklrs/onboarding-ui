import { useState } from 'react'
import { OnboardingContainer } from './components/onboarding'
import type { OnboardingStep, OnboardingTheme } from './components/onboarding'
import { Sparkles, Zap, Target, Rocket, Palette } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const [currentDemo, setCurrentDemo] = useState<'default' | 'blue' | 'purple' | 'green'>('default')
  const [showOnboarding, setShowOnboarding] = useState(true)

  const defaultSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Onboarding UI',
      description: 'A beautiful, Apple-inspired onboarding experience',
      icon: <Sparkles className="h-8 w-8" />,
      content: (
        <div className="space-y-4 text-center">
          <p className="text-lg text-muted-foreground">
            Create stunning onboarding experiences with minimal effort.
          </p>
          <div className="grid gap-4 pt-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clean Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Apple-inspired UI that feels premium
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Change colors and styles with props
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">TypeScript</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full type safety out of the box
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Powerful Features',
      description: 'Everything you need for great onboarding',
      icon: <Zap className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-secondary p-3">
              <Target className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Multiple progress indicator variants: bar, dots, and minimal
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-secondary p-3">
              <Palette className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold">Theme Customization</h3>
              <p className="text-sm text-muted-foreground">
                Customize colors to match your brand identity
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-secondary p-3">
              <Rocket className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold">Easy Integration</h3>
              <p className="text-sm text-muted-foreground">
                Built with React and shadcn/ui for seamless integration
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'customize',
      title: 'Customize Your Theme',
      description: 'Try different color schemes below',
      icon: <Palette className="h-8 w-8" />,
      content: (
        <div className="space-y-6">
          <p className="text-center text-muted-foreground">
            Click any theme below to see how easy it is to customize:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-6"
              onClick={() => setCurrentDemo('blue')}
            >
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500" />
                <div className="h-8 w-8 rounded-full bg-blue-700" />
              </div>
              <span className="font-semibold">Ocean Blue</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-6"
              onClick={() => setCurrentDemo('purple')}
            >
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-500" />
                <div className="h-8 w-8 rounded-full bg-purple-700" />
              </div>
              <span className="font-semibold">Royal Purple</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-6"
              onClick={() => setCurrentDemo('green')}
            >
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-green-500" />
                <div className="h-8 w-8 rounded-full bg-green-700" />
              </div>
              <span className="font-semibold">Forest Green</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-6"
              onClick={() => setCurrentDemo('default')}
            >
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-black" />
                <div className="h-8 w-8 rounded-full bg-gray-800" />
              </div>
              <span className="font-semibold">Classic B&W</span>
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start building amazing onboarding experiences',
      icon: <Rocket className="h-8 w-8" />,
      content: (
        <div className="space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            You now know how to use the Onboarding UI component library.
          </p>
          <div className="rounded-lg bg-secondary p-6">
            <code className="text-sm">
              npm install onboarding-ui
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            Check out the documentation to learn more about customization options.
          </p>
        </div>
      ),
    },
  ]

  const themes: Record<string, OnboardingTheme> = {
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
  }

  if (!showOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Onboarding Complete!</CardTitle>
            <CardDescription>
              You've successfully completed the onboarding flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowOnboarding(true)}
              className="w-full"
            >
              Restart Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-950 dark:to-gray-900">
      <OnboardingContainer
        steps={defaultSteps}
        onComplete={() => setShowOnboarding(false)}
        theme={themes[currentDemo]}
        showProgress={true}
        showStepIndicator={true}
      />
    </div>
  )
}

export default App
