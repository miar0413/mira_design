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
      <Image {...props} alt={props?.alt || ''} width={1280} height={300} />
    );
  },
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="font-Lato text-[#3333333] text-[18px]" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc pl-4 text-[18px]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => {
    return <ol className="list-decimal pl-4 text-[18px]" {...props} />;
  },
  li: (props: React.HTMLProps<HTMLLIElement>) => {
    return <li className="text-[18px]" {...props} />;
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 border-l-[#c0c0c0] text-[#6e6e6e] not-italic font-Lato"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-[18px]" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="text-[18px]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => {
    return <strong className="text-[18px]" {...props} />;
  },
};

export default MDXcomponents;
