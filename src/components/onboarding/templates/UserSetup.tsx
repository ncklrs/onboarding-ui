import { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Avatar } from '../../ui/avatar'
import { Card, CardContent } from '../../ui/card'
import { cn } from '../../../lib/utils'

interface UserSetupFormProps {
  onSubmit?: (data: UserSetupData) => void
  className?: string
}

export interface UserSetupData {
  name: string
  email: string
  role?: string
  avatar?: string
}

export function UserSetupForm({ onSubmit, className }: UserSetupFormProps) {
  const [formData, setFormData] = useState<UserSetupData>({
    name: '',
    email: '',
    role: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24" fallback={formData.name.charAt(0)} />
        <Button type="button" variant="outline" size="sm">
          Upload Photo
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role (Optional)
          </label>
          <Input
            id="role"
            type="text"
            placeholder="Product Designer"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
        </div>
      </div>
    </form>
  )
}

interface PreferenceOption {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface PreferencesSelectorProps {
  title?: string
  options: PreferenceOption[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  multiSelect?: boolean
  className?: string
}

export function PreferencesSelector({
  title = 'Choose your preferences',
  options,
  selected,
  onSelectionChange,
  multiSelect = true,
  className,
}: PreferencesSelectorProps) {
  const handleToggle = (id: string) => {
    if (multiSelect) {
      if (selected.includes(id)) {
        onSelectionChange(selected.filter((item) => item !== id))
      } else {
        onSelectionChange([...selected, id])
      }
    } else {
      onSelectionChange([id])
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <Card
              key={option.id}
              className={cn(
                'cursor-pointer transition-all',
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2'
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleToggle(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {option.icon && (
                    <div className="rounded-lg bg-secondary p-2">
                      {option.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{option.label}</h4>
                    {option.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
