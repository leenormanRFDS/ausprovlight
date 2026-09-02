const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// 1. Update InstrumentState
code = code.replace(
  "type InstrumentState = 'OBSERVE' | 'INVESTIGATE' | 'MODEL' | 'VERIFY';",
  "type InstrumentState = 'OBSERVE' | 'INVESTIGATE' | 'EVIDENCE';"
);

// 2. Remove handleEnterModel, handleEnterVerify, add handleEnterEvidence
code = code.replace(
  /const handleEnterModel = \(\) => \{\n    setInstrumentState\('MODEL'\);\n  \};\n\n  const handleEnterVerify = \(\) => \{\n    setInstrumentState\('VERIFY'\);\n  \};/g,
  `const handleEnterEvidence = () => {
    setInstrumentState('EVIDENCE');
  };`
);

// 3. Update ThreeOpalViewer instrumentMode prop
code = code.replace(
  "instrumentMode={instrumentState.toLowerCase() as 'observe' | 'investigate' | 'model' | 'verify'}",
  "instrumentMode={instrumentState === 'EVIDENCE' ? 'investigate' : instrumentState.toLowerCase() as any}"
);

// 4. In INVESTIGATE render block, replace the EXPLAIN MECHANISM / EVIDENCE REGISTER buttons
const investigateButtonsStr = `<div className="pt-1 flex flex-col gap-1 text-[8px]">
                        <button
                          onClick={handleEnterModel}
                          className="w-full py-1.5 px-2 bg-[#1C1A17] hover:bg-[#25221E] border border-[#C8A97E]/30 hover:border-[#C8A97E] text-left flex items-center justify-between text-[#F5F2ED] cursor-pointer transition-colors"
                        >
                          <span>EXPLAIN MECHANISM</span>
                          <span className="text-[#C8A97E]">MODEL →</span>
                        </button>
                        <button
                          onClick={handleEnterVerify}
                          className="w-full py-1.5 px-2 bg-[#141210] hover:bg-[#1C1A17] border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/30 text-left flex items-center justify-between text-[#8E8A82] hover:text-[#F5F2ED] cursor-pointer transition-colors"
                        >
                          <span>EVIDENCE REGISTER</span>
                          <span className="text-[#8E8A82]">AUDIT →</span>
                        </button>
                      </div>`;

const newInvestigateButtonStr = `<div className="pt-1 flex flex-col gap-1 text-[8px]">
                        <button
                          onClick={handleEnterEvidence}
                          className="w-full py-2 px-2 bg-[#141210] hover:bg-[#1C1A17] border border-[#F5F2ED]/10 hover:border-[#F5F2ED]/30 text-left flex items-center justify-between text-[#8E8A82] hover:text-[#F5F2ED] cursor-pointer transition-colors"
                        >
                          <span className="uppercase tracking-widest font-bold">WHAT WOULD PROVE THIS?</span>
                          <span className="text-[#8E8A82]">EVIDENCE PATHWAY →</span>
                        </button>
                      </div>`;

code = code.replace(investigateButtonsStr, newInvestigateButtonStr);

// 5. Replace MODEL and VERIFY render blocks with EVIDENCE
const modelAndVerifyBlockRegex = /\{instrumentState === 'MODEL' && \([\s\S]*?\{instrumentState === 'VERIFY' && \([\s\S]*?\}\)[\s\S]*?\}\)/g;

const evidenceBlockStr = `{instrumentState === 'EVIDENCE' && (
                    <>
                      <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#F5F2ED]">
                          <span className="w-1.5 h-1.5 bg-[#F5F2ED]" />
                          <span className="font-bold">EVIDENCE PATHWAY</span>
                        </div>
                        <button 
                          onClick={handleReturnToInvestigate}
                          className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                        >
                          BACK ←
                        </button>
                      </div>

                      <div className="space-y-3 pt-1">
                        {/* A — OBSERVED */}
                        <div className="pl-3 border-l border-[#C8A97E] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#C8A97E] rounded-full" />
                          <div className="text-[#C8A97E] text-[7px] font-bold tracking-widest">[01 · OBSERVED]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            Green play-of-colour recorded on the physical specimen.
                          </p>
                        </div>

                        {/* B — MODELLED */}
                        <div className="pl-3 border-l border-[#7CA8C4] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#7CA8C4] rounded-full" />
                          <div className="text-[#7CA8C4] text-[7px] font-bold tracking-widest">[02 · COMPUTED]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            Angle-dependent structural colour can be modelled from ordered silica domains.
                          </p>
                        </div>

                        {/* C — UNKNOWN */}
                        <div className="pl-3 border-l border-[#8E8A82] space-y-1 relative">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#8E8A82] rounded-full" />
                          <div className="text-[#8E8A82] text-[7px] font-bold tracking-widest">[04 · PENDING]</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            The actual domain structure of this specimen has not been measured.
                          </p>
                        </div>

                        {/* REQUIRED EVIDENCE */}
                        <div className="pl-3 border-l border-[#F5F2ED]/30 space-y-1 relative pb-1">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0C0B0A] border border-[#F5F2ED]/30 rounded-full" />
                          <div className="text-[#F5F2ED]/50 text-[7px] font-bold tracking-widest">REQUIRED EVIDENCE</div>
                          <p className="text-[#F5F2ED] text-[8px] uppercase tracking-wider leading-relaxed">
                            SEM / SPECTROSCOPY / APPROPRIATE LABORATORY ANALYSIS
                          </p>
                        </div>

                        <div className="mt-2 p-1.5 bg-[#141210] border border-[#F5F2ED]/10 flex justify-between items-center text-[7px]">
                          <span className="text-[#8E8A82] tracking-widest uppercase">EVIDENCE STATUS</span>
                          <span className="text-[#C8A97E] font-bold tracking-widest uppercase">OPEN</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[8px]">
                        <button
                          onClick={handleReturnToInvestigate}
                          className="text-[#8E8A82] hover:text-[#F5F2ED] underline cursor-pointer"
                        >
                          ← Return to Vectors
                        </button>
                        <button
                          onClick={handleCloseInvestigation}
                          className="text-[#8E8A82] hover:text-[#F5F2ED] cursor-pointer"
                        >
                          Close ×
                        </button>
                      </div>
                    </>
                  )}`;

code = code.replace(modelAndVerifyBlockRegex, evidenceBlockStr);

fs.writeFileSync('src/pages/Ledger.tsx', code);
console.log('Ledger.tsx updated');
