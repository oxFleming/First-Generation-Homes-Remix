import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionTemplate } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, X, CheckSquare, MessageSquare, Menu } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ValuesSection } from './components/ValuesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Testimonials } from './components/Testimonials';
import { TeamSection } from './components/TeamSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FAQSection } from './components/FAQSection';
import { StoryCards } from './components/StoryCards';

// Register free GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MotionPathPlugin,
  Flip,
  Draggable,
  Observer,
  TextPlugin
);

// Note: The following requested plugins are Club GSAP (Premium) plugins and require a paid license:
// ScrollSmoother, DrawSVGPlugin, MorphSVGPlugin, MotionPathHelper, InertiaPlugin, SplitText, ScrambleTextPlugin, Physics2DPlugin, PhysicsPropsPlugin.
// They cannot be installed automatically without an auth token.

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'projects', label: 'Projects' },
  { id: 'what-we-do', label: 'What we do' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'team', label: 'Meet Our Team' },
  { id: 'contact', label: 'Contact us' }
];

const heroImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop'
];

const customResidentialProjects = [
  { id: 1, src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop', title: 'Architectural Design', location: 'Chicago, IL' },
  { id: 2, src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop', title: 'Structural Construction', location: 'Evanston, IL' },
  { id: 3, src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop', title: 'Interior Finishing', location: 'Oak Brook, IL' },
  { id: 4, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop', title: 'Landscaping Integration', location: 'Naperville, IL' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop', title: 'Custom Home', location: 'Chicago, IL' }
];

const homeRenovationProjects = [
  { id: 6, src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop', title: 'Kitchen Remodels', location: 'Winnetka, IL' },
  { id: 7, src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop', title: 'Bathroom Renovations', location: 'Highland Park, IL' },
  { id: 8, src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop', title: 'Structural Upgrades', location: 'Lake Forest, IL' },
  { id: 9, src: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1000&auto=format&fit=crop', title: 'Interior Redesign', location: 'Glencoe, IL' },
  { id: 10, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', title: 'Exterior Modernization', location: 'Hinsdale, IL' }
];

const buildingDevelopmentProjects = [
  { id: 11, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', title: 'Development Planning', location: 'Chicago, IL' },
  { id: 12, src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop', title: 'Building Construction', location: 'Evanston, IL' },
  { id: 13, src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop', title: 'Project Management', location: 'Oak Brook, IL' },
  { id: 14, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', title: 'Development Consulting', location: 'Naperville, IL' },
  { id: 15, src: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1000&auto=format&fit=crop', title: 'Material Procurement', location: 'Chicago, IL' }
];

const constructionMaterialsProjects = [
  { id: 16, src: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?q=80&w=1000&auto=format&fit=crop', title: 'Tile Products', location: 'Winnetka, IL' },
  { id: 17, src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1000&auto=format&fit=crop', title: 'Wood Flooring', location: 'Highland Park, IL' },
  { id: 18, src: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1000&auto=format&fit=crop', title: 'Kitchen Fixtures', location: 'Lake Forest, IL' },
  { id: 19, src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop', title: 'Bathroom Installations', location: 'Glencoe, IL' },
  { id: 20, src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop', title: 'Interior Finishing', location: 'Hinsdale, IL' }
];

const categories = [
  {
    id: 'custom-residential',
    title: 'Custom Residential Construction',
    subtitle: "ARCHITECTURAL DESIGN<br />STRUCTURAL CONSTRUCTION<br />INTERIOR FINISHING<br />LANDSCAPING INTEGRATION",
    projects: customResidentialProjects
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation & Property Modernization',
    subtitle: "KITCHEN REMODELS<br />BATHROOM RENOVATIONS<br />STRUCTURAL UPGRADES<br />INTERIOR REDESIGN<br />EXTERIOR MODERNIZATION",
    projects: homeRenovationProjects
  },
  {
    id: 'building-development',
    title: 'Building Development & Real Estate Projects',
    subtitle: "DEVELOPMENT PLANNING<br />BUILDING CONSTRUCTION<br />PROJECT MANAGEMENT<br />DEVELOPMENT CONSULTING<br />MATERIAL PROCUREMENT",
    projects: buildingDevelopmentProjects
  },
  {
    id: 'construction-materials',
    title: 'Construction Materials & Finishing Products',
    subtitle: "TILE PRODUCTS<br />WOOD FLOORING<br />KITCHEN FIXTURES<br />BATHROOM INSTALLATIONS<br />INTERIOR FINISHING",
    projects: constructionMaterialsProjects
  }
];

function PortfolioCategory({ title, subtitle, projects, onProjectClick }: { key?: React.Key, title: string, subtitle: string, projects: any[], onProjectClick: (project: any) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cat-line', 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: catRef.current,
          start: 'top 90%',
        }
      }
    );

    gsap.fromTo('.cat-text',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: catRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: catRef });

  return (
    <div ref={catRef} className="w-full bg-[#00B4D8] text-white pt-4 md:pt-6 pb-8 md:pb-12 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* End-to-end line */}
        <div className="cat-line w-full h-[1px] bg-white/30 mb-4 md:mb-6 origin-left" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          
          {/* Left Sidebar */}
          <div 
            className="w-full lg:w-[20%] flex flex-col group cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start gap-4 md:gap-8">
              {/* Plus Button */}
              <div className="cat-text flex items-center justify-center shrink-0 mt-0.5 w-6 h-6 transition-colors duration-300 group-hover:bg-white group-hover:text-[#00B4D8] text-white">
                {isExpanded ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="cat-text text-[10px] md:text-xs font-sans font-bold text-white mt-1 uppercase tracking-widest">
                  {title}
                </h3>
                <p 
                  className="cat-text text-[10px] md:text-[11px] text-white/90 uppercase tracking-[0.15em] leading-[1.8] mt-16 md:mt-24 max-w-[250px]"
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-[80%]">
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
              <AnimatePresence>
                {(isExpanded ? projects : projects.slice(0, 5)).map((project, index) => (
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: (index % 5) * 0.08 
                    }}
                    key={project.id}
                    className="group/item cursor-pointer flex flex-col origin-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectClick(project);
                    }}
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                      <img 
                        src={project.src} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover/item:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1] flex items-center justify-center">
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                          <ArrowUpRight size={18} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{id: number, src: string, title: string, location: string} | null>(null);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');
  const [buttonTheme, setButtonTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Refs for About Us path animation
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutPathRef = useRef<SVGPathElement>(null);
  const aboutDotRef = useRef<SVGRectElement>(null);

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isButtonOverDark, setIsButtonOverDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest >= 400);
    if (latest >= 400) {
      setIsButtonOverDark(false);
      return;
    }
    
    // Calculate button Y position relative to viewport
    const vh = window.innerHeight;
    const startY = vh * 0.425; // 42.5vh
    const endY = vh - 32; // 100vh - 32px
    const progress = latest / 400;
    const buttonY = startY + progress * (endY - startY);
    
    // Calculate hero section bottom relative to viewport
    const heroBottom = vh * 0.85 - latest;
    
    // If button is above the hero bottom, it's over the dark hero section
    setIsButtonOverDark(buttonY < heroBottom);
  });

  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 100, mass: 0.5 });
  const backgroundY = useTransform(smoothScrollY, [0, 1000], ['0%', '30%']);

  const buttonProgress = useTransform(scrollY, [0, 400], [1, 0]);
  const buttonTransform = useMotionTemplate`translate(calc(${buttonProgress} * (50vw - 32px - 50%)), calc(${buttonProgress} * (-57.5vh + 32px + 50%))) scale(calc(1 + 0.2 * ${buttonProgress}))`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenisInstance) {
        lenisInstance.scrollTo(element, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: element, offsetY: 0 },
          ease: 'power3.inOut'
        });
      }
    }
  };

  // Intro shuffle effect
  useEffect(() => {
    let count = 0;
    const maxShuffles = 8;
    const interval = setInterval(() => {
      setShuffleIndex((prev) => (prev + 1) % heroImages.length);
      count++;
      if (count >= maxShuffles) {
        clearInterval(interval);
        setShuffleIndex(0); // Settle on the first image
        if (tlRef.current) tlRef.current.play();
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Normal auto-rotate effect (only after intro)
  useEffect(() => {
    if (!introFinished) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [introFinished, activeIndex]);

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Smoother lerp
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Prevent scrolling during intro and when modal is open
  useEffect(() => {
    if (!introFinished || selectedProject) {
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [introFinished, lenisInstance, selectedProject]);

  useGSAP(() => {
    if (introFinished) {
      Draggable.create("#draggable-fab", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: window,
        onClick: function() {
          scrollToSection('inquiry');
        }
      });
    }
  }, [introFinished, lenisInstance]);

  useGSAP(() => {
    // Initial states
    gsap.set(bgContainerRef.current, { 
      clipPath: 'polygon(35% 47%, 65% 47%, 65% 71%, 35% 71%)',
      opacity: 0,
      filter: 'blur(12px)',
      scale: 0.95
    });
    gsap.set(titleRef.current, { color: '#000000' });
    gsap.set(lineRef.current, { backgroundColor: 'rgba(0,0,0,0.3)' });
    gsap.set([bottomTextRef.current, previewRef.current], { opacity: 0, y: 20 });

    tlRef.current = gsap.timeline({ 
      paused: true, 
      onComplete: () => {
        setIntroFinished(true);
        // Refresh ScrollTrigger after intro animation finishes and layout settles
        setTimeout(() => ScrollTrigger.refresh(), 100);

        // Typewriter effect using TextPlugin
        const words = ["BUILD", "DESIGN", "CRAFT", "CREATE"];
        let masterTl = gsap.timeline({ repeat: -1 });
        words.forEach(word => {
          let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 2 });
          tl.to("#typewriter", { duration: 1, text: word, ease: "none" });
          masterTl.add(tl);
        });
      }
    });

    // Fade in the small image container at the very beginning
    gsap.to(bgContainerRef.current, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });

    // The main expansion timeline (played after shuffle)
    tlRef.current
      .to(bgContainerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.8,
        ease: 'power3.inOut'
      })
      .to(titleRef.current, {
        color: '#ffffff',
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.8')
      .to(lineRef.current, {
        backgroundColor: 'rgba(255,255,255,0.3)',
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.8')
      .to([bottomTextRef.current, previewRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out'
      }, '-=0.6');

    // Pin the navigation
    ScrollTrigger.create({
      trigger: navRef.current,
      start: "top 24px",
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    // Theme switching for nav
    const themeSections = gsap.utils.toArray('[data-theme]');
    themeSections.forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60px', // Trigger when section hits the nav area
        end: 'bottom 60px',
        onEnter: () => setNavTheme(section.dataset.theme as 'light' | 'dark'),
        onEnterBack: () => setNavTheme(section.dataset.theme as 'light' | 'dark'),
      });

      // Theme switching for button (bottom of screen)
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=52px', // Trigger when section hits the button area
        end: 'bottom bottom-=52px',
        onEnter: () => setButtonTheme(section.dataset.theme as 'light' | 'dark'),
        onEnterBack: () => setButtonTheme(section.dataset.theme as 'light' | 'dark'),
      });
    });

    // Active section tracking
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id),
        });
      }
    });

    // ScrollTrigger Animations for About Section
    const aboutTexts = gsap.utils.toArray('.about-text');
    aboutTexts.forEach((text: any) => {
      gsap.fromTo(text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        }
      );
    });

    // About Us Path Animation
    if (aboutSectionRef.current && aboutPathRef.current && aboutDotRef.current) {
      gsap.to(aboutDotRef.current, {
        motionPath: {
          path: aboutPathRef.current,
          align: aboutPathRef.current,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });
    }

    // Image Parallax and Reveal
    const imgContainers = gsap.utils.toArray('.img-container');
    imgContainers.forEach((container: any) => {
      const img = container.querySelector('img');
      
      // Reveal
      gsap.fromTo(container,
        { y: 100, opacity: 0, clipPath: 'inset(20% 0 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        }
      );

      // Parallax
      gsap.fromTo(img,
        { scale: 1.15, yPercent: -15 },
        {
          scale: 1,
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-[150vh] bg-white font-sans overflow-x-hidden w-full">
      {/* Hero Section */}
      <div id="home" ref={containerRef} className="relative w-full h-[85vh] bg-white text-white" data-theme="dark">
        {/* Background Container */}
        <div 
          ref={bgContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
          {/* Background Images */}
          <motion.div 
            className="absolute -inset-y-[20%] inset-x-0" 
            style={{ perspective: '1000px', y: backgroundY }}
          >
            {!introFinished ? (
              <img
                src={heroImages[shuffleIndex]}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
            ) : (
              <AnimatePresence initial={false}>
                <motion.img
                  key={`bg-${activeIndex}`}
                  src={heroImages[activeIndex]}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.75 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            )}
          </motion.div>

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-[100] flex flex-col justify-between h-full pt-8 md:pt-10 lg:pt-10 pb-8 md:pb-12 pointer-events-none">
          
          {/* Top Section */}
          <div className="w-full pointer-events-auto">
            <div className="px-6 md:px-10 lg:px-12">
              {/* Stretched Title */}
              <h1 
                ref={titleRef}
                className="flex justify-between w-full text-[8vw] md:text-[5.5vw] lg:text-[6vw] leading-[0.8] font-medium uppercase tracking-tight mb-4"
                aria-label="First Generation Homes - Custom Residential Construction & Renovation"
              >
                {'FIRST GENERATION HOMES'.split('').map((char, i) => (
                  <span key={i} aria-hidden="true">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              
              {/* End-to-end line */}
              <div 
                ref={lineRef}
                className="w-full h-[1px] mb-4"
              />
            </div>

            {/* Navigation Options */}
            <nav 
              ref={navRef}
              className={`flex justify-between items-center w-full px-6 md:px-10 lg:px-12 transition-all duration-500 ${introFinished ? 'opacity-100' : 'opacity-0'} z-[100] ${navTheme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              {/* Desktop Nav */}
              <div className="hidden md:flex flex-wrap justify-between items-center w-full gap-y-4">
                {navItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="cursor-pointer flex items-center gap-2 group py-2"
                    onMouseEnter={() => setActiveIndex(index % heroImages.length)}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <span className={`absolute inset-0 transition-transform duration-300 ease-out ${activeSection === item.id ? 'scale-100' : 'scale-0 group-hover:scale-100'} ${navTheme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                      <span className={`relative font-light text-lg leading-none transition-all duration-300 ${activeSection === item.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'} ${navTheme === 'dark' ? (activeSection === item.id ? 'text-black' : 'group-hover:text-black') : (activeSection === item.id ? 'text-white' : 'group-hover:text-white')}`}>+</span>
                    </div>
                    <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 ${activeSection === item.id ? 'font-bold opacity-100' : 'font-bold opacity-50 group-hover:opacity-100'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Nav Toggle */}
              <div className="flex md:hidden justify-between items-center w-full py-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -mr-2 focus:outline-none"
                >
                  <Menu size={24} />
                </button>
              </div>
            </nav>
          </div>

          {/* Bottom Section */}
          <div 
            ref={bottomTextRef}
            className="flex justify-between items-end w-full pointer-events-auto px-6 md:px-10 lg:px-12"
          >
            {/* Left Text */}
            <div className="max-w-lg text-lg md:text-xl lg:text-2xl leading-[1.3] font-normal tracking-tight">
              WE <span id="typewriter" className="font-bold">BUILD</span> exceptional residential properties<br />
              and custom homes, delivering unparalleled<br />
              craftsmanship across Chicago and beyond.
            </div>
          </div>
        </div>

        {/* Right Preview Image - Positioned half outside */}
        <div className="absolute right-4 md:right-16 lg:right-32 bottom-0 translate-y-[40%] hidden sm:block z-20 pointer-events-auto">
          <div 
            ref={previewRef}
            className="w-[220px] h-[140px] md:w-[400px] md:h-[250px] overflow-hidden cursor-pointer transition-all duration-300 relative"
            onClick={() => setActiveIndex((current) => (current + 1) % heroImages.length)}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={`preview-${activeIndex}`}
                src={heroImages[(activeIndex + 1) % heroImages.length]}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* About Us Section */}
      <div id="who-we-are" ref={aboutSectionRef} className="relative w-full bg-white text-[#083344] py-24 md:py-40 px-6 md:px-12 overflow-hidden" data-theme="light">
        {/* Decorative Path */}
        <div className="absolute left-4 md:left-12 top-0 bottom-0 w-24 pointer-events-none z-0 opacity-20 hidden md:block">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
            <path 
              ref={aboutPathRef}
              id="about-path" 
              d="M 50 0 C 50 200, 100 300, 50 500 C 0 700, 50 800, 50 1000" 
              fill="none" 
              stroke="#00B4D8" 
              strokeWidth="2" 
              strokeDasharray="4 8" 
            />
            <rect 
              ref={aboutDotRef}
              width="12" 
              height="12" 
              fill="#FFC300" 
              transform="translate(-6, -6)" 
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Title */}
          <h2 className="about-text text-6xl md:text-7xl lg:text-[90px] font-serif tracking-tight text-[#083344] mb-8 ml-0 md:ml-[5%]">
            Who we are...
          </h2>

          {/* New Text Content directly under the header */}
          <div className="ml-0 md:ml-[16%] lg:ml-[20%] max-w-4xl mb-16 md:mb-24">
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-[#083344]/80 mb-6">
              We are a Chicago-based real estate development and construction company dedicated to creating exceptional living spaces. Our focus is on residential construction, custom home development, and thoughtful renovations, while also supporting international real estate initiatives.
            </p>
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-[#083344]/80 mb-6">
              We bring strategic expertise to every phase of a project—from design and construction management to selecting the perfect finishing products and planning residential developments.
            </p>
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-[#083344]/80">
              By combining our passion for building with a deep understanding of modern lifestyles, we deliver high-quality environments tailored to your needs, creating spaces you'll be proud to call home.
            </p>
          </div>
        </div>
      </div>

      {/* Story Cards Section */}
      <StoryCards />

      {/* Featured Projects Section */}
      <div id="projects" data-theme="light">
        <FeaturedProjects />
      </div>

      {/* Values Section */}
      <ValuesSection />

      {/* Portfolio Sections */}
      <div id="portfolio-categories" className="bg-[#F8FAFC] pt-16 md:pt-24 pb-16 md:pb-24" data-theme="light">
        <PortfolioGallery 
          categories={categories}
          onProjectClick={setSelectedProject}
        />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" data-theme="dark">
        <Testimonials />
      </div>

      {/* Team Section */}
      <div id="team" data-theme="dark">
        <TeamSection />
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form Section */}
      <div id="inquiry" data-theme="dark">
        <ContactForm />
      </div>

      {/* Footer Section */}
      <div id="contact" data-theme="light">
        <Footer />
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default border border-[#00B4D8]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-[210] p-2 bg-[#083344]/50 hover:bg-[#083344]/80 rounded-full text-white transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} strokeWidth={2} />
              </button>
              
              <div className="relative w-full flex-1 min-h-0 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedProject.src} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover sm:object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-6 md:p-8 bg-white text-[#083344] shrink-0">
                <h3 className="text-xl md:text-2xl font-sans font-bold tracking-tight uppercase mb-1">{selectedProject.title}</h3>
                <p className="text-xs md:text-sm text-[#00B4D8] uppercase tracking-widest font-mono">{selectedProject.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        <motion.div
          key="fab-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: introFinished ? 1 : 0 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, delay: introFinished ? 0 : 1 }}
          style={{ transform: buttonTransform }}
          className={`fixed bottom-8 left-8 z-[150] ${!introFinished ? 'pointer-events-none' : ''}`}
        >
          <button
            id="draggable-fab"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center justify-center rounded-full font-sans font-bold text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-500 ease-[0.22,1,0.36,1] cursor-grab active:cursor-grabbing ${(scrollY.get() < 400 ? (isButtonOverDark ? 'dark' : 'light') : buttonTheme) === 'dark' ? 'text-white border border-white hover:bg-white hover:text-[#00B4D8]' : 'text-[#00B4D8] border border-[#00B4D8] hover:bg-[#00B4D8] hover:text-white'} ${isScrolled && !isHovered ? 'px-0' : 'px-5'} min-w-[40px] md:min-w-[48px] h-[40px] md:h-[48px]`}
          >
            <MessageSquare 
              className={`shrink-0 transition-all duration-500 ease-[0.22,1,0.36,1] ${
                !isScrolled 
                  ? 'w-0 h-0 opacity-0 m-0' 
                  : isHovered 
                    ? 'w-3 h-3 md:w-4 md:h-4 mr-2 opacity-100' 
                    : 'w-4 h-4 md:w-5 md:h-5 opacity-100 m-0'
              }`} 
            />
            <div 
              className={`grid transition-all duration-500 ease-[0.22,1,0.36,1] ${
                isScrolled && !isHovered 
                  ? 'grid-cols-[0fr] opacity-0' 
                  : 'grid-cols-[1fr] opacity-100'
              }`}
            >
              <div className="overflow-hidden flex items-center">
                <span className="whitespace-nowrap">Start Your Project</span>
              </div>
            </div>
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#083344] text-white flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm tracking-widest uppercase font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 flex-1 justify-center">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="text-3xl font-serif uppercase tracking-wider cursor-pointer hover:text-[#00B4D8] transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(item.id), 500);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
