const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// 1. Remove Crosshairs
code = code.replace(
  /\{\/\* Optical Corner Registration Crosshairs \(\+\) \*\/\}\n\s*<div className="absolute top-6 left-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute top-6 right-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute bottom-6 left-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute bottom-6 right-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\n/g,
  ""
);

// 2. Remove 3. MINIMAL INSTITUTIONAL HEADER
const headerStart = code.indexOf("{/* 3. MINIMAL INSTITUTIONAL HEADER */}");
const headerEnd = code.indexOf("</header>") + 9;
const headerCode = code.substring(headerStart, headerEnd);
code = code.substring(0, headerStart) + code.substring(headerEnd);

// 3. Remove 4D. In CUSTODY State (Registration Base)
const custodyStart = code.indexOf("{/* 4D. In CUSTODY State (Registration Base) */}");
const custodyEnd = code.indexOf("</div>\n        )}\n      </div>");
const custodyCode = code.substring(custodyStart, custodyEnd + 18);
code = code.substring(0, custodyStart) + code.substring(custodyEnd + 18);

// 4. Remove 5. MINIMAL BOTTOM OBSERVATIONAL TELEMETRY BAR
const footerStart = code.indexOf("{/* 5. MINIMAL BOTTOM OBSERVATIONAL TELEMETRY BAR */}");
const footerEnd = code.indexOf("</footer>") + 9;
const footerCode = code.substring(footerStart, footerEnd);
code = code.substring(0, footerStart) + code.substring(footerEnd);

// 5. Rebuild headerCode without absolute top-0 left-0 padding? 
// The frame itself will provide the inset, so we can keep top-0 left-0 on header.
// Let's modify the header to use pointer-events-auto for its inner interactive bits, and adjust padding.
const newHeaderCode = `{/* 3. MINIMAL INSTITUTIONAL HEADER */}
          <header className="absolute top-0 left-0 w-full z-30 pointer-events-none p-5 md:p-6 flex justify-between items-start">
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
          </header>`;

const newCustodyCode = custodyCode.replace("absolute top-20 right-6", "absolute top-20 right-6 md:right-6");

const newFooterCode = footerCode; // It's absolute bottom-0 left-0

// 6. Create the INSTRUMENT SAFE AREA block
const instrumentFrame = `
      {/* 5. INSTRUMENT SAFE AREA (AVOIDS GLOBAL NAVIGATION) */}
      <div className="absolute top-[120px] md:top-[96px] left-0 right-0 bottom-0 pointer-events-none z-30">
        <div className="relative w-full h-full">
          {/* Optical Corner Registration Crosshairs (+) */}
          <div className="absolute top-0 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute top-0 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 left-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>
          <div className="absolute bottom-6 right-6 text-[10px] text-[#6E6250] font-mono-tech select-none">+</div>

          ${newHeaderCode}

          ${newCustodyCode}

          ${newFooterCode}
        </div>
      </div>
`;

// Insert the frame just before the closing </div> of the main component
const returnMatch = code.lastIndexOf("    </div>\n  );\n}");
code = code.substring(0, returnMatch) + instrumentFrame + code.substring(returnMatch);

fs.writeFileSync('src/pages/Ledger.tsx', code);
console.log('Restructured successfully');
