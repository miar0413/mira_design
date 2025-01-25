import React from "react";
import Image from "next/image";

interface IProps {
  title: string;
  description: string;
  image?: string;
  link: string;
}

const Card: React.FC<IProps> = ({ title, description, image, link }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 
      shadow-sm hover:shadow-lg 
      rounded-xl sm:rounded-2xl md:rounded-[24px]
      border border-gray-200 dark:border-gray-700
      w-full 
      transition-all duration-300 ease-in-out
      hover:-translate-y-1 hover:scale-[1.01]
      overflow-hidden">
      <div className="flex flex-col-reverse sm:flex-row items-start">
        {/* 文本内容区域 */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl 
            font-semibold 
            text-gray-900 dark:text-gray-100
            line-clamp-2 
            tracking-tight
            mb-2 sm:mb-3">{title}</h2>

          <div className="border-b border-gray-200 dark:border-gray-700 
            w-12 sm:w-16 md:w-20 
            my-2 sm:my-3
            opacity-60"></div>

          <p className="text-gray-600 dark:text-gray-300 
            text-sm sm:text-base 
            mb-3 sm:mb-4
            line-clamp-3 
            leading-relaxed">{description}</p>

          <a
            href={link}
            className="inline-flex items-center 
              text-blue-600 dark:text-blue-400 
              text-sm sm:text-base 
              font-medium 
              mt-2 sm:mt-3
              transition-all
              relative
              after:content-[''] after:absolute after:bottom-0 
              after:left-0 after:w-full after:h-px 
              after:bg-current after:origin-right after:scale-x-0 
              after:transition-transform after:duration-300
              group-hover:after:origin-left group-hover:after:scale-x-100"
          >
            View project
            <span className="ml-1 inline-block
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
              transition-transform duration-200">↗</span>
          </a>
        </div>

        {/* 图片区域 */}
        {image && (
          <div className="relative 
            w-full sm:w-2/5 
            aspect-[16/9] sm:aspect-[4/3] md:aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              priority
              className="object-cover object-center
                transition-all duration-300
                group-hover:scale-105
                group-hover:opacity-95"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
