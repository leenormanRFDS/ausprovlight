const fs = require('fs');
let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// 1. Get everything up to the end of the 3D projected labels (the `z-20` div)
// The `z-20` div ends with:
//         )}
//       </div>
//
// Then comes `{/* 4D. In CUSTODY / REGISTRATION BASE State */}`
const custodyMarker = "{/* 4D. In CUSTODY / REGISTRATION BASE State */}";
const custodyIndex = code.indexOf(custodyMarker);

let upToZ20 = code.substring(0, custodyIndex);

// We need to remove the first occurrence of MINIMAL INSTITUTIONAL HEADER from upToZ20, just in case it's there.
// But it was already removed!
// We also need to make sure crosshairs are gone.
// Let's just assemble the final file.

const finalCode = upToZ20 + `
      {/* 5. INSTRUMENT SAFE AREA (AVOIDS GLOBAL NAVIGATION) */}
      <div className="absolute top-[120px] md:top-[96px] left-0 right-0 bottom-0 pointer-events-none z-30 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Optical Corner Registration Crosshairs (+) */}
          <div className="absolute top-0 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute top-0 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>

          {/* 3. MINIMAL INSTITUTIONAL HEADER */}
          <header className="absolute top-0 left-0 w-full flex justify-between items-start px-5 md:px-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#F5F2ED] font-semibold">
                  AUSTRALIAN PROVENANCE PROJECT
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-[8px] uppercase tracking-[0.2em] text-[#8E8A82] mt-1">
                <span>ANDAMOOKA MATRIX OPAL</span>
                <span>·</span>
                <span className="text-[#C8A97E]">APP-AMK-001</span>
              </div>
            </div>

            {/* Current Epistemic State Badge */}
            <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest px-2.5 py-1 bg-[#141210]/80 border border-[#F5F2ED]/10 backdrop-blur-sm pointer-events-auto">
              <span className="text-[#8E8A82]">STATE:</span>
              <span className={\`font-bold \${instrumentState === 'OBSERVE' ? 'text-[#8E8A82]' : 'text-[#C8A97E]'}\`}>
                [{instrumentState}{activeNodeId ? \` : \${activeNodeId.toUpperCase()}\` : ''}]
              </span>
            </div>
          </header>

          {/* 4D. In CUSTODY / REGISTRATION BASE State */}
          {(instrumentState === 'INVESTIGATE' || instrumentState === 'MODEL' || instrumentState === 'VERIFY') && activeNodeId === 'custody' && (
            <div className="absolute top-20 right-6 z-30 pointer-events-auto w-[260px] bg-[#0C0B0A]/92 border border-[#C8A97E]/40 backdrop-blur-md p-3.5 shadow-2xl space-y-2.5 text-[#F5F2ED] text-[8px] font-mono-tech">
              <div className="flex items-center justify-between border-b border-[#F5F2ED]/10 pb-1.5">
                <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-[#C8A97E]">
                  <span className="w-1.5 h-1.5 bg-[#C8A97E]" />
                  <span className="font-bold">SPECIMEN REGISTRATION</span>
                </div>
                <button 
                  onClick={handleCloseInvestigation}
                  className="text-[8px] text-[#8E8A82] hover:text-[#F5F2ED] uppercase tracking-widest px-1 border border-[#F5F2ED]/15 cursor-pointer"
                >
                  CLOSE ×
                </button>
              </div>
              <div className="space-y-1 text-[7px]">
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">SPECIMEN ID:</span>
                  <span className="text-[#C8A97E] font-bold">APP-AMK-001</span>
                </div>
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">CAPTURE MODALITY:</span>
                  <span className="text-[#F5F2ED]">PHOTOGRAMMETRIC 3D SCAN</span>
                </div>
                <div className="flex justify-between p-1.5 bg-[#141210] border border-[#F5F2ED]/5">
                  <span className="text-[#8E8A82]">CUSTODIAL RECORD:</span>
                  <span className="text-[#F5F2ED]">PERMANENT DIGITAL REGISTER</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. MINIMAL BOTTOM OBSERVATIONAL TELEMETRY BAR */}
          <footer className="absolute bottom-0 left-0 w-full pointer-events-none p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-[8px] text-[#8E8A82] uppercase tracking-wider">
            <div className="flex items-center gap-4 bg-[#0C0B0A]/80 border border-[#F5F2ED]/10 backdrop-blur-sm px-3 py-1.5 pointer-events-auto">
              <div>
                <span className="text-[#6E6250]">AZIMUTH: </span>
                <span className="text-[#F5F2ED] font-bold">{azimuth}°</span>
              </div>
              <div>
                <span className="text-[#6E6250]">ELEVATION: </span>
                <span className="text-[#F5F2ED] font-bold">{inclination}°</span>
              </div>
              <div className="hidden md:block">
                <span className="text-[#6E6250]">REGIME: </span>
                <span className="text-[#C8A97E] font-bold">{opticalMetrics.relativeIllumination}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={\`px-2.5 py-1.5 border text-[8px] uppercase tracking-wider transition-colors cursor-pointer \${
                  autoRotate 
                    ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10' 
                    : 'border-[#F5F2ED]/15 text-[#8E8A82] hover:text-[#F5F2ED]'
                }\`}
              >
                {autoRotate ? 'TURNTABLE: ON' : 'TURNTABLE: OFF'}
              </button>
              <button
                onClick={() => {
                  handleCloseInvestigation();
                  if (viewerRef.current) viewerRef.current.resetView();
                }}
                className="px-2.5 py-1.5 border border-[#F5F2ED]/15 text-[#8E8A82] hover:text-[#F5F2ED] text-[8px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                RESET VIEW
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Ledger.tsx', finalCode);
console.log("Reconstructed Ledger.tsx successfully.");
