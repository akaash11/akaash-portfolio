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

export { CAREER_START_DATE };
