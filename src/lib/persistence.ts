export interface OnboardingProgress {
  currentStep: number
  visitedSteps: string[]
  completedSteps: string[]
  skippedSteps: string[]
  stepData: Record<string, any>
  startTime: number
  lastUpdate: number
  isComplete: boolean
  version: string
}

export interface PersistenceConfig {
  key?: string
  enabled?: boolean
  expireAfterDays?: number
  version?: string
  storage?: Storage
}

export class OnboardingPersistence {
  private key: string
  private enabled: boolean
  private expireAfterMs: number
  private version: string
  private storage: Storage

  constructor(config: PersistenceConfig = {}) {
    this.key = config.key || 'onboarding-progress'
    this.enabled = config.enabled ?? true
    this.expireAfterMs = (config.expireAfterDays || 30) * 24 * 60 * 60 * 1000
    this.version = config.version || '1.0.0'
    this.storage = config.storage || (typeof window !== 'undefined' ? localStorage : ({} as Storage))
  }

  // Save progress
  save(progress: Partial<OnboardingProgress>): void {
    if (!this.enabled) return

    try {
      const existing = this.load()
      const updated: OnboardingProgress = {
        ...existing,
        ...progress,
        lastUpdate: Date.now(),
        version: this.version,
      }

      this.storage.setItem(this.key, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save onboarding progress:', error)
    }
  }

  // Load progress
  load(): OnboardingProgress {
    if (!this.enabled) {
      return this.getDefaultProgress()
    }

    try {
      const saved = this.storage.getItem(this.key)
      if (!saved) {
        return this.getDefaultProgress()
      }

      const progress: OnboardingProgress = JSON.parse(saved)

      // Check version compatibility
      if (progress.version !== this.version) {
        console.warn('Onboarding version mismatch, resetting progress')
        this.clear()
        return this.getDefaultProgress()
      }

      // Check if expired
      if (this.isExpired(progress)) {
        console.warn('Onboarding progress expired, resetting')
        this.clear()
        return this.getDefaultProgress()
      }

      return progress
    } catch (error) {
      console.error('Failed to load onboarding progress:', error)
      return this.getDefaultProgress()
    }
  }

  // Check if can resume
  canResume(): boolean {
    if (!this.enabled) return false

    const progress = this.load()
    return (
      !progress.isComplete &&
      progress.currentStep > 0 &&
      !this.isExpired(progress)
    )
  }

  // Get resume info
  getResumeInfo(): {
    canResume: boolean
    currentStep: number
    completedSteps: number
    totalTime: number
  } | null {
    if (!this.canResume()) return null

    const progress = this.load()
    return {
      canResume: true,
      currentStep: progress.currentStep,
      completedSteps: progress.completedSteps.length,
      totalTime: Date.now() - progress.startTime,
    }
  }

  // Clear progress
  clear(): void {
    try {
      this.storage.removeItem(this.key)
    } catch (error) {
      console.error('Failed to clear onboarding progress:', error)
    }
  }

  // Update specific fields
  updateStep(step: number): void {
    this.save({ currentStep: step, lastUpdate: Date.now() })
  }

  updateStepData(stepId: string, data: any): void {
    const progress = this.load()
    this.save({
      stepData: {
        ...progress.stepData,
        [stepId]: data,
      },
    })
  }

  markStepVisited(stepId: string): void {
    const progress = this.load()
    if (!progress.visitedSteps.includes(stepId)) {
      this.save({
        visitedSteps: [...progress.visitedSteps, stepId],
      })
    }
  }

  markStepCompleted(stepId: string): void {
    const progress = this.load()
    if (!progress.completedSteps.includes(stepId)) {
      this.save({
        completedSteps: [...progress.completedSteps, stepId],
      })
    }
  }

  markStepSkipped(stepId: string): void {
    const progress = this.load()
    if (!progress.skippedSteps.includes(stepId)) {
      this.save({
        skippedSteps: [...progress.skippedSteps, stepId],
      })
    }
  }

  markComplete(): void {
    this.save({ isComplete: true, lastUpdate: Date.now() })
  }

  // Private helpers
  private isExpired(progress: OnboardingProgress): boolean {
    return Date.now() - progress.lastUpdate > this.expireAfterMs
  }

  private getDefaultProgress(): OnboardingProgress {
    return {
      currentStep: 0,
      visitedSteps: [],
      completedSteps: [],
      skippedSteps: [],
      stepData: {},
      startTime: Date.now(),
      lastUpdate: Date.now(),
      isComplete: false,
      version: this.version,
    }
  }

  // Export/Import functionality
  export(): string {
    return JSON.stringify(this.load())
  }

  import(data: string): boolean {
    try {
      JSON.parse(data) as OnboardingProgress // Validate JSON format
      this.storage.setItem(this.key, data)
      return true
    } catch {
      return false
    }
  }
}

// Helper to sync progress across tabs
export class CrossTabSync {
  private key: string
  private listeners: Array<(progress: OnboardingProgress) => void> = []

  constructor(key: string = 'onboarding-progress') {
    this.key = key

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange.bind(this))
    }
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === this.key && event.newValue) {
      try {
        const progress = JSON.parse(event.newValue) as OnboardingProgress
        this.listeners.forEach((listener) => listener(progress))
      } catch {
        // Ignore parse errors
      }
    }
  }

  onChange(callback: (progress: OnboardingProgress) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.handleStorageChange.bind(this))
    }
  }
}

// Helper to format time since last visit
export function getTimeSinceLastVisit(lastUpdate: number): string {
  const ms = Date.now() - lastUpdate
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}
