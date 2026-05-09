'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SimpleBar from 'simplebar-react';

import Footer from '@/components/Footer';
import FullscreenGradientBackground from '@/components/FullscreenGradientBackground';
import Header from '@/components/Header';
import HeroLensText from '@/components/HeroLensText';

import styles from './page.module.css';

type FeaturedProject = {
  title: string;
  category: string;
  link: string;
  tags: string[];
  // Palette stops feed the monopo.london-style ribbon shader as:
  //   c -> uColor1  (narrow ribbon "line centres")
  //   b -> uColor2  (broad field colour between ribbons)
  //   a -> uColor3  (deep accent that darkens broad regions)
  //   d -> uColorAccent (reserved; the reference shader doesn't read it)
  // Pick `a` as the darkest void colour, `b` as the dominant tone,
  // and `c` as the contrasting ribbon highlight.
  palette: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
};

type ArchiveProject = {
  title: string;
  category: string;
  summary: string;
  image: string;
  link: string;
};

// Each palette feeds the monopo ribbon shader exactly the way the
// reference (gotohiroki/three-monopo-london) does — `a` becomes the
// deep accent (col3), `b` the broad field (col2), `c` the narrow
// ribbon highlight (col1). Each set is matched to a monopo.london
// recent-work mood.
const featuredProjects: FeaturedProject[] = [
  {
    title: 'BYTEHI CUSTOMER SERVICE UPGRADE',
    category: 'SERVICE PLATFORM',
    link: '/projects/byte_hi',
    tags: ['workflow redesign', 'support tooling', 'data clarity'],
    // NKORA-inspired: olive-cream field with a burnt-orange ribbon
    // and deep brown voids carving the corners.
    palette: {
      a: '#1a0d08',
      b: '#cdb96a',
      c: '#d4571f',
      d: '#050505',
    },
  },
  {
    title: 'RISK MANAGEMENT PLATFORM FOR CONTENT REVIEWING',
    category: 'RISK OPERATIONS',
    link: '/projects/risk_management',
    tags: ['risk response', 'signal hierarchy', 'decision support'],
    // ONITSUKA-inspired: deep oxblood field with bright crimson
    // ribbons cutting through pure black voids.
    palette: {
      a: '#070304',
      b: '#5a1414',
      c: '#ee5942',
      d: '#050505',
    },
  },
  {
    title: 'DIGITAL INNOVATION FOR FUTURE MOBILITY AND CLOUD SERVICES',
    category: 'SERVICE CONSULTING',
    link: '/projects/digital_innovation',
    tags: ['mobility future', 'cloud ecosystem', 'scenario design'],
    // YONEX players-lounge-inspired: silver-steel field with a
    // chrome highlight ribbon and deep navy voids — mirrors the
    // monopo demo's default blue/cyan/navy stack.
    palette: {
      a: '#06083a',
      b: '#3a8a8a',
      c: '#a8c4dc',
      d: '#040420',
    },
  },
  {
    title: 'LIFE DESIGN FOR MEDIA AND SMART HEALTH COMMUNITIES',
    category: 'SPECULATIVE PRODUCT',
    link: '/projects/life_design',
    tags: ['storytelling UX', 'community care', 'lifestyle systems'],
    // OUTFRY-inspired: burnt-amber field with peach ribbons and
    // deep wine voids framing the corners.
    palette: {
      a: '#1a0612',
      b: '#c8521e',
      c: '#f6c290',
      d: '#050505',
    },
  },
];

const archiveProjects: ArchiveProject[] = [
  {
    title: 'GENERATIVE ART LAB',
    category: 'VISUAL EXPERIMENTS',
    summary: 'Motion-led visual studies and poster systems.',
    image: '/cover/cover_06.gif',
    link: '/projects/generative_art',
  },
  {
    title: 'THE FILTERED HOME',
    category: 'FUTURE LIVING',
    summary: 'Speculative domestic interfaces and home rituals.',
    image: '/cover/cover_01.gif',
    link: '/projects/filter_home',
  },
  {
    title: '2028 ORDINARY KITCHEN',
    category: 'CONCEPT STORY',
    summary: 'A narrative system around kitchen, intimacy, and routine.',
    image: '/cover/cover_02.gif',
    link: '/projects/ordinary_kitchen',
  },
  {
    title: 'THE GREEN FITNESS',
    category: 'WELLNESS CONCEPT',
    summary: 'Habit loops, wellbeing, and sustainable behaviour.',
    image: '/cover/cover_03.gif',
    link: '/projects/green_fitness',
  },
  {
    title: 'TIME SYNCHRONIZATION',
    category: 'INTERACTION STUDY',
    summary: 'Shared timing, coordination, and system rhythm.',
    image: '/cover/cover_05.gif',
    link: '/projects/time_synchronization',
  },
  {
    title: 'UNFUNCTIONAL DREAM',
    category: 'ART DIRECTION',
    summary: 'Image-led storytelling around emotional objects.',
    image: '/cover/cover_04.jpg',
    link: '/projects/unfunctional_dream',
  },
];

