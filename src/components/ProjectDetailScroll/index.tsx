'use client';

import type { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';

import styles from './index.module.css';

interface ProjectDetailScrollProps {
  backgroundClassName?: string;
  children: ReactNode;
}

export default function ProjectDetailScroll({
  backgroundClassName = '',
  children,
}: ProjectDetailScrollProps) {
  return (
    <div className={styles.shell}>
      <SimpleBar
        autoHide={false}
        forceVisible="y"
        className={styles.scrollRoot}
        scrollableNodeProps={{ 'aria-label': 'Project detail content' }}
      >
        <div className={`${styles.scrollContent} ${backgroundClassName}`}>
          {children}
        </div>
      </SimpleBar>
    </div>
  );
}
