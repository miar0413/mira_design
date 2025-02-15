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
      label: 'The filtered home',
      image: '/cover/cover_01.png',
      link: '/projects/byte_hi',
    },
    {
      label: '2028 ordinary kitchen',
      image: '/cover/cover_02.png',
      link: '/projects/byte_hi',
    },
    {
      label: 'The green fitness',
      image: '/cover/cover_03.png',
      link: '/projects/byte_hi',
    },
    {
      label: 'Unfunctional Dream',
      image: '/cover/cover_04.jpg',
      link: '/projects/byte_hi',
    },
    {
      label: 'Time synchronization',
      image: '/cover/cover_05.jpeg',
      link: '/projects/byte_hi',
    },
    {
      label: 'Generative art lab',
      image: '/cover/cover_06.png',
      link: '/projects/byte_hi',
    },
  ];

  const listData = [
    {
      title: 'Latest  To B Projects',
      list: [
        {
          title: 'ByteHi customer service upgrade',
          description:
            'ByteHi是TikTok客服服务系统。在全渠道、多场景的客服解决方案上，为C端用户提供流畅的服务体验。',
          image: '/cover/Bytehi_cover.png',
          link: '/projects/byte_hi',
        },
        {
          title: 'Risk management platform for content reviewing',
          description:
            'RMP通过风险监测技术保障TikTok上的内容质量安全，为风险响应团队提供高效应对风险的解决方案，以提升基础内容体验。',
          image: '/cover/risk_cover.png',
          link: '/projects/risk_management',
        },
      ],
    },
    {
      title: 'Service Consulting Project ',
      list: [
        {
          title: 'Digital Innovation of future mobility & Cloud service app',
          description:
            '在“未来数字体验”方向下结合本土市场，研究智慧出行场景，通过数字化和云服务全面重塑传统汽车产业，提供C2B创新服务模式。',
          image: '/cover/digital_cover.png',
          link: '/projects/digital_innovation',
        },
        {
          title: 'Life design for media & smart health community app',
          description:
            '将美的未来生活场景洞察数据用故事演绎的方式表达，并设计健康社区生活app，帮助人们与社区建立更紧密的关系。',
          image: '/cover/life_cover.gif',
          link: '/projects/life_design',
        },
        {
          title: 'Digital experience in a collaborative office space',
          description:
            '提供智能办公场景解决方案，使ACTIVA产品系列作为灵动办公空间基底，接入办公空间及办公终端等办公云服务场景中。',
          image: '/cover/colink_cover.png',
          link: '#',
        },
        {
          title: 'For Vanke’s Mehos home life service innovation',
          description:
            'Mehos在客群购房全流程中提供的伴随式服务，包括灵感激发服务、居家定制选配服务、居家生活精选服务、居家无忧关怀服务等',
          image: '/cover/vanke_cover.png',
          link: '#',
        },
      ],
    },
  ];

  const otherListData = [
    {
      title: 'Other projects',
      list: [
        {
          title: 'QiaoQiao intelligent bot for chinese learning App',
          description:
            '华侨大学-侨侨中华文化传播智能机器人，通过提供知识性的服务和华大线上汉语学习课程，来满足海外侨胞的学习诉求。',
          image: '/cover/qiao_cover.png',
          link: '/projects/digital_innovation',
        },
        {
          title: 'Yiker, an Private Guidance of Beauty&Fashion app',
          description:
            'Yiker像是私人衣橱管家平台，通过快速预约直播，AR私厨管理购买，线下线上结合，为人们提供私人指导服务和衣橱管理服务。',
          image: '/cover/yike_cover.png',
          link: '/projects/life_design',
        },
      ],
    },
  ];

  return (
    <div className="mac-scrollbar mac-scrollbar-x mac-scrollbar-y scrollbar-hidden !relative">
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
        <div className="mt-[60px] mb-[140px]">
          <div className="text-[80px] leading-[80px] font-bold font-Quark">
            <div>Hello, I'm YanMin</div>
            <div>a product designer.</div>
          </div>
          <div className="mt-5 text-[50px] leading-[60px] text-[#606062] font-normal font-Lato">
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
          <div className="flex gap-[80px]">
            <div className="w-[100px] pl-8">
              <div className="sticky top-[150px]">
                <div className="rotate-90 origin-left">
                  <div className="text-[70px] font-Quark text-[#d6d6d6]">
                    <div className="transform leading-[80px] text-nowrap">
                      Installation art
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

        <div className="flex flex-col gap-y-32 mt-32 mb-[60px]">
          <CardList listData={otherListData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
