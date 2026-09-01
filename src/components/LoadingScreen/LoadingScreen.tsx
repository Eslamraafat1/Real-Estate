'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './LoadingScreen.module.css';

const DURATION = 2100;

type Phase = 'loading' | 'exit' | 'done';

const BUILDINGS = [
  { floors: 6, cols: 2 },
  { floors: 8, cols: 3 },
  { floors: 10, cols: 2 },
  { floors: 7, cols: 2 },
  { floors: 9, cols: 3 },
  { floors: 5, cols: 2 },
];

const WINDOWS = BUILDINGS.flatMap((b, bi) =>
  Array.from({ length: b.floors * b.cols }, (_, g) => ({
    bi,
    g,
    delay: Math.random() * 0.9,
  }))
);

const OFFSETS = BUILDINGS.slice(0, -1).reduce<number[]>((acc, prev) => {
  const last = acc.length ? acc[acc.length - 1] : 0;
  acc.push(last + prev.floors * prev.cols);
  return acc;
}, [0]);

const TOTAL_CELLS = WINDOWS.length;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const BRAND = ['A', 'Q', 'A', 'R', 'A', 'T'];

function Digit({ value }: { value: number }) {
  return (
    <span className={styles.digitCell}>
      <span key={value} className={styles.digitMove}>
        {value}
      </span>
    </span>
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('exit'), 260);
      }
    };

    raf = requestAnimationFrame(tick);
    const fallback = setTimeout(() => setPhase('exit'), 4000);
    const unmount = setTimeout(() => setPhase('done'), DURATION + 2800);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      clearTimeout(unmount);
    };
  }, []);

  if (phase === 'done') return null;

  const int = progress;
  const digits = int < 10 ? [int] : int < 100 ? [Math.floor(int / 10) % 10, int % 10] : [1, 0, 0];

  const litCount = Math.floor((progress / 100) * TOTAL_CELLS);
  const ringC = 2 * Math.PI * 60;
  const ringOffset = ringC * (1 - progress / 100);

  return (
    <>
      <div
        className={`${styles.loadingOverlay} ${phase === 'exit' ? styles.isExiting : ''}`}
        role="status"
        aria-live="polite"
        aria-label={`Loading ${progress} percent`}
      >
        {/* Blueprint grid */}
        <div className={styles.gridBg} />

        {/* Glow */}
        <div className={styles.glowOrb} />
        <div className={styles.glowOrb2} />

        {/* Ghost skyline silhouette */}
        <div className={styles.ghostSkyline}>
          <div className={styles.ghost} style={{ left: '6%', height: '38vh', width: '7vw' }} />
          <div className={styles.ghost} style={{ left: '17%', height: '52vh', width: '6vw' }} />
          <div className={styles.ghost} style={{ left: '62%', height: '44vh', width: '8vw' }} />
          <div className={styles.ghost} style={{ left: '78%', height: '58vh', width: '6vw' }} />
          <div className={styles.ghost} style={{ left: '88%', height: '34vh', width: '5vw' }} />
        </div>

        {/* Corner marks */}
        <span className={`${styles.cornerMark} ${styles.cornerTL}`} />
        <span className={`${styles.cornerMark} ${styles.cornerBR}`} />

        {/* Main column */}
        <div className={styles.loaderContent}>
          {/* Progress halo with percent */}
          <div className={styles.haloWrap}>
            <div className={styles.orbitDot} />
            <svg className={styles.ring} viewBox="0 0 140 140" aria-hidden="true">
              <defs>
                <linearGradient id="aqaratGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
              <circle className={styles.ringTrack} cx="70" cy="70" r="60" />
              <circle
                className={styles.ringFill}
                cx="70"
                cy="70"
                r="60"
                strokeDasharray={ringC}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className={styles.percentWrap}>
              <div className={styles.percentDigits}>
                {digits.map((d, i) => (
                  <Digit key={i} value={d} />
                ))}
                <span className={styles.percentSign}>%</span>
              </div>
              <span className={styles.percentCaption}>PREMIUM ESTATE</span>
            </div>
          </div>

          {/* Rising skyline */}
          <div className={styles.skylineWrap}>
            <div className={styles.skyline}>
              {BUILDINGS.map((b, bi) => (
                <div key={bi} className={styles.building} style={{ '--cols': b.cols } as CSSProperties}>
                  {Array.from({ length: b.floors }).map((_, f) => (
                    <div key={f} className={styles.floorRow}>
                      {Array.from({ length: b.cols }).map((_, c) => {
                        const g = OFFSETS[bi] + f * b.cols + c;
                        const lit = g < litCount;
                        const spark = lit && g >= litCount - 3;
                        return (
                          <span
                            key={c}
                            className={`${styles.window} ${lit ? styles.windowLit : ''} ${
                              spark ? styles.windowSpark : ''
                            }`}
                            style={{ '--tw': `${WINDOWS[g]?.delay ?? 0}s` } as CSSProperties}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.groundLine} />
            <div className={styles.scanLine} />
          </div>

          {/* Brand reveal */}
          <div className={styles.brandRow} aria-hidden="true">
            {BRAND.map((letter, i) => (
              <span key={i} className={styles.brandLetter} style={{ '--ld': `${i * 90}ms` } as CSSProperties}>
                {letter}
              </span>
            ))}
          </div>

          <p className={styles.tagline}>عالم العقارات الفاخرة · Building Your Dreams</p>

          {/* Slim progress bar */}
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Curtain exit */}
      {phase === 'exit' && (
        <div className={styles.exitScreen} aria-hidden="true">
          <div className={styles.panelTop} />
          <div className={styles.panelBottom} />
          <span className={styles.seamFlash} />
        </div>
      )}
    </>
  );
}