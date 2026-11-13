const millisecondsPerHour = 3_600_000;

// Preserve simulated milliseconds instead of accumulating fractional-hour drift.
export const normalizeTime = (hours: number) => Math.round(hours * millisecondsPerHour) / millisecondsPerHour;

export function formatTime(hours: number): string {
  const minutes = Math.floor(Math.round(hours * millisecondsPerHour) / 60_000);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
