import type { OnboardingEventData } from './events'

/**
 * Analytics adapter interface
 */
export interface AnalyticsAdapter {
  track: (eventName: string, properties?: Record<string, unknown>) => void
  identify?: (userId: string, traits?: Record<string, unknown>) => void
  page?: (pageName: string, properties?: Record<string, unknown>) => void
}

/**
 * Generic analytics tracker
 */
export class OnboardingAnalytics {
  private adapters: AnalyticsAdapter[] = []

  constructor(adapters?: AnalyticsAdapter | AnalyticsAdapter[]) {
    if (adapters) {
      this.adapters = Array.isArray(adapters) ? adapters : [adapters]
    }
  }

  addAdapter(adapter: AnalyticsAdapter) {
    this.adapters.push(adapter)
  }

  trackEvent(event: OnboardingEventData) {
    const eventName = `Onboarding ${this.formatEventType(event.type)}`
    const properties = {
      stepId: event.stepId,
      stepIndex: event.stepIndex,
      timestamp: event.timestamp,
      direction: event.direction,
      ...event.metadata,
      ...event.stepData,
    }

    this.adapters.forEach((adapter) => {
      adapter.track(eventName, properties)
    })
  }

  trackStepView(stepId: string, stepIndex: number, metadata?: Record<string, unknown>) {
    this.adapters.forEach((adapter) => {
      adapter.track('Onboarding Step Viewed', {
        stepId,
        stepIndex,
        ...metadata,
      })
    })
  }

  trackCompletion(metadata?: Record<string, unknown>) {
    this.adapters.forEach((adapter) => {
      adapter.track('Onboarding Completed', metadata)
    })
  }

  trackSkip(stepId?: string, stepIndex?: number) {
    this.adapters.forEach((adapter) => {
      adapter.track('Onboarding Skipped', {
        stepId,
        stepIndex,
      })
    })
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    this.adapters.forEach((adapter) => {
      adapter.identify?.(userId, traits)
    })
  }

  private formatEventType(type: string): string {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
}

/**
 * Google Analytics adapter
 */
export class GoogleAnalyticsAdapter implements AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties)
    }
  }

  page(pageName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageName,
        ...properties,
      })
    }
  }
}

/**
 * Segment adapter
 */
export class SegmentAdapter implements AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName, properties)
    }
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify(userId, traits)
    }
  }

  page(pageName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.page(pageName, properties)
    }
  }
}

/**
 * Mixpanel adapter
 */
export class MixpanelAdapter implements AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(eventName, properties)
    }
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.identify(userId)
      if (traits) {
        (window as any).mixpanel.people.set(traits)
      }
    }
  }
}

/**
 * Amplitude adapter
 */
export class AmplitudeAdapter implements AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      (window as any).amplitude.track(eventName, properties)
    }
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      (window as any).amplitude.setUserId(userId)
      if (traits) {
        (window as any).amplitude.identify(new (window as any).amplitude.Identify().set(traits))
      }
    }
  }
}

/**
 * Console adapter for debugging
 */
export class ConsoleAdapter implements AnalyticsAdapter {
  track(eventName: string, properties?: Record<string, unknown>) {
    console.log('[Analytics]', eventName, properties)
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    console.log('[Analytics] Identify:', userId, traits)
  }

  page(pageName: string, properties?: Record<string, unknown>) {
    console.log('[Analytics] Page:', pageName, properties)
  }
}
