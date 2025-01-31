/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

const MDXcomponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
      {...props}
    />
  ),
  Image: (props: ImageProps) => (
    <Image width={768} height={300} {...props} alt={props?.alt || ''} />
  ),
  // 你可以添加其他标签的响应式样式
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-base sm:text-lg md:text-xl leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc pl-5 space-y-2 sm:space-y-3" {...props} />
  ),
};

export default MDXcomponents;
