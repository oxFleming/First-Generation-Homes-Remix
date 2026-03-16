import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    step: "01",
    title: "We Envision",
    text: "Every great legacy begins as a fleeting thought. We collaborate closely to uncover the core of your vision, transforming abstract ideas into a concrete, strategic roadmap for your future home.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
    svg: (
      <svg viewBox="0 0 400 400" className="absolute -right-10 -bottom-10 w-[120%] h-[120%] opacity-[0.07] pointer-events-none">
        <circle className="card-path" cx="200" cy="200" r="150" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <circle className="card-path" cx="200" cy="200" r="100" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 50 200 L 350 200" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 200 50 L 200 350" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 94 94 L 306 306" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 94 306 L 306 94" fill="none" stroke="#00B4D8" strokeWidth="2" />
      </svg>
    )
  },
  {
    step: "02",
    title: "We Design",
    text: "With the destination clear, we craft the journey. Our design process merges aesthetics with deep empathy, creating intuitive spaces that feel both inevitable and extraordinary.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    svg: (
      <svg viewBox="0 0 400 400" className="absolute -right-10 -bottom-10 w-[120%] h-[120%] opacity-[0.07] pointer-events-none">
        <rect className="card-path" x="100" y="150" width="200" height="150" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 80 150 L 200 50 L 320 150 Z" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <rect className="card-path" x="160" y="200" width="80" height="100" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 100 150 L 300 150" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 200 50 L 200 300" fill="none" stroke="#00B4D8" strokeWidth="2" />
      </svg>
    )
  },
  {
    step: "03",
    title: "We Build",
    text: "We breathe life into the blueprint. Using meticulous craftsmanship and uncompromising standards, we forge robust, beautiful structures designed to last for generations.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    svg: (
      <svg viewBox="0 0 400 400" className="absolute -right-10 -bottom-10 w-[120%] h-[120%] opacity-[0.07] pointer-events-none">
        <path className="card-path" d="M 100 350 L 100 150 L 200 100 L 300 150 L 300 350 Z" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 100 200 L 300 200" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 100 250 L 300 250" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 100 300 L 300 300" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 150 150 L 150 350" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 200 100 L 200 350" fill="none" stroke="#00B4D8" strokeWidth="2" />
        <path className="card-path" d="M 250 150 L 250 350" fill="none" stroke="#00B4D8" strokeWidth="2" />
      </svg>
    )
  }
];

export function StoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial states
    gsap.set(cardsRef.current, { 
      transformOrigin: "center center",
      yPercent: (i) => i === 0 ? 0 : 150,
      rotation: (i) => i === 0 ? 0 : (i === 1 ? 4 : -4),
      scale: 1,
      opacity: 1
    });

    // Setup paths
    const paths = gsap.utils.toArray('.card-path');
    paths.forEach((p: any) => {
      const l = p.getTotalLength();
      gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
    });

    // Card 0 path animates immediately or on scroll enter
    if (cardsRef.current[0]) {
      gsap.to(cardsRef.current[0].querySelectorAll('.card-path'), {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 300% of viewport height for scrolling duration
        scrub: 1,
        pin: true,
      }
    });

    // Animate Card 1 out, Card 2 in
    tl.to(cardsRef.current[0], { scale: 0.95, yPercent: -5, opacity: 0.6, duration: 1 }, 0)
      .to(cardsRef.current[1], { yPercent: 0, rotation: 0, duration: 1, ease: "power2.out" }, 0)
      .to(cardsRef.current[1]?.querySelectorAll('.card-path'), { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 0.2);

    // Animate Card 2 out, Card 3 in
    tl.to(cardsRef.current[0], { scale: 0.9, yPercent: -10, opacity: 0.3, duration: 1 }, 1)
      .to(cardsRef.current[1], { scale: 0.95, yPercent: -5, opacity: 0.6, duration: 1 }, 1)
      .to(cardsRef.current[2], { yPercent: 0, rotation: 0, duration: 1, ease: "power2.out" }, 1)
      .to(cardsRef.current[2]?.querySelectorAll('.card-path'), { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 1.2);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center" data-theme="light">
      {/* Background Title */}
      <div className="absolute top-12 md:top-24 w-full flex justify-center pointer-events-none z-0">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#083344]/10">
          At First Generation Homes
        </h3>
      </div>

      {cards.map((card, index) => (
        <div
          key={index}
          ref={el => cardsRef.current[index] = el}
          className="absolute w-[90vw] max-w-[1000px] h-[75vh] max-h-[650px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row border border-black/5"
          style={{ zIndex: index + 10 }}
        >
          {/* Text Side */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center bg-[#F8FAFC] overflow-hidden">
            {/* SVG Path Background */}
            {card.svg}

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xl font-mono text-[#00B4D8]">{card.step}</span>
                <div className="h-[1px] w-12 bg-[#FFC300]" />
              </div>
              <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-[#083344] mb-6">
                {card.title}
              </h3>
              <p className="text-base md:text-lg font-sans font-light text-[#083344]/80 leading-relaxed">
                {card.text}
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
            <img 
              src={card.image} 
              alt={card.title} 
              className="absolute inset-0 w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
