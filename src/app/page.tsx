"use client";
import React from "react";
import { MacScrollbar } from "mac-scrollbar";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import TitleSection from "@/components/TitleSection";
import Card from "@/components/Card";
import project_cover from "../../public/project_cover.svg";

const Home: React.FC = () => {
  const cards = [
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
  ];
  const card2 = [
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
    {
      title: "ByteHi customer service upgrade",
      description:
        "客户平台是TikTok统一的用户反馈处理平台，是提升用户体验的重要工具之一。",
      image: project_cover,
      link: "#",
    },
  ];

  return (
    <MacScrollbar>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-[#0045F4] text-white flex flex-col h-[800px]">
          {/* 导航栏 */}
          <nav className="p-6">
            <ul className="flex space-x-8">
              <li>
                <Link href="/project" className="hover:opacity-80">
                  Project
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-80">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* 主要内容 */}
          <div className="container mx-auto px-6 pt-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 max-w-4xl"
            >
              <h1 className="text-[80px] font-bold leading-[90px]">
                Hello, I'm YanMin,
                <br />a product designer.
              </h1>
              <p className="text-[50px] leading-[60px] font-light opacity-90">
                I create data-driven solutions that elevate human experiences.
              </p>
            </motion.div>
          </div>

          {/* 添加向下滚动箭头 */}
          <motion.div
            className="absolute left-1/2 bottom-[160px] -translate-x-1/2 cursor-pointer z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
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

          {/* 装饰效果保持不变 */}
          <div className="absolute mx-auto inset-0 border border-white/30 h-[982px] w-[982px] border-t-0">
            <div className="absolute inset-[1px] border border-white/30 rounded-full" />
            {/* 垂直线 */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-white/30" />
            {/* 水平线 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/30" />
          </div>
        </div>

        <div>
          <div className="bg-[url(../../public/thinking.svg)] h-[530px]"></div>
        </div>

        <div className="mb-10">
          <div className="flex items-center py-[200px] justify-center">
            <TitleSection
              keyWord="ToB"
              subWords="platform design"
              label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                link={card.link}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center py-[200px] justify-center">
            <TitleSection
              keyWord="ToB"
              subWords="platform design"
              label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {card2.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                link={card.link}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center py-[200px] justify-center">
            <TitleSection
              keyWord="ToB"
              subWords="platform design"
              label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built."
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center py-[200px] justify-center">
            <TitleSection
              keyWord="ToB"
              subWords="platform design"
              label="Find out about my works: read through my case studies, have a look at final designs and try out prototypes I’ve built."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                link={card.link}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </MacScrollbar>
  );
};

export default Home;
