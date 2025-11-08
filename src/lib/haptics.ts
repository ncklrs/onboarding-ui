/**
 * Haptic Feedback Utilities
 * Provides vibration feedback on supported devices
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection'

interface HapticConfig {
  enabled: boolean
  respectSystemSettings: boolean
}

class HapticFeedback {
  private config: HapticConfig = {
    enabled: true,
    respectSystemSettings: true,
  }

  private patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 50, 10],
    warning: [20, 100, 20],
    error: [30, 100, 30, 100, 30],
    selection: [5],
  }

  constructor(config?: Partial<HapticConfig>) {
    this.config = { ...this.config, ...config }
  }

  // Check if haptics are supported
  private isSupported(): boolean {
    return 'vibrate' in navigator
  }

  // Check if reduced motion is preferred
  private prefersReducedMotion(): boolean {
    if (!this.config.respectSystemSettings) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Trigger haptic feedback
  trigger(pattern: HapticPattern = 'light'): void {
    if (!this.config.enabled || !this.isSupported()) {
      return
    }

    if (this.prefersReducedMotion()) {
      return
    }

    const vibrationPattern = this.patterns[pattern]
    navigator.vibrate(vibrationPattern)
  }

  // Trigger custom pattern
  triggerCustom(pattern: number[]): void {
    if (!this.config.enabled || !this.isSupported()) {
      return
    }

    if (this.prefersReducedMotion()) {
      return
    }

    navigator.vibrate(pattern)
  }

  // Enable/disable haptics
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
  }

  // Check if enabled
  isEnabled(): boolean {
    return this.config.enabled && this.isSupported()
  }
}

// Singleton instance
export const haptics = new HapticFeedback()

// React hook for haptic feedback
export function useHapticFeedback(pattern: HapticPattern = 'light') {
  return () => haptics.trigger(pattern)
}

// Haptic feedback for onboarding events
export const onboardingHaptics = {
  stepEnter: () => haptics.trigger('light'),
  stepComplete: () => haptics.trigger('success'),
  stepSkip: () => haptics.trigger('selection'),
  navigationNext: () => haptics.trigger('light'),
  navigationPrevious: () => haptics.trigger('light'),
  onboardingComplete: () => haptics.trigger('success'),
  error: () => haptics.trigger('error'),
}
