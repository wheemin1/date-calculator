import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';
import Header from './components/Header';
import DateDifferenceCalculator from './components/DateDifferenceCalculator';
import DateAddSubtractCalculator from './components/DateAddSubtractCalculator';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'difference' | 'addSubtract'>('difference');

  // Set page title based on language
  useEffect(() => {
    document.title = t('appTitle');
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('difference')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'difference'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } transition-all duration-200`}
            >
              {t('mode.difference')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('addSubtract')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'addSubtract'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } transition-all duration-200`}
            >
              {t('mode.addSubtract')}
            </button>
          </div>
        </div>

        <div className="transition-opacity duration-300">
          {activeTab === 'difference' ? (
            <DateDifferenceCalculator />
          ) : (
            <DateAddSubtractCalculator />
          )}
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Date Calculator
        </div>
      </footer>
    </div>
  );
}

export default App;