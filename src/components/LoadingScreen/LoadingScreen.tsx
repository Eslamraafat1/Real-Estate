'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for window load then fade out
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 600);
      }, 1800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback: force hide after 4 seconds
      const fallback = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 600);
      }, 4000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`${styles.loadingOverlay} ${fadeOut ? styles.fadeOut : ''}`}>
      {/* Background glow */}
      <div className={styles.bgGlow} />

      {/* Floating particles */}
      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* Corner decorations */}
      <div className={`${styles.cornerDecor} ${styles.cornerTL}`} />
      <div className={`${styles.cornerDecor} ${styles.cornerBR}`} />

      {/* Main content */}
      <div className={styles.loaderContent}>
        {/* Building skyline animation */}
        <div className={styles.buildingAnimation}>
          <div className={`${styles.building} ${styles.b1}`} />
          <div className={`${styles.building} ${styles.b2}`} />
          <div className={`${styles.building} ${styles.b3}`} />
          <div className={`${styles.building} ${styles.b4}`} />
          <div className={`${styles.building} ${styles.b5}`} />
        </div>

        {/* Logo */}
        <div className={styles.logoText}>AQARAT</div>

        {/* Progress bar */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar} />
        </div>

        {/* Loading text */}
        <div className={styles.loadingText}>Premium Real Estate</div>
      </div>
    </div>
  );
}
