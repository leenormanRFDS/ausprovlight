import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const ThreeOpalViewer = React.lazy(() => import('../components/opal/ThreeOpalViewer').then(module => ({ default: module.ThreeOpalViewer })));

const matrixTwinUrl = '/images/Matrixtwin_opal.glb';


export default function Home() {
  const { scrollY } = useScroll();
  const lightColor = useTransform(scrollY, 
    [0, 200, 500, 700, 900], 
    ["#f5f2ed", "#C8A97E", "#C8A97E", "#453B2F", "#1a1a1a"]
  );
  
  const lightGlow = useTransform(scrollY, 
    [0, 200, 500, 700, 900], 
    [
      "0px 0px 0px rgba(255, 184, 0, 0)",
      "0px 0px 40px rgba(255, 184, 0, 0.8), 0px 0px 10px rgba(255, 184, 0, 0.6)",
      "0px 0px 40px rgba(255, 184, 0, 0.8), 0px 0px 10px rgba(255, 184, 0, 0.6)",
      "0px 0px 0px rgba(0, 0, 0, 0)",
      "0px 0px 0px rgba(0, 0, 0, 0)"
    ]
  );

  const stoneOpacity = useTransform(scrollY, [400, 600, 700], [0, 0, 1]);
  const stoneY = useTransform(scrollY, [400, 600, 700], [-20, -10, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-[#0C0B0A] text-[#f5f2ed] font-serif-body min-h-screen"
    >
      {/* SECTION 1 - HERO */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 lg:px-12">
        <div className="relative z-10 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8"
          >
            Every opal carries a story.<br/>
            Written in <motion.span style={{ color: lightColor, textShadow: lightGlow }}>light</motion.span>.<br/>
            <motion.span style={{ opacity: stoneOpacity, y: stoneY, display: 'inline-block' }}>Trapped in stone.</motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display font-light text-xl sm:text-3xl text-[#D4D0C8] max-w-3xl leading-relaxed mb-12"
          >
            This story – 100 million years in the making, begins in Andamooka.
          </motion.p>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-start gap-4 opacity-50"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#F5F3ED] to-transparent ml-2" />
          <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase origin-left -rotate-90 translate-y-16 mt-4">SCROLL</span>
        </motion.div>
              </div>
      </section>

      {/* SECTION 2 - PROVENANCE */}
      <section className="py-40 md:py-48 px-6 lg:px-12 ">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            What is Provenance?
          </h2>
          <h3 className="font-serif-editorial text-4xl sm:text-6xl tracking-tight leading-[1.1] mb-12">
            A stone without an origin is just a stone.
          </h3>
          <div className="font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed space-y-8">
            <p>
              Provenance is the unbroken chain of custody from the earth to the owner. It is identity. And identity creates intrinsic value.
            </p>
            <p>
              By securing the physical and historical origin of a stone, we secure its legacy. Provenance proves authenticity, preserves cultural heritage, and unlocks the true value embedded deep within the opal.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - DIGITAL TWIN */}
      <section className="py-40 md:py-48 px-6 lg:px-12  bg-[#0C0B0A]">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            The Digital Twin
          </h2>
          <h3 className="font-serif-editorial text-4xl sm:text-6xl tracking-tight leading-[1.1] mb-8">
            Physical truth.<br/>Digital evidence.
          </h3>
          <p className="font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed">
            Every physical stone is mapped and secured as an immutable digital asset. The digital twin carries the geological signature, the history, and the cryptographic proof of custody.
          </p>
        </div>

        <div className="w-full h-[60vh] sm:h-[70vh] overflow-hidden border border-hairline relative crosshair-corner">
           <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono-tech text-[10px] text-[#8E8A82] tracking-widest uppercase">Initializing Spatial Engine...</div>}>
              <ThreeOpalViewer
              modelUrl={matrixTwinUrl}
              className="w-full h-full object-cover"
            /> 
           </React.Suspense>
        </div>
        <div className="max-w-4xl mx-auto mt-8 flex justify-end">
          <Link to="/provenance" className="font-mono-tech text-[10px] sm:text-xs tracking-[0.22em] uppercase border border-hairline px-6 py-3 hover:bg-[#f5f2ed] hover:text-[#0C0B0A] transition-colors flex items-center gap-2">
            EXPLORE THE PROVENANCE SYSTEM <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* SECTION 4 - PROJECT OVERVIEW */}
      <section className="py-40 md:py-48 px-6 lg:px-12 ">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            The Project
          </h2>
          <h3 className="font-serif-editorial text-4xl sm:text-6xl tracking-tight leading-[1.1] mb-12">
            Australian Provenance Project
          </h3>
          <div className="font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed space-y-8 mb-16">
            <p>
              We are building a new way to understand, preserve, and verify the story of Australian opal — from the ground it came from to the people who carry it forward.
            </p>
            <p>
              Operating at the intersection of geology, machine learning, and cryptography, the Australian Provenance Project ensures that the history of these rare stones is never lost.
            </p>
          </div>
          
          <Link to="/project" className="font-mono-tech text-[10px] sm:text-xs tracking-[0.22em] uppercase border border-hairline px-6 py-3 hover:bg-[#f5f2ed] hover:text-[#0C0B0A] transition-colors flex items-center gap-2 w-fit">
            READ THE FULL VISION <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* SECTION 5 - CONTACT FORM */}
      <section className="py-40 md:py-48 px-6 lg:px-12 bg-[#0C0B0A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            Get In Touch
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 border-b border-hairline pb-8">
            <h3 className="font-serif-editorial text-4xl sm:text-6xl tracking-tight leading-[1.1]">
              Begin the conversation.
            </h3>
            <a 
              href="mailto:info@australianprovenanceproject.com.au" 
              className="font-mono-tech text-xs tracking-[0.2em] text-[#C8A97E] hover:underline uppercase shrink-0"
            >
              info@australianprovenanceproject.com.au
            </a>
          </div>
          
          <form className="space-y-12 max-w-2xl" onSubmit={(e) => {
              e.preventDefault();
              const name = (document.getElementById('contact-name') as HTMLInputElement)?.value || '';
              const message = (document.getElementById('contact-message') as HTMLTextAreaElement)?.value || '';
              window.location.href = `mailto:info@australianprovenanceproject.com.au?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
            }}>
            <div className="space-y-2">
              <label className="font-mono-tech text-[10px] tracking-widest text-[#8E8A82] uppercase block">Name</label>
              <input type="text" id="contact-name" className="w-full bg-transparent border-b border-[#f5f2ed]/10 text-[#f5f2ed] py-3 focus:outline-none focus:border-[#C8A97E] transition-colors font-display text-lg" placeholder="Enter your name" />
            </div>
            
            <div className="space-y-2">
              <label className="font-mono-tech text-[10px] tracking-widest text-[#8E8A82] uppercase block">Email</label>
              <input type="email" id="contact-email" className="w-full bg-transparent border-b border-[#f5f2ed]/10 text-[#f5f2ed] py-3 focus:outline-none focus:border-[#C8A97E] transition-colors font-display text-lg" placeholder="Enter your email address" />
            </div>
            
            <div className="space-y-2">
              <label className="font-mono-tech text-[10px] tracking-widest text-[#8E8A82] uppercase block">Message</label>
              <textarea id="contact-message" rows={4} className="w-full bg-transparent border-b border-[#f5f2ed]/10 text-[#f5f2ed] py-3 focus:outline-none focus:border-[#C8A97E] transition-colors font-display text-lg resize-none" placeholder="How can we help?" />
            </div>

            <button type="submit" className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase border-b border-[#C8A97E] text-[#C8A97E] px-0 py-2 hover:opacity-70 transition-all">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

    </motion.div>
  );
}
