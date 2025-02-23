'use client';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { localeAtom } from '@/app/providers';
import { locales } from '@/locales';

import NavList from '../NavList';

export default function Header(props: { isDetailPage?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale] = useAtom(localeAtom);

  const headClassname = props?.isDetailPage
    ? 'opacity-100 sticky top-0 z-[10] bg-opacity-10 backdrop-filter backdrop-blur-lg'
    : 'opacity-100';

  return (
    <header className={headClassname}>
      <div className="max-w-7xl mx-auto box-border">
        <div className="flex justify-between h-20">
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-12 text-[16px] font-Quark mt-8">
            <Link href="/" className="py-2 rounded-lg text-black font-medium">
              <Image width={32} height={32} src={'/logo.svg'} alt={''} />
            </Link>
            <Link
              href="/"
              className="py-2 rounded-lg font-medium relative group hover:text-[#c4c4c4]"
            >
              <div className="">{locales[locale]?.home}</div>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="">
              <NavList label={locales[locale].projects} />
            </div>

            <Link
              href="/about"
              className="py-2 rounded-lg font-medium relative group hover:text-[#c4c4c4]"
            >
              {locales[locale].about}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg
              text-gray-700 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors"
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
          <div
            className="md:hidden 
            absolute top-16 left-0 right-0 
            bg-white dark:bg-gray-900 
            border-b border-gray-200 dark:border-gray-800
            shadow-lg"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-4 py-2 rounded-lg
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {locales[locale].home}
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 rounded-lg
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {locales[locale].about}
              </Link>
              <Link
                href="/projects"
                className="block px-4 py-2 rounded-lg
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors"
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
