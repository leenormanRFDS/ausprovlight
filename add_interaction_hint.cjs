const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// 1. Add hasInteracted state
code = code.replace(
  "const [autoRotate, setAutoRotate] = useState(false);",
  "const [autoRotate, setAutoRotate] = useState(false);\n  const [hasInteracted, setHasInteracted] = useState(false);"
);

// 2. Update onOrientationChange
code = code.replace(
  /onOrientationChange=\{\(az, inc\) => \{\n\s*setAzimuth\(az\);\n\s*setInclination\(inc\);\n\s*\}\}/,
  `onOrientationChange={(az, inc) => {
            setAzimuth(az);
            setInclination(inc);
            if (!hasInteracted) setHasInteracted(true);
          }}`
);

// 3. Add the [ DRAG TO EXAMINE ] overlay in the INSTRUMENT SAFE AREA (or in OBSERVE state)
const observeStateMatch = "{/* 4A. In OBSERVE State: Restrained Specimen Anchor Pins */}";
const interactionHint = `
        {/* Interaction Affordance: Fades out upon first rotation */}
        <AnimatePresence>
          {!hasInteracted && instrumentState === 'OBSERVE' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
            >
              <div className="px-3 py-1.5 bg-[#0C0B0A]/80 border border-[#F5F2ED]/20 backdrop-blur-sm text-[8px] uppercase tracking-[0.3em] text-[#F5F2ED] font-mono-tech flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#F5F2ED] animate-pulse" />
                <span>DRAG TO EXAMINE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
`;

code = code.replace(observeStateMatch, interactionHint + "\n        " + observeStateMatch);

fs.writeFileSync('src/pages/Ledger.tsx', code);
console.log('Interaction hint added successfully');
