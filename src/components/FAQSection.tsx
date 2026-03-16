import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "First Generation Homes proudly serves clients globally. While we have a strong presence in Chicago, IL and its surrounding suburbs, our operations span across three continents, providing premier custom construction and renovation services throughout the United States, Europe, and Africa."
  },
  {
    question: "Do you handle both residential construction and renovations?",
    answer: "Yes, we specialize in both custom residential construction from the ground up and comprehensive home renovations, including kitchen remodels, bathroom renovations, and structural upgrades."
  },
  {
    question: "How does the design and build process work?",
    answer: "Our process begins with an initial consultation to understand your vision. We then move into architectural design, followed by detailed planning, material selection, and finally, the construction phase. We manage the entire project to ensure a seamless experience."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. First Generation Homes is a fully licensed, bonded, and insured general contractor in the state of Illinois, ensuring your project is protected every step of the way."
  },
  {
    question: "How long does a typical custom home build take?",
    answer: "The timeline for a custom home build varies depending on the size and complexity of the project, but typically ranges from 10 to 18 months from the start of design to final completion."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    if (pathRef.current && dotRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
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
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="faq" ref={sectionRef} className="relative pt-32 pb-24 bg-white text-[#083344] overflow-hidden" data-theme="light">
      {/* Decorative SVG Path */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 200 1000" preserveAspectRatio="none">
          <defs>
            <filter id="glow-faq" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            ref={pathRef}
            id="faq-path"
            d="M 100 0 Q 0 250, 100 500 T 100 1000" 
            fill="none" 
            stroke="#00B4D8" 
            strokeWidth="1" 
            strokeDasharray="4 8"
          />
          <circle 
            ref={dotRef}
            cx="0" 
            cy="0" 
            r="4" 
            fill="#FFC300" 
            filter="url(#glow-faq)"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-[#083344]/80 max-w-2xl mx-auto font-sans">
            Find answers to common questions about our custom home building and renovation services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-[#00B4D8]/20 py-6"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none group"
              >
                <h3 
                  className="text-lg md:text-xl font-sans font-medium pr-8 group-hover:text-[#00B4D8] transition-colors"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-[#00B4D8] group-hover:text-[#083344] transition-colors">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <div className="pt-4 pb-2 text-[#083344]/80 font-sans leading-relaxed" itemProp="text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
