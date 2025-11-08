import { OnboardingEventType, type OnboardingEventData } from './events'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  unlocked: boolean
  unlockedAt?: number
  condition: (stats: OnboardingStats) => boolean
}

export interface OnboardingStats {
  stepsCompleted: number
  stepsSkipped: number
  totalSteps: number
  timeSpent: number // milliseconds
  dataCollected: number
  perfectRun: boolean // No skips
  speedRun: boolean // Completed in under 2 minutes
  explorer: boolean // Visited all steps
  streak: number // Days in a row
  lastVisit?: number
}

export interface GamificationConfig {
  enabled: boolean
  showPoints: boolean
  showAchievements: boolean
  showProgress: boolean
  customAchievements?: Achievement[]
}

export class GamificationSystem {
  private stats: OnboardingStats
  private achievements: Achievement[]
  private points: number = 0
  private listeners: Array<(achievement: Achievement) => void> = []

  constructor(config?: Partial<GamificationConfig>) {
    this.stats = {
      stepsCompleted: 0,
      stepsSkipped: 0,
      totalSteps: 0,
      timeSpent: 0,
      dataCollected: 0,
      perfectRun: true,
      speedRun: false,
      explorer: false,
      streak: this.loadStreak(),
    }

    this.achievements = [
      ...defaultAchievements,
      ...(config?.customAchievements || []),
    ]

    this.loadProgress()
  }

  // Track events and update stats
  trackEvent(event: OnboardingEventData) {
    switch (event.type) {
      case OnboardingEventType.STEP_COMPLETE:
        this.stats.stepsCompleted++
        this.addPoints(10)
        break

      case OnboardingEventType.STEP_SKIP:
        this.stats.stepsSkipped++
        this.stats.perfectRun = false
        break

      case OnboardingEventType.DATA_COLLECT:
        this.stats.dataCollected++
        this.addPoints(5)
        break

      case OnboardingEventType.ONBOARDING_COMPLETE:
        const startTime = event.metadata?.startTime
        const completionTime = typeof startTime === 'number' ? event.timestamp - startTime : 0
        this.stats.timeSpent = completionTime
        this.stats.speedRun = completionTime < 120000 // 2 minutes
        this.addPoints(50)
        this.updateStreak()
        break
    }

    this.checkAchievements()
    this.saveProgress()
  }

  private addPoints(amount: number) {
    this.points += amount
  }

  getPoints(): number {
    return this.points
  }

  getStats(): OnboardingStats {
    return { ...this.stats }
  }

  getAchievements(): Achievement[] {
    return [...this.achievements]
  }

  getUnlockedAchievements(): Achievement[] {
    return this.achievements.filter((a) => a.unlocked)
  }

  private checkAchievements() {
    this.achievements.forEach((achievement) => {
      if (!achievement.unlocked && achievement.condition(this.stats)) {
        this.unlockAchievement(achievement)
      }
    })
  }

  private unlockAchievement(achievement: Achievement) {
    achievement.unlocked = true
    achievement.unlockedAt = Date.now()
    this.addPoints(achievement.points)

    // Notify listeners
    this.listeners.forEach((listener) => listener(achievement))
  }

