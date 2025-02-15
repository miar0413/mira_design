'use client';
import React from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';

import { locales } from '@/locales';
import { localeAtom } from '@/app/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  const [locale] = useAtom(localeAtom);

  return (
    <div className="mac-scrollbar mac-scrollbar-x mac-scrollbar-y scrollbar-hidden">
      <Header />
      <div className="max-w-7xl mx-auto mb-[100px] flex mt-[60px] box-border px-[60px] gap-8">
        {/* 图片部分 */}
        <div>
          <Image
            src={'/me.png'}
            alt=""
            width={480}
            height={600}
            className="rounded-lg"
          />
        </div>

        {/* 文字部分 */}
        <div className="flex-1">
          <div className="mb-6 font-bold font-Quark text-[28px]">
            <div className="mb-2">{locales[locale].aboutMe.hello}</div>
            <div className="">{locales[locale].aboutMe.nameEN}</div>
          </div>
          <div className="flex flex-col gap-4 text-[18px] leading-[26px] font-Lato text-[#333333]">
            <div className="">{locales[locale].aboutMe.introductionZH}</div>
            <div className="">{locales[locale].aboutMe.introduction1}</div>
            <div className="">{locales[locale].aboutMe.introduction2}</div>
            <div className="">{locales[locale].aboutMe.introduction3}</div>
            <div className="">{locales[locale].aboutMe.introduction4}</div>
          </div>

          <div className="mt-8 text-[18px] leading-[26px] font-Lato text-[#333333]">
            <div className="">{locales[locale].aboutMe.introductionEN}</div>
            <div className="mt-4">
              <div className="mb-2 font-bold font-Quark">
                {locales[locale].aboutMe.tiktok}
              </div>
              <div className="">{locales[locale].aboutMe.tiktokText}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-bold font-Quark">
                {locales[locale].aboutMe.contentRisk}
              </div>
              <div className="">{locales[locale].aboutMe.contentRiskText}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-bold font-Quark">
                {locales[locale].aboutMe.customerService}
              </div>
              <div className="">
                {locales[locale].aboutMe.customerServiceText}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-bold font-Quark">
                {locales[locale].aboutMe.design}
              </div>
              <div className="mb-2">{locales[locale].aboutMe.designText1}</div>
              <div className="mb-2">{locales[locale].aboutMe.designText2}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-bold font-Quark">
                {locales[locale].aboutMe.hobby}
              </div>
              <div className="mb-2">{locales[locale].aboutMe.hobbyText1}</div>
              <div className="">{locales[locale].aboutMe.hobbyText2}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
