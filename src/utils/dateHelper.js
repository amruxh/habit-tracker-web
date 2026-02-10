export const getThisDay = () =>  new Date().getDate();
export const getThisYear = () => new Date().getFullYear();
export const getThisMonth = () => new Date().getMonth();

export const getThisYearAndMonth = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Calculate time difference like 1s ago 1m ago 1d ago 1w ago 1m ago 1y ago
export const getTimeDifference = (dateString) => {
  const now = new Date();

  // Fix Supabase timestamp:
  // 1) remove microseconds
  // 2) force UTC with Z
  const safeDateString = dateString
    .split('.')[0]        // remove microseconds
    .concat('Z');         // treat as UTC

  const date = new Date(safeDateString);

  const diff = now.getTime() - date.getTime();

  if (diff < 0) return "just now"; // safety

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 5) return "just now";
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};
