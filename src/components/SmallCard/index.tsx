import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface IProps {
  label: string;
  image: string;
  link: string;
}

const SmallCard: React.FC<IProps> = ({ label, image, link }) => {
  return (
    <Link href={link}>
      <div className="rounded-xl relative group overflow-hidden">
        <Image
          src={image}
          alt={''}
          height={358}
          width={358}
          priority
          className="rounded-xl"
        />

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-lg text-center">{label}</p>
        </div>
      </div>
    </Link>
  );
};

export default SmallCard;
