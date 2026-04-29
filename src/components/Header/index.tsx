'use client';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { localeAtom } from '@/app/providers';
import { locales } from '@/locales';

import NavList from '../NavList';

export default function Header(props: {
  isDetailPage?: boolean;
  theme?: 'light' | 'dark';
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale] = useAtom(localeAtom);
  const isDark = props.theme === 'dark';

  const headClassname = isDark
    ? props?.isDetailPage
      ? `sticky top-0 z-[120] border-b border-white/10 text-white backdrop-blur-xl ${
          isMenuOpen ? 'bg-[#040404]' : 'bg-[#040404]/[0.78]'
        }`
      : 'absolute top-0 left-0 right-0 z-[120] bg-transparent text-white'
    : props?.isDetailPage
      ? 'sticky top-0 z-40 border-b border-black/5 bg-[#f6f4ef]/80 backdrop-blur-xl'
      : 'sticky top-0 z-40 border-b border-black/5 bg-[#f6f4ef]/72 backdrop-blur-xl';

  const desktopTextClass = isDark
    ? 'group relative rounded-lg py-2 font-medium text-white/[0.88] transition-colors hover:text-white'
    : 'group relative rounded-lg py-2 font-medium transition-colors hover:text-black/45';

  const underlineClass = isDark ? 'bg-white' : 'bg-black';
  const mobilePanelClass = isDark
    ? 'absolute inset-x-0 top-full z-[110] h-[calc(100vh-5rem)] overflow-hidden border-t border-white/10 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.62)] md:hidden'
    : 'absolute inset-x-0 top-full z-[110] h-[calc(100vh-5rem)] overflow-hidden border-b border-black/10 bg-[#f6f4ef]/95 shadow-lg backdrop-blur-xl md:hidden';

  const mobileItemClass = isDark
    ? 'block rounded-2xl border border-white/0 bg-white/[0.02] px-4 py-4 font-Quark text-[2rem] uppercase leading-none tracking-[-0.03em] text-white/[0.86] transition-colors hover:border-white/10 hover:bg-white/[0.08] hover:text-white'
    : 'block rounded-2xl px-4 py-3 text-gray-700 transition-colors hover:bg-white/80';

  return (
    <header className={`${headClassname} relative`}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div
          className={`flex h-20 items-center justify-between ${
            isDark ? 'md:grid md:grid-cols-[auto_1fr_auto] md:gap-10' : ''
          }`}
        >
          {/* Desktop Navigation */}
          <nav
            className={`hidden items-center text-[15px] font-Quark md:flex ${
              isDark ? 'gap-10' : 'space-x-10'
            }`}
          >
            <Link
              href="/"
              className={`rounded-lg py-2 font-medium ${
                isDark
                  ? 'mr-10 flex items-center gap-3 text-white'
                  : 'text-black'
              }`}
            >
              <Image
                width={32}
                height={32}
                src={'/logo.svg'}
                alt={''}
                priority
                style={{ width: 32, height: 32 }}
                className={isDark ? 'invert' : ''}
              />
              {isDark ? (
                <span className="font-Lato text-[22px] font-normal tracking-[-0.04em]">
                  mira
                </span>
              ) : null}
            </Link>
            <Link href="/" className={desktopTextClass}>
              <div>{locales[locale]?.home}</div>
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`}
              />
            </Link>
            {isDark ? (
              <Link href="/projects" className={desktopTextClass}>
                <div>{locales[locale].projects}</div>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`}
                />
              </Link>
            ) : (
              <div>
                <NavList label={locales[locale].projects} />
              </div>
            )}

            <Link href="/about" className={desktopTextClass}>
              {locales[locale].about}
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`}
              />
            </Link>
          </nav>

          {isDark ? (
            <div className="hidden text-right md:block">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/46">
                Portfolio
              </div>
              <div className="mt-1 text-sm text-white/76">Shanghai / 2026</div>
            </div>
          ) : null}

          <Link
            href="/"
            className={`rounded-lg py-2 font-medium md:hidden ${isDark ? 'text-white' : 'text-black'}`}
          >
            <Image
              width={28}
              height={28}
              src={'/logo.svg'}
              alt={''}
              priority
              style={{ width: 28, height: 28 }}
              className={isDark ? 'invert' : ''}
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-full border p-2 transition-colors md:hidden ${
              isDark
                ? 'border-white/[0.18] text-white hover:bg-white/10'
                : 'border-black/10 text-gray-700 hover:bg-white/70'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <Cross1Icon className="w-5 h-5" />
            ) : (
              <HamburgerMenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={mobilePanelClass}>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,116,56,0.16),transparent_34%),radial-gradient(circle_at_82%_2%,rgba(91,130,255,0.16),transparent_36%)]"
              aria-hidden
            />
            <nav className="relative mx-auto max-w-[1440px] space-y-2 px-6 py-6">
              <Link
                href="/"
                className={mobileItemClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {locales[locale].home}
              </Link>
              <Link
                href="/about"
                className={mobileItemClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {locales[locale].about}
              </Link>
              <Link
                href="/projects"
                className={mobileItemClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {locales[locale].projects}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
