import type { OnboardingStep } from '../components/onboarding'
import { FeatureTour, Checklist } from '../components/onboarding'
import { Sparkles, Rocket, Zap, Shield, Code, Palette, Layout, Smartphone } from 'lucide-react'

export const featureDemoSteps: OnboardingStep[] = [
  {
    id: 'discover',
    title: 'Discover Features',
    description: 'Explore what makes our platform amazing',
    icon: <Sparkles className="h-8 w-8" />,
    content: (
      <FeatureTour
        columns={3}
        features={[
          {
            icon: <Code className="h-6 w-6" />,
            title: 'Developer Friendly',
            description: 'Built with TypeScript for the best DX',
            badge: 'New',
          },
          {
            icon: <Palette className="h-6 w-6" />,
            title: 'Customizable',
            description: 'Full control over colors and themes',
          },
          {
            icon: <Layout className="h-6 w-6" />,
            title: 'Multiple Layouts',
            description: 'Choose from various onboarding patterns',
          },
          {
            icon: <Smartphone className="h-6 w-6" />,
            title: 'Responsive',
            description: 'Perfect on all screen sizes',
          },
          {
            icon: <Shield className="h-6 w-6" />,
            title: 'Type Safe',
            description: 'Full TypeScript support included',
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: 'Performance',
            description: 'Optimized for speed and efficiency',
          },
        ]}
      />
    ),
  },
  {
    id: 'getting-started',
    title: 'Getting Started Checklist',
    description: 'Follow these steps to get up and running',
    icon: <Rocket className="h-8 w-8" />,
    content: (
      <div className="space-y-4">
        <Checklist
          items={[
            { text: 'Install the package with npm or yarn', completed: true },
            { text: 'Import components into your project', completed: true },
            { text: 'Configure your theme and colors', completed: true },
            { text: 'Create your first onboarding flow', completed: false },
            { text: 'Customize the experience for your users', completed: false },
            { text: 'Deploy to production', completed: false },
          ]}
        />
        <div className="mt-6 rounded-lg bg-secondary/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pro Tip:</strong> Start with a
            simple flow and iterate based on user feedback. You can always add
            more steps later!
          </p>
        </div>
      </div>
    ),
  },
]
