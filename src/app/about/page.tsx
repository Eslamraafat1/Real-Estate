'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '@/data/properties';
import { useLanguage } from '@/context/LanguageContext';
import {
  Globe, Share2, MessageCircle, Star, Target, Heart, Eye, Award, Lightbulb, Trophy, Users, Quote
} from 'lucide-react';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { t, dir, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      const tlHero = gsap.timeline();
      tlHero.from('.hero-reveal', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
      .from('.hero-img', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1');

      gsap.to('.hero-img-inner', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Stats Counters
      const stats = gsap.utils.toArray('.stat-num');
      stats.forEach((stat) => {
        const el = stat as HTMLElement;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        gsap.to(el, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: function() {
            el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + '+';
          }
        });
      });

      // 3. Timeline
      gsap.to('.timeline-line-draw', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: true
        }
      });

      gsap.utils.toArray('.milestone-anim').forEach((m, i) => {
        const el = m as HTMLElement;
        gsap.from(el, {
          x: i % 2 === 0 ? 50 : -50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%'
          }
        });
      });

      // 4. Stacking Cards
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        if (i !== cards.length - 1) {
          gsap.to(el, {
            scale: 0.9,
            opacity: 0.5,
            scrollTrigger: {
              trigger: cards[i + 1] as HTMLElement,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true
            }
          });
        }
      });

      // 5. Team Stagger
      gsap.from('.team-member-anim', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 70%'
        }
      });

      // 6. Horizontal Gallery
      const galleryScroll = gsap.to('.gallery-container', {
        xPercent: dir === 'rtl' ? (100 - (100 / 5)) : (-100 + (100 / 5)), // Assuming 5 cards, adjust based on widths and direction
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          start: 'top 20%',
          end: '+=2000'
        }
      });

      // 7. Awards
      gsap.from('.award-card-anim', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: awardsRef.current,
          start: 'top 75%'
        }
      });

      // 8. Infinite Marquee
      gsap.to('.marquee-1', {
        xPercent: dir === 'rtl' ? 50 : -50,
        ease: 'none',
        duration: 20,
        repeat: -1
      });
      gsap.to('.marquee-2', {
        xPercent: dir === 'rtl' ? -50 : 50,
        ease: 'none',
        duration: 20,
        repeat: -1
      });

      // 9. Parallax Quote
      gsap.to('.quote-bg-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      gsap.from('.quote-content-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 60%'
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [dir]);

  const timelineMilestones = [
    { year: '2009', title: t('The Beginning', 'البداية'), desc: t('Founded the company with an ambitious vision to change real estate.', 'تأسيس الشركة برؤية طموحة لتغيير مفهوم العقارات.') },
    { year: '2012', title: t('First Mega Project', 'أول مشروع ضخم'), desc: t('Launched our first integrated residential complex.', 'إطلاق أول مجمع سكني متكامل يحمل بصمتنا.') },
    { year: '2015', title: t('Regional Expansion', 'التوسع الإقليمي'), desc: t('Opened new branches in strategic cities.', 'افتتاح فروع جديدة في أهم المدن الاستراتيجية.') },
    { year: '2018', title: t('Excellence Award', 'جائزة التميز'), desc: t('Awarded best real estate developer in the region.', 'الحصول على جائزة أفضل مطور عقاري في المنطقة.') },
    { year: '2021', title: t('Digital Transformation', 'التحول الرقمي'), desc: t('Launched our digital platform to ease customer journey.', 'إطلاق منصتنا الرقمية لتسهيل رحلة العميل.') },
    { year: '2024', title: t('Future Vision', 'الرؤية المستقبلية'), desc: t('Developing smart and sustainable projects for the future.', 'تطوير مشاريع ذكية ومستدامة تلبي احتياجات المستقبل.') }
  ];

  const values = [
    { title: t('Transparency', 'الشفافية'), desc: t('We believe in full clarity in all our dealings.', 'نؤمن بالوضوح التام في كل تعاملاتنا.'), icon: Eye },
    { title: t('Quality', 'الجودة'), desc: t('We commit to the highest quality standards in every detail.', 'نلتزم بأعلى معايير الجودة في كل تفصيلة.'), icon: Star },
    { title: t('Innovation', 'الابتكار'), desc: t('We always strive to provide innovative real estate solutions.', 'نسعى دائماً لتقديم حلول عقارية مبتكرة.'), icon: Lightbulb },
    { title: t('Customer Service', 'خدمة العملاء'), desc: t('Customer satisfaction is our first priority.', 'رضا العميل هو محور اهتمامنا الأول.'), icon: Heart }
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', text: t('Luxury residential projects', 'مشاريع سكنية فاخرة') },
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', text: t('Modern designs', 'تصميمات عصرية') },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', text: t('Vast green spaces', 'مساحات خضراء شاسعة') },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', text: t('Integrated communities', 'مجتمعات متكاملة') },
    { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80', text: t('Ideal living environment', 'بيئة حياة مثالية') }
  ];

  const partnersEn = ['Nile Group', 'Tatweer Misr', 'Palm Hills', 'SODIC', 'Mountain View', 'Emaar Misr', 'Talaat Moustafa', 'Orascom'];
  const partnersAr = ['مجموعة النيل', 'تطوير مصر', 'بالم هيلز', 'سوديك', 'ماونتن فيو', 'إعمار مصر', 'طلعت مصطفى', 'أوراسكوم'];
  const partners = lang === 'en' ? partnersEn : partnersAr;

  return (
    <div className={styles.aboutPage} ref={containerRef} dir={dir}>
      
      {/* 1. Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.shape1 + ' ' + styles.floatingShape}></div>
        <div className={styles.shape2 + ' ' + styles.floatingShape}></div>
        
        <div className={styles.heroContent}>
          <div className={`${styles.badge} hero-reveal`}>{t('Our Story', 'قصتنا')}</div>
          <h1 className={`${styles.title} hero-reveal`}>{t('15 Years Journey of Excellence', 'رحلة 15 عامًا من التميز')}</h1>
          <p className={`${styles.story} hero-reveal`}>
            {t('Since our first launch, we set one goal: redefining modern living by delivering exceptional real estate projects blending luxury, comfort, and innovation. We are not just developers; we are lifestyle creators.', 'منذ انطلاقتنا الأولى، وضعنا نصب أعيننا هدفاً واحداً: إعادة صياغة مفهوم الحياة العصرية من خلال تقديم مشاريع عقارية استثنائية تمزج بين الفخامة، والراحة، والابتكار. نحن لسنا مجرد مطور عقاري، بل صناع أسلوب حياة.')}
          </p>
        </div>
        
        <div className={`${styles.heroImageContainer} hero-img`}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=90"
              alt={t('About Company', 'عن الشركة')}
              fill
              className={`${styles.heroImage} hero-img-inner`}
              unoptimized={true}
            />
          </div>
        </div>
      </section>

      {/* 2. Counter Stats Band */}
      <section className={styles.statsBand} ref={statsRef}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><span className="stat-num" data-target="2500">0</span></div>
            <div className={styles.statLabel}>{t('Properties Sold', 'عقار مباع')}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><span className="stat-num" data-target="8000">0</span></div>
            <div className={styles.statLabel}>{t('Happy Clients', 'عميل سعيد')}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><span className="stat-num" data-target="5200">0</span></div>
            <div className={styles.statLabel}>{t('Successful Deals', 'صفقة ناجحة')}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><span className="stat-num" data-target="15">0</span></div>
            <div className={styles.statLabel}>{t('Years of Experience', 'سنة من الخبرة')}</div>
          </div>
        </div>
      </section>

      {/* 3. Timeline Section */}
      <section className={styles.timelineSection} ref={timelineRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Our Journey', 'مسيرتنا')}</h2>
          <p className={styles.story}>{t('Milestones that shaped our identity and contributed to our success', 'محطات شكلت هويتنا وساهمت في نجاحنا')}</p>
        </div>
        
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}>
            <div className={`${styles.timelineLineDraw} timeline-line-draw`}></div>
          </div>
          
          {timelineMilestones.map((milestone, index) => (
            <div key={index} className={`${styles.milestone} milestone-anim ${index % 2 === 0 ? '' : styles.milestoneLeft}`}>
              <div className={styles.milestoneYear}>{milestone.year}</div>
              <div className={styles.milestoneContent}>
                <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                <p className={styles.milestoneDesc}>{milestone.desc}</p>
              </div>
              <div style={{ width: '45%' }} className="hidden-mobile"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stacking Cards - Our Values */}
      <section className={styles.stackingSection} ref={stackRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Our Values', 'قيمنا')}</h2>
          <p className={styles.story}>{t('The principles we rely on in all our works', 'المبادئ التي نرتكز عليها في كل أعمالنا')}</p>
        </div>
        <div className={styles.stackingContainer}>
          {values.map((val, idx) => (
            <div key={idx} className={`${styles.stackCard} stack-card`}>
              <val.icon size={64} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{val.title}</h3>
              <p className={styles.cardDesc}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team Section */}
      <section className={styles.teamSection} ref={teamRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Leadership Team', 'فريق القيادة')}</h2>
          <p className={styles.story}>{t('An elite group of experts united by passion and commitment', 'نخبة من الخبراء يجمعهم الشغف والالتزام')}</p>
        </div>
        <div className={styles.teamGrid}>
          {teamMembers.slice(0, 4).map((member) => {
            const memberNames: Record<number, { en: string; ar: string }> = {
              1: { en: 'Ahmed Mahmoud', ar: 'أحمد محمود' },
              2: { en: 'Sarah Khaled', ar: 'سارة خالد' },
              3: { en: 'Mohamed Abdel-Rahman', ar: 'محمد عبد الرحمن' },
              4: { en: 'Layla Hassan', ar: 'ليلى حسن' }
            };
            const memberBios: Record<number, { en: string; ar: string }> = {
              1: { en: 'Over 15 years of experience in the Egyptian real estate market. Led our team to complete more than 5000 successful deals.', ar: 'خبرة أكثر من 15 عامًا في سوق العقارات المصري. قاد فريقنا نحو تحقيق أكثر من 5000 صفقة ناجحة.' },
              2: { en: 'Specialized in luxury properties with a proven track record of achieving highest customer satisfaction rates.', ar: 'متخصصة في العقارات الفاخرة مع سجل حافل في تحقيق أعلى معدلات رضا العملاء.' },
              3: { en: 'Architect with extensive experience in developing major residential and commercial projects.', ar: 'مهندس معماري بخبرة واسعة في تطوير المشاريع السكنية والتجارية الكبرى.' },
              4: { en: 'Digital marketing expert specializing in real estate with innovative strategies for maximum reach.', ar: 'خبيرة تسويق رقمي متخصصة في التسويق العقاري مع استراتيجيات مبتكرة لتحقيق أقصى انتشار.' }
            };

            const name = memberNames[member.id] ? t(memberNames[member.id].en, memberNames[member.id].ar) : member.name;
            const bio = memberBios[member.id] ? t(memberBios[member.id].en, memberBios[member.id].ar) : member.bio;

            return (
              <div key={member.id} className={`${styles.teamMember} team-member-anim`}>
                <div className={styles.memberImageWrapper}>
                  <Image src={member.image} alt={name} fill className={styles.memberImage} unoptimized={true} />
                </div>
                <h4 className={styles.memberName}>{name}</h4>
                <div className={styles.memberRole}>
                  {t(
                    member.role.includes('التنفيذي') || member.role.includes('CEO') ? 'CEO' :
                    member.role.includes('المبيعات') || member.role.includes('Sales') ? 'Sales Director' :
                    member.role.includes('التطوير') || member.role.includes('Development') ? 'Development Head' :
                    member.role.includes('التسويق') || member.role.includes('Marketing') ? 'Marketing Director' : member.role,
                    member.role
                  )}
                </div>
                <p className={styles.memberBio}>{bio}</p>
                <div className={styles.memberSocial}>
                  <Globe size={20} className={styles.socialIcon} />
                  <Share2 size={20} className={styles.socialIcon} />
                  <MessageCircle size={20} className={styles.socialIcon} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Horizontal Scroll Gallery */}
      <section className={styles.gallerySection} ref={galleryRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Our Projects', 'مشاريعنا')}</h2>
        </div>
        <div className={`${styles.galleryContainer} gallery-container`}>
          {galleryImages.map((img, idx) => (
            <div key={idx} className={styles.galleryCard}>
              <Image src={img.src} alt={img.text} fill className={styles.galleryImage} unoptimized={true} />
              <div className={styles.galleryOverlay}>
                <h3 className={styles.galleryText}>{img.text}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Awards/Achievements Section */}
      <section className={styles.awardsSection} ref={awardsRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Awards & Recognitions', 'الجوائز والتكريمات')}</h2>
          <p className={styles.story}>{t('Certificates we cherish and push us for more', 'شهادات نعتز بها وتدفعنا للمزيد')}</p>
        </div>
        <div className={styles.awardsGrid}>
          <div className={`${styles.awardCard} award-card-anim`}>
            <Trophy size={48} className={styles.awardIcon} />
            <h3 className={styles.awardTitle}>{t('Best Real Estate Company', 'أفضل شركة عقارية')}</h3>
            <p className={styles.story}>{t('Year 2023', 'عام 2023')}</p>
          </div>
          <div className={`${styles.awardCard} award-card-anim`}>
            <Award size={48} className={styles.awardIcon} />
            <h3 className={styles.awardTitle}>{t('Service Excellence Award', 'جائزة التميز في الخدمة')}</h3>
            <p className={styles.story}>{t('In recognition of our customer service efforts', 'تقديراً لجهودنا في خدمة العملاء')}</p>
          </div>
          <div className={`${styles.awardCard} award-card-anim`}>
            <Target size={48} className={styles.awardIcon} />
            <h3 className={styles.awardTitle}>{t('Global Quality Certificate', 'شهادة الجودة العالمية')}</h3>
            <p className={styles.story}>{t('ISO 9001', 'ISO 9001')}</p>
          </div>
        </div>
      </section>

      {/* 8. Partners Infinite Marquee */}
      <section className={styles.partnersSection} ref={marqueeRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('Success Partners', 'شركاء النجاح')}</h2>
        </div>
        <div style={{ transform: 'rotate(-2deg)' }}>
          <div className={`${styles.marqueeRow} marquee-1`}>
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div key={i} className={styles.partnerPill}>{p}</div>
            ))}
          </div>
          <div className={`${styles.marqueeRow} marquee-2`} style={{ transform: 'translateX(-50%)' }}>
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div key={i} className={styles.partnerPill}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Parallax Quote Section */}
      <section className={styles.quoteSection} ref={quoteRef}>
        <div className={styles.quoteBg}>
          <Image 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90" 
            alt="Background" 
            fill 
            className={`${styles.quoteBgImage} quote-bg-img`} 
            unoptimized={true} 
          />
        </div>
        <div className={styles.quoteOverlay}></div>
        <div className={`${styles.quoteContent} quote-content-anim`}>
          <Quote size={64} className={styles.quoteIcon} />
          <h2 className={styles.quoteText}>{t('"We do not just build houses, we create spaces that pulse with life and embrace your happy memories."', '"نحن لا نبني مجرد منازل، بل نصنع مساحات تنبض بالحياة وتحتضن ذكرياتكم السعيدة."')}</h2>
        </div>
      </section>

      {/* 10. Join Us CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaDecor + ' ' + styles.ctaDecor1}></div>
        <div className={styles.ctaDecor + ' ' + styles.ctaDecor2}></div>
        
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('Join Our Family', 'انضم لعائلتنا')}</h2>
          <p className={styles.ctaDesc}>
            {t('We are always looking for exceptional talents who share our passion and vision to build a better future.', 'نحن نبحث دائماً عن المواهب الاستثنائية التي تشاركنا نفس الشغف والرؤية لبناء مستقبل أفضل.')}
          </p>
          <button className={styles.ctaButton}>{t('Explore Career Opportunities', 'استكشف الفرص الوظيفية')}</button>
        </div>
      </section>
      
    </div>
  );
}
