import React from 'react';
import Image from 'next/image';

interface IProps {
  image: string;
}

const TitleCard: React.FC<IProps> = ({ image }) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image}
        alt={''}
        width={738}
        height={124}
        priority
        className="my-[240px]"
      />
    </div>
  );
};

export default TitleCard;
