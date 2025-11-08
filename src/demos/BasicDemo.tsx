import type { OnboardingStep, OnboardingTheme } from '../components/onboarding'
import { Sparkles, Zap, Target, Rocket, Palette } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export const basicSteps: OnboardingStep[] = [
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
]

export const themes: Record<string, OnboardingTheme> = {
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
