/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

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
    <p className="text-base font-normal indent-8 text-[#1f2329]" {...props} />
  ),
};

export default MDXcomponents;
