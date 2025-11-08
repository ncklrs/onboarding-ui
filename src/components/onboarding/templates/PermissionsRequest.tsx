import { type ReactNode } from 'react'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { cn } from '../../../lib/utils'
import { ShieldCheck, AlertCircle } from 'lucide-react'

export interface Permission {
  id: string
  icon: ReactNode
  title: string
  description: string
  required?: boolean
  granted?: boolean
}

export interface PermissionsRequestProps {
  title?: string
  description?: ReactNode
  permissions: Permission[]
  onGrantAll?: () => void
  onGrant?: (permissionId: string) => void
  onSkip?: () => void
  grantAllLabel?: string
  skipLabel?: string
  showStatus?: boolean
  className?: string
}

export function PermissionsRequest({
  title = 'Permissions Required',
  description = 'We need your permission to provide the best experience.',
  permissions,
  onGrantAll,
  onGrant,
  onSkip,
  grantAllLabel = 'Grant All',
  skipLabel = 'Skip',
  showStatus = true,
  className,
}: PermissionsRequestProps) {
  const allGranted = permissions.every((p) => p.granted)
  const someGranted = permissions.some((p) => p.granted)

  return (
    <div className={cn('mx-auto max-w-2xl', className)}>
      <div className="mb-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {permissions.map((permission) => (
          <Card
            key={permission.id}
            className={cn(
              'transition-all',
              permission.granted && 'border-green-500 bg-green-50 dark:bg-green-950'
            )}
          >
            <CardContent className="flex items-start gap-4 p-4">
              <div
                className={cn(
                  'rounded-lg p-2',
                  permission.granted
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                    : 'bg-secondary'
                )}
              >
                {permission.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{permission.title}</h3>
                  {permission.required && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                  {showStatus && permission.granted && (
                    <span className="text-xs text-green-600">✓ Granted</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {permission.description}
                </p>
              </div>
              {!permission.granted && onGrant && (
                <Button
                  size="sm"
                  onClick={() => onGrant(permission.id)}
                  variant={permission.required ? 'default' : 'outline'}
                >
                  Allow
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!allGranted && permissions.some((p) => p.required && !p.granted) && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          <AlertCircle className="h-4 w-4" />
          <span>Some required permissions are not granted</span>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {onGrantAll && !allGranted && (
          <Button onClick={onGrantAll} className="flex-1">
            {grantAllLabel}
          </Button>
        )}
        {onSkip && (
          <Button
            onClick={onSkip}
            variant={someGranted ? 'outline' : 'ghost'}
            className={allGranted ? 'flex-1' : ''}
          >
            {allGranted ? 'Continue' : skipLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
