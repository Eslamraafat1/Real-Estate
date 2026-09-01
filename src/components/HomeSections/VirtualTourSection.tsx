'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MoveHorizontal, Eye, Camera, Box, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './homeSections.module.css';

gsap.registerPlugin(ScrollTrigger);

const tourFeatures = [
  {
    icon: Eye,
    titleEn: '360° Virtual Tour',
    titleAr: 'جولة افتراضية 360°',
    descEn: 'Walk through every room from your couch.',
    descAr: 'تجول في كل غرفة من منزلك.',
  },
  {
    icon: Camera,
    titleEn: 'HD Photography',
    titleAr: 'تصوير عالي الدقة',
    descEn: 'Professional shots that capture every detail.',
    descAr: 'صور احترافية تلتقط كل التفاصيل.',
  },
  {
    icon: Box,
    titleEn: '3D Floor Plans',
    titleAr: 'مخططات ثلاثية الأبعاد',
    descEn: 'Interactive layouts you can explore.',
    descAr: 'مخططات تفاعلية يمكنك استكشافها.',
  },
  {
    icon: Layers,
    titleEn: 'Before & After',
    titleAr: 'قبل وبعد',
    descEn: 'See the transformation potential.',
    descAr: 'شاهد إمكانيات التحول.',
  },
];

export default function VirtualTourSection() {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setPosition(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    splitRef.current?.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    splitRef.current?.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tour-split-wrap',
        { scale: 0.9, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.tour-feature-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.tour-features-grid',
            start: 'top 85%',
          },
        }
      );

      gsap.to('.tour-handle-icon', {
        x: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const clipAfter = dir === 'rtl'
    ? `inset(0 0 0 ${100 - position}%)`
    : `inset(0 ${100 - position}% 0 0)`;

  return (
    <section ref={sectionRef} className={`tour-section ${styles.tourSection}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t('Virtual Experience', 'تجربة افتراضية')}</span>
        <h2 className={styles.sectionTitle}>
          {t('See It Before You Visit', 'شاهده قبل أن تزوره')}
        </h2>
        <p className={styles.sectionSubtitle}>
          {t(
            'Drag the slider to compare the property before and after renovation. Experience the future of home buying.',
            'اسحب الشريط لمقارنة العقار قبل وبعد التجديد. اختبر مستقبل شراء المنازل.'
          )}
        </p>
      </div>

      <div className={styles.tourInner}>
        <div
          ref={splitRef}
          className={`tour-split-wrap ${styles.tourSplit}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className={styles.tourImageBefore}>
            <Image
              src="https://images.unsplash.com/photo-1560448204-e02f11c45788?w=1200&q=80"
              alt={t('Before renovation', 'قبل التجديد')}
              fill
              className={styles.tourImg}
              unoptimized
              draggable={false}
            />
            <span className={`${styles.tourLabel} ${styles.tourLabelBefore}`}>
              {t('Before', 'قبل')}
            </span>
          </div>

          <div className={styles.tourImageAfter} style={{ clipPath: clipAfter }}>
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              alt={t('After renovation', 'بعد التجديد')}
              fill
              className={styles.tourImg}
              unoptimized
              draggable={false}
            />
            <span className={`${styles.tourLabel} ${styles.tourLabelAfter}`}>
              {t('After', 'بعد')}
            </span>
          </div>

          <div className={styles.tourDivider} style={{ left: `${position}%` }}>
            <motion.div
              className={styles.tourHandle}
              animate={{ scale: isDragging ? 1.15 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <MoveHorizontal size={22} className="tour-handle-icon" />
            </motion.div>
          </div>
        </div>

        <div className={`tour-features-grid ${styles.tourFeatures}`}>
          {tourFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                className={`tour-feature-item ${styles.tourFeature}`}
                whileHover={{ scale: 1.04, borderColor: 'rgba(234, 179, 8, 0.5)' }}
              >
                <div className={styles.tourFeatureIcon}>
                  <Icon size={24} />
                </div>
                <div className={styles.tourFeatureTitle}>{t(feat.titleEn, feat.titleAr)}</div>
                <div className={styles.tourFeatureDesc}>{t(feat.descEn, feat.descAr)}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
