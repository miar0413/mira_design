import React from 'react';

interface IProps {
  keyWord: string;
  subWords: string;
  label: string;
}

const TitleSection: React.FC<IProps> = ({ keyWord, subWords, label }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold 
        tracking-tight 
        leading-tight"
      >
        <span className="text-blue-600 dark:text-blue-400">{keyWord}</span>
        <span className="pl-2">{subWords}</span>
      </h1>
      <p
        className="text-gray-600 dark:text-gray-300 
        mt-3 sm:mt-4 md:mt-6 
        text-base sm:text-xl md:text-2xl 
        max-w-[280px] sm:max-w-[540px] md:max-w-[740px] 
        leading-relaxed 
        mx-auto"
      >
        {label}
      </p>
    </div>
  );
};

export default TitleSection;
