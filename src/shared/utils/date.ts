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

const formatDateToSlashDate = (date: Date | string): string => {
  const dateObj = parseISOString(date);
  const year = dateObj.getFullYear().toString().slice(-2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const getRefreshDate = (date: Date | string): Date => {
  const dateObj = parseISOString(date);
  const REFRESH_HOUR = 5;

  const koreaTime = new Date(
    dateObj.toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
  );
  const koreaHour = koreaTime.getHours();

  if (koreaHour < REFRESH_HOUR) {
    const previousDay = new Date(koreaTime);
    previousDay.setDate(koreaTime.getDate() - 1);
    return previousDay;
  }

  return koreaTime;
};

export {
  formatKoreanDate,
  formatDateToSlashDate,
  getRefreshDate,
  parseISOString,
};
