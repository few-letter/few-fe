import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const KOREA_TIMEZONE = "Asia/Seoul";

const currentKoreaDate = () => dayjs().tz(KOREA_TIMEZONE).format("YYYY년 M월 D일");

const toKoreanSlashDate = (date: Date | string): string => {
  return dayjs(date).tz(KOREA_TIMEZONE).format("YY/MM/DD");
};

export {
  currentKoreaDate,
  toKoreanSlashDate,
  KOREA_TIMEZONE,
};
