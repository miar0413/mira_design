'use client';
import React from 'react';
import Image from 'next/image';

import Footer from '@/components/Footer';
import SmallCard from '@/components/SmallCard';
import Header from '@/components/Header';
import CardList from '@/components/Card';

const Home: React.FC = () => {
  const smallCards = [
    {
      label: 'Generative art lab',
      image: '/cover/cover_06.png',
      link: '/projects/generative_art',
    },
    {
      label: 'The filtered home',
      image: '/cover/cover_01.png',
      link: '/projects/filter_home',
    },
    {
      label: '2028 ordinary kitchen',
      image: '/cover/cover_02.png',
      link: '/projects/ordinary_kitchen',
    },
    {
      label: 'The green fitness',
      image: '/cover/cover_03.png',
      link: '/projects/green_fitness',
    },
    {
      label: 'Unfunctional Dream',
      image: '/cover/cover_04.jpg',
      link: '/projects/unfunctional_dream',
    },
    {
      label: 'Time synchronization',
      image: '/cover/cover_05.jpeg',
      link: '/projects/time_synchronization',
    },
  ];

  const listData = [
    {
      title: 'ToB',
      list: [
        {
          title: 'ByteHi customer service upgrade',
          description:
            'ByteHi is the customer service system for TikTok. It provides a seamless service experience for users through multi-scenario customer service solutions.',
          image: '/cover/Bytehi_cover.png',
          link: '/projects/byte_hi',
        },
        {
          title: 'Risk management platform for content reviewing',
          description:
            'RMP ensures the quality and safety of content on TikTok through risk monitoring technology, and provides efficient solutions for the risk response team to effeciently address risks.',
          image: '/cover/risk_cover.png',
          link: '/projects/risk_management',
        },
      ],
    },
    {
      title: 'Service Consulting',
      list: [
        {
          title: 'Digital Innovation of future mobility & Cloud service App',
          description:
            'The project focuses on smart mobility scenarios in the local market and offers an innovative C2B service model to reshape the traditional automotive industry through digitalization and cloud services.',
          image: '/cover/digital_cover.png',
          link: '/projects/digital_innovation',
        },
        {
          title: 'Life design for media & smart health community App',
          description:
            'The project expresses insights into future living scenarios of Midea through storytelling, and designs a app to help people build closer relationships with their communities.',
          image: '/cover/life_cover.gif',
          link: '/projects/life_design',
        },
        {
          title: 'Digital experience in a collaborative office space',
          description:
            'The project provides smart office scenario solutions based on the ACTIVA product for flexible office spaces with cloud service scenarios',
          image: '/cover/colink_cover.png',
          link: '/projects/office_design',
        },
        {
          title: 'For Vanke’s Mehos home life service innovation',
          description:
            'Mehos offers a range of companion services throughout the entire home-purchasing process for its customers, including inspiration, customized home selection, curated home life, and worry-free home care-six services.',
          image: '/cover/vanke_cover.png',
          link: '/projects/mehos_design',
        },
      ],
    },
  ];

  const otherListData = [
    {
      title: 'Others',
      list: [
        {
          title: 'QiaoQiao intelligent bot for chinese learning App',
          description:
            '"Qiaoqiao" Intelligent Robot provides knowledge-based services and online Chinese language courses from Huaqiao University to meet the learning needs of overseas Chinese.',
          image: '/cover/qiao_cover.png',
          link: '/projects/qiaoqiao',
        },
        {
          title: 'Yiker, an Private Guidance of Beauty&Fashion app',
          description:
            'Yiker is a personal wardrobe management platform. It offers personalized guidance and wardrobe management services by combining offline and online approaches using of live streaming and AR tech.',
          image: '/cover/yike_cover.png',
          link: '/projects/yiker',
        },
      ],
    },
  ];

  return (
    <div className="mac-scrollbar mac-scrollbar-x mac-scrollbar-y h-screen">
      <div className="top-0 bottom-0 left-0 right-0 opacity-30 z-[-1] flex items-center justify-center fixed">
        <Image
          src={'/cross_bg.svg'}
          width="1250"
          height={900}
          alt="bg"
          className="w-full h-full"
        />
      </div>
      <Header />
      <div className="max-w-7xl mx-auto pl-[60px] box-border">
        {/* 主要内容 */}
        <div className="mt-[100px] mb-[140px]">
          <div className="text-[80px] leading-[80px] font-bold font-Quark transform transition-all opacity-0 animate-fade-in">
            <div>Hello, I'm YanMin</div>
            <div>a product designer.</div>
          </div>
          <div className="mt-5 text-[50px] leading-[60px] text-[#606062] font-normal font-Lato transform transition-all opacity-0 animate-fade-in">
            <div>I create data-driven solutions that</div>
            <div>elevate human experiences.</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pl-[60px] box-border">
        <div className="flex flex-col gap-y-32 mb-10">
          <CardList listData={listData} />
        </div>
        <div className="max-w-7xl mx-auto mt-32">
          <div className="flex gap-[60px]">
            <div className="w-[100px]">
              <div className="sticky top-0 z-[10] h-[300px]">
                <div className="rotate-90 origin-left bg-[#eeeeee] w-fit">
                  <div className="text-[70px] font-Quark text-[#d6d6d6]">
                    <div className="transform leading-[80px] text-nowrap">
                      Installation
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              {smallCards.map((item, index) => {
                return (
                  <SmallCard
                    key={`${item.link}_${index}`}
                    label={item.label}
                    image={item.image}
                    link={item.link}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-32 mt-40 mb-[60px]">
          <CardList listData={otherListData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
