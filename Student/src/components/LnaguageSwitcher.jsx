import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative inline-block text-left">
  {/* Dropdown button */}
  <button
    onClick={toggleDropdown}
    className="inline-flex justify-center ml-2 w-full rounded-md shadow-sm px-2 py-2 text-black focus:outline-none sm:px-4 sm:py-3 sm:text-lg"
  >
    {t('Translate')}
  </button>
  {/* Dropdown menu */}
  {isOpen && (
    <div className="absolute right-0 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        <div className="gap-1 flex p-2 flex-col sm:flex-row">
          <button onClick={() => changeLanguage('en')} className="w-full sm:w-auto text-black py-1 px-3 text-center">
            English
          </button>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <button onClick={() => changeLanguage('ar')} className="w-full sm:w-auto text-black py-1 px-3 text-center">
              العربية
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

    );
};
export default LanguageSwitcher;
