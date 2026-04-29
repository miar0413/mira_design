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
    <div className="min-h-screen overflow-hidden bg-[#040404] text-[#f4f1ea]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(255,116,56,0.16),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(91,130,255,0.16),transparent_32%)]"
        aria-hidden
      />
      <Header isDetailPage theme="dark" />
      <main className="relative z-10 mx-auto mb-[100px] mt-[60px] box-border flex max-w-7xl gap-10 px-6 md:px-[60px] max-md:flex-col">
        <div className="shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
          <Image
            src={'/me.png'}
            alt=""
            width={480}
            height={600}
            className="rounded-[22px] object-cover"
          />
        </div>

        {/* 文字部分 */}
        <div className="flex-1">
          <div className="mb-6 font-Quark text-[clamp(2.5rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <div className="mb-2">{locales[locale].aboutMe.hello}</div>
            <div className="">{locales[locale].aboutMe.nameEN}</div>
          </div>
          <div className="flex flex-col gap-4 font-Lato text-[18px] leading-[1.72] text-white/66">
            <div className="">{locales[locale].aboutMe.introductionZH}</div>
            <div className="">{locales[locale].aboutMe.introduction1}</div>
            <div className="">{locales[locale].aboutMe.introduction2}</div>
            <div className="">{locales[locale].aboutMe.introduction3}</div>
            <div className="">{locales[locale].aboutMe.introduction4}</div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 font-Lato text-[18px] leading-[1.72] text-white/64 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <div className="">{locales[locale].aboutMe.introductionEN}</div>
            <div className="mt-4">
              <div className="mb-2 font-Quark font-bold text-white">
                {locales[locale].aboutMe.tiktok}
              </div>
              <div className="">{locales[locale].aboutMe.tiktokText}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-Quark font-bold text-white">
                {locales[locale].aboutMe.contentRisk}
              </div>
              <div className="">{locales[locale].aboutMe.contentRiskText}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-Quark font-bold text-white">
                {locales[locale].aboutMe.customerService}
              </div>
              <div className="">
                {locales[locale].aboutMe.customerServiceText}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-Quark font-bold text-white">
                {locales[locale].aboutMe.design}
              </div>
              <div className="mb-2">{locales[locale].aboutMe.designText1}</div>
              <div className="mb-2">{locales[locale].aboutMe.designText2}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-Quark font-bold text-white">
                {locales[locale].aboutMe.hobby}
              </div>
              <div className="mb-2">{locales[locale].aboutMe.hobbyText1}</div>
              <div className="">{locales[locale].aboutMe.hobbyText2}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer theme="dark" />
    </div>
  );
};

export default About;
