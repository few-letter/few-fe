const formatKoreanDate = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export { formatKoreanDate };
