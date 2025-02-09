/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

const CustomOrderedList = (props: React.HTMLProps<HTMLOListElement>) => {
  return (
    <ol className="list-decimal pl-6 space-y-2 sm:space-y-3 md:space-y-4 text-gray-800 dark:text-gray-100">
      {props.children}
    </ol>
  );
};

// 自定义列表项渲染组件
const CustomListItem = (props: React.HTMLProps<HTMLLIElement>) => {
  return (
    <li className="text-sm sm:text-base md:text-lg leading-relaxed">
      {props.children}
    </li>
  );
};

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
  Image: (props: ImageProps) => (
    <Image
      width={768}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1h8ZAAAAABJRU5ErkJggg=="
      {...props}
      alt={props?.alt || ''}
    />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-base font-normal text-[#1f2329]" {...props} />
  ),
  ol: CustomOrderedList,
  li: CustomListItem,
};

export default MDXcomponents;
