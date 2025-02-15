import React from 'react';
import { EnvelopeClosedIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import Tooltip from '../Tooltip';

const EmailStr = 'miradesign0413@gmail.com';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl px-8 mx-auto flex items-center justify-between box-border font-Quark py-11 text-[24px] leading-6">
      <div className="flex justify-between items-center">
        <div className="">
          {`Copyright © ${new Date().getFullYear()} YanMin. All rights reserved.`}
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <Tooltip content={`Send Email To ${EmailStr}`}>
            <a href={`mailto:${EmailStr}`}>
              <EnvelopeClosedIcon
                className="cursor-pointer"
                width={32}
                height={32}
              />
            </a>
          </Tooltip>
          <Tooltip content={`Send Email To ${EmailStr}`}>
            <a href={`mailto:${EmailStr}`}>
              <Image
                className="cursor-pointer"
                src="/wechat.svg"
                height={32}
                width={32}
                alt=""
              />
            </a>
          </Tooltip>
          <Tooltip content={`Send Email To ${EmailStr}`}>
            <a href={`mailto:${EmailStr}`}>
              <InstagramLogoIcon
                className="cursor-pointer"
                width={32}
                height={32}
              />
            </a>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
