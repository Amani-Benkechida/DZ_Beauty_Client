import React from 'react';
import { useTranslation } from 'react-i18next';
import Offercard from './offercard';
import { useNavigate } from 'react-router-dom';
import img from './Column.png';
import img2 from './Column (1).png';
import img3 from './Column (2).png';
import img4 from './Column (3).png';

const Ofrrescard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const price = 1500;
  const discount = 10;

  return (
    <div className="mt-6">
      <div className="flex relative mb-16">
        <div className="bg-darkpink w-5 h-14 absolute ml-16"></div>
        <div className="font-thin h-10 ml-24" style={{ fontSize: '60px' }}>
          {t('ourOffers')}
        </div>
        <button
          onClick={() => navigate('/offers')}
          className="bg-darkgray absolute h-10 top-5 w-24 font-poppins right-16"
          style={{ color: '#FFFFFF', fontSize: '16px' }}
        >
          {t('viewAll')}
        </button>
      </div>
      <div className="flex font-thin gap-6 justify-center">
        <Offercard
          image={img}
          name={t('fullDayPackage')}
          time={t('mondayToWednesday')}
          price={price}
          discount={discount}
        />
        <Offercard
          image={img4}
          name={t('nailCarePackage')}
          time={t('allYear')}
          price={price}
          discount={discount}
        />
        <Offercard
          image={img3}
          name={t('massageDay')}
          time={t('novemberPack')}
          price={price}
          discount={discount}
        />
        <Offercard
          image={img2}
          name={t('facialSkinCarePack')}
          time={t('novemberPack')}
          price={price}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default Ofrrescard;
