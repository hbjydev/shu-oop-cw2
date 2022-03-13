/**
 * Adds a number of hours to the date provided
 * @param date The date to add hours to
 * @param hours The number of hours to add
 * @returns The original date object, plus the hours given
 */
export function addHours(date: Date, hours: number): Date {
  const toAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + toAdd);
  return date;
}
