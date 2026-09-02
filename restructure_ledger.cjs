const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// 1. Remove the original Corner Registration Crosshairs
code = code.replace(
  /\{\/\* Optical Corner Registration Crosshairs \(\+\) \*\/\}\n\s*<div className="absolute top-6 left-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute top-6 right-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute bottom-6 left-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>\n\s*<div className="absolute bottom-6 right-6 text-\[10px\] text-\[#6E6250\] pointer-events-none z-30 font-mono-tech select-none">\+<\/div>/g,
  ""
);

// 2. Remove the original MINIMAL INSTITUTIONAL HEADER
const headerStart = code.indexOf("{/* 3. MINIMAL INSTITUTIONAL HEADER */}");
const headerEnd = code.indexOf("</header>") + 9;
const originalHeader = code.substring(headerStart, headerEnd);
code = code.substring(0, headerStart) + code.substring(headerEnd);

// 3. Remove the original CUSTODY State panel
const custodyStart = code.indexOf("{/* 4D. In CUSTODY State (Registration Base) */}");
const custodyEnd = code.indexOf("</div>", code.indexOf("</div>", code.indexOf("</div>", code.indexOf("</div>", code.indexOf("</div>", custodyStart) + 1) + 1) + 1) + 1) + 6;
// Wait, regex might be safer or just string replacement for the Custody panel.
// Actually, let's just find the exact string of the custody panel.
