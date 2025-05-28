import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateDateAfterDays, formatDate, getWeekday } from '../utils/dateUtils';
import { CalendarDays, RotateCcw } from 'lucide-react';

const DateAddSubtractCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [days, setDays] = useState<number>(7);
  const [isSubtract, setIsSubtract] = useState<boolean>(false);
  const [includeStartDay, setIncludeStartDay] = useState<boolean>(true);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleCalculate = () => {
    const start = new Date(startDate);
    setResultDate(calculateDateAfterDays(start, days, isSubtract, includeStartDay));
  };

  const handleReset = () => {
    setStartDate(new Date().toISOString().split('T')[0]);
    setDays(7);
    setIsSubtract(false);
    setIncludeStartDay(true);
    setResultDate(null);
  };

  const locale = i18n.language as 'en' | 'ko';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dateAddSubtract.startDate')}
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('dateAddSubtract.days')}
            </label>
            <input
              type="number"
              id="days"
              min="1"
              value={days}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 0))}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('mode.addSubtract')}
            </label>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setIsSubtract(false)}
                className={`w-full rounded-l-md px-4 py-2 text-sm font-medium ${
                  !isSubtract
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-colors duration-200`}
              >
                {t('dateAddSubtract.add')}
              </button>
              <button
                type="button"
                onClick={() => setIsSubtract(true)}
                className={`w-full rounded-r-md px-4 py-2 text-sm font-medium ${
                  isSubtract
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-colors duration-200`}
              >
                {t('dateAddSubtract.subtract')}
              </button>
            </div>
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
            {t('dateAddSubtract.includeStartDay')}
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

        {resultDate && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
            <h3 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
              {t('dateAddSubtract.result')}
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300">
              {t('dateAddSubtract.resultText', {
                date: t('dateAddSubtract.weekday', { 
                  date: formatDate(resultDate, locale),
                  weekday: getWeekday(resultDate, locale)
                })
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateAddSubtractCalculator;