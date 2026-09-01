'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './HeroCarousel.module.css';

type Slide = {
  id: number;
  image: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string[];
  accentsEn: string[];
  titleAr: string[];
  accentsAr: string[];
  descEn: string;
  descAr: string;
  ctaEn: string;
  ctaAr: string;
  locationEn: string;
  locationAr: string;
};

const AUTOPLAY_MS = 7000;

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
    badgeEn: 'Luxury Real Estate',
    badgeAr: 'عقارات فاخرة',
    titleEn: ['Discover', 'Your', 'Dream', 'Property'],
    accentsEn: ['Dream'],
    titleAr: ['اكتشف', 'عقار', 'أحلامك'],
    accentsAr: ['أحلامك'],
    descEn:
      'From beachfront villas to commanding penthouses — find the address that tells your story.',
    descAr:
      'من الفلل المطلة على البحر إلى البنتهاوس الشامخة — اعثر على العنوان الذي يروي قصتك.',
    ctaEn: 'Explore Properties',
    ctaAr: 'استكشف العقارات',
    locationEn: 'Everywhere in Egypt',
    locationAr: 'في كل أنحاء مصر',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90',
    badgeEn: 'Iconic Villas',
    badgeAr: 'فلل أيقونية',
    titleEn: ['Own', 'A', 'Masterpiece', 'By', 'The', 'Seaside'],
    accentsEn: ['Masterpiece'],
    titleAr: ['امتلك', 'تحفة', 'معمارية', 'بجانب', 'البحر'],
    accentsAr: ['تحفة'],
    descEn:
      'Architectural icons wrapped in the scent of the sea. Wake up to horizons that never repeat.',
    descAr:
      'أيقونات معمارية يعانقها نسيم البحر. استيقظ على آفاق لا تتكرر أبداً.',
    ctaEn: 'View Villas',
    ctaAr: 'شاهد الفلل',
    locationEn: 'North Coast',
    locationAr: 'الساحل الشمالي',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90',
    badgeEn: 'Smart Investment',
    badgeAr: 'استثمار ذكي',
    titleEn: ['Invest', 'In', 'Your', 'Golden', 'Future'],
    accentsEn: ['Golden'],
    titleAr: ['استثمر', 'في', 'مستقبلك', 'الذهبي'],
    accentsAr: ['الذهبي'],
    descEn:
      'Properties that grow with you. Secure returns in the heart of Egypt\'s most promising districts.',
    descAr:
      'عقارات تنمو معك. عوائد آمنة في قلب أرقى أحياء مصر الواعدة.',
    ctaEn: 'Start Investing',
    ctaAr: 'ابدأ الاستثمار',
    locationEn: 'New Cairo & 6th October',
    locationAr: 'القاهرة الجديدة و6 أكتوبر',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=90',
    badgeEn: 'Skyline Living',
    badgeAr: 'حياة على الأفق',
    titleEn: ['Live', 'Above', 'The', 'Ordinary'],
    accentsEn: ['Above', 'Ordinary'],
    titleAr: ['عش', 'فوق', 'المألوف'],
    accentsAr: ['فوق'],
    descEn:
      'Glass-wrapped penthouses suspended over the city. Every sunset becomes a private premiere.',
    descAr:
      'بنتهاوس ملفوفة بالزجاج معلقة فوق المدينة. كل غروب يصبح عرضاً خاصاً بك.',
    ctaEn: 'Discover Penthouses',
    ctaAr: 'اكتشف البنتهاوس',
    locationEn: 'Sheikh Zayed',
    locationAr: 'الشيخ زايد',
  },
];

const slideVariants = {
  enter: (d: number) => ({ x: d >= 0 ? '100%' : '-100%', opacity: 0.6 }),
  center: {
    x: '0%',
    opacity: 1,
    transition: { x: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.5 } },
  },
  exit: (d: number) => ({
    x: d >= 0 ? '-100%' : '100%',
    opacity: 0.5,
    transition: { x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.4 } },
  }),
};

const contentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const contentItem = {
  hidden: { y: 36, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const titleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const wordVariants = {
  hidden: { y: '115%', rotateZ: 7, filter: 'blur(10px)' },
  show: {
    y: '0%',
    rotateZ: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroCarousel() {
  const { lang, dir, t } = useLanguage();
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const flip = dir === 'rtl' ? -1 : 1;
  const count = slides.length;
  const slide = slides[index];

  const paginate = useCallback((dirStep: number) => {
    setIndexState(([i]) => {
      const next = (i + dirStep + count) % count;
      return [next, dirStep];
    });
  }, [count]);

  const goTo = useCallback((i: number) => {
    setIndexState(([cur]) => {
      if (i === cur) return [cur, 0];
      const d = i > cur ? 1 : -1;
      return [i, d];
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => paginate(dir === 'rtl' ? -1 : 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, index, paginate, dir]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') paginate(dir === 'rtl' ? -1 : 1);
      if (e.key === 'ArrowLeft') paginate(dir === 'rtl' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate, dir]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 20 });
  const parallaxY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollDown = () => {
    const el = containerRef.current?.parentElement;
    const offset = el ? el.offsetTop + el.offsetHeight : window.innerHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const titleWords = (lang === 'en' ? slide.titleEn : slide.titleAr);
  const accents = new Set(lang === 'en' ? slide.accentsEn : slide.accentsAr);

  return (
    <section
      ref={containerRef}
      role="region"
      aria-label={t('Featured properties carousel', 'عرض عقارات مميزة')}
      className={styles.carousel}
      dir={dir}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background slides */}
      <div className={styles.stage} aria-hidden>
        <AnimatePresence initial={false} custom={direction * flip} mode="popLayout">
          <motion.div
            key={slide.id}
            className={styles.slide}
            custom={direction * flip}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div className={styles.kenburns} style={{ x: parallaxX, y: parallaxY }}>
              <Image
                src={slide.image}
                alt={titleWords.join(' ')}
                fill
                priority={index === 0}
                unoptimized
                className={styles.image}
              />
            </motion.div>
            <div className={styles.overlayTop} />
            <div className={styles.overlayBottom} />
            <div className={styles.vignette} />
          </motion.div>
        </AnimatePresence>

        {/* Decorative orbs */}
        <motion.div
          className={styles.orb}
          animate={{ y: [0, -55, 0], opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`${styles.orb} ${styles.orbTwo}`}
          animate={{ y: [0, 45, 0], opacity: [0.25, 0.6, 0.25], scale: [1, 1.2, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={styles.grain} />
      </div>

      {/* Content */}
      <div className={styles.container}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slide.id}
            className={styles.content}
            variants={contentVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.3 } }}
          >
            <motion.div variants={contentItem} className={styles.badgeWrap}>
              <span className={styles.badge}>
                <Sparkles size={14} className={styles.badgeIcon} />
                {lang === 'en' ? slide.badgeEn : slide.badgeAr}
              </span>
            </motion.div>

            <h1 className={styles.title}>
              <motion.span variants={titleVariants} initial="hidden" animate="show" className={styles.titleLine}>
                {titleWords.map((word: string, i: number) => (
                  <motion.span key={`${slide.id}-${i}`} variants={wordVariants} className={styles.titleMask}>
                    <span
                      className={`${styles.titleWord} ${
                        accents.has(word) ? styles.titleAccent : ''
                      }`}
                    >
                      {word}
                      {i < titleWords.length - 1 ? <>&nbsp;</> : null}
                    </span>
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <motion.div variants={contentItem} className={styles.descWrap}>
              <span className={styles.descLine} />
              <p className={styles.desc}>{lang === 'en' ? slide.descEn : slide.descAr}</p>
            </motion.div>

            <motion.div variants={contentItem} className={styles.ctaRow}>
              <Link href="/properties" className={styles.ctaPrimary}>
                <span>{lang === 'en' ? slide.ctaEn : slide.ctaAr}</span>
                {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
              <div className={styles.locationTag}>
                <MapPin size={16} className={styles.locationIcon} />
                {lang === 'en' ? slide.locationEn : slide.locationAr}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar: progress + counter */}
      <div className={styles.bottomBar}>
        <div className={styles.progressWrap}>
          <span className={styles.count}>{String(index + 1).padStart(2, '0')}</span>
          <div className={styles.progressTrack}>
            <motion.div
              key={`progress-${slide.id}-${paused}`}
              className={styles.progressFill}
              initial={{ width: '0%' }}
              animate={{ width: paused ? undefined : '100%' }}
              transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          </div>
          <span className={styles.count}>{String(count).padStart(2, '0')}</span>
        </div>

        {/* Arrows */}
        <div className={styles.arrows}>
          <button
            aria-label={t('Previous slide', 'الشريحة السابقة')}
            className={styles.arrowBtn}
            onClick={() => paginate(dir === 'rtl' ? 1 : -1)}
          >
            {dir === 'rtl' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </button>
          <button
            aria-label={t('Next slide', 'الشريحة التالية')}
            className={styles.arrowBtn}
            onClick={() => paginate(dir === 'rtl' ? -1 : 1)}
          >
            {dir === 'rtl' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>

        {/* Thumbnails */}
        <div className={styles.thumbnails} aria-hidden>
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
            >
              <Image src={s.image} alt="" fill unoptimized className={styles.thumbImage} />
              <span className={styles.thumbOverlay} />
              <span className={styles.thumbTitle}>
                {lang === 'en' ? s.titleEn[0] : s.titleAr[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollDown} aria-label={t('Scroll down', 'مرر للأسفل')}>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={22} />
        </motion.span>
      </button>
    </section>
  );
}