const SLIDE_TICK_COUNT = 26;
const BACKGROUND_TRANSITION_START = 0.08;
const BACKGROUND_TRANSITION_DISTANCE = 0.92;
// How much of each viewport-of-scroll within the slideshow is the
// "transition zone" — the rest holds the active title steady.
const SLIDE_TRANSITION_ZONE = 0.32;
const INTRO_ENABLED = false;

// Hero opener mirrors monopo's landing — a near-black field warmed
// by a single oxblood mid-tone with subtle peach ribbons drifting
// through it. Designed to bleed seamlessly into the first project.
const heroPalette: FeaturedProject['palette'] = {
  a: '#040303',
  b: '#2c0e0a',
  c: '#c25a2a',
  d: '#040404',
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '');
  const expanded =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  return [
    parseInt(expanded.slice(0, 2), 16),
    parseInt(expanded.slice(2, 4), 16),
    parseInt(expanded.slice(4, 6), 16),
  ];
};

const rgbToHex = ([r, g, b]: [number, number, number]) => {
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const lerpHex = (a: string, b: string, t: number) => {
  const [ra, ga, ba] = hexToRgb(a);
  const [rb, gb, bb] = hexToRgb(b);
  return rgbToHex([
    ra + (rb - ra) * t,
    ga + (gb - ga) * t,
    ba + (bb - ba) * t,
  ]);
};

const lerpPalette = (
  a: FeaturedProject['palette'],
  b: FeaturedProject['palette'],
  t: number,
): FeaturedProject['palette'] => ({
  a: lerpHex(a.a, b.a, t),
  b: lerpHex(a.b, b.b, t),
  c: lerpHex(a.c, b.c, t),
  d: lerpHex(a.d, b.d, t),
});

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(INTRO_ENABLED);
  const [showRevealVeil, setShowRevealVeil] = useState(false);
  // Continuous slide progress in [0, featuredProjects.length - 1].
  const [slideProgress, setSlideProgress] = useState(0);
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
  const slideshowSectionRef = useRef<HTMLElement | null>(null);
  const lensWrapperRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const prefersReducedMotion = shouldReduceMotion === true;

  // Derive the active slide and a smooth crossfade ratio from the
  // continuous scroll-driven `slideProgress`. Each integer value is
  // a "settled" project; fractional values fall in the transition
  // zone where the next title is fading in.
  const slideCount = featuredProjects.length;
  const baseIndex = Math.min(
    Math.floor(slideProgress),
    slideCount - 1,
  );
  const localProgress = slideProgress - baseIndex;
  const transitionStart = 1 - SLIDE_TRANSITION_ZONE;
  const crossfade = smoothstep(transitionStart, 1, localProgress);
  const displayedSlide =
    baseIndex + (crossfade > 0.5 && baseIndex < slideCount - 1 ? 1 : 0);
  const activeProject = featuredProjects[displayedSlide];

  const interpolatedProjectPalette = useMemo(() => {
    const a = featuredProjects[baseIndex].palette;
    const b =
      featuredProjects[Math.min(baseIndex + 1, slideCount - 1)].palette;
    return lerpPalette(a, b, crossfade);
  }, [baseIndex, crossfade, slideCount]);

  const continuousSeed = baseIndex + crossfade;

  useEffect(() => {
    if (!INTRO_ENABLED) {
      setShowIntro(false);
      return;
    }

    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }

    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2400);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    if (!INTRO_ENABLED || showIntro || prefersReducedMotion) {
      setShowRevealVeil(false);
      return;
    }

    setShowRevealVeil(true);
    const veilTimer = window.setTimeout(() => {
      setShowRevealVeil(false);
    }, 1600);

    return () => {
      window.clearTimeout(veilTimer);
    };
  }, [showIntro, prefersReducedMotion]);

  useEffect(() => {
    let frame = 0;
    let installFrame = 0;
    let scrollableNode: HTMLDivElement | null = null;

    const updateScrollDerived = () => {
      frame = 0;
      if (!scrollableNode) {
        return;
      }

      const vh = window.innerHeight;

      // Hero -> first project background morph.
      const transitionStartPx = vh * BACKGROUND_TRANSITION_START;
      const transitionDistancePx = vh * BACKGROUND_TRANSITION_DISTANCE;
      const bgProgress =
        (scrollableNode.scrollTop - transitionStartPx) /
        transitionDistancePx;
      setBackgroundProgress(clamp01(bgProgress));

      // Scroll-driven slideshow. The slideshow section is N viewports
      // tall; each viewport is one project. The active title settles
      // for the first 1 - SLIDE_TRANSITION_ZONE of the viewport, then
      // crossfades to the next during the remainder.
      const section = slideshowSectionRef.current;
      const scrollerRect = scrollableNode.getBoundingClientRect();

      if (section) {
        const sectionTop =
          section.getBoundingClientRect().top -
          scrollerRect.top +
          scrollableNode.scrollTop;
        const within = scrollableNode.scrollTop - sectionTop;
        const raw = within / vh;
        const clamped = Math.min(
          Math.max(raw, 0),
          slideCount - 0.0001,
        );
        setSlideProgress(clamped);
      }
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateScrollDerived);
    };

    const install = () => {
      scrollableNode = scrollableNodeRef.current;

      if (!scrollableNode) {
        installFrame = window.requestAnimationFrame(install);
        return;
      }

      updateScrollDerived();
      scrollableNode.addEventListener('scroll', requestUpdate, {
        passive: true,
      });
      window.addEventListener('resize', requestUpdate);
    };

    install();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (installFrame) {
        window.cancelAnimationFrame(installFrame);
      }
      scrollableNode?.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [slideCount]);

  // Cursor-follow effect for the centered "VIEW CASE STUDY" lens. The
  // pill is anchored at the viewport center and translated toward the
  // mouse position with eased trailing motion (monopo.london style).
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const section = slideshowSectionRef.current;
    const wrapper = lensWrapperRef.current;
    if (!section || !wrapper) {
      return;
    }

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let settled = true;

    const apply = () => {
      wrapper.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
    };

    const tick = () => {
      raf = 0;
      const ease = 0.16;
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        current.x = target.x;
        current.y = target.y;
        apply();
        settled = true;
        return;
      }

      current.x += dx * ease;
      current.y += dy * ease;
      apply();
      raf = window.requestAnimationFrame(tick);
    };

    const requestTick = () => {
      settled = false;
      if (raf) {
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };

    const handleMove = (event: MouseEvent) => {
      // Lens is anchored at viewport center; translate it by cursor's
      // offset from that center for a 1:1 follow with eased trail.
      // Only follow when the slideshow section is on-screen — otherwise
      // recenter so the pill returns to its home position.
      const rect = section.getBoundingClientRect();
      const onScreen =
        rect.bottom > 0 && rect.top < window.innerHeight;

      if (onScreen) {
        target.x = event.clientX - window.innerWidth / 2;
        target.y = event.clientY - window.innerHeight / 2;
      } else {
        target.x = 0;
        target.y = 0;
      }
      requestTick();
    };

    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      requestTick();
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      if (settled) {
        wrapper.style.transform = '';
      }
    };
  }, [prefersReducedMotion]);

  const scrollToRecentWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const scrollableNode = scrollableNodeRef.current;
    const target = document.getElementById('recent-work');

    if (!scrollableNode || !target) {
      return;
    }

    const scrollableRect = scrollableNode.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    scrollableNode.scrollTo({
      top: scrollableNode.scrollTop + targetRect.top - scrollableRect.top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={styles.pageShell}>
      <FullscreenGradientBackground
        className={styles.fullscreenGradient}
        heroPalette={heroPalette}
        projectPalette={interpolatedProjectPalette}
        transitionProgress={backgroundProgress}
        activeSeed={continuousSeed}
        reducedMotion={prefersReducedMotion}
      />

      <AnimatePresence>
        {showIntro ? (
          <motion.div
            key="intro"
            className={styles.introOverlay}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <div className={styles.introNoise} aria-hidden />
            <motion.div
              className={styles.introMark}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.12,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              <motion.span
                className={styles.introBrand}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -22,
                    filter: 'blur(8px)',
                    letterSpacing: '0.18em',
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    letterSpacing: '-0.04em',
                    transition: {
                      duration: 0.72,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                  exit: {
                    opacity: 0,
                    x: -18,
                    filter: 'blur(7px)',
                    letterSpacing: '0.08em',
                    transition: {
                      duration: 0.42,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                }}
              >
                mira
              </motion.span>
              <motion.span
                className={styles.introDivider}
                aria-hidden
                variants={{
                  hidden: { opacity: 0, scaleY: 0, transformOrigin: '50% 50%' },
                  visible: {
                    opacity: 1,
                    scaleY: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                  exit: {
                    opacity: 0,
                    scaleY: 0,
                    transition: {
                      duration: 0.28,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                }}
              />
              <motion.span
                className={styles.introCity}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 22,
                    filter: 'blur(8px)',
                    letterSpacing: '0.16em',
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    letterSpacing: '-0.02em',
                    transition: {
                      duration: 0.72,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                  exit: {
                    opacity: 0,
                    x: 18,
                    filter: 'blur(7px)',
                    letterSpacing: '0.06em',
                    transition: {
                      duration: 0.42,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                }}
              >
                shanghai
              </motion.span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showRevealVeil ? (
          <motion.div
            key="reveal-veil"
            className={styles.revealVeil}
            initial={{
              opacity: 1,
              scale: 1.06,
              filter: 'blur(18px)',
            }}
            animate={{
              opacity: [1, 0.94, 0],
              scale: [1.06, 1.015, 1],
              filter: ['blur(18px)', 'blur(6px)', 'blur(0px)'],
              transition: {
                duration: 1.35,
                times: [0, 0.42, 1],
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            exit={{ opacity: 0 }}
          >
            <span className={styles.revealBloom} aria-hidden />
            <span className={styles.revealSweep} aria-hidden />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={styles.noiseOverlay} aria-hidden />

      <SimpleBar
        className={`${styles.scrollShell} ${showIntro ? styles.scrollLocked : ''}`}
        autoHide={false}
        forceVisible="y"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.015 }}
          animate={{
            opacity: showIntro ? 0 : 1,
            scale: showIntro ? 1.015 : 1,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <section className={styles.heroSection}>
            <Header theme="dark" />
            <HeroLensText
              className={styles.heroLensText}
              reducedMotion={prefersReducedMotion}
            />

            <div className={styles.heroContent}>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={{
                  duration: 0.85,
                  ease: 'easeOut',
                  delay: prefersReducedMotion ? 0 : 0.12,
                }}
                className={styles.heroTitleWrap}
              >
                <div className={styles.srOnly}>Mira Design</div>
                <h1 className={styles.srOnly}>
                  Designing clarity
                  <br />
                  for complex
                  <br />
                  digital systems
                </h1>
              </motion.div>

              <div className={styles.heroMeta}>
                <div>
                  <div className={styles.metaLabel}>Based in Shanghai</div>
                  <div className={styles.metaText}>
                    Product designer with service and platform focus
                  </div>
                </div>
                <div>
                  <div className={styles.metaLabel}>Current practice</div>
                  <div className={styles.metaText}>
                    Enterprise UX, operational interfaces, future-living
                    concepts
                  </div>
                </div>
                <div>
                  <div className={styles.metaLabel}>Approach</div>
                  <div className={styles.metaText}>
                    Editorial restraint, interaction rhythm, strong information
                    hierarchy
                  </div>
                </div>
              </div>

              <Link
                href="#recent-work"
                className={styles.scrollLink}
                onClick={scrollToRecentWork}
              >
                <span>Scroll down</span>
                <ArrowDownIcon width={16} height={16} />
              </Link>
            </div>
          </section>

          {/* SECOND PAGE — RECENT WORK (scroll-driven, monopo.london style).
              The section is N viewports tall; the inner is sticky so the
              page background morphs and the active title crossfades as the
              user scrolls through the project slots. */}
          <section
            id="recent-work"
            ref={slideshowSectionRef}
            className={styles.slideshowSection}
            style={{ height: `${slideCount * 100}vh` }}
          >
            <div className={styles.slideshowInner}>
              {/* Vertical timeline (left) */}
              <div className={styles.slideTimeline} aria-hidden>
                {Array.from({ length: SLIDE_TICK_COUNT }).map((_, i) => {
                  const ratio = i / (SLIDE_TICK_COUNT - 1);
                  const markerRatio =
                    slideCount > 1
                      ? (baseIndex + crossfade) / (slideCount - 1)
                      : 0;
                  const markerActive =
                    Math.abs(ratio - markerRatio) <
                    1 / (SLIDE_TICK_COUNT - 1);

                  return (
                    <span
                      key={i}
                      className={`${styles.slideTick} ${markerActive ? styles.slideTickActive : ''}`}
                    />
                  );
                })}
                <div
                  className={styles.slideMarker}
                  style={{
                    top: `${
                      slideCount > 1
                        ? ((baseIndex + crossfade) / (slideCount - 1)) * 100
                        : 0
                    }%`,
                  }}
                >
                  <span className={styles.slideMarkerArrow}>▸</span>
                </div>
              </div>

              <div className={styles.slideContent}>
                <div className={styles.slideLabel}>RECENT WORK</div>

                {/* Scroll-tied crossfade: render the current and the next
                    project copies stacked, with opacity driven directly
                    by the smoothed local scroll progress. This keeps the
                    title in lock-step with the gradient and lens. */}
                <div className={styles.slideCopyStack}>
                  {featuredProjects.map((project, index) => {
                    let opacity = 0;
                    if (index === baseIndex) {
                      opacity = 1 - crossfade;
                    } else if (index === baseIndex + 1) {
                      opacity = crossfade;
                    } else if (
                      index === slideCount - 1 &&
                      baseIndex === slideCount - 1
                    ) {
                      opacity = 1;
                    }

                    if (opacity <= 0) {
                      return null;
                    }

                    return (
                      <div
                        key={project.link}
                        className={styles.slideCopy}
                        style={{
                          opacity,
                          pointerEvents: opacity > 0.85 ? 'auto' : 'none',
                        }}
                      >
                        <Link
                          href={project.link}
                          className={styles.slideTitleLink}
                        >
                          <h2 className={styles.slideTitle}>
                            {project.title}
                            <span
                              className={styles.slideTitleArrow}
                              aria-hidden
                            >
                              {' '}
                              ▸{' '}
                            </span>
                            <span className={styles.slideCategory}>
                              {project.category}
                            </span>
                          </h2>
                        </Link>

                        <div className={styles.slideTags}>
                          {project.tags.map((tag, idx) => (
                            <React.Fragment key={tag}>
                              <span>{tag}</span>
                              {idx < project.tags.length - 1 && (
                                <span
                                  className={styles.slideTagsDot}
                                  aria-hidden
                                >
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Centered case-study lens (the white "VIEW CASE STUDY"
                  pill). The wrapper is anchored at the viewport center
                  and gets translated by the cursor-follow RAF loop; the
                  inner Link keeps its own hover scale. */}
              <div ref={lensWrapperRef} className={styles.slideViewLensWrap}>
                <Link
                  href={activeProject.link}
                  className={styles.slideViewLens}
                  aria-label={`View case study — ${activeProject.title}`}
                >
                  <span>
                    VIEW
                    <br />
                    CASE STUDY
                    <br />
                    <span className={styles.slideViewLensArrow} aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </div>

              {/* Slot indicator at the top-right (replaces play/pause). */}
              <div className={styles.slideCounter} aria-hidden>
                <span className={styles.slideCounterCurrent}>
                  {String(displayedSlide + 1).padStart(2, '0')}
                </span>
                <span className={styles.slideCounterDivider} />
                <span className={styles.slideCounterTotal}>
                  {String(slideCount).padStart(2, '0')}
                </span>
              </div>

              {/* Discover all projects pill */}
              <Link href="/projects" className={styles.slideDiscoverButton}>
                <span>DISCOVER ALL PROJECTS</span>
                <ArrowTopRightIcon width={14} height={14} />
              </Link>
            </div>
          </section>

          <main className={styles.mainShell}>
            <section className={styles.archiveSection}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionLabel}>Discover more</div>
              </div>

              <div className={styles.archiveGrid}>
                {archiveProjects.map((project, index) => (
                  <Link
                    key={project.link}
                    href={project.link}
                    className={styles.archiveCard}
                  >
                    <div className={styles.archiveImageWrap}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={900}
                        height={680}
                        className={styles.archiveImage}
                        priority={index < 2}
                      />
                    </div>
                    <div className={styles.archiveCategory}>
                      {project.category}
                    </div>
                    <h3 className={styles.archiveTitle}>{project.title}</h3>
                    <p className={styles.archiveSummary}>{project.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <Footer theme="dark" />
        </motion.div>
      </SimpleBar>
    </div>
  );
};

export default Home;
