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

    // Initial states (Card 0 is active/center)
    gsap.set(cardsRef.current[0], { rotation: 0, scale: 1, filter: 'blur(0px)', opacity: 1, zIndex: 30 });
    gsap.set(cardsRef.current[1], { rotation: 14, scale: 0.9, filter: 'blur(5px)', opacity: 0.8, zIndex: 20 });
    gsap.set(cardsRef.current[2], { rotation: 28, scale: 0.8, filter: 'blur(10px)', opacity: 0, zIndex: 10 });

    gsap.set(textsRef.current[0], { opacity: 1, y: 0 });
    gsap.set(textsRef.current[1], { opacity: 0, y: 40 });
    gsap.set(textsRef.current[2], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 3 viewport heights for scrolling duration
        scrub: 1,
        pin: true,
        snap: {
          snapTo: [0, 0.5, 1], // Snaps perfectly to the resting periods
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut"
        }
      }
    });

    // 0 to 0.5: Hold Card 0 in place
    tl.to({}, { duration: 0.5 });

    // 0.5 to 1.5: Transition 0 -> 1
    tl.to(cardsRef.current[0], { rotation: -14, scale: 0.9, filter: 'blur(5px)', opacity: 0.8, zIndex: 20, duration: 1 }, 0.5)
      .to(cardsRef.current[1], { rotation: 0, scale: 1, filter: 'blur(0px)', opacity: 1, zIndex: 30, duration: 1 }, 0.5)
      .to(cardsRef.current[2], { rotation: 14, scale: 0.9, filter: 'blur(5px)', opacity: 0.8, zIndex: 20, duration: 1 }, 0.5)
      .to(textsRef.current[0], { opacity: 0, y: -20, duration: 0.4 }, 0.5)
      .to(textsRef.current[1], { opacity: 1, y: 0, duration: 0.4 }, 0.9);

    // 1.5 to 2.5: Hold Card 1 in place
    tl.to({}, { duration: 1.0 });

    // 2.5 to 3.5: Transition 1 -> 2
    tl.to(cardsRef.current[0], { rotation: -28, scale: 0.8, filter: 'blur(10px)', opacity: 0, zIndex: 10, duration: 1 }, 2.5)
      .to(cardsRef.current[1], { rotation: -14, scale: 0.9, filter: 'blur(5px)', opacity: 0.8, zIndex: 20, duration: 1 }, 2.5)
      .to(cardsRef.current[2], { rotation: 0, scale: 1, filter: 'blur(0px)', opacity: 1, zIndex: 30, duration: 1 }, 2.5)
      .to(textsRef.current[1], { opacity: 0, y: -20, duration: 0.4 }, 2.5)
      .to(textsRef.current[2], { opacity: 1, y: 0, duration: 0.4 }, 2.9);

    // 3.5 to 4.0: Hold Card 2 in place
    tl.to({}, { duration: 0.5 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] overflow-hidden flex flex-col items-center justify-center" data-theme="light">
      
      {/* Cards Container */}
      <div className="relative w-full max-w-5xl h-[45vh] flex items-center justify-center perspective-1000 z-10">
        {cardsData.map((card, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="absolute w-[54vw] sm:w-[40vw] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] border-4 border-white will-change-transform bg-white"
            style={{ transformOrigin: "50% 150%" }}
          >
            <img src={card.image} alt={card.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            {/* Optional blue tint to match the reference image vibe while keeping the photo */}
            <div className="absolute inset-0 bg-[#00B4D8]/10 mix-blend-multiply pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Texts Container */}
      <div className="relative w-full max-w-2xl h-[20vh] mt-12 flex justify-center z-20">
        {cardsData.map((card, i) => (
          <div 
            key={i}
            ref={el => textsRef.current[i] = el}
            className="absolute top-0 left-0 w-full text-center px-6 flex flex-col items-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#083344] mb-4">{card.title}</h3>
            <p className="text-base md:text-lg text-[#083344]/80 font-medium leading-relaxed max-w-md mx-auto">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
