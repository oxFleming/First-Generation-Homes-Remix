import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailsProps {
  project: any;
  onClose: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const images = [
    project.src,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop',
  ];

  useEffect(() => {
    // Initialize Lenis for smooth scrolling within the modal
    const lenis = new Lenis({
      wrapper: containerRef.current!,
      content: containerRef.current?.firstElementChild as HTMLElement,
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const imgContainers = gsap.utils.toArray('.proj-img-container');
      imgContainers.forEach((container: any) => {
        const img = container.querySelector('img');
        
        // Reveal animation
        gsap.fromTo(container,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 95%',
              scroller: containerRef.current
            }
          }
        );

        // Parallax effect on the image itself
        gsap.fromTo(img,
          { yPercent: -15, scale: 1.1 },
          {
            yPercent: 15,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              scroller: containerRef.current
            }
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto overflow-x-hidden text-[#083344]"
    >
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-[#00B4D8]/10 backdrop-blur-md flex items-center justify-center hover:bg-[#00B4D8]/20 transition-colors text-[#083344]"
        >
          <X size={24} />
        </button>

        {/* Left Sticky Section */}
        <div className="w-full md:w-[40%] lg:w-[35%] p-8 md:p-16 relative">
          <div className="md:sticky md:top-32 flex flex-col gap-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.9] tracking-tight text-[#083344]">
              {project.title}
            </h1>
            
            <div className="flex gap-4 text-xs font-mono tracking-widest uppercase text-[#00B4D8]">
              <span>[ {project.location} ]</span>
              <span>[ 2024 ]</span>
            </div>

            <p className="text-base md:text-lg leading-relaxed max-w-md mt-8 font-light text-[#083344]/80">
              An exceptional architectural design that blends modern luxury with timeless elegance. 
              This project showcases our commitment to quality, innovative use of space, and 
              meticulous attention to detail in every finish.
            </p>
          </div>
        </div>

        {/* Right Scrollable Images */}
        <div className="w-full md:w-[60%] lg:w-[65%] p-8 md:p-16 md:pl-0 flex flex-col gap-12 md:gap-24 pt-12 md:pt-32 pb-32">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className={`proj-img-container overflow-hidden relative ${
                idx === 0 ? 'w-full aspect-[16/10]' : 
                idx % 3 === 0 ? 'w-full aspect-[16/9]' : 
                'w-[85%] aspect-[4/3] ' + (idx % 2 === 0 ? 'self-end' : 'self-start')
              }`}
            >
              <img src={src} alt={`${project.title} ${idx}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
