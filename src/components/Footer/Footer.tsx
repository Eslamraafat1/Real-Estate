'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp, Globe, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* CTA Band */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaContent}>
          <h3>{t('Looking for your dream property?', 'هل تبحث عن عقار أحلامك؟')}</h3>
          <p>{t('Contact us today and let our professional team help you find what you\'re looking for', 'تواصل معنا اليوم ودع فريقنا المحترف يساعدك في العثور على ما تبحث عنه')}</p>
        </div>
        <Link href="/contact" className={styles.ctaBtn}>
          {t('Contact Us Now', 'تواصل معنا الآن')}
        </Link>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>A</span>
                <span className={styles.logoText}>Aqarat</span>
              </div>
              <p className={styles.brandDesc}>
                {t(
                  'Your trusted partner in the real estate world. We offer you the best properties in Egypt with exceptional service and world-class quality standards.',
                  'شريكك الموثوق في عالم العقارات. نقدم لك أفضل العقارات في مصر مع خدمة استثنائية ومعايير جودة عالمية.'
                )}
              </p>
              <div className={styles.social}>
                <a href="#" className={styles.socialLink} aria-label="Facebook"><Globe size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="Instagram"><MessageCircle size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="Twitter"><Share2 size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn"><LinkIcon size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>{t('Quick Links', 'روابط سريعة')}</h4>
              <ul className={styles.links}>
                <li><Link href="/">{t('Home', 'الرئيسية')}</Link></li>
                <li><Link href="/properties">{t('Properties', 'العقارات')}</Link></li>
                <li><Link href="/about">{t('About Us', 'من نحن')}</Link></li>
                <li><Link href="/contact">{t('Contact', 'اتصل بنا')}</Link></li>
              </ul>
            </div>

            {/* Property Types */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>{t('Property Types', 'أنواع العقارات')}</h4>
              <ul className={styles.links}>
                <li><Link href="/properties">{t('Apartments', 'شقق')}</Link></li>
                <li><Link href="/properties">{t('Villas', 'فلل')}</Link></li>
                <li><Link href="/properties">{t('Penthouses', 'بنتهاوس')}</Link></li>
                <li><Link href="/properties">{t('Offices', 'مكاتب')}</Link></li>
                <li><Link href="/properties">{t('Land', 'أراضي')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>{t('Contact Us', 'تواصل معنا')}</h4>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={16} />
                  <span>{t('5th Settlement, New Cairo, Egypt', 'التجمع الخامس، القاهرة الجديدة، مصر')}</span>
                </li>
                <li>
                  <Phone size={16} />
                  <span dir="ltr">+20 101 234 5678</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>info@aqarat.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Aqarat. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}</p>
          <button className={styles.scrollTop} onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
