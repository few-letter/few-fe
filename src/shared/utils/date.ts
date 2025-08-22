const parseISOString = (date: Date | string): Date => {
  return typeof date === "string" ? new Date(date) : date;
};

const formatKoreanDate = (date: Date | string) => {
  const dateObj = parseISOString(date);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

const formatDateToYYYYMMDD = (date: Date | string): string => {
  const dateObj = parseISOString(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getRefreshDate = (date: Date | string): Date => {
  const dateObj = parseISOString(date);
  const REFRESH_HOUR = 5;
  const currentHour = dateObj.getHours();

  if (currentHour < REFRESH_HOUR) {
    const previousDay = new Date(dateObj);
    previousDay.setDate(dateObj.getDate() - 1);
    return previousDay;
  }

  return dateObj;
};

export {
  formatKoreanDate,
  formatDateToYYYYMMDD,
  getRefreshDate,
  parseISOString,
};
