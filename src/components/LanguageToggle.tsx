import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    localStorage.setItem('dateCalculatorLanguage', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md 
                bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 
                dark:text-indigo-200 dark:hover:bg-indigo-800 transition-all duration-200"
      aria-label={t('settings.language')}
    >
      <Languages size={16} />
      <span>{i18n.language === 'ko' ? 'English' : '한국어'}</span>
    </button>
  );
};

export default LanguageToggle;