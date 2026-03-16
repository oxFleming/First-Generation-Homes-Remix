import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(Observer, MotionPathPlugin);

const genericGallery = [
  'https://images.unsplash.com/photo-1600607687931-cebf66713e28?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop'
];

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
    .to(containerRef.current, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.2')
    .fromTo('.modal-title-line',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(['.modal-divider', '.modal-detail-item', '.modal-desc', '.modal-close-btn'],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.modal-image-container',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.15, ease: 'power3.inOut' },
      '-=0.6'
    )
    .fromTo('.modal-image',
      { scale: 1.2 },
      { scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '<'
    );
  }, { scope: backdropRef });

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in'
    })
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 opacity-0"
      data-lenis-prevent="true"
      onClick={handleClose}
    >
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl h-[85vh] bg-white text-[#083344] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-[#00B4D8]/20 translate-y-8 scale-95 opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Sticky Content */}
        <div className="w-full lg:w-[40%] h-auto lg:h-full overflow-y-auto p-6 md:p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#00B4D8]/20 relative z-10 bg-white shrink-0">
          <div className="my-auto">
            <button 
              onClick={handleClose} 
              className="modal-close-btn flex items-center gap-2 text-xs tracking-widest uppercase font-mono hover:text-[#00B4D8] transition-colors mb-8 lg:mb-12"
            >
              <X size={16} /> Close Project
            </button>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] mb-8">
              <div className="overflow-hidden py-2"><div className="modal-title-line">{project.titleLine1}</div></div>
              <div className="overflow-hidden py-2"><div className="modal-title-line italic text-[#00B4D8]">{project.titleLine2}</div></div>
            </h2>
            
            <div className="flex flex-col gap-4 text-[10px] md:text-xs tracking-widest uppercase font-mono mb-8">
              <div className="modal-divider w-full h-px bg-[#00B4D8]/20 mb-2"></div>
              <div className="modal-detail-item flex justify-between">
                <span className="opacity-50">Size</span>
                <span>{project.size}</span>
              </div>
              <div className="modal-detail-item flex justify-between">
                <span className="opacity-50">Location</span>
                <span>{project.location}</span>
              </div>
              <div className="modal-detail-item flex justify-between">
                <span className="opacity-50">Year</span>
                <span>{project.year}</span>
              </div>
              <div className="modal-divider w-full h-px bg-[#00B4D8]/20 mt-2"></div>
            </div>
            
            <p className="modal-desc text-xs md:text-sm leading-relaxed font-serif opacity-80 max-w-md">
              {project.description.replace(/<br\/>/g, ' ')} This project represents the pinnacle of our design philosophy, combining aesthetic elegance with functional brilliance. Every detail was meticulously planned and executed to create a space that is both breathtaking and livable.
            </p>
          </div>
        </div>

        {/* Right: Scrollable Gallery */}
        <div className="w-full lg:w-[60%] h-auto lg:h-full overflow-y-auto bg-[#F8FAFC]">
          <div className="flex flex-col p-4 md:p-8 gap-4 md:gap-8">
            {[project.image, ...genericGallery].map((img, idx) => (
              <div key={idx} className="modal-image-container w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden bg-black/5 rounded-lg border border-[#00B4D8]/10">
                <img src={img} alt={`${project.name} - Gallery Image ${idx + 1}`} referrerPolicy="no-referrer" className="modal-image w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const projectList = [
  { name: 'The Heritage Estate', titleLine1: 'The Heritage', titleLine2: 'Estate', size: '12,000 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'With The Heritage Estate,<br/>FGH LLC delivers a masterful<br/>blend of classic architecture<br/>and modern luxury.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Lakefront Villa', titleLine1: 'Lakefront', titleLine2: 'Villa', size: '8,500 SQ FT', location: 'EVANSTON, IL', year: '2023', description: 'A stunning modern villa<br/>overlooking the lake,<br/>featuring floor-to-ceiling<br/>windows and open spaces.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Modern Oasis', titleLine1: 'Modern', titleLine2: 'Oasis', size: '6,200 SQ FT', location: 'OAK BROOK, IL', year: '2022', description: 'An architectural marvel<br/>designed for tranquility,<br/>blending indoor and outdoor<br/>living seamlessly.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Skyline Penthouse', titleLine1: 'Skyline', titleLine2: 'Penthouse', size: '4,500 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'A luxurious penthouse<br/>offering panoramic views<br/>of the city skyline with<br/>bespoke interior finishes.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop' },
  { name: 'The Glass House', titleLine1: 'The Glass', titleLine2: 'House', size: '5,800 SQ FT', location: 'HIGHLAND PARK, IL', year: '2021', description: 'A transparent masterpiece<br/>immersed in nature,<br/>providing an unparalleled<br/>living experience.', image: 'https://images.unsplash.com/photo-1613490908676-430489d2d1b7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Historic Renovation', titleLine1: 'Historic', titleLine2: 'Renovation', size: '7,100 SQ FT', location: 'WINNETKA, IL', year: '2020', description: 'A careful restoration of<br/>a historic property,<br/>bringing modern amenities<br/>to classic design.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Urban Loft', titleLine1: 'Urban', titleLine2: 'Loft', size: '3,200 SQ FT', location: 'WEST LOOP, IL', year: '2023', description: 'An industrial-chic loft<br/>in the heart of the city,<br/>featuring exposed brick<br/>and high ceilings.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Forest Retreat', titleLine1: 'Forest', titleLine2: 'Retreat', size: '9,000 SQ FT', location: 'LAKE FOREST, IL', year: '2022', description: 'A secluded retreat<br/>surrounded by nature,<br/>offering ultimate privacy<br/>and luxury.', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Riverfront Condo', titleLine1: 'Riverfront', titleLine2: 'Condo', size: '2,800 SQ FT', location: 'RIVER NORTH, IL', year: '2024', description: 'A modern condo with<br/>stunning river views,<br/>featuring state-of-the-art<br/>appliances and finishes.', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Suburban Estate', titleLine1: 'Suburban', titleLine2: 'Estate', size: '10,500 SQ FT', location: 'NAPERVILLE, IL', year: '2021', description: 'A sprawling estate<br/>perfect for family living,<br/>with expansive grounds<br/>and luxurious amenities.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop' },
];

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pauseKey, setPauseKey] = useState(0);

  useEffect(() => {
    if (pauseKey > 0) {
      const timeout = setTimeout(() => {
        setPauseKey(0);
      }, 15000);
      return () => clearTimeout(timeout);
    }
  }, [pauseKey]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen || pauseKey > 0) return; // Pause auto-rotation when modal is open or manually paused
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isModalOpen, pauseKey]);

  const activeProject = projectList[activeIndex];

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const polyRef = useRef<SVGPolygonElement>(null);

  useGSAP(() => {
    if (!imageContainerRef.current) return;

    Observer.create({
      target: imageContainerRef.current,
      type: "pointer,touch",
      onLeft: () => {
        setActiveIndex((current) => (current + 1) % projectList.length);
        setPauseKey(prev => prev + 1);
      },
      onRight: () => {
        setActiveIndex((current) => (current === 0 ? projectList.length - 1 : current - 1));
        setPauseKey(prev => prev + 1);
      },
      tolerance: 50,
      preventDefault: true
    });

    // Path animation
    if (polyRef.current && pathRef.current && sectionRef.current) {
      gsap.to(polyRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-white text-[#083344] py-12 lg:py-24 relative overflow-hidden flex items-center">
      {/* Decorative Path */}
      <div className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 pointer-events-none z-0 opacity-20">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
          <path 
            ref={pathRef}
            id="projects-path" 
            d="M 0 100 C 250 200, 750 0, 1000 100" 
            fill="none" 
            stroke="#00B4D8" 
            strokeWidth="2" 
          />
          <polygon 
            ref={polyRef}
            points="0,-6 12,0 0,6" 
            fill="#FFC300" 
          />
        </svg>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        {/* Beige Box */}
        <div className="bg-[#F8FAFC] border border-[#00B4D8]/20 relative w-full h-auto lg:h-[70vh] min-h-[500px] max-h-none lg:max-h-[700px] mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6 shadow-sm rounded-sm">
          
          {/* Left: Project Display */}
          <div className="w-full lg:w-[65%] flex flex-col h-full relative">
            {/* Image Area */}
            <div 
              ref={imageContainerRef}
              className="w-full h-[250px] md:h-[300px] lg:h-auto lg:flex-1 relative overflow-hidden shadow-xl bg-gray-200 mb-4 lg:mb-6 rounded-sm shrink-0 lg:shrink cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  src={activeProject.image} 
                  alt={activeProject.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {/* Text Area */}
            <div className="w-full shrink-0 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="text-xl md:text-2xl lg:text-3xl leading-[1.1] font-serif mb-2 text-[#083344]">
                      {activeProject.titleLine1} {activeProject.titleLine2}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 md:gap-4 text-[9px] md:text-[10px] tracking-widest uppercase font-mono mb-2 text-[#00B4D8]">
                      <span>[ {activeProject.size} ]</span>
                      <span>[ {activeProject.location} ]</span>
                      <span>[ {activeProject.year} ]</span>
                    </div>
                    
                    <p 
                      className="text-[10px] md:text-xs tracking-widest uppercase font-mono max-w-md leading-relaxed text-[#083344]/80"
                      dangerouslySetInnerHTML={{ __html: activeProject.description.replace(/<br\/>/g, ' ') }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="shrink-0 pb-1">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center border border-[#00B4D8] group hover:bg-transparent transition-colors duration-300 text-[#083344]"
                >
                  <span className="px-5 py-2.5 text-[10px] tracking-widest uppercase font-mono font-medium">View Project</span>
                  <span className="border-l border-[#00B4D8] p-2.5 group-hover:bg-[#00B4D8] group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Selection Menu */}
          <div className="w-full lg:w-[35%] flex flex-col h-[300px] lg:h-full border-t lg:border-t-0 lg:border-l border-[#00B4D8]/20 pt-4 lg:pt-0 lg:pl-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#00B4D8]/10 shrink-0">
              <h3 className="text-xs tracking-widest uppercase font-mono font-semibold text-[#083344]">Select Project</h3>
              <span className="text-[10px] font-mono text-[#00B4D8]">{activeIndex + 1} / {projectList.length}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#00B4D8]/20 hover:[&::-webkit-scrollbar-thumb]:bg-[#00B4D8]/40">
              {projectList.map((project, index) => (
                <div 
                  key={index} 
                  className={`group relative flex flex-col py-2 px-3 mb-1 border border-transparent hover:border-[#00B4D8]/20 transition-colors cursor-pointer rounded-sm ${activeIndex === index ? 'text-white' : 'text-[#083344] hover:bg-[#00B4D8]/5'}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setPauseKey(prev => prev + 1);
                  }}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeProjectBg"
                      className="absolute inset-0 bg-[#00B4D8] rounded-sm z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex justify-between items-center mb-0.5">
                    <div className="font-serif text-base md:text-lg">{project.name}</div>
                    <ArrowUpRight className={`w-3 h-3 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                  </div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div className={`font-mono text-[8px] tracking-widest uppercase transition-opacity duration-300 ${activeIndex === index ? 'opacity-80' : 'opacity-50'}`}>{project.location}</div>
                    <div className={`font-mono text-[8px] tracking-widest uppercase transition-opacity duration-300 ${activeIndex === index ? 'opacity-80' : 'opacity-50'}`}>{project.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
