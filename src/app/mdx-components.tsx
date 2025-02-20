/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

// 自定义列表项渲染组件

const MDXcomponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="font-Quark mb-8 text-[50px]" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="font-bold font-Quark" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="font-bold font-Quark" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="font-bold font-Quark" {...props} />
  ),
  Image: (props: ImageProps) => {
    return (
      <div>
        <Image width={1280} height={300} {...props} alt={props?.alt || ''} />
        {props?.alt ? (
          <div className="text-center text-[14px] mt-[-20px] text-[#6F6F6F]">
            {props?.alt || ''}
          </div>
        ) : null}
      </div>
    );
  },
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="font-Lato text-[#3333333] text-[16px]" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc pl-4 text-[16px]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => {
    return <ol className="list-decimal pl-4 text-[16px]" {...props} />;
  },
  li: (props: React.HTMLProps<HTMLLIElement>) => {
    return <li className="text-[16px]" {...props} />;
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 border-l-[#c0c0c0] text-[#6e6e6e] not-italic font-Lato"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    //标签样式
    <code
      className="text-[16px] font-Lato after:content-none before:contain-none bg-[#E0DFDF] px-2 py-1 rounded-lg text-[#242424]"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="text-[16px]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => {
    return <strong className="text-[16px]" {...props} />;
  },
};

export default MDXcomponents;
