import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/** 한국 표준시 타임존 */
const KOREA_TIMEZONE = "Asia/Seoul";

/**
 * 현재 한국 날짜를 "YYYY년 M월 D일" 형식으로 반환합니다.
 * @returns 포맷된 한국 날짜 문자열
 */
const currentKoreaDate = () =>
  dayjs().tz(KOREA_TIMEZONE).format("YYYY년 M월 D일");

/**
 * 날짜를 한국 시간 기준 "YY/MM/DD" 형식으로 변환합니다.
 * @param date - 변환할 날짜 (Date 객체 또는 ISO 문자열)
 * @returns 포맷된 날짜 문자열
 */
const toKoreanSlashDate = (date: Date | string): string => {
  return dayjs(date).tz(KOREA_TIMEZONE).format("YY/MM/DD");
};

export {
  currentKoreaDate,
  toKoreanSlashDate,
  KOREA_TIMEZONE,
};