  onAchievementUnlock(callback: (achievement: Achievement) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  private updateStreak() {
    const today = new Date().toDateString()
    const lastVisit = this.stats.lastVisit
      ? new Date(this.stats.lastVisit).toDateString()
      : null

    if (lastVisit === today) {
      // Already visited today
      return
    }

    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (lastVisit === yesterday) {
      // Consecutive day
      this.stats.streak++
    } else {
      // Streak broken
      this.stats.streak = 1
    }

    this.stats.lastVisit = Date.now()
  }

  private loadStreak(): number {
    try {
      const saved = localStorage.getItem('onboarding-streak')
      if (!saved) return 0

      const data = JSON.parse(saved)
      const lastVisit = new Date(data.lastVisit).toDateString()
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      if (lastVisit === today || lastVisit === yesterday) {
        return data.streak || 0
      }
      return 0
    } catch {
      return 0
    }
  }

  private saveProgress() {
    try {
      localStorage.setItem(
        'onboarding-gamification',
        JSON.stringify({
          stats: this.stats,
          points: this.points,
          achievements: this.achievements.map((a) => ({
            id: a.id,
            unlocked: a.unlocked,
            unlockedAt: a.unlockedAt,
          })),
        })
      )
      localStorage.setItem(
        'onboarding-streak',
        JSON.stringify({
          streak: this.stats.streak,
          lastVisit: this.stats.lastVisit,
        })
      )
    } catch {
      // Silently fail
    }
  }

  private loadProgress() {
    try {
      const saved = localStorage.getItem('onboarding-gamification')
      if (!saved) return

      const data = JSON.parse(saved)
      this.stats = { ...this.stats, ...data.stats }
      this.points = data.points || 0

      // Restore unlocked achievements
      if (data.achievements) {
        data.achievements.forEach((savedAchievement: any) => {
          const achievement = this.achievements.find(
            (a) => a.id === savedAchievement.id
          )
          if (achievement) {
            achievement.unlocked = savedAchievement.unlocked
            achievement.unlockedAt = savedAchievement.unlockedAt
          }
        })
      }
    } catch {
      // Silently fail
    }
  }

  reset() {
    this.stats = {
      stepsCompleted: 0,
      stepsSkipped: 0,
      totalSteps: 0,
      timeSpent: 0,
      dataCollected: 0,
      perfectRun: true,
      speedRun: false,
      explorer: false,
      streak: 0,
    }
    this.points = 0
    this.achievements.forEach((a) => {
      a.unlocked = false
      a.unlockedAt = undefined
    })
    localStorage.removeItem('onboarding-gamification')
  }
}

// Default achievements
const defaultAchievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Steps',
    description: 'Complete your first onboarding step',
    icon: '👣',
    points: 10,
    unlocked: false,
    condition: (stats) => stats.stepsCompleted >= 1,
  },
  {
    id: 'halfway',
    title: 'Halfway There',
    description: 'Complete 50% of the onboarding',
    icon: '🎯',
    points: 25,
    unlocked: false,
    condition: (stats) =>
      stats.totalSteps > 0 && stats.stepsCompleted >= stats.totalSteps / 2,
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Complete all onboarding steps',
    icon: '✅',
    points: 50,
    unlocked: false,
    condition: (stats) =>
      stats.totalSteps > 0 && stats.stepsCompleted === stats.totalSteps,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete onboarding without skipping any steps',
    icon: '💯',
    points: 100,
    unlocked: false,
    condition: (stats) =>
      stats.perfectRun &&
      stats.totalSteps > 0 &&
      stats.stepsCompleted === stats.totalSteps,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete onboarding in under 2 minutes',
    icon: '⚡',
    points: 75,
    unlocked: false,
    condition: (stats) => stats.speedRun,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all onboarding steps',
    icon: '🧭',
    points: 50,
    unlocked: false,
    condition: (stats) => stats.explorer,
  },
  {
    id: 'data-collector',
    title: 'Data Collector',
    description: 'Provide information in 5 or more steps',
    icon: '📊',
    points: 30,
    unlocked: false,
    condition: (stats) => stats.dataCollected >= 5,
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Visit 7 days in a row',
    icon: '🔥',
    points: 100,
    unlocked: false,
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: 'comeback',
    title: 'Welcome Back',
    description: 'Return to complete onboarding',
    icon: '👋',
    points: 25,
    unlocked: false,
    condition: (stats) =>
      stats.lastVisit !== undefined && Date.now() - stats.lastVisit > 86400000,
  },
]

// Helper function to calculate level from points
export function getLevel(points: number): number {
  return Math.floor(points / 100) + 1
}

// Helper function to get points needed for next level
export function getPointsToNextLevel(points: number): number {
  const currentLevel = getLevel(points)
  return currentLevel * 100 - points
}

// Helper to format time
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}
