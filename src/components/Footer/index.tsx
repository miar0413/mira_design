'use client';

import React from 'react';
import { EnvelopeClosedIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
} from '@radix-ui/react-alert-dialog';

import Tooltip from '../Tooltip';

const EmailStr = 'miradesign0413@gmail.com';

const Footer: React.FC<{ theme?: 'light' | 'dark' }> = ({
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`relative z-10 mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-11 text-[18px] leading-6 md:flex-row md:items-center md:justify-between md:px-10 ${
        isDark
          ? 'border-t border-white/10 text-white/78'
          : 'border-t border-black/10'
      }`}
    >
      <div className="flex items-center justify-between font-Quark">
        <div>
          {`Copyright © ${new Date().getFullYear()} YanMin. All rights reserved.`}
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <Tooltip content={`Send Email To ${EmailStr}`}>
            <a href={`mailto:${EmailStr}`}>
              <EnvelopeClosedIcon
                className="cursor-pointer"
                width={30}
                height={30}
              />
            </a>
          </Tooltip>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Image
                className={`cursor-pointer ${isDark ? 'invert' : ''}`}
                src="/wechat.svg"
                height={30}
                width={30}
                alt=""
                style={{ width: 30, height: 30 }}
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <Image
                className="cursor-pointer rounded"
                src="/wechat_qr_code.JPG"
                height={320}
                width={320}
                alt=""
              />
              <div className="flex justify-end gap-4 mt-4">
                <AlertDialogAction asChild>
                  <button className="font-Quark font-bold text-lg hover:bg-gray-200 px-3 py-1 rounded">
                    确认
                  </button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <Tooltip content={`Instagram`}>
            <a
              href={'https://www.instagram.com/_mira_ym/profilecard'}
              target="_blank"
              rel="noreferrer"
            >
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
