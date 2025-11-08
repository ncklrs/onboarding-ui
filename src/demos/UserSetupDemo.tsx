import { useState } from 'react'
import type { OnboardingStep } from '../components/onboarding'
import { UserSetupForm, PreferencesSelector, type UserSetupData } from '../components/onboarding'
import { User, Settings, CheckCircle } from 'lucide-react'
import { Code, Palette, Zap, Users } from 'lucide-react'

export const UserSetupDemo = () => {
  const [userData, setUserData] = useState<UserSetupData>({
    name: '',
    email: '',
    role: '',
  })
  const [preferences, setPreferences] = useState<string[]>([])

  const userSetupSteps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Create Your Profile',
      description: 'Tell us a bit about yourself',
      icon: <User className="h-8 w-8" />,
      content: (
        <UserSetupForm
          onSubmit={(data) => {
            setUserData(data)
            console.log('User data:', data)
          }}
        />
      ),
    },
    {
      id: 'preferences',
      title: 'Set Your Preferences',
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
              id: 'marketing',
              label: 'Marketing',
              description: 'Growth and promotion',
              icon: <Zap className="h-5 w-5" />,
            },
            {
              id: 'management',
              label: 'Management',
              description: 'Team and project management',
              icon: <Users className="h-5 w-5" />,
            },
          ]}
          selected={preferences}
          onSelectionChange={setPreferences}
          multiSelect={true}
        />
      ),
    },
    {
      id: 'complete',
      title: "You're All Set!",
      description: 'Your profile has been created',
      icon: <CheckCircle className="h-8 w-8" />,
      content: (
        <div className="space-y-6 text-center">
          <div className="rounded-lg bg-secondary/50 p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Name:</strong>{' '}
              {userData.name || 'Not set'}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="text-foreground">Email:</strong>{' '}
              {userData.email || 'Not set'}
            </p>
            {userData.role && (
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">Role:</strong> {userData.role}
              </p>
            )}
            {preferences.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">Interests:</strong>{' '}
                {preferences.join(', ')}
              </p>
            )}
          </div>
          <p className="text-muted-foreground">
            Start exploring and make the most of your experience!
          </p>
        </div>
      ),
    },
  ]

  return userSetupSteps
}
