/**
 * Utility functions for calculating years of experience
 * Career start date: January 1, 2018
 */

const CAREER_START_DATE = new Date(2018, 0, 1); // Jan 1, 2018

/**
 * Calculate experience duration between two dates
 * @param startDate - Start date
 * @param endDate - End date (defaults to now)
 * @returns Object with years, months, totalMonths, and formatted label
 */
export function calculateExperienceDuration(startDate: Date, endDate: Date = new Date()) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  let label = '';
  if (years > 0) {
    label = `${years}+ year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    label = `${months} month${months > 1 ? 's' : ''}`;
  } else {
    label = 'Less than a month';
  }
  
  return { years, months, totalMonths, label };
}

/**
 * Calculate years of experience from career start date to now
 * @returns Number of years (floor value)
 */
export function calculateYearsOfExperience(): number {
  const { years } = calculateExperienceDuration(CAREER_START_DATE);
  return years;
}

/**
 * Get a formatted label for career years of experience
 * @returns String like "8+ years"
 */
export function getExperienceLabel(): string {
  const { label } = calculateExperienceDuration(CAREER_START_DATE);
  return label;
}

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/**
 * Converts a "Month Year" string (e.g. "April 2026") from the experience
 * data into an ISO "YYYY-MM" string for structured data. Returns undefined
 * for non-date values like "Present" so callers can omit the field rather
 * than emit a fabricated end date.
 */
export function monthYearToISO(dateStr: string): string | undefined {
  const match = dateStr.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return undefined;

  const monthIndex = MONTH_NAMES.indexOf(match[1].toLowerCase());
  if (monthIndex === -1) return undefined;

  const month = String(monthIndex + 1).padStart(2, '0');
  return `${match[2]}-${month}`;
}

export { CAREER_START_DATE };
