import React from "react";

interface IProps {
  keyWord: string;
  subWords: string;
  label: string;
}

const TitleSection: React.FC<IProps> = ({ keyWord, subWords, label }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        <span className="text-blue-600">{keyWord}</span>
        <span className="pl-2">{subWords}</span>
      </h1>
      <p className="text-gray-600 mt-4 text-2xl w-[740px] text-wrap">{label}</p>
    </div>
  );
};

export default TitleSection;
