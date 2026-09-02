const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

const startIndex = code.indexOf("{instrumentState === 'MODEL' && (");
const endIndex = code.indexOf("{/* 4C. In MATRIX BOUNDARY State (Material Node) */}");

if (startIndex !== -1 && endIndex !== -1) {
  const before = code.substring(0, startIndex);
  const after = code.substring(code.lastIndexOf(")}", endIndex) + 2); // get past the last )} of VERIFY

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

                      <div className="space-y-3 pt-2">
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
                  )}
                </motion.div>
              </div>
            )}
          </>
        )}
`;

  code = before + evidenceBlockStr + after.substring(after.indexOf("{/* 4C. In MATRIX BOUNDARY State (Material Node) */}"));
  fs.writeFileSync('src/pages/Ledger.tsx', code);
  console.log('Replaced MODEL/VERIFY with EVIDENCE_PATHWAY successfully');
} else {
  console.log('Could not find startIndex or endIndex');
}
