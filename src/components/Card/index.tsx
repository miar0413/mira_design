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
    <div className="bg-white shadow-md rounded-[24px] border w-[594px]">
      <div className="p-8 pb-0">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="border-b border-0 w-[80px] my-4"></div>
        <p className="text-gray-600 mb-4 text-lg">{description}</p>
        <a
          href={link}
          className="text-blue-600 font-medium flex items-center hover:underline my-4"
        >
          View project <span className="ml-1">↗</span>
        </a>
      </div>
      {image ? (
        <div>
          <Image src={image} alt={title} className="rounded-lg" />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
