import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

interface IProps {
  title: string;
  description: string;
  image?: string;
  link: string;
}

interface IListProps {
  title: string;
  list: IProps[];
}

export const Card: React.FC<IProps> = (project) => {
  return (
    <div className="flex gap-6">
      <div className="w-[320px]">
        <div className="font-Quark text-[46px] font-bold leading-[52px]">
          {project.title}
        </div>
        <div className="my-8 border-b border-black w-[100px] border-[2px]"></div>
        <div className="text-[#606062] font-Lato text-lg">
          {project.description}
        </div>
        <div className="my-8">
          <Link href={project.link} className="font-bold font-Quark flex">
            <span className="text-2xl">View Project</span>
            <span className="flex items-center justify-center">
              <ArrowTopRightIcon
                className="flex items-center justify-center"
                width={28}
                height={28}
              />
            </span>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={project.image || ''}
          width={700}
          height={450}
          className="rounded"
          alt={project.image || ''}
        />
      </div>
    </div>
  );
};

const CardList: React.FC<{ listData: IListProps[] }> = ({ listData }) => {
  return listData.map((item) => {
    return (
      <div className="flex gap-[80px]" key={item.title}>
        <div className="w-[100px] pl-8">
          <div className="sticky top-[150px]">
            <div className="rotate-90 origin-left">
              <div className="text-[70px] font-Quark text-[#d6d6d6]">
                <div className="transform leading-[80px] text-nowrap">
                  {item.title}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-y-32">
          {item.list.map((project) => {
            return <Card {...project} key={project.link} />;
          })}
        </div>
      </div>
    );
  });
};

export default CardList;
