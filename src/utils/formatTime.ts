export function formatMinutesToHoursAndMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toFixed(2).padStart(2, "0")}m`;
}

export function formatSecondsToHoursAndMinutes(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / (60 * 1000));
  const minutes = totalSeconds % (60 * 1000);
  return `${hours}h ${minutes.toFixed(2).padStart(2, "0")}m`;
}
