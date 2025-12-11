import React from 'react';
import { Menu } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const scrollToSection = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div className="text-2xl font-black tracking-tighter uppercase">
        Aether<span className="text-purple-500">.</span>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {['Home', 'Services', 'Work', 'Contact'].map((item, idx) => (
          <button
            key={item}
            onClick={() => scrollToSection(idx)}
            className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-purple-400 ${currentSection === idx ? 'text-purple-400' : 'text-gray-300'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <button className="p-2">
            <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Side Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden md:flex">
         {['Home', 'Services', 'Work', 'Contact'].map((_, idx) => (
            <button 
                key={idx}
                onClick={() => scrollToSection(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSection === idx ? 'bg-purple-500 scale-125' : 'bg-white/20 hover:bg-white/50'}`}
            />
         ))}
      </div>
    </nav>
  );
};

export default Navigation;