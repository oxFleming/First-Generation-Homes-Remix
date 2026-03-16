import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || !pathRef.current || !circleRef.current) return;

    gsap.fromTo(bgRef.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    gsap.to(circleRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
      },
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden" data-theme="dark">
        {/* Background Video */}
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-living-room-of-a-modern-house-4170-large.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Decorative SVG Path */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="glow-values" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path 
              ref={pathRef}
              id="values-path"
              d="M 500 0 C 800 250, 200 750, 500 1000" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="1" 
              strokeDasharray="4 12"
            />
            <circle 
              ref={circleRef}
              cx="0" 
              cy="0" 
              r="6" 
              fill="#FFC300" 
              filter="url(#glow-values)"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center mt-32">
          <h2 className="text-7xl md:text-8xl lg:text-[7rem] font-serif mb-8 tracking-tight">
            Our Values
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
            Our foundation rests on three uncompromising pillars: Professionalism, Quality, and Integrity.
          </p>
        </div>
      </section>

      {/* Blending Section */}
      <section id="what-we-do" className="w-full bg-[#00B4D8] px-6 md:px-12 py-16 md:py-24 text-white" data-theme="dark">
        <div className="max-w-7xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-sans font-light leading-tight max-w-4xl mb-12">
            From transparent communication to flawless execution, we are committed to building absolute trust alongside every legacy home we deliver.
          </p>
          
          <button 
            onClick={() => {
              const element = document.getElementById('portfolio-categories');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center border border-white hover:bg-white transition-colors duration-300"
          >
            <span className="px-10 py-5 text-sm md:text-base tracking-widest uppercase font-medium text-white group-hover:text-[#00B4D8] transition-colors duration-300">WHAT WE DO</span>
            <span className="p-5 bg-white text-[#00B4D8] border-l border-white">
              <ArrowDown size={20} />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
