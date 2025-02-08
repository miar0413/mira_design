'use client';
import React from 'react';
import { MacScrollbar } from 'mac-scrollbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAtom } from 'jotai';
import Image from 'next/image';

import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { locales } from '@/locales';
import { localeAtom } from '@/app/providers';
import SmallCard from '@/components/SmallCard';
import TitleCard from '@/components/TitleCard';

import byte_hi_cover from '../../public/cover/byte_hi_cover.png';
import risk_cover from '../../public/cover/risk_cover.png';
import digital_cover from '../../public/cover/digital_cover.png';
import life_cover from '../../public/cover/life_cover.png';
import colink_cover from '../../public/cover/colink_cover.png';
import vanke_cover from '../../public/cover/vanke_cover.png';
import qiao_cover from '../../public/cover/qiao_cover.png';
import yike_cover from '../../public/cover/yike_cover.png';
import cover_01 from '../../public/cover/cover_01.png';
import cover_02 from '../../public/cover/cover_02.png';
import cover_03 from '../../public/cover/cover_03.png';
import cover_04 from '../../public/cover/cover_04.png';
import cover_05 from '../../public/cover/cover_05.png';
import cover_06 from '../../public/cover/cover_06.png';
import tob from '../../public/cover/tob.svg';
import service from '../../public/cover/service.svg';
import install from '../../public/cover/install.svg';
import other from '../../public/cover/other.svg';
import logo from '../../public/logo.svg';

const Home: React.FC = () => {
  const [locale] = useAtom(localeAtom);

  const cards1 = [
    {
      title: 'ByteHi customer service experience upgrade',
      description:
        'ByteHi是TikTok客服服务系统。在全渠道、多场景的客服解决方案上，为C端用户提供流畅的服务体验。',
      image: byte_hi_cover,
      link: '/projects/byte_hi',
    },
    {
      title: 'Risk management platform for content reviewing',
      description:
        'RMP通过风险监测技术保障TikTok上的内容质量安全，为风险响应团队提供高效应对风险的解决方案，以提升基础内容体验。',
      image: risk_cover,
      link: '/projects/risk_management',
    },
  ];

  const card2 = [
    {
      title: 'Digital Innovation of future mobility & Cloud service app',
      description:
        '在“未来数字体验”方向下结合本土市场，研究智慧出行场景，通过数字化和云服务全面重塑传统汽车产业，提供C2B创新服务模式。',
      image: digital_cover,
      link: '/projects/digital_innovation',
    },
    {
      title: 'Life design for media & smart health community app',
      description:
        '将美的未来生活场景洞察数据用故事演绎的方式表达，并设计健康社区生活app，帮助人们与社区建立更紧密的关系。',
      image: life_cover,
      link: '/projects/life_design',
    },

    {
      title: 'Digital experience in a collaborative office space',
      description:
        '提供智能办公场景解决方案，使ACTIVA产品系列作为灵动办公空间基底，接入办公空间及办公终端等办公云服务场景中。',
      image: colink_cover,
      link: '#',
    },
    {
      title: 'For Vanke’s Mehos home life service innovation',
      description:
        'Mehos在客群购房全流程中提供的伴随式服务，包括灵感激发服务、居家定制选配服务、居家生活精选服务、居家无忧关怀服务等',
      image: vanke_cover,
      link: '#',
    },
  ];

  const card3 = [
    {
      title: 'QiaoQiao intelligent bot for chinese learning App',
      description:
        '华侨大学-侨侨中华文化传播智能机器人，通过提供知识性的服务和华大线上汉语学习课程，来满足海外侨胞的学习诉求。',
      image: qiao_cover,
      link: '/projects/digital_innovation',
    },
    {
      title: 'Yiker, an Private Guidance of Beauty&Fashion app',
      description:
        'Yiker像是私人衣橱管家平台，通过快速预约直播，AR私厨管理购买，线下线上结合，为人们提供私人指导服务和衣橱管理服务。',
      image: yike_cover,
      link: '/projects/life_design',
    },
  ];

  const smallCards = [
    {
      label: 'The filtered home',
      image: cover_01,
      link: '/projects/byte_hi',
    },
    {
      label: '2028 ordinary kitchen',
      image: cover_02,
      link: '/projects/byte_hi',
    },
    {
      label: 'The green fitness',
      image: cover_03,
      link: '/projects/byte_hi',
    },
    {
      label: 'Unfunctional Dream',
      image: cover_04,
      link: '/projects/byte_hi',
    },
    {
      label: 'Time synchronization',
      image: cover_05,
      link: '/projects/byte_hi',
    },
    {
      label: 'Generative art lab',
      image: cover_06,
      link: '/projects/byte_hi',
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
        <div className="bg-white mb-[240px]">
          <div className="max-w-7xl mx-auto">
            <TitleCard image={tob} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
              {cards1.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                />
              ))}
            </div>
            <TitleCard image={service} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
              {card2.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                />
              ))}
            </div>

            <TitleCard image={install} />

            <div className="flex items-center gap-6 justify-center flex-wrap">
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

            <TitleCard image={other} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
              {card3.map((card, cardIndex) => (
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
        </div>
        <Footer />
      </div>
    </MacScrollbar>
  );
};

export default Home;
