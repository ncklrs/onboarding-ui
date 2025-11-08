import { useState } from 'react'
import { OnboardingContainer } from './components/onboarding'
import type { OnboardingStep } from './components/onboarding'
import { Sparkles, Palette, Rocket, Box } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { basicSteps, themes } from './demos/BasicDemo'
import { featureDemoSteps } from './demos/FeatureDemo'
import { UserSetupDemo } from './demos/UserSetupDemo'
import { DocumentationDemo } from './demos/DocumentationDemo'

type DemoType = 'basic' | 'feature-tour' | 'user-setup' | 'documentation' | null

function App() {
  const [currentDemo, setCurrentDemo] = useState<DemoType>(null)
  const [currentTheme, setCurrentTheme] = useState<'default' | 'blue' | 'purple' | 'green' | 'red' | 'orange'>('default')
  const [showOnboarding, setShowOnboarding] = useState(false)

  const userSetupSteps = UserSetupDemo()
  const documentationSteps = DocumentationDemo()

  const getDemoSteps = (): OnboardingStep[] => {
    switch (currentDemo) {
      case 'documentation':
        return documentationSteps
      case 'basic':
        return [
          ...basicSteps,
          {
            id: 'customize',
            title: 'Customize Your Theme',
            description: 'Try different color schemes',
            icon: <Palette className="h-8 w-8" />,
            content: (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Click any theme below to see the customization in action:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries({
                    default: { name: 'Classic B&W', colors: ['#000000', '#374151'] },
                    blue: { name: 'Ocean Blue', colors: ['#3b82f6', '#1d4ed8'] },
                    purple: { name: 'Royal Purple', colors: ['#a855f7', '#7e22ce'] },
                    green: { name: 'Forest Green', colors: ['#22c55e', '#15803d'] },
                    red: { name: 'Vibrant Red', colors: ['#ef4444', '#b91c1c'] },
                    orange: { name: 'Sunset Orange', colors: ['#f97316', '#c2410c'] },
                  }).map(([key, { name, colors }]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="h-auto flex-col gap-2 p-4"
                      onClick={() => setCurrentTheme(key as typeof currentTheme)}
                    >
                      <div className="flex gap-2">
                        {colors.map((color, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: 'complete',
            title: "You're All Set!",
            description: 'Start building amazing onboarding experiences',
            icon: <Rocket className="h-8 w-8" />,
            content: (
              <div className="space-y-6 text-center">
                <p className="text-lg text-muted-foreground">
                  You now know how to use the Onboarding UI component library.
                </p>
                <div className="rounded-lg bg-secondary p-6">
                  <code className="text-sm">npm install onboarding-ui</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Check out the documentation to learn more about customization options.
                </p>
              </div>
            ),
          },
        ]
      case 'feature-tour':
        return featureDemoSteps
      case 'user-setup':
        return userSetupSteps
      default:
        return []
    }
  }

  if (showOnboarding && currentDemo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-950 dark:to-gray-900">
        <OnboardingContainer
          steps={getDemoSteps()}
          onComplete={() => setShowOnboarding(false)}
          theme={themes[currentTheme]}
          showProgress={true}
          showStepIndicator={true}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Onboarding UI</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Beautiful, Apple-inspired onboarding components for React
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </div>

        <Separator className="mb-12" />

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-semibold">Choose a Demo</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-purple-500"
              onClick={() => {
                setCurrentDemo('documentation')
                setShowOnboarding(true)
              }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-purple-500/10 p-2">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                  </div>
                  <Badge className="bg-purple-500">Featured</Badge>
                </div>
                <CardTitle>Full Documentation</CardTitle>
                <CardDescription>
                  Interactive tour of all 100+ features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• All core components</li>
                  <li>• Advanced templates</li>
                  <li>• Event system & analytics</li>
                  <li>• Conditional branching</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary"
              onClick={() => {
                setCurrentDemo('basic')
                setShowOnboarding(true)
              }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <Badge>Popular</Badge>
                </div>
                <CardTitle>Basic Onboarding</CardTitle>
                <CardDescription>
                  Classic onboarding flow with theme customization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Welcome & feature overview</li>
                  <li>• Theme switcher demo</li>
                  <li>• Progress indicators</li>
                  <li>• Navigation controls</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary"
              onClick={() => {
                setCurrentDemo('feature-tour')
                setShowOnboarding(true)
              }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Sparkles className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="secondary">Templates</Badge>
                </div>
                <CardTitle>Feature Tour</CardTitle>
                <CardDescription>
                  Showcase features with cards and checklists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Feature grid layout</li>
                  <li>• Interactive checklist</li>
                  <li>• Icon badges</li>
                  <li>• Multi-column design</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary"
              onClick={() => {
                setCurrentDemo('user-setup')
                setShowOnboarding(true)
              }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-green-500/10 p-2">
                    <Rocket className="h-6 w-6 text-green-500" />
                  </div>
                  <Badge variant="secondary">Interactive</Badge>
                </div>
                <CardTitle>User Setup</CardTitle>
                <CardDescription>
                  Collect user info with forms and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Profile creation form</li>
                  <li>• Preference selection</li>
                  <li>• Avatar upload</li>
                  <li>• Summary screen</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-8">
          <h3 className="mb-4 text-xl font-semibold">Quick Start</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-background p-4">
              <code className="text-sm">npm install onboarding-ui</code>
            </div>
            <div className="rounded-lg bg-background p-4">
              <pre className="text-sm">
{`import { OnboardingContainer } from 'onboarding-ui'

<OnboardingContainer
  steps={steps}
  onComplete={() => console.log('Done!')}
  theme={{ primaryColor: '#3b82f6' }}
/>`}
              </pre>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Built with React, TypeScript, Tailwind CSS, and shadcn/ui
          </p>
          <p className="mt-2">
            <a
              href="https://github.com"
              className="hover:text-foreground transition-colors"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
