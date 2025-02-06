import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface IProps {
  image: StaticImageData;
}

const TitleCard: React.FC<IProps> = ({ image }) => {
  return (
    <div className="flex items-center justify-center">
      <Image src={image} alt={''} width={738} priority className="my-[240px]" />
    </div>
  );
};

export default TitleCard;
