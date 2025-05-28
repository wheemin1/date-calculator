import { addDays, differenceInDays, format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';

type LocaleType = 'en' | 'ko';

export const formatDate = (date: Date, locale: LocaleType): string => {
  if (locale === 'ko') {
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
  }
  return format(date, 'MMMM d, yyyy', { locale: enUS });
};

export const getWeekday = (date: Date, locale: LocaleType): string => {
  if (locale === 'ko') {
    return format(date, 'EEEE', { locale: ko });
  }
  return format(date, 'EEEE', { locale: enUS });
};

export const calculateDaysDifference = (
  startDate: Date,
  endDate: Date,
  includeStartDay: boolean
): number => {
  const difference = differenceInDays(endDate, startDate);
  return includeStartDay ? difference + 1 : difference;
};

export const calculateDateAfterDays = (
  startDate: Date,
  days: number,
  isSubtract: boolean,
  includeStartDay: boolean
): Date => {
  const effectiveDays = includeStartDay ? days - 1 : days;
  return addDays(startDate, isSubtract ? -effectiveDays : effectiveDays);
};