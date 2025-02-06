import React from 'react';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import Tooltip from '../Tooltip';

const EmailStr = 'miradesign0413@gmail.com';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <footer className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {`Copyright © ${new Date().getFullYear()} Mira. All rights reserved.`}
          </div>
        </div>
        <div>
          <>
            <Tooltip content={`Send Email To ${EmailStr}`}>
              <a href={`mailto:${EmailStr}`}>
                <EnvelopeClosedIcon className="cursor-pointer" />
              </a>
            </Tooltip>
          </>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
