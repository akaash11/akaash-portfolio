/**
 * Analytics tracking utility
 * 
 * This is a scaffold for analytics integration.
 * Currently logs events to console in development.
 * Can be easily swapped for Plausible, Umami, GA4, or other providers.
 */

interface AnalyticsEvent {
  eventName: string;
  payload?: Record<string, unknown>;
  timestamp?: string;
}

export function track(eventName: string, payload?: Record<string, unknown>): void {
  const event: AnalyticsEvent = {
    eventName,
    payload,
    timestamp: new Date().toISOString(),
  };

  // Development: Log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }

  // Production: Add your analytics provider here
  // Examples:
  
  // Plausible:
  // if (window.plausible) {
  //   window.plausible(eventName, { props: payload });
  // }

  // Umami:
  // if (window.umami) {
  //   window.umami.track(eventName, payload);
  // }

  // GA4:
  // if (window.gtag) {
  //   window.gtag('event', eventName, payload);
  // }

  // Custom API endpoint:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event),
  // });
}

// Common events helper functions
export const analytics = {
  trackProjectClick: (projectName: string, linkType: 'live' | 'github' | 'devpost') => {
    track('project_link_click', { projectName, linkType });
  },

  trackResumeClick: (location: string) => {
    track('resume_click', { location });
  },

  trackContactSubmit: (success: boolean) => {
    track('contact_submit', { success });
  },

  trackSectionView: (sectionName: string) => {
    track('section_view', { sectionName });
  },
};
