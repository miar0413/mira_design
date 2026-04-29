import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import { navList } from '@/app/const';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default async function ProjectsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#040404] text-[#f4f1ea]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(38,88,255,0.22),transparent_30%),radial-gradient(circle_at_50%_120%,rgba(255,99,36,0.24),transparent_34%)]"
        aria-hidden
      />
      <Header isDetailPage theme="dark" />
      <main className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <div className="mb-14 max-w-4xl">
          <div className="mb-4 font-Quark text-xs uppercase tracking-[0.28em] text-white/46">
            Project archive
          </div>
          <h1 className="font-Quark text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.82] tracking-[-0.06em]">
            Selected work
          </h1>
        </div>

        <div className="grid gap-6">
          {navList.map((group) => (
            <section
              key={group.title}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8"
            >
              <div className="mb-5 font-Quark text-sm uppercase tracking-[0.24em] text-white/42">
                {group.title}
              </div>
              <div className="grid gap-3">
                {group.children.map((project) =>
                  project.link ? (
                    <Link
                      key={project.title}
                      href={project.link}
                      className="group flex items-center justify-between gap-5 border-t border-white/10 py-5 text-white/72 transition-colors hover:text-white"
                    >
                      <span className="font-Lato text-[clamp(1.4rem,3vw,2.7rem)] leading-[0.98] tracking-[-0.04em]">
                        {project.title}
                      </span>
                      <ArrowTopRightIcon className="h-6 w-6 shrink-0 opacity-[0.42] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer theme="dark" />
    </div>
  );
}
