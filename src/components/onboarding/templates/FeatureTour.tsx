import { Check } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { cn } from '../../../lib/utils'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
}

interface FeatureTourProps {
  features: Feature[]
  columns?: 1 | 2 | 3
  className?: string
}

export function FeatureTour({ features, columns = 3, className }: FeatureTourProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('grid gap-4', gridCols[columns])}>
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-secondary p-3 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                {feature.badge && (
                  <Badge variant="secondary">{feature.badge}</Badge>
                )}
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface ChecklistItem {
  text: string
  completed?: boolean
}

interface ChecklistProps {
  items: ChecklistItem[]
  className?: string
}

export function Checklist({ items, className }: ChecklistProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3 transition-colors hover:bg-secondary"
        >
          <div
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
              item.completed
                ? 'bg-primary text-primary-foreground'
                : 'border-2 border-muted-foreground/30'
            )}
          >
            {item.completed && <Check className="h-3 w-3" />}
          </div>
          <span
            className={cn(
              'text-sm',
              item.completed
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}
