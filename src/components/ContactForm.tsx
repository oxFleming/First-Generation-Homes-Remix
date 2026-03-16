import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.contact-fade-up',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    );

    // Add scroll friction (pinning)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=500', // Pins for 500px of scroll to create friction
      pin: true,
      pinSpacing: true,
    });

    // Path Animation
    if (pathRef.current && dotRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const pathTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          scrub: 1,
        }
      });

      pathTl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0);

      pathTl.to(dotRef.current, {
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
    <div ref={sectionRef} className="relative bg-white text-[#083344] min-h-[100dvh] w-full flex items-center pt-32 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative SVG Path */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <filter id="glow-contact" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path 
            ref={pathRef}
            id="contact-path"
            d="M 1000 0 C 800 300, 200 700, 0 1000" 
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
            filter="url(#glow-contact)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column */}
        <div className="flex flex-col justify-center lg:col-span-4">
          <div className="contact-fade-up">
            <span className="text-[#00B4D8] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 block">
              Inquiry
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] mb-4">
              Start Your<br />Project
            </h2>
            <p className="text-[#083344]/80 text-xs md:text-sm leading-relaxed max-w-sm font-light mb-8">
              We collaborate with clients who value distinctiveness and sustainability. Tell us about your vision, and let's determine if First Generation Homes is the right partner for your journey.
            </p>
            <div className="w-full max-w-sm h-px bg-[#00B4D8]/20 mb-8"></div>
            
            <div className="flex flex-col gap-3">
              <h3 className="text-[#083344]/60 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1">Process</h3>
              <ul className="flex flex-col gap-3">
                {['Initial Consultation', 'Feasibility Study', 'Concept Design', 'Detailed Documentation'].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-[#083344]/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300]"></span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col justify-center contact-fade-up lg:col-span-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe" 
                className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] placeholder:text-[#083344]/40 focus:outline-none focus:border-[#00B4D8] transition-colors w-full"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com" 
                className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] placeholder:text-[#083344]/40 focus:outline-none focus:border-[#00B4D8] transition-colors w-full"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 234..." 
                className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] placeholder:text-[#083344]/40 focus:outline-none focus:border-[#00B4D8] transition-colors w-full"
              />
            </div>

            {/* Project Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Project Location</label>
              <input 
                type="text" 
                placeholder="e.g. Chicago, IL" 
                className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] placeholder:text-[#083344]/40 focus:outline-none focus:border-[#00B4D8] transition-colors w-full"
              />
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Project Type</label>
              <select defaultValue="" className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] focus:outline-none focus:border-[#00B4D8] transition-colors w-full appearance-none cursor-pointer">
                <option value="" disabled className="text-[#083344]/40">Select Type</option>
                <option value="custom-residential">Custom Residential Construction</option>
                <option value="home-renovation">Home Renovation & Property Modernization</option>
                <option value="building-development">Building Development & Real Estate Projects</option>
                <option value="construction-materials">Construction Materials & Finishing Products</option>
                <option value="undetermined">Undetermined</option>
              </select>
            </div>

            {/* Expected Timeline */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Expected Timeline</label>
              <select defaultValue="" className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] focus:outline-none focus:border-[#00B4D8] transition-colors w-full appearance-none cursor-pointer">
                <option value="" disabled className="text-[#083344]/40">Select Timeline</option>
                <option value="immediately">Immediately</option>
                <option value="1-3-months">1-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6-plus-months">6+ Months</option>
              </select>
            </div>

            {/* Project Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] md:text-[10px] text-[#083344]/60 uppercase tracking-widest font-mono">Project Description</label>
              <textarea 
                rows={3}
                placeholder="Tell us about the site, the vision, and any specific requirements..." 
                className="bg-[#F8FAFC] border border-[#00B4D8]/20 rounded-md px-4 py-3 text-sm text-[#083344] placeholder:text-[#083344]/40 focus:outline-none focus:border-[#00B4D8] transition-colors w-full resize-none"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:col-span-2 mt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#00B4D8] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs py-3.5 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-[#0096B4] transition-colors w-full sm:w-auto"
              >
                Send Inquiry <Send size={14} />
              </motion.button>
              
              <span className="text-[#083344]/60 text-[9px] md:text-[10px] font-mono uppercase tracking-widest">OR</span>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://wa.me/16303265117', '_blank')}
                className="bg-[#25D366] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs py-3.5 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors w-full sm:w-auto shadow-lg shadow-[#25D366]/20"
              >
                Chat with us on WhatsApp <MessageCircle size={14} />
              </motion.button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
