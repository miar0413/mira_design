'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroShaderBackground from '@/components/HeroShaderBackground';

import styles from './page.module.css';

type ShowcaseProject = {
  title: string;
  category: string;
  summary: string;
  image: string;
  link: string;
  tags: string[];
};

const featuredProjects: ShowcaseProject[] = [
  {
    title: 'BYTEHI CUSTOMER SERVICE UPGRADE',
    category: 'SERVICE PLATFORM',
    summary:
      'Redesigned a dense enterprise system into a calmer service workflow with clearer signals and stronger operational readability.',
    image: '/cover/Bytehi_cover.png',
    link: '/projects/byte_hi',
    tags: ['workflow redesign', 'support tooling', 'data clarity'],
  },
  {
    title: 'RISK MANAGEMENT PLATFORM FOR CONTENT REVIEWING',
    category: 'RISK OPERATIONS',
    summary:
      'Built a more legible response surface for moderation teams dealing with high-volume, high-pressure content decisions.',
    image: '/cover/risk_cover.png',
    link: '/projects/risk_management',
    tags: ['risk response', 'signal hierarchy', 'decision support'],
  },
  {
    title: 'DIGITAL INNOVATION FOR FUTURE MOBILITY AND CLOUD SERVICES',
    category: 'SERVICE CONSULTING',
    summary:
      'Created a future-facing mobility concept blending digital product thinking, cloud services, and scenario-led design.',
    image: '/cover/digital_cover.png',
    link: '/projects/digital_innovation',
    tags: ['mobility future', 'cloud ecosystem', 'scenario design'],
  },
  {
    title: 'LIFE DESIGN FOR MEDIA AND SMART HEALTH COMMUNITIES',
    category: 'SPECULATIVE PRODUCT',
    summary:
      'Explored a softer, community-oriented digital service through storytelling, connected care, and lifestyle systems.',
    image: '/cover/life_cover.gif',
    link: '/projects/life_design',
    tags: ['storytelling UX', 'community care', 'lifestyle systems'],
  },
];

