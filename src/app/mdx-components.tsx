/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';
import { createPortal } from 'react-dom';

// 自定义列表项渲染组件

type IframeProps = React.IframeHTMLAttributes<HTMLIFrameElement> & {
  allowfullscreen?: boolean | string;
  allowFullscreen?: boolean | string;
  border?: string | number;
  frameborder?: string | number;
  framespacing?: string | number;
  referrerpolicy?: React.HTMLAttributeReferrerPolicy;
};

function normalizeEmbedSrc(src?: string) {
  if (!src) {
    return undefined;
  }

  return src.startsWith('//') ? `https:${src}` : src;
}

function VideoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose mx-auto my-12 w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="relative aspect-video w-full">{children}</div>
    </div>
  );
}

function ZoomableImage(props: ImageProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const altText = typeof props.alt === 'string' ? props.alt : '';
  const src = typeof props.src === 'string' ? props.src : undefined;

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        type="button"
        className="group block w-full cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-0 text-left shadow-[0_28px_90px_rgba(0,0,0,0.34)]"
        onClick={() => setIsOpen(true)}
        aria-label={
          altText ? `View larger image: ${altText}` : 'View larger image'
        }
      >
        <Image width={1280} height={300} {...props} alt={altText} />
      </button>
      {altText ? (
        <div className="mt-3 text-center text-[14px] text-white/46">
          {altText}
        </div>
      ) : null}

      {isOpen && src
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={altText || 'Image preview'}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
            >
              <button
                type="button"
                className="absolute inset-0 cursor-zoom-out bg-black/[0.82] backdrop-blur-xl"
                onClick={() => setIsOpen(false)}
                aria-label="Close image preview"
              />
              <button
                type="button"
                className="absolute right-4 top-4 z-[1001] flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.14] bg-white/10 font-Lato text-2xl leading-none text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors hover:bg-white/[0.18] md:right-8 md:top-8"
                onClick={() => setIsOpen(false)}
                aria-label="Close image preview"
              >
                ×
              </button>
              <div className="pointer-events-none relative z-[1000] h-[88vh] w-[92vw] max-w-[1440px]">
                <Image
                  src={src}
                  alt={altText}
                  fill
                  sizes="92vw"
                  className="object-contain drop-shadow-[0_36px_80px_rgba(0,0,0,0.62)]"
                  unoptimized
                />
                {altText ? (
                  <div className="absolute bottom-0 left-1/2 max-w-[80vw] -translate-x-1/2 rounded-full bg-black/[0.42] px-4 py-2 text-center font-Lato text-sm text-white/[0.72] backdrop-blur-xl">
                    {altText}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

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
  Image: ZoomableImage,
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="font-Lato text-[16px] text-white/68" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc pl-4 text-[16px] text-white/68" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => {
    return (
      <ol className="list-decimal pl-4 text-[16px] text-white/68" {...props} />
    );
  },
  li: (props: React.HTMLProps<HTMLLIElement>) => {
    return <li className="text-[16px] text-white/68" {...props} />;
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-white/20 pl-4 font-Lato text-white/52 not-italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    //标签样式
    <code
      className="rounded-lg bg-white/10 px-2 py-1 font-Lato text-[16px] text-white/76 after:content-none before:contain-none"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="text-[16px]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => {
    return <strong className="text-[16px] text-white" {...props} />;
  },
  iframe: ({
    allow,
    allowFullScreen,
    allowFullscreen,
    allowfullscreen,
    border: _border,
    className,
    frameBorder,
    frameborder,
    framespacing: _framespacing,
    height: _height,
    referrerPolicy,
    referrerpolicy,
    scrolling,
    src,
    title,
    width: _width,
    ...props
  }: IframeProps) => {
    void [_border, _framespacing, _height, _width];

    return (
      <div className="not-prose mx-auto my-12 w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <div className="relative aspect-video w-full">
          <iframe
            {...props}
            src={normalizeEmbedSrc(src)}
            title={title || 'Project video'}
            allow={
              allow ||
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            allowFullScreen={
              allowFullScreen ||
              allowFullscreen === true ||
              allowFullscreen === 'true' ||
              allowfullscreen === true ||
              allowfullscreen === 'true'
            }
            className={`absolute inset-0 h-full w-full ${className || ''}`}
            frameBorder={frameBorder ?? frameborder ?? 0}
            loading="lazy"
            referrerPolicy={referrerPolicy || referrerpolicy}
            scrolling={scrolling}
          />
        </div>
      </div>
    );
  },
  VideoEmbed: ({
    allow,
    referrerPolicy,
    src,
    title,
  }: Pick<IframeProps, 'allow' | 'referrerPolicy' | 'src' | 'title'>) => {
    return (
      <VideoFrame>
        <iframe
          src={normalizeEmbedSrc(src)}
          title={title || 'Project video'}
          allow={
            allow ||
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          }
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          frameBorder={0}
          loading="lazy"
          referrerPolicy={referrerPolicy}
        />
      </VideoFrame>
    );
  },
  video: ({
    children,
    className,
    controls = true,
    ...props
  }: React.VideoHTMLAttributes<HTMLVideoElement>) => {
    return (
      <div className="not-prose mx-auto my-12 w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        {/* MDX project videos are legacy portfolio assets and do not ship captions. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          {...props}
          className={`block aspect-video h-auto w-full object-cover ${className || ''}`}
          controls={controls}
          playsInline
          preload="metadata"
        >
          {children}
        </video>
      </div>
    );
  },
  ProjectVideo: ({
    src,
    title,
    type = 'video/mp4',
  }: {
    src: string;
    title?: string;
    type?: string;
  }) => {
    return (
      <div
        aria-label={title}
        className="not-prose mx-auto my-12 w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.42)]"
      >
        {/* MDX project videos are legacy portfolio assets and do not ship captions. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="block aspect-video h-auto w-full object-cover"
          controls
          playsInline
          preload="metadata"
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  },
  ScrollView: (
    props: React.HTMLAttributes<HTMLDivElement> & { content: string }
  ) => {
    return (
      <div className="flex justify-center">
        <div className="text-nowrap whitespace-nowrap inline-flex bg-[#e3ff0f] !text-[#292828] !text-[22px] overflow-hidden max-w-[880px] min-w-[880px] relative">
          <div className="inline-block animate-scrollText font-Lato">
            <span className="whitespace-nowrap">{props.content}</span>
          </div>
        </div>
      </div>
    );
  },
};

export default MDXcomponents;
