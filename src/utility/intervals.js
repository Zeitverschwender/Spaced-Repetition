export function convertCumulativeDaysToDayMonth(cumulativeDays) {
  return cumulativeDays.map((item, i) => {
    const currentValue = item - (cumulativeDays[i - 1] || 0);

    const days = currentValue % 30;
    const months = Math.floor(currentValue / 30);
    return months === 0 ? [days, "day", i] : [months, "month", i];
  });
}
