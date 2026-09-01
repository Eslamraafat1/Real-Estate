'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Languages } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('Home', 'الرئيسية') },
    { href: '/properties', label: t('Properties', 'العقارات') },
    { href: '/about', label: t('About Us', 'من نحن') },
    { href: '/contact', label: t('Contact', 'اتصل بنا') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>A</span>
          <span className={styles.logoText}>Aqarat</span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
              <span className={styles.linkUnderline} />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.langBtn}
            onClick={toggleLang}
            aria-label="Toggle Language"
            title={lang === 'en' ? 'التبديل للعربية' : 'Switch to English'}
          >
            <Languages size={18} />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>
          <ThemeToggle />
          <a href="tel:+201012345678" className={styles.phoneBtn}>
            <Phone size={16} />
            <span>{t('Call Us', 'اتصل بنا')}</span>
          </a>
          <button
            className={styles.menuBtn}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <button className={styles.mobileLangBtn} onClick={toggleLang}>
            <Languages size={18} />
            {lang === 'en' ? 'التبديل للعربية' : 'Switch to English'}
          </button>
          <a href="tel:+201012345678" className={styles.mobileCta}>
            <Phone size={18} />
            {t('Call Us Now', 'اتصل بنا الآن')}
          </a>
        </div>
      </div>
    </nav>
  );
}
