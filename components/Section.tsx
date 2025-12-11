import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, align = 'center', className = '' }) => {
  const alignmentClass = 
    align === 'left' ? 'items-start text-left' :
    align === 'right' ? 'items-end text-right' :
    'items-center text-center';

  return (
    <section 
      id={id}
      className={`h-screen w-full flex flex-col justify-center snap-start snap-always relative overflow-hidden ${alignmentClass} ${className}`}
    >
      <div className="container mx-auto px-6 md:px-12 z-10 w-full">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            // Custom bezier for a "luxury" slow-start fast-middle slow-end feel
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
            viewport={{ once: false, amount: 0.3 }}
            className={`flex flex-col ${alignmentClass}`}
        >
            {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;