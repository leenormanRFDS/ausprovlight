import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Compliance() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-[#0C0B0A] text-[#f5f2ed] font-serif-body pt-40 pb-32"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* HERO */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-16">
            <span className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full" />
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-[#C8A97E]">Compliance & Governance</span>
          </div>
          
          <h1 className="font-serif-editorial text-4xl sm:text-6xl  tracking-tight mb-8">
            Evidence matters. <br />
            So does how we gather it.
          </h1>
          <p className="font-display font-light text-base sm:text-xl text-[#D4D0C8] max-w-2xl leading-relaxed">
            Australian Provenance Project works across physical environments, scientific investigation, aerial capture, machine learning and digital systems. Our work is undertaken with appropriate permissions, qualifications, licences, safety controls and governance frameworks relevant to each activity.
          </p>
        </div>

        {/* SECTION 01: OPERATING RESPONSIBLY */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">01. Operating Responsibly</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">The work happens in the real world.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-12">
                APP operates in places where technology meets physical reality — mines, remote landscapes, aircraft, scientific equipment and living communities.
                <br /><br />
                That means the systems we develop are only part of the responsibility.
                <br /><br />
                The way we capture information, operate equipment, access sites, manage data and work with communities matters just as much.
              </p>
              
              <div className="border-l border-[#C8A97E] pl-6 py-2">
                <p className="font-serif-editorial text-3xl sm:text-5xl  tracking-tight text-[#C8A97E]">
                  Technology evolves.<br />Stewardship does not.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: REGULATORY & OPERATIONAL AUTHORISATIONS */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">02. Authorisations</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">Regulatory & Operational</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl">
                Qualified remote pilots and equipment operators work under the appropriate authorisations for each operation.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Card 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 p-6  bg-[#0C0B0A]/50">
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">ACTIVITY</span>
                <span className="font-display text-sm text-[#f5f2ed]">RADIATION / X-RAY</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">AUTHORITY</span>
                <span className="font-display text-sm text-[#f5f2ed]">Environment Protection Authority</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">LICENCE / REGISTRATION</span>
                <span className="font-display text-sm text-[#f5f2ed]">LICENSE TO OPERATE RADIATION APPARATUS<br/><span className="text-[#8E8A82] text-xs">Radiation Protection and Control Act 2021</span></span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">STATUS</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#C8A97E]">[INSERT VERIFIED STATUS]</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">EXPIRY</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#C8A97E]">[INSERT VERIFIED EXPIRY]</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 p-6  bg-[#0C0B0A]/50">
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">ACTIVITY</span>
                <span className="font-display text-sm text-[#f5f2ed]">REMOTELY PILOTED AIRCRAFT</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">AUTHORITY</span>
                <span className="font-display text-sm text-[#f5f2ed]">Civil Aviation Safety Authority (CASA)</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">LICENCE / REGISTRATION</span>
                <span className="font-display text-sm text-[#f5f2ed]">REMOTE PILOT LICENSE<br/><span className="text-[#8E8A82] text-xs">RePL / ReOC</span></span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">STATUS</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#C8A97E]">[INSERT VERIFIED STATUS]</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">EXPIRY</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#C8A97E]">[INSERT VERIFIED EXPIRY]</span>
              </div>
            </div>

            {/* Card 3 - Other */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 p-6  bg-[#0C0B0A]/50">
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">ACTIVITY</span>
                <span className="font-display text-sm text-[#f5f2ed]">OTHER AUTHORISATIONS</span>
              </div>
              <div className="md:col-span-3">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">DETAILS</span>
                <span className="font-display text-sm text-[#f5f2ed]">Site permissions, scientific equipment registrations, surveying requirements, land access permissions, and other operational approvals.</span>
              </div>
              <div className="md:col-span-1">
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#8E8A82] block mb-2">STATUS</span>
                <span className="font-mono-tech text-[10px] tracking-wider text-[#C8A97E]">[INSERT VERIFIED INFORMATION]</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: FIELD OPERATIONS */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">03. Field Operations</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">Built for the conditions we work in.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-8">
                APP's field activities span remote locations, active mining areas, aerial operations, and sensitive environments, often working with scientific equipment across difficult terrain, extreme heat, and dust.
              </p>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-8">
                These activities are undertaken with respect for the physical reality of the environment, incorporating:
              </p>
              <ul className="font-mono-tech text-[10px] tracking-widest text-[#f5f2ed] uppercase space-y-3 pl-4 border-l border-[rgba(245,243,237,0.2)]">
                <li>• Appropriate site permissions</li>
                <li>• Risk assessment & operational planning</li>
                <li>• Relevant safety procedures & controls</li>
                <li>• Equipment-specific requirements</li>
                <li>• Culturally sensitive practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 04: DATA & DIGITAL STEWARDSHIP */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">04. Data Stewardship</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">Information has an owner. <br />A place has a story.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-12">
                APP treats captured data as something that requires responsible stewardship. In alignment with the principles established in the Andamooka Digital Twin Charter, we prioritise preservation, integrity, version control, privacy, and community access.
                <br /><br />
                The intention is not to commercialise the community's history, simply to support the community's economic growth. The Charter establishes a clear distinction between community datasets and APP's underlying architecture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-[#0C0B0A]/50 ">
                  <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] mb-4">COMMUNITY DATA</h4>
                  <p className="font-display font-light text-sm text-[#D4D0C8] leading-relaxed">
                    Foundational datasets created through community-supported projects are governed according to agreed stewardship arrangements, with appropriate access and preservation provisions, but remain the intellectual property of APP.
                  </p>
                </div>
                <div className="p-6 bg-[#0C0B0A]/50 ">
                  <h4 className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] mb-4">APP TECHNOLOGY</h4>
                  <p className="font-display font-light text-sm text-[#D4D0C8] leading-relaxed">
                    APP retains intellectual property in the methodologies, software, AI systems, provenance systems, algorithms, visualisation platforms, and other technologies it develops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: PRIVACY */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">05. Privacy</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">We document geology, capture stories and respect people.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-8">
                APP's field capture is primarily concerned with landscapes, infrastructure, mining environments, and places. Capture planning is designed to minimise recording identifiable individuals, private activities, and occupied residences.
                <br /><br />
                Capture plans will not document activities or private areas without opt-in. Where sensitive structures or residences must be represented, techniques such as "ghost twins" are implemented to preserve privacy.
              </p>
              <a href="#" className="inline-block font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase border border-[rgba(245,243,237,0.3)] px-6 py-3 hover:border-[#F5F3ED] hover:text-[#050505] hover:bg-[#f5f2ed] transition-colors">
                READ PRIVACY POLICY
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 06: CULTURAL HERITAGE */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">06. Cultural Heritage</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">Some knowledge is not ours to publish.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl mb-8">
                Traditional Owners remain the custodians of their cultural heritage. Where cultural heritage may be affected, consultation occurs to ensure that cultural knowledge and sensitive sites are protected. 
                <br /><br />
                If Traditional Owners determine that particular locations, stories, or knowledge should remain private, those wishes are respected. Future interpretation is developed collaboratively.
              </p>
              <div className="border-l border-[#C8A97E] pl-6 py-2">
                <p className="font-serif-editorial text-2xl sm:text-3xl  tracking-tight text-[#C8A97E]">
                  Traditional Owner voices lead.<br />APP carries the tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 07: COMMUNITY STEWARDSHIP */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">07. Community Stewardship</h2>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif-editorial text-2xl sm:text-4xl italic text-[#f5f2ed] mb-6">The community should never be dependent on the technology.</h3>
              <p className="font-display font-light text-base text-[#D4D0C8] leading-relaxed max-w-2xl">
                APP's approach is designed around openness rather than dependency. Where practical, deliverables intended for community use and historical preservation are supplied in widely adopted, open formats to ensure long-term accessibility and true community stewardship.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 08: GOVERNANCE DOCUMENTS */}
        <section className="mb-32 border-t border-[#f5f2ed]/10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-4">08. Documents</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between p-6  bg-[#0C0B0A]/50 hover:bg-[#141414] transition-colors group">
                  <div>
                    <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#f5f2ed] mb-2 group-hover:text-[#C8A97E] transition-colors">ANDAMOOKA DIGITAL TWIN CHARTER</h4>
                    <p className="font-display font-light text-sm text-[#8E8A82]">Governance, stewardship, ownership and community access principles.</p>
                  </div>
                  <span className="text-[#8E8A82] font-mono group-hover:text-[#C8A97E]">&rarr;</span>
                </a>
                <a href="#" className="flex items-center justify-between p-6  bg-[#0C0B0A]/50 hover:bg-[#141414] transition-colors group">
                  <div>
                    <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#f5f2ed] mb-2 group-hover:text-[#C8A97E] transition-colors">PRIVACY POLICY</h4>
                    <p className="font-display font-light text-sm text-[#8E8A82]">How APP handles personal and sensitive information.</p>
                  </div>
                  <span className="text-[#8E8A82] font-mono group-hover:text-[#C8A97E]">&rarr;</span>
                </a>
                <a href="#" className="flex items-center justify-between p-6  bg-[#0C0B0A]/50 hover:bg-[#141414] transition-colors group">
                  <div>
                    <h4 className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#f5f2ed] mb-2 group-hover:text-[#C8A97E] transition-colors">TERMS / CONDITIONS</h4>
                    <p className="font-display font-light text-sm text-[#8E8A82]">[INSERT VERIFIED INFORMATION]</p>
                  </div>
                  <span className="text-[#8E8A82] font-mono group-hover:text-[#C8A97E]">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 09: VERIFICATION */}
        <div className="text-center pt-24 pb-24 border-t  mb-32">
          <h2 className="font-serif-editorial text-4xl sm:text-6xl  tracking-tight text-[#C8A97E] mb-12 max-w-4xl mx-auto leading-[1.1]">
            Provenance is not a promise, nor is it manufactured. <br/>
            It is evidence. It is truth.
          </h2>
          <div className="font-display font-light text-lg sm:text-xl text-[#D4D0C8] leading-relaxed max-w-2xl mx-auto space-y-6">
            <p>The same principle applies to the project itself.</p>
            <p>Where something can be verified, we document it.</p>
            <p>Where something is still being tested, we say so.</p>
            <p>Where something is unknown, we leave the question open.</p>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center pb-24">
          <h2 className="font-mono-tech text-sm uppercase tracking-[0.2em] text-[#8E8A82] mb-8">
            HAVE A QUESTION ABOUT OUR OPERATIONS OR GOVERNANCE?
          </h2>
          <a 
             href="mailto:info@australianprovenanceproject.com.au" 
             className="inline-block font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase border border-[#F5F3ED] px-8 py-4 hover:bg-[#f5f2ed] hover:text-[#050505] transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </motion.div>
  );
}
