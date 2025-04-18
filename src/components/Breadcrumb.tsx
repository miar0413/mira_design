'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@radix-ui/react-icons';

export function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  // 将路径转换为更友好的显示文本
  const getDisplayText = (text: string) => {
    const cleanText = text.replace(/[-_]/g, ' ');
    return cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-3xl mx-auto !pl-0 py-4 px-4 sm:px-6 lg:px-8"
    >
      <ol className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-sm sm:text-base">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 
                        flex items-center transition-colors"
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={path} className="flex items-center">
              <ChevronRightIcon
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-600"
                aria-hidden="true"
              />
              {isLast ? (
                <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">
                  {getDisplayText(path)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="ml-2 text-gray-500 dark:text-gray-400 
                                hover:text-gray-700 dark:hover:text-gray-300 
                                transition-colors"
                >
                  {getDisplayText(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
