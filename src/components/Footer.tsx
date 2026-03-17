import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 75%',
      }
    });

    // Animate Massive Text
    tl.fromTo('.footer-title', 
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    )
    // Animate Action Buttons
    .fromTo('.footer-action',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
      '-=0.6'
    )
    // Animate Bottom Grid Columns
    .fromTo('.footer-col',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
      '-=0.6'
    );
  }, { scope: footerRef, dependencies: [] });

  return (
    <footer ref={footerRef} className="bg-white text-[#083344] pt-6 pb-8 md:pb-12 px-6 md:px-12 w-full flex flex-col min-h-screen justify-between">
      {/* Massive Text & Action Buttons */}
      <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 mt-[15vh] md:mt-[20vh]">
        <div className="overflow-hidden w-full">
          <h1 className="footer-title text-[clamp(2rem,6.5vw,8rem)] leading-[0.85] font-medium tracking-tight uppercase text-center w-full text-[#083344] whitespace-nowrap">
            FIRST GENERATION
          </h1>
        </div>
        <div className="overflow-hidden w-full">
          <h2 className="footer-title text-[clamp(1rem,3vw,3rem)] leading-none font-medium tracking-[0.3em] uppercase text-center mt-2 md:mt-4 mb-8 md:mb-10 text-[#00B4D8] whitespace-nowrap">
            HOMES LLC
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://wa.me/16303265117', '_blank')}
            className="footer-action flex items-center justify-center gap-2 bg-[#00B4D8] text-white px-6 py-3 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase w-full sm:w-auto hover:bg-[#0096B4] transition-colors shadow-lg shadow-[#00B4D8]/20"
          >
            <MessageCircle size={16} />
            Talk to us on WhatsApp
          </motion.button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-8 lg:gap-12 w-full max-w-[1800px] mx-auto mt-auto pt-8 border-t border-[#00B4D8]/20">
        {/* Column 1: Contact */}
        <div className="footer-col flex flex-col gap-6 lg:col-span-2">
          <div>
            <h4 className="text-xs md:text-sm font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-1 text-[10px] md:text-xs tracking-widest uppercase font-mono">
              <p>630-326-5117</p>
              <p className="break-all sm:break-normal">MATTHEW.KALESANWO@FGIPGROUP.NET</p>
            </div>
          </div>
        </div>

        {/* Column 2: Chicago HQ */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-xs md:text-sm font-semibold mb-3">Chicago - HQ</h4>
            <div className="flex flex-col gap-1 text-[10px] md:text-xs tracking-widest uppercase font-mono">
              <p>444 W LAKE STREET</p>
              <p>SUITE 1700</p>
              <p>CHICAGO, IL 60606</p>
              <p>UNITED STATES</p>
            </div>
          </div>
        </div>

        {/* Column 3: Houston */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-xs md:text-sm font-semibold mb-3">Houston</h4>
            <div className="flex flex-col gap-1 text-[10px] md:text-xs tracking-widest uppercase font-mono">
              <p>HOUSTON, TEXAS</p>
              <p>UNITED STATES</p>
            </div>
          </div>
        </div>

        {/* Column 4: Lagos - Lekki */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-xs md:text-sm font-semibold mb-3">Lagos - Lekki</h4>
            <div className="flex flex-col gap-1 text-[10px] md:text-xs tracking-widest uppercase font-mono">
              <p>LEKKI OFFICE</p>
              <p>LAGOS, NIGERIA</p>
            </div>
          </div>
        </div>

        {/* Column 5: Lagos - Ikeja */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-xs md:text-sm font-semibold mb-3">Lagos - Ikeja</h4>
            <div className="flex flex-col gap-1 text-[10px] md:text-xs tracking-widest uppercase font-mono">
              <p>IKEJA OFFICE</p>
              <p>LAGOS, NIGERIA</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
