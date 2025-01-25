"use client";
import React from "react";
import { MacScrollbar } from "mac-scrollbar";
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
        {/* Hero Section */}
        <div className="flex-grow bg-[#0045F4] text-white flex flex-col min-h-[600px] md:h-[800px]">
          {/* 主要内容 */}
          <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-8 max-w-4xl"
            >
              <h1 className="text-4xl md:text-[80px] font-bold leading-tight md:leading-[90px]">
                <br />a product designer.
              </h1>
              <p className="text-2xl md:text-[50px] leading-normal md:leading-[60px] font-light opacity-90">
                I create data-driven solutions that elevate human experiences.
              </p>
            </motion.div>
          </div>

          {/* 向下滚动箭头 - 在移动端隐藏 */}
          <motion.div
            className="hidden md:block absolute left-1/2 bottom-[160px] -translate-x-1/2 cursor-pointer z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
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
          <div className="absolute mx-auto inset-0 border border-white/30 h-full md:h-[982px] w-full md:w-[982px] border-t-0">
            <div className="absolute inset-[1px] border border-white/30 rounded-full hidden md:block" />
            {/* 垂直线 */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-white/30" />
            {/* 水平线 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/30" />
          </div>
        </div>

        {/* Thinking Section */}
        <div>
          <div className="bg-[url(../../public/thinking.svg)] h-[300px] md:h-[530px] bg-cover bg-center"></div>
        </div>

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

        <Footer />
      </div>
    </MacScrollbar>
  );
};

export default Home;
