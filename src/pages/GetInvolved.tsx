import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function GetInvolved() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const pathways = [
    {
      title: 'MINERS',
      desc: 'Join the Andamooka Matrix Standard and stake your claim in history.'
    },
    {
      title: 'COLLECTORS',
      desc: 'Preserve, explore and understand the story of the matrix opal you own.'
    },
    {
      title: 'SCIENTISTS & RESEARCHERS',
      desc: 'Help investigate what can be learned from the stone and its environment.'
    },
    {
      title: 'PARTNERS',
      desc: 'Support our work in technology, heritage, research, regional development and tourism.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-[#0C0B0A] text-[#f5f2ed] font-serif-body pt-40 pb-32"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-16">
          <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full" />
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em]">Get Involved</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          {pathways.map((p) => (
            <div key={p.title} className="border-t border-[#f5f2ed]/10 pt-6">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-4">
                {p.title}
              </h2>
              <p className="font-serif-editorial text-xl sm:text-2xl text-[#8E8A82] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-24 border-t border-[#f5f2ed]/10">
          <h2 className="font-serif-editorial text-4xl sm:text-6xl  tracking-tight mb-8">
            EVERY STORY STARTS SOMEWHERE.
          </h2>
          <a 
            href="mailto:info@australianprovenanceproject.com.au" 
            className="group relative inline-block font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase border border-[#C8A97E]/50 bg-[#C8A97E]/5 px-10 py-5 hover:bg-[#C8A97E] hover:text-[#0C0B0A] transition-colors"
          >
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8A97E]" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8A97E]" />
            Get In Touch
          </a>
        </div>
      </div>
    </motion.div>
  );
}
