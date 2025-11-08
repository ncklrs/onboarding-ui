import { type ReactNode } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

export interface WelcomeScreenProps {
  title: string
  subtitle?: string
  description?: ReactNode
  logo?: ReactNode
  image?: string
  features?: Array<{
    icon: ReactNode
    title: string
    description: string
  }>
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function WelcomeScreen({
  title,
  subtitle,
  description,
  logo,
  image,
  features,
  primaryAction,
  secondaryAction,
  className,
}: WelcomeScreenProps) {
  return (
    <div className={cn('mx-auto max-w-4xl text-center', className)}>
      {logo && <div className="mb-8 flex justify-center">{logo}</div>}

      {image && (
        <div className="mb-8">
          <img
            src={image}
            alt={title}
            className="mx-auto h-48 w-auto object-contain"
          />
        </div>
      )}

      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mb-6 text-xl text-muted-foreground">{subtitle}</p>
      )}

      {description && (
        <div className="mb-8 text-muted-foreground">{description}</div>
      )}

      {features && features.length > 0 && (
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {primaryAction && (
          <Button size="lg" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            size="lg"
            variant="outline"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}
