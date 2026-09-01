'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, Bed, Bath, Maximize, Home, Building2, 
  TrendingUp, Phone, Mail, Send, CheckCircle, Shield, Award 
} from 'lucide-react';
import styles from './page.module.css';

// Import data
import { properties, cities, propertyTypes } from '@/data/properties';
import { Property } from '@/types/property';
import { useLanguage } from '@/context/LanguageContext';

export default function PropertiesPage() {
  const { t, lang } = useLanguage();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const horizSectionRef = useRef<HTMLDivElement>(null);
  const horizTrackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bannerBgRef = useRef<HTMLDivElement>(null);
  const stackCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const areasRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const [filteredProps, setFilteredProps] = useState<Property[]>(properties);
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBeds, setFilterBeds] = useState('all');

  const translateType = (type: string) => t(
    type === 'فيلا' ? 'Villa' : type === 'شقة' ? 'Apartment' : type === 'توين هاوس' ? 'Townhouse' : type === 'بنتهاوس' ? 'Penthouse' : type === 'أرض' ? 'Land' : type === 'مكتب' ? 'Office' : type,
    type
  );
  
  const translateStatus = (status: string) => t(
    status === 'للبيع' ? 'For Sale' : status === 'للإيجار' ? 'For Rent' : status,
    status
  );
  
  const translateCity = (city: string) => t(
    city === 'القاهرة' ? 'Cairo' : city === 'الجيزة' ? 'Giza' : city === 'العاصمة الإدارية' ? 'New Capital' : city === 'الساحل الشمالي' ? 'North Coast' : city,
    city
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Give time for layout to settle (especially for RTL/LTR changes and fonts)
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. Hero Parallax & Reveal
        gsap.to(heroBgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroBgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.from(heroTextRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.2
        });

        gsap.to(heroLineRef.current, {
          width: '150px',
          duration: 1,
          ease: 'power3.inOut',
          delay: 1
        });

        // 2. Filter Bar
        gsap.from(filterRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 90%'
          }
        });

        // 4. Horizontal Scroll
        if (horizSectionRef.current && horizTrackRef.current) {
          const trackWidth = horizTrackRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          
          if (trackWidth > windowWidth) {
            const distance = trackWidth - windowWidth;
            // Handle RTL properly by scrolling right instead of left if language is Arabic
            const moveX = lang === 'ar' ? distance : -distance;
            
            gsap.to(horizTrackRef.current, {
              x: moveX,
              ease: 'none',
              scrollTrigger: {
                trigger: horizSectionRef.current,
                pin: true,
                scrub: 1,
                start: 'top top',
                end: () => `+=${distance}`
              }
            });
          }
        }

        // 5. Counters
        numbersRef.current.forEach((el) => {
          if (!el) return;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          gsap.to(el, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%'
            }
          });
        });

        // 6. Banner Parallax
        gsap.to(bannerBgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerBgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // 7. Stacking Cards
        stackCardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          });
        });

        // 8. Popular Areas Stagger
        gsap.from(areasRef.current, {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: areasRef.current[0],
            start: 'top 80%'
          }
        });

        // 9. Form Reveal
        if (formRef.current) {
          gsap.from(formRef.current.children, {
            x: (i) => i === 0 ? 50 : -50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%'
            }
          });
        }
      }, containerRef);
      
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [lang]); // Re-run GSAP when language changes to recalculate layout

  // Filter Logic & Re-animation
  useEffect(() => {
    let result = properties;
    if (filterType !== 'all') result = result.filter(p => p.type === filterType);
    if (filterCity !== 'all') result = result.filter(p => p.city === filterCity);
    if (filterStatus !== 'all') result = result.filter(p => p.status === filterStatus);
    if (filterBeds !== 'all') result = result.filter(p => p.bedrooms >= parseInt(filterBeds));
    setFilteredProps(result);
  }, [filterType, filterCity, filterStatus, filterBeds]);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [filteredProps]);

  // Area data mock
  const areas = [
    { nameAr: 'التجمع الخامس', nameEn: '5th Settlement', img: 'https://images.unsplash.com/photo-1544485542-a8c4f52f8d38?w=800&q=80', count: 45 },
    { nameAr: 'الشيخ زايد', nameEn: 'Sheikh Zayed', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', count: 32 },
    { nameAr: 'الساحل الشمالي', nameEn: 'North Coast', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80', count: 78 },
    { nameAr: 'العاصمة الإدارية', nameEn: 'New Capital', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', count: 120 }
  ];

  const horizontalCategories = [
    { ar: 'فلل فاخرة', en: 'Luxury Villas' },
    { ar: 'شقق عصرية', en: 'Modern Apartments' },
    { ar: 'بنتهاوس', en: 'Penthouses' },
    { ar: 'شاليهات ساحلية', en: 'Coastal Chalets' }
  ];

  const stackCards = [
    { icon: <Shield size={32}/>, titleAr: 'شفافية مطلقة', titleEn: 'Absolute Transparency', descAr: 'نضمن لك وضوحاً تاماً في جميع الإجراءات القانونية والمالية.', descEn: 'We guarantee full clarity in all legal and financial procedures.' },
    { icon: <Award size={32}/>, titleAr: 'خبرة 15+ سنة', titleEn: '15+ Years Experience', descAr: 'فريق من الخبراء المتمرسين في السوق العقاري المحلي والدولي.', descEn: 'A team of seasoned experts in the local and international real estate market.' },
    { icon: <CheckCircle size={32}/>, titleAr: 'ضمان أفضل سعر', titleEn: 'Best Price Guarantee', descAr: 'نوفر لك عقارات بأسعار تنافسية لا مثيل لها في السوق.', descEn: 'We provide you with properties at unmatched competitive prices in the market.' }
  ];

  return (
    <div className={styles.container} ref={containerRef}>
      {/* 1. Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg} ref={heroBgRef}></div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine} ref={heroTextRef}>{t('Explore Our Properties', 'اكتشف عقاراتنا')}</span>
          </h1>
          <p className={styles.heroSubtitle} style={{ color: 'var(--text-on-dark, #F8FAFC)', fontSize: '1.2rem', marginTop: '1rem', position: 'relative', zIndex: 1 }}>{t('Browse our exclusive collection of the finest properties in Egypt', 'تصفح مجموعتنا الحصرية لأرقى العقارات في مصر')}</p>
          <div className={styles.goldUnderline} ref={heroLineRef}></div>
        </div>
      </section>

      {/* 2. Advanced Filter Bar */}
      <section className={styles.filterSection} ref={filterRef}>
        <div className={styles.filterContainer}>
          <div className={styles.filterGroup}>
            <label>{t('Property Type', 'نوع العقار')}</label>
            <select className={styles.filterSelect} value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">{t('All', 'الكل')}</option>
              {propertyTypes.map(type => <option key={type} value={type}>{translateType(type)}</option>)}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>{t('City', 'المدينة')}</label>
            <select className={styles.filterSelect} value={filterCity} onChange={e => setFilterCity(e.target.value)}>
              <option value="all">{t('All', 'الكل')}</option>
              {cities.map(city => <option key={city} value={city}>{translateCity(city)}</option>)}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>{t('Status', 'الحالة')}</label>
            <select className={styles.filterSelect} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">{t('All', 'الكل')}</option>
              <option value="للبيع">{t('For Sale', 'للبيع')}</option>
              <option value="للإيجار">{t('For Rent', 'للإيجار')}</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>{t('Bedrooms', 'الغرف')}</label>
            <select className={styles.filterSelect} value={filterBeds} onChange={e => setFilterBeds(e.target.value)}>
              <option value="all">{t('All', 'الكل')}</option>
              <option value="1">{t('+1 Beds', '+1 غرف')}</option>
              <option value="2">{t('+2 Beds', '+2 غرف')}</option>
              <option value="3">{t('+3 Beds', '+3 غرف')}</option>
              <option value="4">{t('+4 Beds', '+4 غرف')}</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Properties Grid */}
      <section className={styles.propertiesSection}>
        {filteredProps.length > 0 ? (
          <div className={styles.grid} ref={cardsRef}>
            {filteredProps.map(prop => (
              <Link href={`/properties/${prop.id}`} key={prop.id}>
                <div className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <div className={styles.typeBadge}>{translateType(prop.type)}</div>
                    <Image src={prop.imageUrl} alt={prop.title} width={400} height={300} className={styles.cardImage} unoptimized />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardPrice}>
                      {prop.price.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')} {t(prop.currency === 'ج.م' ? 'EGP' : prop.currency || 'EGP', prop.currency || 'ج.م')}
                    </div>
                    <h3 className={styles.cardTitle}>{prop.title}</h3>
                    <div className={styles.cardLocation}>
                      <MapPin size={16} /> {prop.location}, {translateCity(prop.city)}
                    </div>
                    <div className={styles.cardSpecs}>
                      <div className={styles.spec}><Bed size={16}/> {prop.bedrooms}</div>
                      <div className={styles.spec}><Bath size={16}/> {prop.bathrooms}</div>
                      <div className={styles.spec}><Maximize size={16}/> {prop.area} {t('sqm', 'م²')}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>{t('No results found matching your search.', 'لا توجد نتائج مطابقة لبحثك.')}</div>
        )}
      </section>

      {/* 4. Horizontal Cards Scroll */}
      <section className={styles.horizontalSection} ref={horizSectionRef}>
        <div className={styles.horizontalTrack} ref={horizTrackRef} style={{ display: 'flex' }}>
          {horizontalCategories.map((cat, i) => (
            <div className={styles.horizCard} key={i}>
              <Image src={`https://images.unsplash.com/photo-${1512917774080 + i}?w=1200&q=90`} alt={t(cat.en, cat.ar)} fill className={styles.horizCardBg} unoptimized/>
              <div className={styles.horizOverlay}>
                <h2 className={styles.horizTitle}>{t('Explore', 'استكشف')} <span>{t(cat.en, cat.ar)}</span></h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Investment Stats Band */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <Home className={styles.statIcon} size={40} />
            <span className={styles.statNumber} ref={el => { numbersRef.current[0] = el; }} data-target="1500">0</span>
            <span className={styles.statLabel}>{t('Properties Sold', 'عقار مباع')}</span>
          </div>
          <div className={styles.statItem}>
            <Building2 className={styles.statIcon} size={40} />
            <span className={styles.statNumber} ref={el => { numbersRef.current[1] = el; }} data-target="350">0</span>
            <span className={styles.statLabel}>{t('Exclusive Projects', 'مشروع حصري')}</span>
          </div>
          <div className={styles.statItem}>
            <TrendingUp className={styles.statIcon} size={40} />
            <span className={styles.statNumber} ref={el => { numbersRef.current[2] = el; }} data-target="15">0</span>
            <span className={styles.statLabel}>{t('Years of Experience', 'سنوات الخبرة')}</span>
          </div>
          <div className={styles.statItem}>
            <Award className={styles.statIcon} size={40} />
            <span className={styles.statNumber} ref={el => { numbersRef.current[3] = el; }} data-target="98">0</span>
            <span className={styles.statLabel}>{t('% Client Satisfaction', '% رضا العملاء')}</span>
          </div>
        </div>
      </section>

      {/* 6. Exclusive Offers Parallax Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerBg} ref={bannerBgRef}></div>
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>{t('Exclusive', 'عروض')} <span>{t('Offers', 'حصرية')}</span> {t('for Investors', 'للمستثمرين')}</h2>
          <p className={styles.bannerText}>{t('Take advantage of the best real estate offers in the finest areas at the most competitive prices in the market.', 'استفد من أفضل العروض العقارية في أرقى المناطق وبأفضل الأسعار التنافسية في السوق.')}</p>
          <button className={styles.btnPrimary}>{t('Contact Us Now', 'تواصل معنا الآن')}</button>
        </div>
      </section>

      {/* 7. Why Choose Us - Stacking Cards */}
      <section className={styles.stackingSection}>
        <h2 className={styles.stackingTitle}>{t('Why Choose Us?', 'لماذا نحن الخيار الأفضل؟')}</h2>
        <div className={styles.stackingContainer}>
          {stackCards.map((item, i) => (
            <div className={styles.stackCard} key={i} ref={el => { stackCardsRef.current[i] = el; }}>
              <div className={styles.stackIcon}>{item.icon}</div>
              <div className={styles.stackContent}>
                <h3>{t(item.titleEn, item.titleAr)}</h3>
                <p>{t(item.descEn, item.descAr)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Popular Areas Section */}
      <section className={styles.areasSection}>
        <h2 className={styles.areasTitle}>{t('Popular Areas', 'أشهر المناطق')}</h2>
        <div className={styles.areasGrid}>
          {areas.map((area, i) => (
            <div className={styles.areaCard} key={i} ref={el => { areasRef.current[i] = el; }}>
              <Image src={area.img} alt={t(area.nameEn, area.nameAr)} width={400} height={300} className={styles.areaImage} unoptimized/>
              <div className={styles.areaOverlay}>
                <h3 className={styles.areaName}>{t(area.nameEn, area.nameAr)}</h3>
                <span className={styles.areaCount}>{area.count} {t('available properties', 'عقار متاح')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Request Consultation Form */}
      <section className={styles.formSection}>
        <div className={styles.formContainer} ref={formRef}>
          <div className={styles.formLeft}>
            <h2 className={styles.formTitle}>{t('Request a Free Consultation', 'اطلب استشارة مجانية')}</h2>
            <form onSubmit={e => e.preventDefault()}>
              <div className={styles.formGroup}>
                <input type="text" className={styles.formInput} required />
                <label className={styles.formLabel}>{t('Full Name', 'الاسم بالكامل')}</label>
                <div className={styles.formLine}></div>
              </div>
              <div className={styles.formGroup}>
                <input type="email" className={styles.formInput} required />
                <label className={styles.formLabel}>{t('Email Address', 'البريد الإلكتروني')}</label>
                <div className={styles.formLine}></div>
              </div>
              <div className={styles.formGroup}>
                <input type="tel" className={styles.formInput} required />
                <label className={styles.formLabel}>{t('Phone Number', 'رقم الهاتف')}</label>
                <div className={styles.formLine}></div>
              </div>
              <button className={styles.btnPrimary} style={{width: '100%'}}>{t('Submit Request', 'إرسال الطلب')}</button>
            </form>
          </div>
          <div className={styles.formRight}>
            <div className={styles.contactCard}>
              <Phone className={styles.contactIcon} size={32}/>
              <div className={styles.contactInfo}>
                <h4>{t('Call Us', 'اتصل بنا')}</h4>
                <p>+20 123 456 7890</p>
              </div>
            </div>
            <div className={styles.contactCard}>
              <Mail className={styles.contactIcon} size={32}/>
              <div className={styles.contactInfo}>
                <h4>{t('Email Us', 'راسلنا')}</h4>
                <p>info@aqarat.com</p>
              </div>
            </div>
            <div className={styles.contactCard}>
              <MapPin className={styles.contactIcon} size={32}/>
              <div className={styles.contactInfo}>
                <h4>{t('Headquarters', 'المقر الرئيسي')}</h4>
                <p>{t('5th Settlement, Cairo, Egypt', 'التجمع الخامس، القاهرة، مصر')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={`${styles.newsDeco} ${styles.newsDeco1}`}></div>
        <div className={`${styles.newsDeco} ${styles.newsDeco2}`}></div>
        <div className={styles.newsletterContainer}>
          <h2 className={styles.newsTitle}>{t('Subscribe to Our Newsletter', 'اشترك في نشرتنا العقارية')}</h2>
          <p className={styles.newsText}>{t('Get the latest offers and investment opportunities directly in your inbox.', 'احصل على أحدث العروض والفرص الاستثمارية مباشرة في بريدك.')}</p>
          <form className={styles.newsForm} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder={t('Enter your email address', 'أدخل بريدك الإلكتروني')} className={styles.newsInput} required />
            <button className={styles.newsBtn}><Send size={18}/> {t('Subscribe', 'اشترك')}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
