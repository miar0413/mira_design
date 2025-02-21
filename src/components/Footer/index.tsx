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

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl px-8 mx-auto flex items-center justify-between box-border font-Quark py-11 text-[20px] leading-6">
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
                width={30}
                height={30}
              />
            </a>
          </Tooltip>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Image
                className="cursor-pointer"
                src="/wechat.svg"
                height={30}
                width={30}
                alt=""
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
