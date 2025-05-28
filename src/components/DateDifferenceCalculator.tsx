import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateDaysDifference, formatDate, getWeekday } from '../utils/dateUtils';
import { CalendarDays, RotateCcw } from 'lucide-react';

const DateDifferenceCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [includeStartDay, setIncludeStartDay] = useState<boolean>(true);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    setResult(calculateDaysDifference(start, end, includeStartDay));
  };

  const handleReset = () => {
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );
    setIncludeStartDay(true);
    setResult(null);
  };

  const locale = i18n.language as 'en' | 'ko';
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dateDifference.startDate')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dateDifference.endDate')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeStartDay"
            checked={includeStartDay}
            onChange={(e) => setIncludeStartDay(e.target.checked)}
            className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
          />
          <label htmlFor="includeStartDay" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            {t('dateDifference.includeStartDay')}
          </label>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
          >
            {t('common.calculate')}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md transition duration-200 flex items-center"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {result !== null && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
            <h3 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              {t('dateDifference.result')}
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300">
              {t('dateDifference.resultText', {
                days: result,
                startDate: t('dateDifference.weekday', { 
                  date: formatDate(startDateObj, locale),
                  weekday: getWeekday(startDateObj, locale)
                }),
                endDate: t('dateDifference.weekday', { 
                  date: formatDate(endDateObj, locale),
                  weekday: getWeekday(endDateObj, locale)
                })
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;