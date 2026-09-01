'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Palmtree, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './homeSections.module.css';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    id: 'cairo',
    nameEn: 'New Cairo',
    nameAr: 'القاهرة الجديدة',
    metaEn: 'Premium compounds & gated communities',
    metaAr: 'كمبounds فاخرة ومجتمعات مسورة',
    count: 840,
    icon: Building,
    pins: [
      { x: 55, y: 42, labelEn: 'Fifth Settlement', labelAr: 'التجمع الخامس' },
      { x: 38, y: 58, labelEn: 'New Capital', labelAr: 'العاصمة الإدارية' },
      { x: 62, y: 65, labelEn: 'Madinaty', labelAr: 'مدينتي' },
    ],
    stats: [
      { valueEn: '840+', valueAr: '+840', labelEn: 'Properties', labelAr: 'عقار' },
      { valueEn: '12M', valueAr: '12M', labelEn: 'Avg. Price EGP', labelAr: 'متوسط السعر' },
      { valueEn: '98%', valueAr: '98%', labelEn: 'Satisfaction', labelAr: 'رضا العملاء' },
    ],
  },
  {
    id: 'alex',
    nameEn: 'Alexandria',
    nameAr: 'الإسكندرية',
    metaEn: 'Coastal elegance & historic charm',
    metaAr: 'أناقة ساحلية وسحر تاريخي',
    count: 520,
    icon: Landmark,
    pins: [
      { x: 45, y: 35, labelEn: 'Smouha', labelAr: 'سموحة' },
      { x: 58, y: 50, labelEn: 'Stanley', labelAr: 'ستانلي' },
      { x: 40, y: 62, labelEn: 'Miami', labelAr: 'ميامي' },
    ],
    stats: [
      { valueEn: '520+', valueAr: '+520', labelEn: 'Properties', labelAr: 'عقار' },
      { valueEn: '8M', valueAr: '8M', labelEn: 'Avg. Price EGP', labelAr: 'متوسط السعر' },
      { valueEn: '96%', valueAr: '96%', labelEn: 'Satisfaction', labelAr: 'رضا العملاء' },
    ],
  },
  {
    id: 'coast',
    nameEn: 'North Coast',
    nameAr: 'الساحل الشمالي',
    metaEn: 'Summer homes & beachfront luxury',
    metaAr: 'بيوت صيفية وفخامة على البحر',
    count: 680,
    icon: Palmtree,
    pins: [
      { x: 50, y: 30, labelEn: 'Marassi', labelAr: 'مراسي' },
      { x: 35, y: 55, labelEn: 'Hacienda Bay', labelAr: 'خليج هacienda' },
      { x: 65, y: 60, labelEn: 'Amwaj', labelAr: 'أمواج' },
    ],
    stats: [
      { valueEn: '680+', valueAr: '+680', labelEn: 'Properties', labelAr: 'عقار' },
      { valueEn: '15M', valueAr: '15M', labelEn: 'Avg. Price EGP', labelAr: 'متوسط السعر' },
      { valueEn: '99%', valueAr: '99%', labelEn: 'Satisfaction', labelAr: 'رضا العملاء' },
    ],
  },
  {
    id: 'giza',
    nameEn: '6th of October',
    nameAr: '6 أكتوبر',
    metaEn: 'Family-friendly & affordable luxury',
    metaAr: 'فخامة تناسب العائلات بأسعار معقولة',
    count: 410,
    icon: MapPin,
    pins: [
      { x: 48, y: 40, labelEn: 'Dreamland', labelAr: 'دريmland' },
      { x: 55, y: 55, labelEn: 'Palm Hills', labelAr: 'بالم هيلز' },
      { x: 42, y: 68, labelEn: 'Zayed', labelAr: 'زايد' },
    ],
    stats: [
      { valueEn: '410+', valueAr: '+410', labelEn: 'Properties', labelAr: 'عقار' },
      { valueEn: '6M', valueAr: '6M', labelEn: 'Avg. Price EGP', labelAr: 'متوسط السعر' },
      { valueEn: '97%', valueAr: '97%', labelEn: 'Satisfaction', labelAr: 'رضا العملاء' },
    ],
  },
];

export default function LocationExplorerSection() {
  const { t, dir } = useLanguage();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const current = locations[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.location-tab-item',
        { x: dir === 'rtl' ? 60 : -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.location-map-wrap',
        { scale: 0.8, opacity: 0, rotate: -10 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [dir]);

  useEffect(() => {
    if (!mapRef.current) return;
    const pins = mapRef.current.querySelectorAll('.location-pin-item');
    gsap.fromTo(
      pins,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }
    );
  }, [active]);

  return (
    <section ref={sectionRef} className={`location-section ${styles.locationSection}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t('Prime Locations', 'مواقع متميزة')}</span>
        <h2 className={styles.sectionTitle}>
          {t('Explore Egypt\'s Hottest Markets', 'استكشف أهم أسواق مصر العقارية')}
        </h2>
        <p className={styles.sectionSubtitle}>
          {t(
            'Tap a region to discover live market data and available properties.',
            'اضغط على منطقة لاكتشاف بيانات السوق والعقارات المتاحة.'
          )}
        </p>
      </div>

      <div className={styles.locationInner}>
        <div className={styles.locationTabs}>
          {locations.map((loc, i) => {
            const Icon = loc.icon;
            const isActive = active === i;
            return (
              <motion.div
                key={loc.id}
                className={`location-tab-item ${styles.locationTab} ${isActive ? styles.locationTabActive : ''}`}
                onClick={() => setActive(i)}
                whileHover={{ x: dir === 'rtl' ? -6 : 6 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <div className={styles.locationTabIcon}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className={styles.locationTabName}>{t(loc.nameEn, loc.nameAr)}</div>
                  <div className={styles.locationTabMeta}>{t(loc.metaEn, loc.metaAr)}</div>
                </div>
                <span className={styles.locationTabCount}>{loc.count}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="location-map-wrap">
          <div ref={mapRef} className={styles.locationMap}>
            <div className={`${styles.locationMapRing} ${styles.locationMapRing2}`} />
            <div className={`${styles.locationMapRing} ${styles.locationMapRing3}`} />
            <div className={styles.locationMapRing} />

            <div className={styles.locationCenter}>
              {t(current.nameEn, current.nameAr).split(' ').slice(0, 2).join('\n')}
            </div>

            <AnimatePresence mode="wait">
              {current.pins.map((pin, i) => (
                <motion.div
                  key={`${current.id}-${i}`}
                  className={`location-pin-item ${styles.locationPin}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className={styles.locationPinPulse} />
                  <div className={styles.locationPinLabel}>{t(pin.labelEn, pin.labelAr)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className={styles.locationStats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {current.stats.map((stat, i) => (
                <div key={i} className={styles.locationStat}>
                  <div className={styles.locationStatValue}>{t(stat.valueEn, stat.valueAr)}</div>
                  <div className={styles.locationStatLabel}>{t(stat.labelEn, stat.labelAr)}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
