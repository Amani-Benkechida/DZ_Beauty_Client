import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n, t } = useTranslation(); // Access i18n object and t function

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value; // Get the selected language
    i18n.changeLanguage(selectedLanguage); // Change the language dynamically
  };
  
  return (
    <div className='pt-2 pb-2 bg-headerBg pl-4 font-poppins pr-4 text-[#EDDADA]'>
      <div className="flex gap-[231px] justify-end pr-[200px]">
        <p>{t('header.saleMessage')}</p> {/* Use translation key */}
        <button>{t('header.bookNow')}</button> {/* Use translation key */}
        <select
          className='bg-transparent border-none outline-none'
          onChange={handleLanguageChange} // Listen for changes in the dropdown
          defaultValue={i18n.language} // Set the current language as the default value
        >
          <option value="fr">anglais</option>
          <option value="ar">عربي</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
