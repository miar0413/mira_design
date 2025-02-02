'use client';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

import { localeAtom } from '@/app/providers';
import { locales } from '@/locales';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale] = useAtom(localeAtom);

  return (
    <header
      className="sticky top-0 z-50 
      border-b border-gray-200/80 dark:border-gray-800/80 
      bg-white/80 dark:bg-gray-900/90 
      backdrop-blur-sm 
      transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors"
            >
              {locales[locale]?.home}
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors"
            >
              {locales[locale].projects}
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 rounded-lg
                text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors"
            >
              {locales[locale].about}
            </Link>
          </nav>

          {/* Logo
          <div className="flex-shrink-0 ">
            <Link
              href="/"
              className="text-xl font-bold 
              bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 
              bg-clip-text text-transparent 
              hover:opacity-80 transition-opacity"
            >
              <Image className="bg-[#0045F4] rounded" src={logo} alt={''} />
            </Link>
          </div> */}

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
              {/* <button
                onClick={() => {
                  setLocale(locale === 'zh' ? 'en' : 'zh');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors"
              >
                {locales[locale].switchLanguage}
              </button> */}
              {/* <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors"
              >
                {theme === 'dark'
                  ? locales[locale].lightMode
                  : locales[locale].darkMode}
              </button> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
