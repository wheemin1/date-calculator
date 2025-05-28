import { describe, it, expect } from 'vitest';
import { calculateDaysDifference, calculateDateAfterDays, formatDate, getWeekday } from './dateUtils';

describe('dateUtils', () => {
  describe('calculateDaysDifference', () => {
    it('should calculate difference between two dates correctly', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-10');
      
      expect(calculateDaysDifference(startDate, endDate, false)).toBe(9);
      expect(calculateDaysDifference(startDate, endDate, true)).toBe(10);
    });

    it('should handle same dates', () => {
      const date = new Date('2024-01-01');
      
      expect(calculateDaysDifference(date, date, false)).toBe(0);
      expect(calculateDaysDifference(date, date, true)).toBe(1);
    });
  });

  describe('calculateDateAfterDays', () => {    it('should add days correctly', () => {
      const startDate = new Date('2024-01-01');
      const result = calculateDateAfterDays(startDate, 5, false, false);
      expect(result).toEqual(new Date('2024-01-06'));
    });

    it('should subtract days correctly', () => {
      const startDate = new Date('2024-01-10');
      const result = calculateDateAfterDays(startDate, 5, true, false);
      expect(result).toEqual(new Date('2024-01-05'));
    });    it('should handle includeStartDay correctly', () => {
      const startDate = new Date('2024-01-01');
      const resultAdd = calculateDateAfterDays(startDate, 5, false, true);
      const resultSubtract = calculateDateAfterDays(startDate, 5, true, true);
      
      expect(resultAdd).toEqual(new Date('2024-01-05'));
      expect(resultSubtract).toEqual(new Date('2023-12-28'));
    });
  });

  describe('formatDate', () => {
    it('should format date in Korean correctly', () => {
      const date = new Date('2024-01-01');
      expect(formatDate(date, 'ko')).toBe('2024년 01월 01일');
    });

    it('should format date in English correctly', () => {
      const date = new Date('2024-01-01');
      expect(formatDate(date, 'en')).toBe('January 1, 2024');
    });
  });

  describe('getWeekday', () => {
    it('should return weekday in Korean correctly', () => {
      const date = new Date('2024-01-01'); // Monday
      expect(getWeekday(date, 'ko')).toBe('월요일');
    });

    it('should return weekday in English correctly', () => {
      const date = new Date('2024-01-01'); // Monday
      expect(getWeekday(date, 'en')).toBe('Monday');
    });
  });
});
