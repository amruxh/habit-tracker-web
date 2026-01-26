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