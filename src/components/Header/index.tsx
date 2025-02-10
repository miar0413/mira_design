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
    <header className="sticky top-0 z-50 border-b backdrop-blur-lg bg-white/80 border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-gray-700  hover:bg-slate-400 font-medium"
            >
              {locales[locale]?.home}
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-400 font-medium"
            >
              {locales[locale].projects}
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-400 font-medium"
            >
              {locales[locale].about}
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
