export const fmtDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
}

export const fmtStartTime = (startTime: number) => {
  return new Date(startTime * 1000).toLocaleString('en', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}