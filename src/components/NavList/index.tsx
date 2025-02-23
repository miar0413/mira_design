import React from 'react';
import Link from 'next/link';
import { HoverCard } from '@radix-ui/themes';

import { navList } from '@/app/const';

const NavList: React.FC<{ label: string }> = ({ label }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <span className="py-2 rounded-lg font-medium relative group hover:text-[#c4c4c4] cursor-pointer">
          {label}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
        </span>
      </HoverCard.Trigger>
      <HoverCard.Content className="">
        <div className="bg-white box-border w-[300px] rounded-lg shadow-md p-4 max-h-[500px] mac-scrollbar mac-scrollbar-x mac-scrollbar-y flex flex-col gap-4 font-Lato">
          {navList.map((item, index) => {
            return (
              <div
                key={item.title}
                className={` ${index === 0 ? '' : 'border-t pt-4'} border-[#d3d3d3db]`}
              >
                <div
                  className={`font-Lato truncate text-[14px] text-[#7e7e7e]`}
                >
                  {item.title}
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  {item.children.map((child) => {
                    return (
                      <Link key={child.link || ''} href={child.link || ''}>
                        <div
                          key={child.title}
                          className="hover:font-bold truncate font-normal hover:bg-[#f5f5f5] hover:text-[#000000] cursor-pointer px-1 rounded"
                        >
                          {child.title}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default NavList;
