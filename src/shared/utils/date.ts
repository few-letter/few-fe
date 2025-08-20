const formatKoreanDate = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getRefreshDate = (date: Date): Date => {
  const REFRESH_HOUR = 5;
  const currentHour = date.getHours();

  if (currentHour < REFRESH_HOUR) {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1);
    return previousDay;
  }

  return new Date(date);
};

export { formatKoreanDate, formatDateToYYYYMMDD, getRefreshDate };
