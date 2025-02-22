import React from 'react';
import Cardperstatire from './Cardperstatire';
import img from './image.png';
import img2 from './image (1).png';
import img3 from './image (2).png';
import img4 from './image (3).png';

import im from './arrow-right.png';
import { useTranslation } from 'react-i18next';

const Cardsprestatiare = () => {
  const { t } = useTranslation();

  return (
    <div className="p-16">
      <div className="flex relative mb-16">
        <div className="bg-darkpink w-5 h-14 absolute left-0"></div>
        <div className="font-thin ml-7 h-20" style={{ fontSize: '50px' }}>
          {t('ourServiceProviders')}
        </div>
      </div>
      <div className="flex font-thin gap-6">
        <Cardperstatire image={img} name="Hiba Bella" desc={t('nailsSpecialist')} />
        <Cardperstatire image={img4} name="Ner Dekh" desc={t('nailsSpecialist')} />
        <Cardperstatire image={img3} name="Amina" desc={t('hairSpecialist')} />
        <Cardperstatire image={img2} name="Ouerdia" desc={t('makeupHairSpecialist')} />
      </div>
      <div className="flex items-center justify-center h-48">
        <button
          style={{ background: '#323232', color: 'white' }}
          className="flex items-center relative space-x-2 w-36 h-10"
        >
          <div className="ml-2 pt-1 text-lg font-poppins">{t('viewMore')}</div>
          <img src={im} alt="icon" className="w-6 h-5 absolute right-3 top-3" />
        </button>
      </div>
    </div>
  );
};

export default Cardsprestatiare;
