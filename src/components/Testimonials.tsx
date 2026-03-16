import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const testimonials = [
  {
    id: 1,
    text: "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship. The job was done very efficiently and timely.",
    author: "Raja Bilal",
    title: "CEO Focus with Raja"
  },
  {
    id: 2,
    text: "Our experience with First Generation Homes LLC, was marked by high integrity, good quality, and high value work. Because of the cooperation and sensitivity of First Generation Homes LLC, we were able to continue our entire renovation during the construction period. First Generation Homes LLC, began our renovation by providing a very competitive bid; demonstrating a willingness to work through options; and accepting a challenging schedule.",
    author: "Julius A",
    title: "CEO Leadway Pharmacy"
  }
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useGSAP(() => {
    if (pathRef.current && dotRef.current && containerRef.current) {
      gsap.to(dotRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4D8]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4D8]/30 to-transparent" />
      </div>

      {/* Decorative Path */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 flex justify-center items-center">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            ref={pathRef}
            id="testimonial-path" 
            d="M -100 200 C 300 0, 700 1000, 1100 800" 
            fill="none" 
            stroke="rgba(0,180,216,0.3)" 
            strokeWidth="1" 
            strokeDasharray="4 12" 
          />
          <circle 
            ref={dotRef}
            cx="0" cy="0" r="6" 
            fill="#FFC300" 
            filter="url(#glow)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#083344] mb-6">
            What our clients are saying
          </h2>
          <div className="w-24 h-1 bg-[#FFC300] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#00B4D8]/5 rounded-3xl transform -rotate-1 group-hover:rotate-1 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <div className="relative bg-white/90 backdrop-blur-xl border border-[#00B4D8]/20 p-6 md:p-8 rounded-3xl h-full flex flex-col transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2">
                <Quote className="w-8 h-8 text-[#00B4D8]/40 mb-4" />
                
                <p className="text-sm md:text-[15px] text-[#083344]/80 leading-relaxed mb-6 flex-grow font-sans font-light">
                  "{testimonial.text}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-[#00B4D8]/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00B4D8]/10 flex items-center justify-center text-[#00B4D8] font-serif text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[#083344] font-medium text-base">{testimonial.author}</h4>
                    <p className="text-[#083344]/60 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
