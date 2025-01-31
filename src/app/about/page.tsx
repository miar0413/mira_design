'use client';
import React from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';

import { locales } from '@/locales';
import { localeAtom } from '@/app/providers';

import mePic from '../../../public/me.png';

const About: React.FC = () => {
  const [locale] = useAtom(localeAtom);

  return (
    <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mx-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-8">
      {/* 图片部分 */}
      <div className="w-full lg:w-auto flex justify-center lg:block">
        <Image
          src={mePic}
          alt=""
          className="w-full max-w-[300px] lg:max-w-none rounded-lg"
        />
      </div>

      {/* 文字部分 */}
      <div className="flex-1">
        <div className="mb-6 font-bold">
          <div className="indent-8 mb-2">{locales[locale].aboutMe.hello}</div>
          <div className="indent-8">
            {locales[locale].aboutMe.introductionZH}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="indent-8">
            {locales[locale].aboutMe.introduction1}
          </div>
          <div className="indent-8">
            {locales[locale].aboutMe.introduction2}
          </div>
          <div className="indent-8">
            {locales[locale].aboutMe.introduction3}
          </div>
          <div className="indent-8">
            {locales[locale].aboutMe.introduction4}
          </div>
        </div>

        <div className="mt-8">
          <div className="indent-8">
            {locales[locale].aboutMe.introductionEN}
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2">
              {locales[locale].aboutMe.tiktok}
            </div>
            <div className="text-indent-2 indent-8">
              {locales[locale].aboutMe.tiktokText}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">
              {locales[locale].aboutMe.contentRisk}
            </div>
            <div className="indent-8">
              {locales[locale].aboutMe.contentRiskText}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">
              {locales[locale].aboutMe.customerService}
            </div>
            <div className="indent-8">
              {locales[locale].aboutMe.customerServiceText}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">
              {locales[locale].aboutMe.design}
            </div>
            <div className="indent-8">
              {locales[locale].aboutMe.designText1}
            </div>
            <div className="indent-8">
              {locales[locale].aboutMe.designText2}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">
              {locales[locale].aboutMe.hobby}
            </div>
            <div className="indent-8">{locales[locale].aboutMe.hobbyText1}</div>
            <div className="indent-8">{locales[locale].aboutMe.hobbyText2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
