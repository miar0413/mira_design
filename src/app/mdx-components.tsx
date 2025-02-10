/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

// 自定义列表项渲染组件

const MDXcomponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-medium my-5 text-[#1f2329]" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-medium my-4 text-[#1f2329]" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium my-3 text-[#1f2329]" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-6 mb-4" {...props} />
  ),
  Image: (props: ImageProps) => {
    return (
      <Image
        width={768}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1h8ZAAAAABJRU5ErkJggg=="
        {...props}
        alt={props?.alt || ''}
      />
    );
  },
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-base font-normal text-[#1f2329]" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => {
    return <ol className="list-decimal pl-5" {...props} />;
  },
  li: (props: React.HTMLProps<HTMLLIElement>) => {
    return <li className="" {...props} />;
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 border-l-4 border-gray-200 my-4 italic text-gray-300"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-600 rounded p-1" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-600 rounded p-4 overflow-x-auto" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => {
    return <strong className="text-red-600" {...props} />;
  },
};

export default MDXcomponents;
