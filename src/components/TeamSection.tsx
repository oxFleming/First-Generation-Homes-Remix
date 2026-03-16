import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const teamMembers = [
  {
    id: 1,
    name: "Remy Okunbena",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    description: "Remy brings over two decades of progressive leadership in civil engineering, project development, and strategic operations across the construction and real estate sectors. He leads the company's mission to deliver innovative, affordable housing solutions with a focus on sustainability, precision, and long-term value."
  },
  {
    id: 2,
    name: "Matthew Kalesanwo",
    role: "VP, Revenue Growth & Business Development",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    description: "With over two decades of experience across construction, real estate, and enterprise strategy, Matthew leads global revenue growth and business development initiatives. He has spearheaded high-impact transformations and expanded market presence across three continents."
  },
  {
    id: 3,
    name: "Uju Amazu",
    role: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    description: "Uju is an accomplished operations executive with over 20 years of leadership experience in P&L management, procurement, budgeting, and enterprise controls. She oversees the firm's operational strategy, streamlining project execution and optimizing financial performance."
  },
  {
    id: 4,
    name: "Shade Akanji",
    role: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    description: "Shade is a globally credentialed finance and risk executive with over 18 years of leadership experience across Fortune 500 companies and global consulting firms. She oversees financial strategy, compliance, and enterprise risk management."
  },
  {
    id: 5,
    name: "Gbemi Adebayo",
    role: "Head of Enterprise Solutions & IT",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    description: "Gbemi brings over 12 years of deep expertise in business process automation, systems engineering, and enterprise data solutions. He leads the design and optimization of the company's digital infrastructure."
  },
  {
    id: 6,
    name: "Olufolake Fadahunsi Olumogba",
    role: "Director of Project Development",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
    description: "Olufolake is a chartered architect with over 30 years of design and development leadership across the UK and Africa. She leads infrastructure delivery and project innovation, ensuring each development meets the highest standards."
  }
];

export const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollWidth,
        invalidateOnRefresh: true,
      }
    });

    // Path Animation
    if (pathRef.current && dotRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + scrollWidth,
          scrub: 1,
        }
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0);

      tl.to(dotRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none"
      }, 0);
    }
  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="relative h-[100dvh] bg-[#00B4D8] overflow-hidden flex items-center">
      {/* Decorative SVG Path */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <defs>
            <filter id="glow-team" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            ref={pathRef}
            id="team-path"
            d="M 0 100 Q 250 0, 500 100 T 1000 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.5)" 
            strokeWidth="1" 
            strokeDasharray="4 8"
          />
          <circle 
            ref={dotRef}
            cx="0" 
            cy="0" 
            r="4" 
            fill="#FFC300" 
            filter="url(#glow-team)"
          />
        </svg>
      </div>

      {/* Fixed Header */}
      <div className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-24 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
          Meet Our Team
        </h2>
        <div className="w-24 h-1 bg-[#FFC300]" />
      </div>
      
      {/* Horizontal Scroll Container */}
      <div ref={scrollRef} className="flex h-full items-center pt-48 md:pt-32 w-max">
        {/* Empty padding block to push the first card to the right initially */}
        <div className="w-[10vw] md:w-[20vw] h-full flex-shrink-0" />

        {teamMembers.map((member, index) => (
          <div 
            key={member.id} 
            className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-full flex items-center justify-center px-4 md:px-12 flex-shrink-0"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full max-h-[75vh]">
              <div className="w-full md:w-[45%] aspect-square md:aspect-[4/5] max-h-[40vh] md:max-h-[50vh] overflow-hidden rounded-2xl relative group shrink-0">
                <div className="absolute inset-0 bg-[#083344]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1] scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-[55%] text-white flex flex-col justify-center">
                <div className="text-[#FFC300] font-mono text-xs md:text-sm mb-2 md:mb-3 tracking-widest uppercase">
                  0{index + 1} / 0{teamMembers.length}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif mb-2 md:mb-3 leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-3 md:mb-4 font-light">
                  {member.role}
                </p>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light line-clamp-4 md:line-clamp-none">
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* End padding */}
        <div className="w-[10vw] md:w-[20vw] h-full flex-shrink-0" />
      </div>
    </section>
  );
};
