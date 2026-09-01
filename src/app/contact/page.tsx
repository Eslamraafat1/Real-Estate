'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Send, Shield, Zap, HeartHandshake, Plus, Users, Building, MessageSquare, Quote } from 'lucide-react';
import styles from './page.module.css';
import { faqs } from '@/data/properties';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stacking cards ref
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const stackCardsRef = useRef<HTMLDivElement[]>([]);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqAnswerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );

      // 2. Section Reveals
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((section: any) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          }
        );
      });

      // 3. Parallax Background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.parallaxSection}`,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 4. Stacking Cards
      let mm = gsap.matchMedia();
      mm.add("(min-width: 993px)", () => {
        const cards = stackCardsRef.current;
        if (cards.length > 0) {
          gsap.set(cards[1], { yPercent: 100 });
          gsap.set(cards[2], { yPercent: 100 });
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stackContainerRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: true,
              pin: true,
            }
          });
          
          tl.to(cards[1], { yPercent: 0, ease: 'none' })
            .to(cards[2], { yPercent: 0, ease: 'none' });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    const answer = faqAnswerRefs.current[index];
    const isOpen = openFaq === index;
    
    if (isOpen) {
      gsap.to(answer, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
      setOpenFaq(null);
    } else {
      if (openFaq !== null) {
        gsap.to(faqAnswerRefs.current[openFaq], { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
      }
      setOpenFaq(index);
      gsap.to(answer, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
  };

  const faqTranslations = [
    {
      question: 'How do I start searching for a property?',
      answer: 'You can start by browsing our available properties using advanced search filters to specify property type, location, and budget. You can also contact one of our real estate consultants for personal assistance.',
    },
    {
      question: 'Do you provide mortgage services?',
      answer: 'Yes, we cooperate with major banks and financial institutions in Egypt to provide the best mortgage offers. Our team will help you choose the suitable financing plan and follow up on all procedures.',
    },
    {
      question: 'What are your service fees?',
      answer: 'Our fees vary depending on the requested service. We offer free consultations for first-time buyers. For sellers, we charge a competitive commission upon successful completion of the deal. Contact us for pricing details.',
    },
    {
      question: 'How long does it take to complete a sale or purchase?',
      answer: 'The duration varies depending on factors like market conditions, property type, and payment method. On average, it takes 2 to 6 weeks after agreeing on the price. We ensure a speedy process while guaranteeing all rights.',
    },
    {
      question: 'Can I schedule a property tour?',
      answer: 'Absolutely! You can book an appointment to visit any property through the details page or by contacting us directly. We also provide 360° virtual tours for select properties as an additional option.',
    },
  ];

  return (
    <div ref={containerRef} className={styles.pageContainer} dir={dir}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90" 
            alt="Hero Background" 
            fill 
            unoptimized 
            style={{ objectFit: 'cover' }} 
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} hero-anim`}>{t('Contact Us', 'تواصل معنا')}</h1>
          <p className={`${styles.heroSubtitle} hero-anim`}>{t('We are always here to answer your inquiries and provide the best real estate solutions with professionalism and transparency.', 'نحن دائماً هنا للرد على استفساراتكم وتقديم أفضل الحلول العقارية بكل احترافية وشفافية.')}</p>
          <div className={styles.glassCards}>
            {[
              { icon: Phone, title: t('Phone', 'اتصل بنا'), text: '+20 101 234 5678' },
              { icon: Mail, title: t('Email', 'البريد الإلكتروني'), text: 'info@aqarat.com' },
              { icon: MapPin, title: t('Address', 'العنوان'), text: t('Fifth Settlement, Cairo', 'التجمع الخامس، القاهرة') },
            ].map((card, i) => (
              <div key={i} className={`${styles.glassCard} hero-anim`}>
                <card.icon className={styles.glassIcon} size={32} />
                <h3 className={styles.glassTitle}>{card.title}</h3>
                <p className={styles.glassText} dir="ltr">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Contact Form Section */}
      <section className={`${styles.formSection} reveal-section`}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formLeft}>
              <h2 className={styles.sectionTitle}>{t('Send Your Message', 'أرسل رسالتك')}</h2>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <input type="text" id="name" placeholder=" " className={styles.formInput} required />
                  <label htmlFor="name" className={styles.formLabel}>{t('Full Name', 'الاسم بالكامل')}</label>
                  <div className={styles.formUnderline}></div>
                </div>
                <div className={styles.formGroup}>
                  <input type="tel" id="phone" placeholder=" " className={styles.formInput} required />
                  <label htmlFor="phone" className={styles.formLabel}>{t('Phone', 'رقم الهاتف')}</label>
                  <div className={styles.formUnderline}></div>
                </div>
                <div className={styles.formGroup}>
                  <input type="email" id="email" placeholder=" " className={styles.formInput} required />
                  <label htmlFor="email" className={styles.formLabel}>{t('Email', 'البريد الإلكتروني')}</label>
                  <div className={styles.formUnderline}></div>
                </div>
                <div className={styles.formGroup}>
                  <select id="type" className={styles.formInput} required defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="buy">{t('Buy Property', 'شراء عقار')}</option>
                    <option value="sell">{t('Sell Property', 'بيع عقار')}</option>
                    <option value="rent">{t('Rent Property', 'استئجار عقار')}</option>
                    <option value="other">{t('Other Inquiry', 'استشارة أخرى')}</option>
                  </select>
                  <label htmlFor="type" className={styles.formLabel}>{t('Property Type', 'نوع الاستفسار')}</label>
                  <div className={styles.formUnderline}></div>
                </div>
                <div className={styles.formGroup}>
                  <textarea id="message" placeholder=" " className={styles.formTextarea} required rows={4}></textarea>
                  <label htmlFor="message" className={styles.formLabel}>{t('Message', 'رسالتك')}</label>
                  <div className={styles.formUnderline}></div>
                </div>
                <button type="button" className={styles.submitBtn}>
                  <span>{t('Send Message', 'إرسال الرسالة')}</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
            <div className={styles.formRight}>
              <h2 className={styles.rightTitle}>{t('Why Choose Us?', 'لماذا تختارنا؟')}</h2>
              <div className={styles.promisesList}>
                {[
                  { icon: Zap, text: t('Quick Response', 'سرعة الرد') },
                  { icon: Shield, text: t('Free Consultation', 'استشارة مجانية') },
                  { icon: HeartHandshake, text: t('Personal Follow-up', 'متابعة شخصية') }
                ].map((promise, i) => (
                  <div key={i} className={styles.promiseItem}>
                    <div className={styles.promiseIconWrapper}>
                      <promise.icon className={styles.promiseIcon} />
                    </div>
                    <span className={styles.promiseText}>{promise.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className={`${styles.mapSection} reveal-section`}>
        <div className={styles.container}>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.pinMarker}>
                <MapPin size={40} className={styles.pinIcon} />
                <div className={styles.pinPulse}></div>
              </div>
            </div>
            <div className={styles.mapOverlay}>
              <h3 className={styles.mapOverlayTitle}>{t('Headquarters', 'المقر الرئيسي')}</h3>
              <p className={styles.mapOverlayText}>
                {t('North 90th St, Fifth Settlement', 'شارع التسعين الشمالي، التجمع الخامس')}<br/>
                {t('Cairo, Egypt', 'القاهرة، مصر')}
              </p>
              <div className={styles.mapOverlayDetails}>
                <div className={styles.mapDetail}>
                  <Clock size={18} />
                  <span>{t('Working Hours: 9 AM - 6 PM', 'العمل: 9 ص - 6 م')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Accordion Section */}
      <section className={`${styles.faqSection} reveal-section`}>
        <div className={styles.container}>
          <h2 className={styles.sectionCenterTitle}>{t('Frequently Asked Questions', 'الأسئلة الشائعة')}</h2>
          <div className={styles.faqContainer}>
            {faqs.slice(0, 5).map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button className={styles.faqHeader} onClick={() => toggleFaq(i)}>
                  <span className={styles.faqQuestion}>
                    {t(faqTranslations[i]?.question || faq.question, faq.question)}
                  </span>
                  <div className={`${styles.faqIcon} ${openFaq === i ? styles.open : ''}`}>
                    <Plus size={20} />
                  </div>
                </button>
                <div className={styles.faqAnswer} ref={el => { faqAnswerRefs.current[i] = el!; }}>
                  <div className={styles.faqAnswerInner}>
                    <p>{t(faqTranslations[i]?.answer || faq.answer, faq.answer)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stacking Cards - Why Contact Us */}
      <section className={styles.stackingSection} ref={stackContainerRef}>
        <div className={styles.container}>
          <h2 className={styles.sectionCenterTitle}>{t('Why Contact Us?', 'لماذا تتواصل معنا؟')}</h2>
          <div className={styles.stackCardsContainer}>
            {[
              { 
                title: t('Real Estate Experts Available 24/7', 'خبراء عقاريون على مدار الساعة'), 
                text: t('Our team is always available to answer your inquiries and provide the best advice based on long experience in the real estate market.', 'فريقنا متاح دائماً للرد على استفساراتك وتقديم أفضل النصائح المبنية على خبرة طويلة في السوق العقاري.'), 
                color: 'var(--bg-card)' 
              },
              { 
                title: t('Free Consultations with No Commitment', 'استشارات مجانية بدون التزام'), 
                text: t('Get a free initial consultation to help you make the right decision whether buying, selling, or investing.', 'احصل على استشارة مبدئية مجانية لمساعدتك في اتخاذ القرار الصحيح سواء للبيع، الشراء، أو الاستثمار.'), 
                color: 'var(--dark-secondary)' 
              },
              { 
                title: t('Personal Follow-up Until Deal Completion', 'متابعة شخصية حتى إتمام الصفقة'), 
                text: t('We accompany you step by step from the search and negotiation stage to the signing of the final contracts to ensure your peace of mind.', 'نرافقك خطوة بخطوة من مرحلة البحث والتفاوض وحتى توقيع العقود النهائية لضمان راحة بالك.'), 
                color: 'var(--bg-secondary)' 
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className={styles.stackCard} 
                ref={el => { stackCardsRef.current[i] = el!; }}
                style={{ backgroundColor: card.color, zIndex: i + 1 }}
              >
                <h3 className={styles.stackTitle}>{card.title}</h3>
                <p className={styles.stackText}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Branches Section */}
      <section className={`${styles.branchesSection} reveal-section`}>
        <div className={styles.container}>
          <h2 className={styles.sectionCenterTitle}>{t('Our Branches', 'فروعنا')}</h2>
          <div className={styles.branchesGrid}>
            {[
              { 
                city: t('Cairo', 'القاهرة'), 
                address: t('Fifth Settlement, 90th Street', 'التجمع الخامس، شارع التسعين'), 
                phone: '+20 101 234 5678', 
                hours: t('9:00 AM - 6:00 PM', '9:00 ص - 6:00 م') 
              },
              { 
                city: t('Alexandria', 'الإسكندرية'), 
                address: t('Smouha, Fawzi Moaz Street', 'سموحة، شارع فوزي معاذ'), 
                phone: '+20 102 345 6789', 
                hours: t('10:00 AM - 7:00 PM', '10:00 ص - 7:00 م') 
              },
              { 
                city: t('North Coast', 'الساحل الشمالي'), 
                address: t('Marina 5, Main Gate', 'مارينا 5، البوابة الرئيسية'), 
                phone: '+20 103 456 7890', 
                hours: t('12:00 PM - 10:00 PM', '12:00 م - 10:00 م') 
              }
            ].map((branch, i) => (
              <div key={i} className={styles.branchCard}>
                <Building className={styles.branchIcon} size={32} />
                <h3 className={styles.branchTitle}>{branch.city}</h3>
                <ul className={styles.branchInfoList}>
                  <li><MapPin size={16} /> <span>{branch.address}</span></li>
                  <li><Phone size={16} /> <span dir="ltr">{branch.phone}</span></li>
                  <li><Clock size={16} /> <span>{branch.hours}</span></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Parallax Image Break */}
      <section className={styles.parallaxSection}>
        <div className={styles.parallaxWrapper}>
          <Image 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90"
            alt="Real Estate"
            fill
            className="parallax-bg"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
          <div className={styles.parallaxOverlay}></div>
        </div>
        <div className={styles.parallaxContent}>
          <h2>{t('We are here to help you every step of the way', 'نحن هنا لمساعدتك في كل خطوة')}</h2>
        </div>
      </section>

      {/* 8. Quick Actions Grid */}
      <section className={`${styles.actionsSection} reveal-section`}>
        <div className={styles.container}>
          <div className={styles.actionsGrid}>
            {[
              { icon: Phone, title: t('Call Us', 'اتصل بنا'), desc: t('Talk to one of our representatives directly', 'تحدث مع أحد ممثلينا مباشرة') },
              { icon: MessageSquare, title: t('WhatsApp', 'واتساب'), desc: t('Message us and we will reply immediately', 'راسلنا وسنرد عليك فوراً') },
              { icon: Mail, title: t('Email', 'بريد إلكتروني'), desc: t('Send your inquiry in detail', 'أرسل استفسارك بالتفصيل') },
              { icon: Users, title: t('Visit Office', 'زيارة المكتب'), desc: t('Welcome to our headquarters', 'نرحب بك في مقرنا الرئيسي') }
            ].map((action, i) => (
              <div key={i} className={styles.actionCard}>
                <action.icon className={styles.actionIcon} size={32} />
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDesc}>{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonial Highlight */}
      <section className={`${styles.testimonialSection} reveal-section`}>
        <div className={styles.container}>
          <div className={styles.testimonialCard}>
            <Quote className={styles.quoteIcon} size={64} />
            <p className={styles.quoteText}>
              {t('"My experience with Aqarat was exceptional. The team is very professional and helped me find my dream home in record time at an excellent price. Highly recommended."', '"تجربتي مع عقارات كانت استثنائية. فريق العمل محترف جداً وساعدني في العثور على منزل أحلامي في وقت قياسي وبسعر ممتاز. أنصح بالتعامل معهم بشدة."')}
            </p>
            <div className={styles.authorInfo}>
              <div className={styles.authorImageWrapper}>
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80" 
                  alt="Customer" 
                  fill 
                  unoptimized 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div className={styles.authorDetails}>
                <h4 className={styles.authorName}>{t('Ahmed Mahmoud', 'أحمد محمود')}</h4>
                <span className={styles.authorRole}>{t('Premium Client', 'عميل مميز')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Newsletter CTA */}
      <section className={`${styles.newsletterSection} reveal-section`}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <h2 className={styles.newsletterTitle}>{t('Subscribe to Our Newsletter', 'اشترك في نشرتنا البريدية')}</h2>
            <p className={styles.newsletterDesc}>{t('Get the latest offers and real estate news directly in your inbox to stay up to date with the market.', 'احصل على أحدث العروض والأخبار العقارية مباشرة في بريدك الإلكتروني لتبقى على اطلاع دائم بالسوق.')}</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder={t('Email Address', 'البريد الإلكتروني')} className={styles.newsletterInput} required />
              <button type="button" className={styles.newsletterBtn}>{t('Subscribe', 'اشتراك')}</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
