import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface IProps {
  title: string;
  description: string;
  image?: StaticImageData;
  link: string;
}

const Card: React.FC<IProps> = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-3xl borderborder-gray-200 ">
      <div className="flex flex-col">
        {/* 文本内容区域 */}
        <div className="px-8 pt-8">
          <h1 className="text-3xl font-semibold w-[460px] line-clamp-2">
            {title}
          </h1>
          <div className="border-b border-gray-500 w-20 my-3" />
          <p className="text-gray-500 line-clamp-3">{description}</p>
          <a
            href={link}
            className="inline-flex items-center text-blue-600 my-3"
          >
            View project
            <span className="ml-1 inline-block">↗</span>
          </a>
        </div>
        {/* 图片区域 */}
        {image && (
          <div className="relative h-[380px]">
            <Image
              src={image}
              alt={title}
              priority
              fill
              className="rounded-b-3xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
