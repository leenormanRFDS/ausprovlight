import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Project() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em]">The Project</span>
        </div>

        <h1 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight  mb-16">
          The story begins with the stone.
        </h1>

        <div className="space-y-12 font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed max-w-2xl">
          <p>
            APP is developing systems that combine physical investigation, scientific evidence, documentation, spatial data and technology to preserve the identity and provenance of Australian opal.
          </p>

          <div className="py-12 border-y border-[#f5f2ed]/10 my-16">
            <h2 className="font-serif-editorial text-3xl sm:text-5xl italic leading-tight text-[#f5f2ed]">
              Technology is not the hard part. <br/>
              Trust is.
            </h2>
          </div>

          <p>
            The objective is not technology for its own sake. The objective is to create a more complete and defensible story around a physical object.
          </p>
          <p>
            But these systems cannot exist only in a laboratory or on a screen. They must work in the real world.
          </p>
          
          <ul className="space-y-2 font-mono-tech text-xs sm:text-sm tracking-wide pt-4 text-[#f5f2ed] uppercase">
            <li>dust.</li>
            <li>heat.</li>
            <li>mines.</li>
            <li>distance.</li>
            <li>commercial reality.</li>
            <li>community expectations.</li>
          </ul>

          <p className="pt-8">
            There is no predetermined outcome. That uncertainty is part of the story. Nobody knows yet whether it will work completely. That is exactly why we are doing it.
          </p>
        </div>

        <div className="mt-24">
          <Link to="/provenance" className="group inline-flex items-center gap-4 border-b border-[#f5f2ed]/20 hover:border-[#C8A97E] hover:text-[#C8A97E] pb-2 transition-all">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] font-bold">What is Provenance?</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
