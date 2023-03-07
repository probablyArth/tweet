export function timeInHoursMinutesSeconds(jobTime: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diff = jobTime - Date.now();

  new Date(diff);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  return { hours, minutes, seconds };
}
