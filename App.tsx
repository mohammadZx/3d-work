import React, { useState, useEffect, useRef } from 'react';
import BackgroundScene from './components/Scene';
import Navigation from './components/Navigation';
import Section from './components/Section';
import { SERVICES, WORKS } from './constants';
import { ArrowDown, Box, Activity, Globe, ArrowRight, Instagram, Twitter, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const workScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        // Threshold can be adjusted, using 0.5 to trigger halfway
        const index = Math.round(scrollPosition / windowHeight);
        setCurrentSection(index);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollWork = (direction: 'left' | 'right') => {
    if (workScrollRef.current) {
      const scrollAmount = workScrollRef.current.clientWidth * 0.8; // Scroll 80% of view width
      workScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative w-full h-screen text-white overflow-hidden">
      {/* 3D Background Layer - Now reactive to scroll section */}
      <BackgroundScene currentSection={currentSection} />

      {/* Navigation Layer */}
      <Navigation currentSection={currentSection} />

      {/* Content Scroll Layer */}
      <div 
        ref={scrollContainerRef}
        className="absolute inset-0 w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        
        {/* Section 1: Hero */}
        <Section id="section-0" align="left">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tighter">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                REALITY
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              We are Aether. A digital creative studio specializing in high-end 3D motion, visual effects, and interactive experiences.
            </p>
            <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Project</span>
              <div className="absolute inset-0 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ArrowDown className="w-6 h-6" />
          </div>
        </Section>

        {/* Section 2: Services */}
        <Section id="section-1" align="center">
            <div className="mb-12">
                <h2 className="text-sm font-bold text-purple-400 tracking-[0.3em] uppercase mb-4">What We Do</h2>
                <h3 className="text-4xl md:text-6xl font-bold">Our Expertise</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {SERVICES.map((service, index) => (
                    <div 
                        key={service.id} 
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group text-left"
                    >
                        <div className="mb-6 p-4 bg-purple-500/20 w-fit rounded-full text-purple-300 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                            {service.icon === 'box' && <Box className="w-8 h-8" />}
                            {service.icon === 'activity' && <Activity className="w-8 h-8" />}
                            {service.icon === 'globe' && <Globe className="w-8 h-8" />}
                        </div>
                        <h4 className="text-2xl font-bold mb-3">{service.title}</h4>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-200">{service.description}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* Section 3: Work */}
        <Section id="section-2" align="right">
            <div className="w-full flex flex-col items-end">
                <div className="flex justify-between items-end w-full max-w-6xl mb-8">
                   <div className="text-right ml-auto">
                        <h2 className="text-sm font-bold text-purple-400 tracking-[0.3em] uppercase mb-4">Selected Works</h2>
                        <h3 className="text-4xl md:text-6xl font-bold">Recent Projects</h3>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="flex gap-4 mb-4 justify-end w-full max-w-6xl">
                    <button 
                        onClick={() => scrollWork('left')}
                        className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full backdrop-blur-sm"
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => scrollWork('right')}
                        className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full backdrop-blur-sm"
                        aria-label="Next project"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div 
                    ref={workScrollRef}
                    className="flex flex-row gap-6 w-full max-w-6xl overflow-x-auto pb-8 md:justify-start no-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {WORKS.map((work) => (
                        <div key={work.id} className="snap-center relative group min-w-[300px] md:min-w-[400px] h-[300px] overflow-hidden cursor-pointer border border-white/10 shrink-0">
                            <img 
                                src={work.image} 
                                alt={work.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">{work.category}</span>
                                <h4 className="text-2xl font-bold flex items-center gap-2">
                                    {work.title}
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </h4>
                            </div>
                        </div>
                    ))}
                    {/* Spacer to allow last item to be seen fully if needed */}
                    <div className="min-w-[50px] md:min-w-[100px]"></div>
                </div>
            </div>
        </Section>

        {/* Section 4: Contact */}
        <Section id="section-3" align="center">
            <div className="max-w-2xl w-full bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10">
                <h2 className="text-5xl font-black mb-8 text-center">Let's Talk</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
                            <input type="email" className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                        <textarea rows={4} className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <button type="button" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 mt-4">
                        Send Request
                    </button>
                </form>

                <div className="flex justify-center gap-8 mt-12">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-6 h-6"/></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-6 h-6"/></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail className="w-6 h-6"/></a>
                </div>
                
                <footer className="mt-12 text-center text-gray-600 text-sm">
                    &copy; 2024 Aether Studio. All rights reserved.
                </footer>
            </div>
        </Section>
        
      </div>
    </main>
  );
}

export default App;