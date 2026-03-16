import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function PortfolioGallery({ categories, onProjectClick }: { categories: any[], onProjectClick: (project: any) => void }) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory = categories.find(c => c.id === activeId) || categories[0];

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      {/* Mobile Navigation (Horizontal Tabs) */}
      <div className="block lg:hidden w-full mb-8">
        <div className="overflow-x-auto no-scrollbar px-4 md:px-8 pb-4">
          <div className="flex gap-3 w-max">
            {categories.map((category) => {
              const isActive = activeId === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#00B4D8] text-white shadow-md' 
                      : 'bg-white text-[#083344]/70 border border-[#083344]/10 hover:bg-gray-50'
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-4 md:px-8 mt-2"
          >
            <div 
              className="text-[10px] md:text-xs uppercase tracking-[0.15em] leading-[1.8] text-[#083344]/60 border-l-2 border-[#00B4D8] pl-4"
              dangerouslySetInnerHTML={{ __html: activeCategory.subtitle }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 px-4 md:px-8 lg:px-12">
        {/* Desktop: Sticky Navigation */}
        <div className="hidden lg:block w-full lg:w-[25%] lg:sticky lg:top-24 h-fit">
          <h2 className="text-xs font-bold tracking-widest text-[#00B4D8] uppercase mb-8">Portfolio Categories</h2>
          
          <div className="flex flex-col gap-5">
            {categories.map((category) => {
              const isActive = activeId === category.id;
              return (
                <div key={category.id} className="flex flex-col relative">
                  <button
                    onClick={() => setActiveId(category.id)}
                    className={`text-left transition-all duration-500 group ${isActive ? 'text-[#083344]' : 'text-[#083344]/40 hover:text-[#083344]/80'}`}
                  >
                    <h3 className={`text-xl xl:text-2xl font-light tracking-tight transition-all duration-500 ${isActive ? 'font-medium translate-x-3' : 'group-hover:translate-x-1'}`}>
                      {category.title}
                    </h3>
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1.5 w-1 h-5 bg-[#00B4D8] rounded-r-full"
                      />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden ml-3"
                      >
                        <div 
                          className="mt-3 text-[10px] xl:text-xs uppercase tracking-[0.1em] leading-[1.6] text-[#083344]/60 border-l border-[#083344]/20 pl-3"
                          dangerouslySetInnerHTML={{ __html: category.subtitle }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Project Grid */}
        <div className="w-full lg:w-[75%]">
          <motion.div 
            layout 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {activeCategory.projects.map((project: any, index: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => onProjectClick(project)}
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-200 rounded-lg shadow-sm">
                    <img 
                      src={project.src} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1]" />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1] flex items-center justify-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-[#083344] flex items-center justify-center rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] shadow-xl">
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Hover Title (Desktop) */}
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] hidden lg:block">
                       <h4 className="text-white font-medium text-sm md:text-base truncate drop-shadow-md">{project.title}</h4>
                       <p className="text-white/80 text-xs truncate drop-shadow-md">{project.location}</p>
                    </div>
                  </div>
                  
                  {/* Standard text below image (Mobile/Tablet) */}
                  <div className="mt-3 lg:hidden">
                    <h4 className="text-xs sm:text-sm font-medium text-[#083344] truncate">{project.title}</h4>
                    <p className="text-[10px] sm:text-xs text-[#083344]/60 mt-0.5 truncate">{project.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
