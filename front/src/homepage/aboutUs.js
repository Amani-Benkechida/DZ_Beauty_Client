import React from 'react';
import image from './aboutimg.png'; // Ensure the image is correctly imported
import but from './ourservicesgroupe.png';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AboutUs = () => {
  const { t } = useTranslation(); // Access translation function

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-[32px] items-center">
        <div className="w1/2">
          <img src={image} alt="About Us" className="w-full h-full object-contain" />
        </div>

        <div className="w-[599px] h-[424px] flex flex-col justify-between gap-[40px]">
          <p className="font-klaristha text-[72px] leading-[72px] font-thin text-[#323232]">
            {t('aboutUs.title')} {/* Use translation key for "About Us" */}
          </p>

          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
            }}
            className="text-[#323232] mb-0"
          >
            {t('aboutUs.description')}</p>

          <button className="w-[244px] h-[67px] rounded flex items-center gap-4">
            <img className="h-[48px] w-[44.9px]" src={but} alt="Our Services" />
            <p className="font-[500] text-[20px]">{t('aboutUs.ourServices')}</p> {/* Use translation key for "Our Services" */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
