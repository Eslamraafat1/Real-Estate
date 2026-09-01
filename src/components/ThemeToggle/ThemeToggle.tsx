'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light';

const listeners = new Set<() => void>();
let current: Theme;

if (typeof window === 'undefined') {
  current = 'dark';
} else {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') current = 'light';
  else if (saved === 'dark') current = 'dark';
  else current = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getTheme() {
  return current;
}

function getServerTheme() {
  return 'dark' as Theme;
}

function setTheme(theme: Theme) {
  current = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* storage unavailable */
  }
  document.documentElement.setAttribute('data-theme', theme);
  listeners.forEach((l) => l());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', current);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    const flash = document.createElement('div');
    flash.className = 'theme-transition-flash';
    flash.style.background = isDark
      ? 'radial-gradient(circle, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)'
      : 'radial-gradient(circle, #0F172A 0%, #1e293b 60%, #0f172a 100%)';
    document.body.appendChild(flash);
    window.setTimeout(() => flash.remove(), 650);
  };

  return (
    <button
      className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'تبديل إلى الوضع المضيء' : 'تبديل إلى الوضع الداكن'}
      aria-pressed={isDark}
    >
      <span className={styles.icons}>
        <Sun className={styles.sunIcon} size={14} />
        <Moon className={styles.moonIcon} size={14} />
      </span>
      <span className={styles.knob}>
        {isDark ? <Moon size={15} className={styles.knobMoon} /> : <Sun size={15} className={styles.knobSun} />}
      </span>
    </button>
  );
}