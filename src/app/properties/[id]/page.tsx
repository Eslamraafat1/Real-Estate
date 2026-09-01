'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { properties } from '@/data/properties';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ChevronRight, ChevronLeft, MapPin, Bed, Bath, 
  Square, Car, Layers, Calendar, Check, 
  Phone, Mail, MessageCircle
} from 'lucide-react';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function PropertyDetailsPage() {
  const params = useParams();
  const { lang, t } = useLanguage();
  const id = params?.id ? Number(params.id) : null;
  const property = properties.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPayment, setDownPayment] = useState(20);
  const [loanYears, setLoanYears] = useState(15);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const calcResultRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLImageElement>(null);

  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';

  const translateType = (type: string) => t(
    type === 'فيلا' ? 'Villa' : type === 'شقة' ? 'Apartment' : type === 'توين هاوس' ? 'Townhouse' : type === 'بنتهاوس' ? 'Penthouse' : type === 'أرض' ? 'Land' : type === 'مكتب' ? 'Office' : type,
    type
  );
  
  const translateStatus = (status: string) => t(
    status === 'للبيع' ? 'For Sale' : status === 'للإيجار' ? 'For Rent' : status,
    status
  );

  useEffect(() => {
    if (property) {
      const price = property.price;
      const dpAmount = price * (downPayment / 100);
      const principal = price - dpAmount;
      const rate = 0.10 / 12; // 10% annual interest
      const payments = loanYears * 12;
      const x = Math.pow(1 + rate, payments);
      const monthly = (principal * x * rate) / (x - 1);
      setMonthlyPayment(Math.round(monthly));
      
      if (calcResultRef.current) {
        gsap.fromTo(calcResultRef.current, 
          { scale: 0.9, color: '#fff' },
          { scale: 1, color: '#EAB308', duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [downPayment, loanYears, property]);

  useEffect(() => {
    if (!property || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Image Load Animation
      gsap.fromTo('.main-img', 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );
      
      gsap.fromTo('.thumb', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );

      // 2. Header Animation
      gsap.fromTo(`.${styles.headerSection} > *`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: {
            trigger: `.${styles.headerSection}`,
            start: 'top 85%'
          }
        }
      );

      // 3. Details Grid
      gsap.fromTo(`.${styles.detailCard}`,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: `.${styles.detailsGrid}`,
            start: 'top 85%'
          }
        }
      );

      // 4. Description
      gsap.fromTo(`.${styles.descriptionText}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: `.${styles.descriptionSection}`,
            start: 'top 85%'
          }
        }
      );

      // 5. Amenities
      gsap.fromTo(`.${styles.amenityChip}`,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.05,
          scrollTrigger: {
            trigger: `.${styles.amenitiesSection}`,
            start: 'top 85%'
          }
        }
      );

      // 6. Stacking Cards
      if (stackContainerRef.current) {
        const cards = gsap.utils.toArray(`.${styles.stackCard}`) as HTMLElement[];
        
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 15vh',
              endTrigger: `.${styles.stackingContainer}`,
              end: 'bottom bottom',
              pin: true,
              pinSpacing: false,
              animation: gsap.to(card, {
                scale: 0.9 - (i * 0.05),
                opacity: 0.5,
                ease: 'none'
              }),
              scrub: true
            });
          }
        });
      }

      // 8. Parallax Image
      if (parallaxImgRef.current) {
        gsap.to(parallaxImgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: `.${styles.parallaxSection}`,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // 9. Agent Card
      gsap.fromTo(`.${styles.agentCard}`,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: `.${styles.agentSection}`,
            start: 'top 80%'
          }
        }
      );

      // 10. Similar Properties
      gsap.fromTo(`.${styles.propertyCard}`,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: `.${styles.similarGrid}`,
            start: 'top 85%'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [property]);

  if (!property) {
    return <div className={styles.notFound}>{t('Property not found', 'عقار غير موجود')}</div>;
  }

  const allImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.imageUrl];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const similarProperties = properties
    .filter(p => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  if (similarProperties.length < 3) {
      similarProperties.push(...properties.filter(p => p.id !== property.id && p.type !== property.type).slice(0, 3 - similarProperties.length));
  }

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* 1. Premium Image Gallery */}
      <section className={styles.gallerySection}>
        <div className={styles.mainImageContainer}>
          <button className={`${styles.galleryNavBtn} ${styles.next}`} onClick={handleNextImage}>
            {lang === 'ar' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
          <button className={`${styles.galleryNavBtn} ${styles.prev}`} onClick={handlePrevImage}>
            {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          
          <Image
            ref={mainImageRef}
            src={allImages[activeImageIndex]}
            alt={property.title}
            fill
            className={`${styles.mainImage} main-img`}
            unoptimized={true}
          />
          <div className={styles.imageBadge}>
            {activeImageIndex + 1} / {allImages.length} {t('Images', 'صور')}
          </div>
        </div>

        {allImages.length > 1 && (
          <div className={styles.thumbnails}>
            {allImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`${styles.thumbnail} thumb ${idx === activeImageIndex ? styles.active : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className={styles.thumbnailImg} unoptimized={true} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Property Header */}
      <section className={styles.headerSection}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeGold}`}>{translateType(property.type)}</span>
          <span className={`${styles.badge} ${styles.badgeStatus}`}>{translateStatus(property.status)}</span>
        </div>
        <h1 className={styles.title}>{property.title}</h1>
        <div className={styles.address}>
          <MapPin size={20} />
          <span>{property.address}, {property.city}</span>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            {property.price.toLocaleString(locale)}
            <span className={styles.currency}>{t('EGP', property.currency)}</span>
          </div>
        </div>
      </section>

      {/* 3. Property Details Grid */}
      <section className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <Bed size={32} className={styles.detailIcon} />
          <span className={styles.detailLabel}>{t('Bedrooms', 'غرف النوم')}</span>
          <span className={styles.detailValue}>{property.bedrooms}</span>
        </div>
        <div className={styles.detailCard}>
          <Bath size={32} className={styles.detailIcon} />
          <span className={styles.detailLabel}>{t('Bathrooms', 'الحمامات')}</span>
          <span className={styles.detailValue}>{property.bathrooms}</span>
        </div>
        <div className={styles.detailCard}>
          <Square size={32} className={styles.detailIcon} />
          <span className={styles.detailLabel}>{t('Area (m²)', 'المساحة (م²)')}</span>
          <span className={styles.detailValue}>{property.area.toLocaleString(locale)}</span>
        </div>
        {property.parking && (
          <div className={styles.detailCard}>
            <Car size={32} className={styles.detailIcon} />
            <span className={styles.detailLabel}>{t('Parking', 'مواقف السيارات')}</span>
            <span className={styles.detailValue}>{property.parking}</span>
          </div>
        )}
        {property.floor && (
          <div className={styles.detailCard}>
            <Layers size={32} className={styles.detailIcon} />
            <span className={styles.detailLabel}>{t('Floor', 'الطابق')}</span>
            <span className={styles.detailValue}>{property.floor}</span>
          </div>
        )}
        {property.yearBuilt && (
          <div className={styles.detailCard}>
            <Calendar size={32} className={styles.detailIcon} />
            <span className={styles.detailLabel}>{t('Year Built', 'سنة البناء')}</span>
            <span className={styles.detailValue}>{property.yearBuilt}</span>
          </div>
        )}
      </section>

      {/* 4. Description Section */}
      <section className={styles.descriptionSection}>
        <h2 className={styles.sectionTitle}>{t('Property Description', 'وصف العقار')}</h2>
        <p className={styles.descriptionText}>{property.description}</p>
      </section>

      {/* 5. Features & Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <section className={styles.amenitiesSection}>
          <h2 className={styles.sectionTitle}>{t('Features & Amenities', 'المميزات والمرافق')}</h2>
          <div className={styles.amenitiesGrid}>
            {property.amenities.map((amenity, idx) => (
              <div key={idx} className={styles.amenityChip}>
                <Check size={20} className={styles.amenityIcon} />
                <span className={styles.amenityText}>{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Stacking Cards - Highlights */}
      <section className={styles.stackingSection}>
        <div className={styles.stackingContainer} ref={stackContainerRef}>
          <div className={styles.stackCard}>
            <h3>{t('Modern & Unique Design', 'تصميم عصري وفريد')}</h3>
            <p>{t('This property features a modern architectural design combining elegance and practicality, with the best luxury finishes for unparalleled comfort.', 'يتميز هذا العقار بتصميم معماري حديث يجمع بين الأناقة والعملية، مع استخدام أفضل المواد والتشطيبات الفاخرة لضمان راحة ورفاهية لا مثيل لها.')}</p>
          </div>
          <div className={styles.stackCard}>
            <h3>{t('Strategic Location', 'موقع استراتيجي')}</h3>
            <p>{t('Located in the heart of the city near major commercial centers, hospitals, and schools, providing you and your family easy access to all essential services.', 'يقع في قلب المدينة بالقرب من أهم المراكز التجارية والمستشفيات والمدارس، مما يوفر لك ولعائلتك سهولة الوصول إلى كافة الخدمات الأساسية والترفيهية.')}</p>
          </div>
          <div className={styles.stackCard}>
            <h3>{t('Safe & Profitable Investment', 'استثمار آمن ومربح')}</h3>
            <p>{t('An exceptional real estate investment opportunity with rewarding returns, in an area witnessing rapid growth and continuous development in infrastructure.', 'فرصة استثنائية للاستثمار العقاري بعوائد مجزية، في منطقة تشهد نمواً متسارعاً وتطوراً مستمراً في البنية التحتية والمشاريع المستقبلية.')}</p>
          </div>
        </div>
      </section>

      {/* 7. Mortgage Calculator */}
      <section className={styles.calcSection}>
        <div className={styles.calcContainer}>
          <h2 className={styles.sectionTitle}>{t('Mortgage Calculator', 'حاسبة التمويل العقاري')}</h2>
          <div className={styles.calcGrid}>
            <div className={styles.calcInputs}>
              <div className={styles.inputGroup}>
                <label>{t('Property Price', 'سعر العقار')}</label>
                <input type="number" value={property.price} disabled />
              </div>
              <div className={styles.inputGroup} style={{marginTop: '1.5rem'}}>
                <label>{t('Down Payment', 'الدفعة المقدمة')} <span className={styles.rangeValue}>{downPayment}%</span></label>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5" 
                  value={downPayment} 
                  onChange={(e) => setDownPayment(Number(e.target.value))} 
                />
              </div>
              <div className={styles.inputGroup} style={{marginTop: '1.5rem'}}>
                <label>{t('Loan Duration (Years)', 'مدة القرض (سنوات)')} <span className={styles.rangeValue}>{loanYears}</span></label>
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  step="1" 
                  value={loanYears} 
                  onChange={(e) => setLoanYears(Number(e.target.value))} 
                />
              </div>
            </div>
            <div className={styles.calcResult} ref={calcResultRef}>
              <span className={styles.resultLabel}>{t('Estimated Monthly Payment', 'القسط الشهري التقريبي')}</span>
              <span className={styles.resultValue}>{monthlyPayment.toLocaleString(locale)} {t('EGP', property.currency)}</span>
              <span className={styles.resultLabel} style={{marginTop: '1rem'}}>{t('Fixed Annual Interest Rate: 10%', 'معدل الفائدة السنوي الثابت: 10%')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Parallax Image Break */}
      <section className={styles.parallaxSection}>
        <Image 
          ref={parallaxImgRef}
          src={allImages.length > 1 ? allImages[1] : allImages[0]} 
          alt="Parallax" 
          fill 
          className={styles.parallaxImage}
          unoptimized={true}
        />
        <div className={styles.parallaxOverlay}></div>
        <div className={styles.parallaxContent}>
          <h2 className={styles.parallaxTitle}>{t('An Exceptional Living Experience', 'تجربة سكن استثنائية')}</h2>
          <p className={styles.parallaxDesc}>{t('Discover the meaning of true luxury in every corner of your new home', 'اكتشف معنى الرفاهية الحقيقية في كل زاوية من زوايا منزلك الجديد')}</p>
        </div>
      </section>

      {/* 9. Agent Contact Card */}
      {property.agent && (
        <section className={styles.agentSection}>
          <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '2rem'}}>{t('Contact the Agent', 'تواصل مع الوكيل العقاري')}</h2>
          <div className={styles.agentCard}>
            <div className={styles.agentImageContainer}>
              <Image 
                src={property.agent.image} 
                alt={property.agent.name} 
                fill 
                className={styles.agentImage}
                unoptimized={true}
              />
            </div>
            <div className={styles.agentInfo}>
              <h3>{property.agent.name}</h3>
              <p>{t('Certified Real Estate Advisor', 'مستشار عقاري معتمد')}</p>
            </div>
            <div className={styles.contactButtons}>
              <button className={`${styles.contactBtn} ${styles.btnPrimary}`}>
                <Phone size={20} />
                {t('Call', 'اتصل')}
              </button>
              <button className={`${styles.contactBtn} ${styles.btnSecondary}`}>
                <MessageCircle size={20} />
                {t('WhatsApp', 'واتساب')}
              </button>
              <button className={`${styles.contactBtn} ${styles.btnSecondary}`}>
                <Mail size={20} />
                {t('Email', 'بريد')}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 10. Similar Properties */}
      {similarProperties.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.sectionTitle}>{t('Similar Properties', 'عقارات مشابهة')}</h2>
          <div className={styles.similarGrid}>
            {similarProperties.map(prop => (
              <Link key={prop.id} href={`/properties/${prop.id}`} className={styles.propertyCard}>
                <div className={styles.cardImageContainer}>
                  <Image src={prop.imageUrl} alt={prop.title} fill className={styles.cardImage} unoptimized={true} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{prop.title}</h3>
                  <div className={styles.cardAddress}>
                    <MapPin size={16} />
                    <span>{prop.address}, {prop.city}</span>
                  </div>
                  <div className={styles.cardPrice}>
                    {prop.price.toLocaleString(locale)} <span style={{fontSize: '1rem', fontWeight: 'normal', color: '#94A3B8'}}>{t('EGP', prop.currency)}</span>
                  </div>
                  <div className={styles.cardFeatures}>
                    <div className={styles.cardFeature}>
                      <Bed size={16} />
                      <span>{prop.bedrooms}</span>
                    </div>
                    <div className={styles.cardFeature}>
                      <Bath size={16} />
                      <span>{prop.bathrooms}</span>
                    </div>
                    <div className={styles.cardFeature}>
                      <Square size={16} />
                      <span>{prop.area} {t('m²', 'م²')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
