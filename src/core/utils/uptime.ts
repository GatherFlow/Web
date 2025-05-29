export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);


  return days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
}