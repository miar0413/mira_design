import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { NavItem } from '@/app/const';

interface PostNavigationProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="mt-8 grid gap-4 border-t border-white/10 pt-8 font-Quark sm:grid-cols-2">
      {prev?.link ? (
        <Link
          href={prev.link}
          className="group flex min-h-28 items-center gap-4 rounded-[28px] border border-white/[0.1] bg-white/[0.045] px-6 py-5 text-left text-white/[0.66] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white"
        >
          <ChevronLeftIcon className="h-6 w-6 shrink-0" />
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/[0.38]">
              Previous
            </div>
            <div className="mt-2 text-xl leading-tight">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next?.link ? (
        <Link
          href={next.link}
          className="group flex min-h-28 items-center justify-end gap-4 rounded-[28px] border border-white/[0.1] bg-white/[0.045] px-6 py-5 text-right text-white/[0.66] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/[0.38]">
              Next
            </div>
            <div className="mt-2 text-xl leading-tight">{next.title}</div>
          </div>
          <ChevronRightIcon className="h-6 w-6 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
