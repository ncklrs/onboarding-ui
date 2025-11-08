import { type ReactNode } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import { CheckCircle2, Sparkles } from 'lucide-react'

export interface SuccessScreenProps {
  title?: string
  message?: ReactNode
  icon?: ReactNode
  showConfetti?: boolean
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }>
  stats?: Array<{
    label: string
    value: string | number
  }>
  className?: string
}

export function SuccessScreen({
  title = "You're All Set!",
  message = 'Congratulations! You have successfully completed the onboarding.',
  icon,
  showConfetti = false,
  actions,
  stats,
  className,
}: SuccessScreenProps) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      {showConfetti && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Simple confetti animation */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 animate-pulse rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#ff6b6b',
                  '#4ecdc4',
                  '#45b7d1',
                  '#feca57',
                  '#ff9ff3',
                ][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="mb-6 flex justify-center">
        {icon || (
          <div className="relative">
            <div className="rounded-full bg-green-100 p-6 dark:bg-green-900">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -right-2 -top-2 animate-bounce">
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        )}
      </div>

      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>

      {message && (
        <div className="mb-8 text-lg text-muted-foreground">{message}</div>
      )}

      {stats && stats.length > 0 && (
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg bg-secondary p-4"
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {actions && actions.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {actions.map((action, index) => (
            <Button
              key={index}
              size="lg"
              variant={action.variant || 'default'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