const archiveProjects: ShowcaseProject[] = [
  {
    title: 'GENERATIVE ART LAB',
    category: 'VISUAL EXPERIMENTS',
    summary: 'Motion-led visual studies and poster systems.',
    image: '/cover/cover_06.gif',
    link: '/projects/generative_art',
    tags: ['motion', 'posters'],
  },
  {
    title: 'THE FILTERED HOME',
    category: 'FUTURE LIVING',
    summary: 'Speculative domestic interfaces and home rituals.',
    image: '/cover/cover_01.gif',
    link: '/projects/filter_home',
    tags: ['home futures', 'domestic systems'],
  },
  {
    title: '2028 ORDINARY KITCHEN',
    category: 'CONCEPT STORY',
    summary: 'A narrative system around kitchen, intimacy, and routine.',
    image: '/cover/cover_02.gif',
    link: '/projects/ordinary_kitchen',
    tags: ['kitchen future', 'ritual design'],
  },
  {
    title: 'THE GREEN FITNESS',
    category: 'WELLNESS CONCEPT',
    summary: 'Habit loops, wellbeing, and sustainable behaviour.',
    image: '/cover/cover_03.gif',
    link: '/projects/green_fitness',
    tags: ['wellness', 'habit design'],
  },
  {
    title: 'TIME SYNCHRONIZATION',
    category: 'INTERACTION STUDY',
    summary: 'Shared timing, coordination, and system rhythm.',
    image: '/cover/cover_05.gif',
    link: '/projects/time_synchronization',
    tags: ['coordination', 'time systems'],
  },
  {
    title: 'UNFUNCTIONAL DREAM',
    category: 'ART DIRECTION',
    summary: 'Image-led storytelling around emotional objects.',
    image: '/cover/cover_04.jpg',
    link: '/projects/unfunctional_dream',
    tags: ['visual language', 'atmosphere'],
  },
];

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showRevealVeil, setShowRevealVeil] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const previewSmoothX = useSpring(previewX, {
    stiffness: 160,
    damping: 20,
    mass: 0.28,
  });
  const previewSmoothY = useSpring(previewY, {
    stiffness: 160,
    damping: 20,
    mass: 0.28,
  });

  const previewRotateX = useTransform(previewSmoothY, [-1, 1], [5, -5]);
  const previewRotateY = useTransform(previewSmoothX, [-1, 1], [-7, 7]);
  const previewShiftX = useTransform(previewSmoothX, [-1, 1], [-18, 18]);
  const previewShiftY = useTransform(previewSmoothY, [-1, 1], [-10, 10]);

  const activeProject = featuredProjects[activeIndex];

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowIntro(false);
      return;
    }

    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2400);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    if (showIntro || shouldReduceMotion) {
      setShowRevealVeil(false);
      return;
    }

    setShowRevealVeil(true);
    const veilTimer = window.setTimeout(() => {
      setShowRevealVeil(false);
    }, 1300);

    return () => {
      window.clearTimeout(veilTimer);
    };
  }, [showIntro, shouldReduceMotion]);

  const updatePreviewPointer = (
    event: React.MouseEvent<HTMLDivElement>,
    element: HTMLDivElement | null
  ) => {
    if (shouldReduceMotion || !element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    previewX.set(x * 2 - 1);
    previewY.set(y * 2 - 1);
  };

  return (
    <div className={styles.pageShell}>
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
            initial={{ opacity: 1, scale: 1.03, filter: 'blur(14px)' }}
            animate={{
              opacity: 0,
              scale: 1,
              filter: 'blur(0px)',
              transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <div className={styles.noiseOverlay} aria-hidden />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.015 }}
        animate={{
          opacity: showIntro ? 0 : 1,
          scale: showIntro ? 1.015 : 1,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className={styles.heroSection}>
          <Header theme="dark" />

          <div className={styles.heroScene}>
            <HeroShaderBackground
              className={styles.heroCanvas}
              reducedMotion={shouldReduceMotion}
            />
            <div className={styles.heroVignette} />
          </div>

          <div className={styles.heroContent}>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : 0.12,
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
                  Enterprise UX, operational interfaces, future-living concepts
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

            <Link href="#recent-work" className={styles.scrollLink}>
              <span>Scroll down</span>
              <ArrowDownIcon width={16} height={16} />
            </Link>
          </div>
        </section>

        <main className={styles.mainShell}>
          <section id="recent-work" className={styles.workSection}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionLabel}>Recent work</div>
              <Link href="/projects" className={styles.sectionLink}>
                Discover all projects{' '}
                <ArrowTopRightIcon width={14} height={14} />
              </Link>
            </div>

            <div className={styles.workGrid}>
              <div className={styles.workList}>
                {featuredProjects.map((project, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <Link
                      key={project.link}
                      href={project.link}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`${styles.workItem} ${isActive ? styles.workItemActive : ''}`}
                    >
                      <div className={styles.workItemCategory}>
                        {project.category}
                      </div>
                      <h2 className={styles.workItemTitle}>{project.title}</h2>
                      <p className={styles.workItemSummary}>
                        {project.summary}
                      </p>
                      <div className={styles.workItemTags}>
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className={styles.previewColumn}>
                <motion.div
                  ref={previewRef}
                  onMouseMove={(event) =>
                    updatePreviewPointer(event, previewRef.current)
                  }
                  onMouseLeave={() => {
                    previewX.set(0);
                    previewY.set(0);
                  }}
                  className={styles.previewFrame}
                  style={
                    shouldReduceMotion
                      ? undefined
                      : { rotateX: previewRotateX, rotateY: previewRotateY }
                  }
                >
                  <div className={styles.previewGlow} />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.link}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.96, y: 16 }
                      }
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: 1, scale: 1, y: 0 }
                      }
                      exit={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: 0, scale: 1.02, y: -12 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={styles.previewInner}
                      style={
                        shouldReduceMotion
                          ? undefined
                          : { x: previewShiftX, y: previewShiftY }
                      }
                    >
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        priority
                        sizes="(max-width: 1200px) 45vw, 560px"
                        className={styles.previewImage}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className={styles.previewCaption}>
                    <div className={styles.previewCategory}>
                      {activeProject.category}
                    </div>
                    <div className={styles.previewTitle}>
                      {activeProject.title}
                    </div>
                    <Link
                      href={activeProject.link}
                      className={styles.previewLink}
                    >
                      View case study{' '}
                      <ArrowTopRightIcon width={16} height={16} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

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
    </div>
  );
};

export default Home;
