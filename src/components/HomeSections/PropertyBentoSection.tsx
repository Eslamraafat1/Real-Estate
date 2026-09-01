'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, TreePine, Waves, Sparkles, Sun } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './homeSections.module.css';

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: 1,
    titleEn: 'Urban Living',
    titleAr: 'حياة حضرية',
    descEn: 'Modern towers in the heart of the city with stunning skyline views.',
    descAr: 'أبراج عصرية في قلب المدينة بإطلالات ساحرة على الأفق.',
    countEn: '320+ units',
    countAr: '+320 وحدة',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    icon: Building2,
    size: 'large' as const,
  },
  {
    id: 2,
    titleEn: 'Green Communities',
    titleAr: 'مجتمعات خضراء',
    descEn: 'Eco-friendly compounds surrounded by nature.',
    descAr: 'مجتمعات صديقة للبيئة محاطة بالطبيعة.',
    countEn: '85+ projects',
    countAr: '+85 مشروع',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    icon: TreePine,
    size: 'medium' as const,
  },
  {
    id: 3,
    titleEn: 'Coastal Retreats',
    titleAr: 'ملاذات ساحلية',
    descEn: 'Beachfront properties with Mediterranean charm.',
    descAr: 'عقارات على البحر بسحر متوسطي أخاذ.',
    countEn: '120+ villas',
    countAr: '+120 فيلا',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
    icon: Waves,
    size: 'small' as const,
  },
  {
    id: 4,
    titleEn: 'Luxury Penthouses',
    titleAr: 'بنتهاوس فاخر',
    descEn: 'Sky-high elegance with private terraces.',
    descAr: 'أناقة في السماء مع تراسات خاصة.',
    countEn: '45+ listings',
    countAr: '+45 عرض',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
    icon: Sparkles,
    size: 'wide' as const,
  },
  {
    id: 5,
    titleEn: 'Desert Oasis',
    titleAr: 'واحة صحراوية',
    descEn: 'Resorts blending luxury with golden landscapes.',
    descAr: 'منتجعات تجمع بين الفخامة والمناظر الذهبية.',
    countEn: '60+ chalets',
    countAr: '+60 شاليه',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    icon: Sun,
    size: 'medium' as const,
  },
];

function BentoCell({
  item,
  className,
}: {
  item: (typeof bentoItems)[0];
  className: string;
}) {
  const { t } = useLanguage();
  const Icon = item.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`bento-cell ${className} ${styles.bentoCell}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Image src={item.image} alt={t(item.titleEn, item.titleAr)} fill className={styles.bentoImage} unoptimized />
      <div className={styles.bentoOverlay}>
        <div className={styles.bentoIcon}>
          <Icon size={24} />
        </div>
        <h3 className={styles.bentoTitle}>{t(item.titleEn, item.titleAr)}</h3>
        <p className={styles.bentoDesc}>{t(item.descEn, item.descAr)}</p>
      </div>
      <span className={styles.bentoCount}>{t(item.countEn, item.countAr)}</span>
      <div className={styles.bentoAccentBar} />
    </motion.div>
  );
}

export default function PropertyBentoSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-cell',
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sizeClass = {
    large: styles.bentoCellLarge,
    medium: styles.bentoCellMedium,
    small: styles.bentoCellSmall,
    wide: styles.bentoCellWide,
  };

  return (
    <section ref={sectionRef} className={`bento-section ${styles.bentoSection}`}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t('Lifestyle', 'أسلوب حياة')}</span>
        <h2 className={styles.sectionTitle}>
          {t('Find Your Perfect Lifestyle', 'اعثر على أسلوب حياتك المثالي')}
        </h2>
        <p className={styles.sectionSubtitle}>
          {t(
            'Every property tells a story. Explore curated collections tailored to how you want to live.',
            'كل عقار يحكي قصة. استكشف مجموعات مختارة تناسب طريقة حياتك.'
          )}
        </p>
      </div>

      <div className={styles.bentoGrid}>
        {bentoItems.map((item) => (
          <BentoCell key={item.id} item={item} className={sizeClass[item.size]} />
        ))}
      </div>
    </section>
  );
}
