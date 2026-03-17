import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    step: "01",
    title: "We Envision",
    text: "Every great legacy begins as a fleeting thought. We collaborate closely to uncover the core of your vision, transforming abstract ideas into a concrete, strategic roadmap for your future home.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
  },
  {
    step: "02",
    title: "We Design",
    text: "With the destination clear, we craft the journey. Our design process merges aesthetics with deep empathy, creating intuitive spaces that feel both inevitable and extraordinary.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    step: "03",
    title: "We Build",
    text: "We breathe life into the blueprint. Using meticulous craftsmanship and uncompromising standards, we forge robust, beautiful structures designed to last for generations.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
  }
];

export function StoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Responsive positions based on screen size to prevent overflow
    const isMobile = window.innerWidth < 768;
    
    // The active card is straight and centered in its column
    const pos0 = { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 30 };
    // The next card is cascaded down and to the left
    const pos1 = { xPercent: isMobile ? -15 : -35, yPercent: isMobile ? 10 : 25, rotation: -12, scale: 0.95, opacity: 1, zIndex: 20 };
    // The last card is cascaded further down and left
    const pos2 = { xPercent: isMobile ? -30 : -70, yPercent: isMobile ? 20 : 50, rotation: -24, scale: 0.9, opacity: 1, zIndex: 10 };
    // The position cards fly to when they are done (up and right)
    const posOut = { xPercent: 20, yPercent: -40, rotation: 15, scale: 1.05, opacity: 0, zIndex: 40 };

    // Initial states
    gsap.set(cardsRef.current[0], pos0);
    gsap.set(cardsRef.current[1], pos1);
    gsap.set(cardsRef.current[2], pos2);

    gsap.set(textsRef.current[0], { opacity: 1, y: 0 });
    gsap.set(textsRef.current[1], { opacity: 0, y: 40 });
    gsap.set(textsRef.current[2], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Reduced from 300% to 150% for much less scroll effort
        scrub: 1.2, // Smooth scrub
        pin: true,
      }
    });

    // 0 to 0.2: Hold Card 0 in place briefly
    tl.to({}, { duration: 0.2 });

    // 0.2 to 1.2: Transition 0 -> 1
    tl.to(cardsRef.current[0], { ...posOut, duration: 1 }, 0.2)
      .to(cardsRef.current[1], { ...pos0, duration: 1 }, 0.2)
      .to(cardsRef.current[2], { ...pos1, duration: 1 }, 0.2)
      .to(textsRef.current[0], { opacity: 0, y: -20, duration: 0.4 }, 0.2)
      .to(textsRef.current[1], { opacity: 1, y: 0, duration: 0.4 }, 0.8);

    // 1.2 to 1.6: Hold Card 1 in place
    tl.to({}, { duration: 0.4 });

    // 1.6 to 2.6: Transition 1 -> 2
    tl.to(cardsRef.current[0], { opacity: 0, duration: 1 }, 1.6) // Ensure it stays hidden
      .to(cardsRef.current[1], { ...posOut, duration: 1 }, 1.6)
      .to(cardsRef.current[2], { ...pos0, duration: 1 }, 1.6)
      .to(textsRef.current[1], { opacity: 0, y: -20, duration: 0.4 }, 1.6)
      .to(textsRef.current[2], { opacity: 1, y: 0, duration: 0.4 }, 2.2);

    // 2.6 to 2.8: Hold Card 2 in place briefly
    tl.to({}, { duration: 0.2 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-[100svh] bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] overflow-hidden flex items-center justify-center py-20 md:py-0" data-theme="light">
      
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 h-full items-center">
        
        {/* Cards Container (Left) */}
        <div className="relative w-full h-[40vh] min-h-[250px] md:h-[70vh] flex items-center justify-center md:justify-end z-10">
          {cardsData.map((card, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="absolute w-[45vw] sm:w-[35vw] md:w-[320px] max-h-[350px] md:max-h-none aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border-4 border-white will-change-transform bg-white"
              style={{ transformOrigin: "center center" }}
            >
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              {/* Optional blue tint to match the reference image vibe while keeping the photo */}
              <div className="absolute inset-0 bg-[#00B4D8]/10 mix-blend-multiply pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Texts Container (Right) */}
        <div className="relative w-full h-[30vh] min-h-[150px] md:h-[70vh] flex items-start md:items-center justify-center md:justify-start z-20">
          <div className="relative w-full max-w-sm h-full md:h-auto">
            {cardsData.map((card, i) => (
              <div 
                key={i}
                ref={el => textsRef.current[i] = el}
                className="absolute top-0 left-0 w-full flex flex-col items-center md:items-start text-center md:text-left"
              >
                <h3 className="text-xl md:text-2xl font-sans font-bold uppercase tracking-[0.15em] text-[#083344] mb-2 md:mb-6">{card.title}</h3>
                <p className="text-sm md:text-base text-[#083344]/80 font-sans font-medium leading-[1.6] md:leading-[1.8]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
