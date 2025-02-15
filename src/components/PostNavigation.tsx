import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Frontmatter } from '@/lib/mdx';

interface PostNavigationProps {
  prev: Frontmatter | null;
  next: Frontmatter | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="flex justify-between mt-8 py-8 border-t font-Quark px-8">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="group flex items-center gap-2 text-right hover:text-[#c4c4c4]"
        >
          <ChevronLeftIcon className="w-6 h-6" />
          <div>
            <div className="text-2xl">Previous</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center gap-2 text-right hover:text-[#c4c4c4]"
        >
          <div>
            <div className="text-2xl">Next</div>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
