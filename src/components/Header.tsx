import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { CalendarRange } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <CalendarRange className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('appTitle')}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;