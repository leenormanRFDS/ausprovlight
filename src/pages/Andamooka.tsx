import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Andamooka() {
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
        
        {/* HERO */}
        <div className="flex items-center gap-3 mb-16">
          <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full" />
          <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-[#8E8A82]">Andamooka, SOUTH AUSTRALIA</span>
        </div>

        <h1 className="font-serif-editorial text-6xl sm:text-7xl lg:text-9xl leading-[0.85] tracking-tight  mb-8">
          Andamooka
        </h1>
        <p className="font-serif-editorial text-2xl sm:text-4xl italic text-[#8E8A82] mb-24">
          Where the idea is being tested.
        </p>

        <div className="space-y-12 font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed max-w-2xl mb-32">
          <p>
            Opal was found here in 1930. The town was built by hand. Miners lived in dugouts and improvised structures to escape the extreme heat.
          </p>
          <p>
            For generations, knowledge about stones and claims has lived traditionally with individuals and within the community. Much of that knowledge is not recorded in one place.
          </p>
          
          <div className="py-8 my-12 border-l border-[#C8A97E]/30 pl-6">
            <h2 className="font-serif-editorial text-2xl sm:text-4xl leading-tight text-[#f5f2ed]">
              Provenance did not start with technology here. <br/>
              It started with the people who knew which hole a stone came out of.
            </h2>
          </div>
        </div>

        {/* The Digital Twin */}
        <div className="mb-32">
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            The Digital Twin
          </h2>
          <div className="space-y-8 font-display font-light text-lg text-[#D4D0C8] max-w-2xl">
            <p className="font-serif-editorial text-2xl sm:text-3xl italic text-[#f5f2ed]">
              A permanent digital record of a living landscape.
            </p>
            <p>
              The project is creating a foundational community dataset using imagery, survey data, terrain models, 3D meshes and associated documentation.
            </p>
            <p>
              The Digital Twin is not simply a commercial asset. It is intended to create a lasting community record while allowing APP to continue developing the technologies and methodologies that sit around it.
            </p>
            <div className="p-8 mt-12 border border-[#f5f2ed]/10 bg-[#f5f2ed]/5 rounded-sm relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C8A97E] opacity-50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C8A97E] opacity-50" />
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#f5f2ed] text-center italic">
                Technology evolves. Stewardship does not.
              </h3>
            </div>
          </div>
        </div>

        {/* COMMUNITY / GOVERNANCE */}
        <div>
          <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#C8A97E] mb-8">
            Community & Governance
          </h2>
          <div className="space-y-8 font-display font-light text-lg text-[#D4D0C8] max-w-2xl">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#f5f2ed]">
              The technology can change. The responsibilities cannot.
            </h3>
            <p>
              The project is designed around openness rather than dependency, with community access to foundational datasets and appropriate consultation around privacy, cultural heritage and future use.
            </p>
            <p>
              Traditional Owner voices lead. APP carries the tools. We do not claim consent where it has not been given, nor do we imply partnerships before they are agreed. The process is deliberate, and it must be.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
