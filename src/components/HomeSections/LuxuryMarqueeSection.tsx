'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './homeSections.module.css';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  {
    id: 1,
    titleEn: 'Skyline Penthouse',
    titleAr: 'بنتهاوس سكاي لاين',
    locationEn: 'New Cairo',
    locationAr: 'القاهرة الجديدة',
    priceEn: '18,500,000 EGP',
    priceAr: '18,500,000 جنيه',
    tagEn: 'Hot Deal',
    tagAr: 'صفقة ساخنة',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
  },
  {
    id: 2,
    titleEn: 'Marina Villa',
    titleAr: 'فيلا مارينا',
    locationEn: 'North Coast',
    locationAr: 'الساحل الشمالي',
    priceEn: '32,000,000 EGP',
    priceAr: '32,000,000 جنيه',
    tagEn: 'Exclusive',
    tagAr: 'حصري',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  },
  {
    id: 3,
    titleEn: 'Garden Compound',
    titleAr: 'كمبound حدائق',
    locationEn: '6th October',
    locationAr: '6 أكتوبر',
    priceEn: '7,200,000 EGP',
    priceAr: '7,200,000 جنيه',
    tagEn: 'New Launch',
    tagAr: 'إطلاق جديد',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    id: 4,
    titleEn: 'Sea View Chalet',
    titleAr: 'شاليه بإطلالة بحر',
    locationEn: 'Ain Sokhna',
    locationAr: 'العين السخنة',
    priceEn: '4,800,000 EGP',
    priceAr: '4,800,000 جنيه',
    tagEn: 'Trending',
    tagAr: 'رائج',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
  },
  {
    id: 5,
    titleEn: 'Downtown Loft',
    titleAr: 'لوفت وسط المدينة',
    locationEn: 'Zamalek',
    locationAr: 'الزمالك',
    priceEn: '12,000,000 EGP',
    priceAr: '12,000,000 جنيه',
    tagEn: 'Premium',
    tagAr: 'مميز',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  },
  {
    id: 6,
    titleEn: 'Royal Palace',
    titleAr: 'قصر ملكي',
    locationEn: 'Sheikh Zayed',
    locationAr: 'الشيخ زايد',
    priceEn: '45,000,000 EGP',
    priceAr: '45,000,000 جنيه',
    tagEn: 'Ultra Luxury',
    tagAr: 'فخامة فائقة',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
];

function MarqueeCard({ item }: { item: (typeof marqueeItems)[0] }) {
  const { t } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      className={`marquee-card ${styles.marqueeCard}`}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(234, 179, 8, 0.15)' }}
    >
      <div className={styles.marqueeCardImage}>
        <Image src={item.image} alt={t(item.titleEn, item.titleAr)} fill className={styles.bentoImage} unoptimized />
        <span className={styles.marqueeTag}>{t(item.tagEn, item.tagAr)}</span>
      </div>
      <div className={styles.marqueeCardBody}>
        <div className={styles.marqueeCardPrice}>{t(item.priceEn, item.priceAr)}</div>
        <div className={styles.marqueeCardTitle}>{t(item.titleEn, item.titleAr)}</div>
        <div className={styles.marqueeCardLocation}>
          <MapPin size={14} />
          {t(item.locationEn, item.locationAr)}
        </div>
      </div>
    </motion.div>
  );
}

export default function LuxuryMarqueeSection() {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const doubled = [...marqueeItems, ...marqueeItems];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          x: dir === 'rtl' ? '50%' : '-50%',
          duration: 35,
          ease: 'none',
          repeat: -1,
        });
      }
      if (track2Ref.current) {
        gsap.to(track2Ref.current, {
          x: dir === 'rtl' ? '-50%' : '50%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }

      gsap.fromTo(
        '.marquee-header-anim',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [dir]);

  return (
    <section ref={sectionRef} className={`marquee-section ${styles.marqueeSection}`}>
      <div className={`marquee-header-anim ${styles.marqueeHeader}`}>
        <span className={styles.sectionBadge}>{t('Trending Now', 'الأكثر رواجاً')}</span>
        <h2 className={styles.sectionTitle}>
          {t('Hot Properties on the Market', 'عقارات ساخنة في السوق')}
        </h2>
        <p className={styles.sectionSubtitle}>
          {t(
            'Hand-picked listings flying off the shelf. Don\'t miss your chance.',
            'عقارات مختارة بعناية تُباع بسرعة. لا تفوت فرصتك.'
          )}
        </p>
      </div>

      <div style={{ overflow: 'hidden', marginBottom: 24 }}>
        <div ref={track1Ref} className={styles.marqueeTrack}>
          {doubled.map((item, i) => (
            <MarqueeCard key={`t1-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div ref={track2Ref} className={styles.marqueeTrack} style={{ marginInlineStart: -160 }}>
          {[...doubled].reverse().map((item, i) => (
            <MarqueeCard key={`t2-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
