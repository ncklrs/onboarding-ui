import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Keyboard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cn } from '../../lib/utils'

export interface KeyboardShortcut {
  keys: string[]
  description: string
  category?: string
}

export interface KeyboardShortcutsOverlayProps {
  shortcuts?: KeyboardShortcut[]
  showByDefault?: boolean
  triggerKey?: string
  className?: string
}

const defaultShortcuts: KeyboardShortcut[] = [
  {
    keys: ['→', 'Enter', 'Space'],
    description: 'Next step',
    category: 'Navigation',
  },
  {
    keys: ['←'],
    description: 'Previous step',
    category: 'Navigation',
  },
  {
    keys: ['Esc'],
    description: 'Skip step',
    category: 'Navigation',
  },
  {
    keys: ['?'],
    description: 'Show/hide this help',
    category: 'Help',
  },
  {
    keys: ['Tab'],
    description: 'Focus next element',
    category: 'Accessibility',
  },
  {
    keys: ['Shift', 'Tab'],
    description: 'Focus previous element',
    category: 'Accessibility',
  },
]

export function KeyboardShortcutsOverlay({
  shortcuts = defaultShortcuts,
  showByDefault = false,
  triggerKey = '?',
  className,
}: KeyboardShortcutsOverlayProps) {
  const [isOpen, setIsOpen] = useState(showByDefault)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (e.key === triggerKey || (e.shiftKey && e.key === '?')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [triggerKey])

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(shortcut)
    return acc
  }, {} as Record<string, KeyboardShortcut[]>)

  return (
    <>
      {/* Floating help button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg"
          aria-label="Show keyboard shortcuts"
        >
          <Keyboard className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className={cn('w-full max-w-2xl', className)}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Keyboard className="h-5 w-5" />
                      <CardTitle>Keyboard Shortcuts</CardTitle>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="max-h-[70vh] space-y-6 overflow-y-auto">
                    {Object.entries(groupedShortcuts).map(
                      ([category, categoryShortcuts]) => (
                        <div key={category}>
                          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {categoryShortcuts.map((shortcut, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                              >
                                <span className="text-sm">
                                  {shortcut.description}
                                </span>
                                <div className="flex gap-1">
                                  {shortcut.keys.map((key, keyIdx) => (
                                    <kbd
                                      key={keyIdx}
                                      className="rounded bg-background px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-border"
                                    >
                                      {key}
                                    </kbd>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}

                    <div className="mt-6 rounded-lg bg-primary/5 p-4">
                      <div className="flex items-start gap-2">
                        <Badge className="mt-0.5">Tip</Badge>
                        <p className="text-sm text-muted-foreground">
                          Press <kbd className="rounded bg-background px-2 py-0.5 text-xs font-semibold ring-1 ring-border">{triggerKey}</kbd> anytime to toggle this help overlay.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
