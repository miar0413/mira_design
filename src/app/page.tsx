'use client';
import React from 'react';
import { MacScrollbar } from 'mac-scrollbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAtom } from 'jotai';
import Image from 'next/image';

import Footer from '@/components/Footer';
import TitleSection from '@/components/TitleSection';
import Card from '@/components/Card';
import { locales } from '@/locales';
import { localeAtom } from '@/app/providers';

import project_cover from '../../public/project_cover.svg';
import logo from '../../public/logo.svg';

const Home: React.FC = () => {
  const [locale] = useAtom(localeAtom);

  const cards = [
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
  ];
  const card2 = [
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
    {
      title: 'ByteHi customer service upgrade',
      description:
        '客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。',
      image: project_cover,
      link: '#',
    },
  ];

  return (
    <MacScrollbar>
      <div className="min-h-screen flex flex-col ">
        <div className="bg-[#0045F4]">
          <div className="max-w-7xl mx-auto overflow-hidden">
            {/* Hero Section */}
            <div className="flex-grow  text-white relative flex flex-col h-[880px] overflow-hidden">
              <header className="z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                      <Link
                        href="/"
                        className="px-4 py-2 rounded-lg  text-white hover:bg-[#0062d6] font-medium"
                      >
                        {locales[locale]?.home}
                      </Link>
                      <Link
                        href="/projects"
                        className="px-4 py-2 rounded-lg  text-white hover:bg-[#0062d6] font-medium"
                      >
                        {locales[locale].projects}
                      </Link>

                      <Link
                        href="/about"
                        className="px-4 py-2 rounded-lg  text-white hover:bg-[#0062d6] font-medium"
                      >
                        {locales[locale].about}
                      </Link>
                    </nav>

                    <div>
                      <Link
                        href="/"
                        className="px-4 py-2 rounded-lg  text-white hover:bg-[#0062d6] font-medium"
                      >
                        <Image src={logo} alt={''} />
                      </Link>
                    </div>
                  </div>
                </div>
              </header>

              {/* 主要内容 */}
              <div className="container mx-auto px-12 pl-24 pt-36 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  <h1 className="text-7xl leading-tight">Hello, I'm YanMin</h1>
                  <h1 className="text-7xl leading-tight">
                    a product designer.
                  </h1>
                  <p className="text-5xl leading-tight">
                    I create data-driven solutions that
                  </p>
                  <p className="text-5xl leading-tight">
                    elevate human experiences.
                  </p>
                </motion.div>
              </div>

              {/* 向下滚动箭头 - 在移动端隐藏 */}
              <motion.div
                className="absolute left-1/2 cursor-pointer z-20  bottom-6"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth',
                  })
                }
              >
                <svg
                  width="48"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>

              {/* 装饰效果 - 在移动端简化 */}
              <div className="absolute mx-auto inset-0 border border-white/30 h-full md:h-[982px] w-full md:w-[936px] border-t-0">
                <div className="absolute inset-[1px] border border-white/30 rounded-full hidden md:block" />
                {/* 垂直线 */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-white/30" />
                {/* 水平线 */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/30" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#eeeeee]">
          <div className="max-w-7xl mx-auto z-20">
            <div className="bg-[url(../../public/thinking.svg)] h-[300px] md:h-[530px] bg-cover bg-center"></div>
          </div>
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Projects Sections */}
            {[cards, card2].map((cardGroup, index) => (
              <div key={index} className="mb-10 px-4 md:px-0">
                <div className="flex items-center py-20 md:py-[200px] justify-center">
                  <TitleSection
                    keyWord="ToB"
                    subWords="platform design"
                    label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I've built."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
                  {cardGroup.map((card, cardIndex) => (
                    <Card
                      key={cardIndex}
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      link={card.link}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Sections */}
            <div className="mb-10 px-4 md:px-0">
              <div className="flex items-center py-20 md:py-[200px] justify-center">
                <TitleSection
                  keyWord="ToB"
                  subWords="platform design"
                  label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I've built."
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MacScrollbar>
  );
};

export default Home;
