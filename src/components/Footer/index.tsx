import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center py-4 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {`Copyright © ${new Date().getFullYear()} Mira. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
