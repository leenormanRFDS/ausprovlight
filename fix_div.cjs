const fs = require('fs');
let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// Insert the missing closing div for the z-20 container
const instrumentSafeMarker = "{/* 5. INSTRUMENT SAFE AREA (AVOIDS GLOBAL NAVIGATION) */}";
code = code.replace(instrumentSafeMarker, "</div>\n\n      " + instrumentSafeMarker);

fs.writeFileSync('src/pages/Ledger.tsx', code);
