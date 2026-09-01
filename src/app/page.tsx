'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, MapPin, BedDouble, Bath, Maximize, 
  Star, Plus, Minus, Home, CheckCircle, SearchCode, FileText,
  Map, Briefcase, Phone, Settings, Users,
  TrendingUp, Award
} from 'lucide-react';
import styles from './page.module.css';
import type { Property } from '@/types/property';
import { properties } from '@/data/properties';
import { useLanguage } from '@/context/LanguageContext';
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import {
  PropertyBentoSection,
  LocationExplorerSection,
  LuxuryMarqueeSection,
  VirtualTourSection,
} from '@/components/HomeSections';

gsap.registerPlugin(ScrollTrigger);

const customStats = [
  { id: 1, labelEn: 'Available Properties', labelAr: 'عقار متاح', value: 2500, icon: Home },
  { id: 2, labelEn: 'Happy Clients', labelAr: 'عميل سعيد', value: 8000, icon: Users },
  { id: 3, labelEn: 'Successful Deals', labelAr: 'صفقة ناجحة', value: 5200, icon: TrendingUp },
  { id: 4, labelEn: 'Years of Experience', labelAr: 'سنة خبرة', value: 15, icon: Award },
];

const horizontalCategories = [
  { id: 1, titleEn: 'Luxury Villas', titleAr: 'فلل فاخرة', descEn: 'Experience ultimate luxury in our high-standard designed villas.', descAr: 'استمتع بالرفاهية المطلقة في فللنا المصممة بأعلى المعايير.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 2, titleEn: 'Modern Apartments', titleAr: 'شقق عصرية', descEn: 'Modern designs suitable for the fast pace of city life.', descAr: 'تصاميم حديثة تناسب إيقاع الحياة السريع في قلب المدينة.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },
  { id: 3, titleEn: 'Penthouses', titleAr: 'بنتهاوس', descEn: 'Charming panoramic views that make your home a masterpiece.', descAr: 'إطلالات بانورامية ساحرة تجعل من منزلك تحفة فنية.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80' },
  { id: 4, titleEn: 'Chalets', titleAr: 'شاليهات', descEn: 'Your quiet haven away from the hustle and bustle of the city.', descAr: 'ملاذك الهادئ بعيداً عن صخب المدينة في أجمل المنتجعات.', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80' },
  { id: 5, titleEn: 'Palaces', titleAr: 'قصور', descEn: 'For those seeking excellence, vast spaces and royal designs.', descAr: 'للباحثين عن التميز، مساحات شاسعة وتصاميم ملكية.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
];

const stackCards = [
  { id: 1, titleEn: '15+ Years Experience', titleAr: 'خبرة 15+ سنة', descEn: 'A long history of success and excellence in the real estate market.', descAr: 'تاريخ طويل من النجاح والتميز في السوق العقاري.', color: 'linear-gradient(135deg, #0F172A, #1E293B)' },
  { id: 2, titleEn: 'Over 5000 Deals', titleAr: 'أكثر من 5000 صفقة', descEn: 'Numbers that speak of our clients\' continuous trust in our services.', descAr: 'أرقام تتحدث عن ثقة عملائنا المستمرة في خدماتنا.', color: 'linear-gradient(135deg, #1E293B, #0F172A)' },
  { id: 3, titleEn: 'Professional Expert Team', titleAr: 'فريق محترف متخصص', descEn: 'Elite real estate consultants at your service round the clock.', descAr: 'نخبة من المستشارين العقاريين لخدمتك على مدار الساعة.', color: 'linear-gradient(135deg, #0F172A, #334155)' },
  { id: 4, titleEn: 'Best Price Guarantee', titleAr: 'ضمان أفضل الأسعار', descEn: 'We offer you the true value of real estate with flexible packages.', descAr: 'نقدم لك القيمة الحقيقية للعقارات مع باقات مرنة.', color: 'linear-gradient(135deg, #1E293B, #0F172A)' },
];

const customServices = [
  { id: 1, titleEn: 'Brokerage', titleAr: 'وساطة عقارية', descEn: 'Connecting buyers and sellers to ensure fair deals.', descAr: 'نربط البائع بالمشتري لضمان صفقات عادلة.', icon: Briefcase },
  { id: 2, titleEn: 'Property Management', titleAr: 'إدارة أملاك', descEn: 'Comprehensive care for your property to ensure sustainable returns.', descAr: 'رعاية شاملة لعقارك لضمان عوائد مستدامة.', icon: Settings },
  { id: 3, titleEn: 'Engineering Consulting', titleAr: 'استشارات هندسية', descEn: 'Designs and plans that meet the latest standards.', descAr: 'تصاميم وتخطيطات تناسب أحدث المعايير.', icon: Map },
  { id: 4, titleEn: 'Property Valuation', titleAr: 'تقييم عقاري', descEn: 'Accurate estimation of your property value by certified experts.', descAr: 'تقدير دقيق لقيمة عقارك من خبراء معتمدين.', icon: SearchCode },
  { id: 5, titleEn: 'Marketing', titleAr: 'تسويق عقاري', descEn: 'Innovative marketing plans for quick sale or rent of your property.', descAr: 'خطط تسويقية مبتكرة لسرعة بيع أو تأجير عقارك.', icon: TrendingUp },
  { id: 6, titleEn: 'Legal Consulting', titleAr: 'استشارات قانونية', descEn: 'Comprehensive legal security for all real estate transactions.', descAr: 'تأمين قانوني شامل لكافة المعاملات العقارية.', icon: FileText },
];

const customTestimonials = [
  { id: 1, nameEn: 'Ahmed Mahmoud', nameAr: 'أحمد محمود', roleEn: 'Investor', roleAr: 'مستثمر', quoteEn: 'Excellent experience and high professionalism in dealing and facilitating procedures.', quoteAr: 'تجربة ممتازة واحترافية عالية في التعامل وتسهيل الإجراءات.', stars: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
  { id: 2, nameEn: 'Sarah Khaled', nameAr: 'سارة خالد', roleEn: 'Client', roleAr: 'عميل', quoteEn: 'They helped me find my dream home in record time and at the best price.', quoteAr: 'ساعدوني في إيجاد منزل أحلامي في وقت قياسي وبأفضل سعر.', stars: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
  { id: 3, nameEn: 'Mohamed Ali', nameAr: 'محمد علي', roleEn: 'Real Estate Developer', roleAr: 'مطور عقاري', quoteEn: 'True success partners, I highly recommend dealing with them.', quoteAr: 'شركاء نجاح حقيقيين، أنصح بالتعامل معهم بشدة.', stars: 4, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
  { id: 4, nameEn: 'Noura Al-Saeed', nameAr: 'نورة السعيد', roleEn: 'Client', roleAr: 'عميل', quoteEn: 'Great customer service and continuous follow-up even after purchase completion.', quoteAr: 'خدمة عملاء رائعة ومتابعة مستمرة حتى بعد إتمام الشراء.', stars: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' },
];

const processSteps = [
  { id: 1, titleEn: 'Find Your Property', titleAr: 'ابحث عن عقارك', descEn: 'Browse thousands of available properties.', descAr: 'تصفح آلاف العقارات المتاحة.', icon: Search },
  { id: 2, titleEn: 'Contact the Consultant', titleAr: 'تواصل مع المستشار', descEn: 'Get a free consultation.', descAr: 'احصل على استشارة مجانية.', icon: Phone },
  { id: 3, titleEn: 'Visit the Property', titleAr: 'قم بزيارة العقار', descEn: 'View the property in reality.', descAr: 'عاين العقار على أرض الواقع.', icon: MapPin },
  { id: 4, titleEn: 'Complete the Deal', titleAr: 'أتمم الصفقة', descEn: 'Transfer ownership safely and easily.', descAr: 'انقل الملكية بأمان وسهولة.', icon: CheckCircle },
];

const customFaqs = [
  { id: 1, qEn: 'How can I start looking for a property?', qAr: 'كيف يمكنني البدء في البحث عن عقار؟', aEn: 'You can use the search engine on the home page to specify required features like property type, location, and budget.', aAr: 'يمكنك استخدام محرك البحث في الصفحة الرئيسية لتحديد المواصفات المطلوبة مثل نوع العقار، الموقع، والميزانية.' },
  { id: 2, qEn: 'What payment methods are available?', qAr: 'ما هي طرق الدفع المتاحة؟', aEn: 'We offer flexible payment options including cash, installments up to 10 years, and real estate financing through approved banks.', aAr: 'نوفر خيارات دفع مرنة تشمل الدفع الكاش، التقسيط على فترات تصل إلى 10 سنوات، والتمويل العقاري عبر البنوك المعتمدة.' },
  { id: 3, qEn: 'Do you offer property management services?', qAr: 'هل تقدمون خدمات إدارة الأملاك؟', aEn: 'Yes, we provide comprehensive property management service that includes renting, collecting rents, and periodic maintenance.', aAr: 'نعم، نوفر خدمة إدارة الأملاك الشاملة التي تتضمن تأجير العقار، تحصيل الإيجارات، الصيانة الدورية.' },
  { id: 4, qEn: 'How long does the ownership transfer take?', qAr: 'كم تستغرق عملية نقل الملكية؟', aEn: 'The ownership transfer process usually takes 3 to 5 business days provided all required documents are available.', aAr: 'تستغرق عملية نقل الملكية عادة من 3 إلى 5 أيام عمل شريطة توفر جميع المستندات المطلوبة.' },
  { id: 5, qEn: 'Do fees include VAT?', qAr: 'هل الرسوم تشمل ضريبة القيمة المضافة؟', aEn: 'All prices shown on our website do not include VAT unless explicitly stated.', aAr: 'جميع الأسعار المعروضة على موقعنا غير شاملة لضريبة القيمة المضافة ما لم يُنص على ذلك صراحة.' },
];

const translateType = (type: string, t: any) => {
  if (type === 'فيلا' || type === 'Villa') return t('Villa', 'فيلا');
  if (type === 'شقة' || type === 'Apartment') return t('Apartment', 'شقة');
  if (type === 'بنتهاوس' || type === 'Penthouse') return t('Penthouse', 'بنتهاوس');
  if (type === 'شاليه' || type === 'Chalet') return t('Chalet', 'شاليه');
  if (type === 'قصر' || type === 'Palace') return t('Palace', 'قصر');
  return t(type, type);
};

const translateStatus = (status: string, t: any) => {
  if (status === 'للبيع' || status === 'For Sale') return t('For Sale', 'للبيع');
  if (status === 'للإيجار' || status === 'For Rent') return t('For Rent', 'للإيجار');
  return t(status, status);
};

export default function HomePage() {
  const { lang, dir, t } = useLanguage();
  
  const container = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalContainer = useRef<HTMLDivElement>(null);
  const stackingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Stats Counter
      const statNumbers = gsap.utils.toArray('.stat-value');
      statNumbers.forEach((stat: any) => {
        const targetValue = parseInt(stat.getAttribute('data-value') || '0', 10);
        gsap.to(stat, {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: function() {
            stat.innerHTML = Math.ceil(this.targets()[0].innerText).toLocaleString(lang === 'en' ? 'en-US' : 'ar-EG');
          }
        });
      });

      gsap.fromTo('.stat-card', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );

      // 3. Featured Properties
      gsap.fromTo('.property-card', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.featured-section',
            start: 'top 70%',
          },
        }
      );

      // 4. Horizontal Scroll Fix
      const hTrack = document.querySelector('.horizontal-track') as HTMLElement;
      if (hTrack) {
        gsap.fromTo(hTrack,
          { x: 0 },
          {
            x: () => {
              const trackWidth = hTrack.scrollWidth;
              const scrollDistance = Math.max(0, trackWidth - window.innerWidth + 40);
              return dir === 'rtl' ? scrollDistance : -scrollDistance;
            },
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalContainer.current,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => "+=" + Math.max(1000, hTrack.scrollWidth - window.innerWidth),
              invalidateOnRefresh: true,
            }
          }
        );
      }

      // 5. Stacking Cards Fix
      const sCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (sCards.length > 0) {
        // Reset inline styles first to ensure clean state on double-render
        sCards.forEach(card => {
          gsap.set(card, { scale: 1, opacity: 1, y: 0 });
        });

        // Animate each card when the next card scrolls up
        sCards.forEach((card, index) => {
          if (index === 0) return; // First card is animated by second card
          
          gsap.fromTo(sCards[index - 1], 
            { scale: 1, opacity: 1, y: 0 },
            {
              scale: 0.92,
              opacity: 0.4,
              y: -30,
              scrollTrigger: {
                trigger: card, // triggered by the incoming card
                start: "top 85%", // starts when incoming card enters viewport
                end: "top 25%",   // ends when incoming card gets close to sticky position
                scrub: 1,
                invalidateOnRefresh: true,
              }
            }
          );
        });
      }

      // 6. Services Reveal
      gsap.fromTo('.service-card', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 70%',
          },
        }
      );

      // 7. Parallax Break
      gsap.to('.parallax-break-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-break-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 8. Testimonials slide
      gsap.fromTo('.testimonial-card', 
        { x: dir === 'rtl' ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 70%',
          },
        }
      );

      // 9. Process line draw
      gsap.from(lineRef.current, {
        height: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      gsap.fromTo('.process-step', 
        { x: (i) => i % 2 === 0 ? 50 : -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.4,
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 60%',
          },
        }
      );

      setTimeout(() => ScrollTrigger.refresh(), 1500);

    }, container);

    return () => ctx.revert();
  }, [dir, lang]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div ref={container} className={styles.mainContainer} dir={dir}>
      
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Stats Section */}
      <section ref={statsRef} className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {customStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className={`stat-card ${styles.statCard}`}>
                  <Icon className={styles.statIcon} size={40} />
                  <div className={`stat-value ${styles.statValue}`} data-value={stat.value}>0</div>
                  <div className={styles.statLabel}>{t(stat.labelEn, stat.labelAr)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW: Lifestyle Bento Grid */}
      <PropertyBentoSection />

      {/* 3. Featured Properties */}
      <section className={`featured-section ${styles.featuredSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>{t('Featured Properties', 'عقارات مميزة')}</span>
            <h2 className={styles.sectionTitle}>{t('Discover the Finest Properties', 'اكتشف أفخم العقارات')}</h2>
            <Link href="/properties" style={{color: 'var(--accent)', textDecoration: 'underline'}}>{t('View All', 'عرض الكل')}</Link>
          </div>
          
          <div className={styles.propertiesGrid}>
            {properties.slice(0, 6).map((property: Property) => (
              <Link href={`/properties/${property.id}`} key={property.id} className={`property-card ${styles.propertyCard}`}>
                <div className={styles.propertyImageWrap}>
                  <Image src={property.imageUrl} alt={property.title} fill className={styles.propertyImage} unoptimized={true} />
                  <div className={styles.propertyType}>{translateType(property.type, t)}</div>
                  <div className={styles.propertyStatus}>{translateStatus(property.status, t)}</div>
                </div>
                <div className={styles.propertyContent}>
                  <div className={styles.propertyPrice}>
                    {property.price.toLocaleString(lang === 'en' ? 'en-US' : 'ar-EG')} {t('EGP', property.currency)}
                  </div>
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <div className={styles.propertyLocation}>
                    <MapPin size={16} />
                    <span>{t(property.city, property.city)} - {property.address}</span>
                  </div>
                  <div className={styles.propertyFeatures}>
                    <div className={styles.featureItem}><BedDouble size={16} /> <span>{property.bedrooms} {t('Beds', 'غرف')}</span></div>
                    <div className={styles.featureItem}><Bath size={16} /> <span>{property.bathrooms} {t('Baths', 'حمامات')}</span></div>
                    <div className={styles.featureItem}><Maximize size={16} /> <span>{property.area} m²</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Location Explorer */}
      <LocationExplorerSection />

      {/* 4. Horizontal Scroll Section */}
      <section ref={horizontalContainer} className={styles.horizontalSectionWrapper}>
        {/* <div className={styles.sectionHeaderCenter}>
          <h2 className={styles.sectionTitle}>{t('Property Categories', 'تصنيفات العقارات')}</h2>
          <p className={styles.sectionSubtitle}>{t('Browse our diverse collection of properties for all tastes', 'تصفح مجموعتنا المتنوعة من العقارات التي تناسب جميع الأذواق')}</p>
        </div> */}
        <div className={styles.horizontalScrollContainer} style={{ overflow: 'hidden' }}>
          <div className="horizontal-track" style={{ display: 'flex', width: 'max-content' }}>
            {horizontalCategories.map((cat, index) => (
              <div key={cat.id} className={`horizontal-card ${styles.horizontalCard}`} style={{ margin: '0 20px' }}>
                <Image src={cat.image} alt={t(cat.titleEn, cat.titleAr)} fill className={styles.horizontalCardImage} unoptimized={true} />
                <div className={styles.horizontalCardOverlay}>
                  <h3 className={styles.horizontalCardTitle}>{t(cat.titleEn, cat.titleAr)}</h3>
                  <p className={styles.horizontalCardDesc}>{t(cat.descEn, cat.descAr)}</p>
                  <button className={styles.horizontalCardBtn}>{t('View More', 'عرض المزيد')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stacking Cards Section */}
      <section ref={stackingRef} className={styles.stackingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>{t('Why Choose Us', 'لماذا نحن')}</span>
            <h2 className={styles.sectionTitle}>{t('Your Trusted Real Estate Partner', 'شريكك العقاري الموثوق')}</h2>
          </div>
          <div className={styles.stackingContainer} style={{ height: '320vh' }}>
            {stackCards.map((card, i) => (
              <div 
                key={card.id} 
                ref={(el) => { cardsRef.current[i] = el; }}
                className={styles.stackCard}
                style={{ background: card.color, position: 'sticky', top: `calc(20vh + ${i * 40}px)`, zIndex: i }}
              >
                <h3 className={styles.stackCardTitle}>{t(card.titleEn, card.titleAr)}</h3>
                <p className={styles.stackCardDesc}>{t(card.descEn, card.descAr)}</p>
                <div className={styles.stackCardNumber}>0{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services Section */}
      <section className={`services-section ${styles.servicesSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>{t('Our Comprehensive Services', 'خدماتنا المتكاملة')}</h2>
            <p className={styles.sectionSubtitle}>{t('We offer a full range of real estate services to meet all your needs', 'نقدم لك باقة شاملة من الخدمات العقارية لتلبية كافة احتياجاتك')}</p>
          </div>
          <div className={styles.servicesGrid}>
            {customServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className={`service-card ${styles.serviceCard}`}>
                  <div className={styles.serviceIconWrap}>
                    <Icon className={styles.serviceIcon} size={32} />
                  </div>
                  <h3 className={styles.serviceTitle}>{t(service.titleEn, service.titleAr)}</h3>
                  <p className={styles.serviceDesc}>{t(service.descEn, service.descAr)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW: Luxury Marquee */}
      <LuxuryMarqueeSection />

      {/* 7. Parallax Image Break */}
      <section className={`parallax-break-section ${styles.parallaxBreak}`}>
        <div className={`parallax-break-bg ${styles.parallaxBreakBg}`}>
          <Image 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90"
            alt="Parallax Break"
            fill
            className={styles.parallaxBreakImage}
            unoptimized={true}
          />
        </div>
        <div className={styles.parallaxBreakOverlay}></div>
        <div className={styles.parallaxBreakContent}>
          <h2 className={styles.parallaxBreakTitle}>{t('Exclusive Investment Opportunities', 'فرص استثمارية حصرية')}</h2>
          <p className={styles.parallaxBreakDesc}>
            {t('Invest in the finest real estate projects with guaranteed returns and a bright future. Discover unmissable opportunities today.', 'استثمر في أرقى المشاريع العقارية بعوائد مضمونة ومستقبل مشرق. اكتشف فرصاً لا تُعوض اليوم.')}
          </p>
          <Link href="/contact" className={styles.goldBtn}>{t('Explore Now', 'اكتشف الآن')}</Link>
        </div>
      </section>

      {/* NEW: Virtual Tour Split */}
      <VirtualTourSection />

      {/* 8. Testimonials Carousel */}
      <section className={`testimonials-section ${styles.testimonialsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>{t('What Our Clients Say', 'آراء عملائنا')}</span>
            <h2 className={styles.sectionTitle}>{t('Testimonials', 'ماذا يقول عملاؤنا')}</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {customTestimonials.map((tData) => (
              <div key={tData.id} className={`testimonial-card ${styles.testimonialCard}`}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < tData.stars ? '#EAB308' : 'none'} color="#EAB308" />
                  ))}
                </div>
                <p className={styles.quote}>"{t(tData.quoteEn, tData.quoteAr)}"</p>
                <div className={styles.authorInfo}>
                  <Image src={tData.avatar} alt={t(tData.nameEn, tData.nameAr)} width={50} height={50} className={styles.avatar} unoptimized={true} />
                  <div>
                    <h4 className={styles.authorName}>{t(tData.nameEn, tData.nameAr)}</h4>
                    <p className={styles.authorRole}>{t(tData.roleEn, tData.roleAr)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Process/Steps Section */}
      <section className={`process-section ${styles.processSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>{t('Your Journey With Us in Simple Steps', 'رحلتك معنا بخطوات بسيطة')}</h2>
          </div>
          <div className={styles.processTimeline}>
            <div ref={lineRef} className={styles.processLine}></div>
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className={`process-step ${styles.processStep} ${i % 2 === 0 ? styles.stepRight : styles.stepLeft}`}>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{t(step.titleEn, step.titleAr)}</h3>
                    <p className={styles.stepDesc}>{t(step.descEn, step.descAr)}</p>
                  </div>
                  <div className={styles.stepIconWrap}>
                    <Icon size={24} className={styles.stepIcon} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>{t('Frequently Asked Questions', 'الأسئلة الشائعة')}</h2>
          </div>
          <div className={styles.faqContainer}>
            {customFaqs.map((faq, i) => (
              <div key={faq.id} className={`${styles.faqItem} ${activeFaq === i ? styles.faqActive : ''}`} onClick={() => toggleFaq(i)}>
                <div className={styles.faqHeader}>
                  <h3 className={styles.faqQuestion}>{t(faq.qEn, faq.qAr)}</h3>
                  <div className={styles.faqIcon}>
                    {activeFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                <div className={styles.faqAnswer} style={{ maxHeight: activeFaq === i ? '200px' : '0' }}>
                  <p>{t(faq.aEn, faq.aAr)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA Banner */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaParticles}></div>
          <h2 className={styles.ctaTitle}>{t('Start Your Real Estate Journey Today', 'ابدأ رحلتك العقارية اليوم')}</h2>
          <p className={styles.ctaDesc}>
            {t('Our team of experts is ready to help you make the right decision. Contact us now to get a free consultation.', 'فريقنا من الخبراء جاهز لمساعدتك في اتخاذ القرار الصائب. تواصل معنا الآن لتحصل على استشارة مجانية.')}
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/properties" className={styles.primaryBtn}>{t('Browse Properties', 'تصفح العقارات')}</Link>
            <Link href="/contact" className={styles.secondaryBtn}>{t('Contact Us', 'تواصل معنا')}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
