const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /<div className="text-\[7px\] text-provenance-gold\/90 font-bold uppercase tracking-wider pt-0\.5">D17B Green Domain Gates<\/div>/;
const replacement = `<div className="mt-2 mb-2 p-1 border border-hairline-strong bg-black/40">
          <button 
            onClick={(e) => { e.stopPropagation(); capturePhysicalFront(); }}
            className="w-full text-center p-1.5 bg-[#C8A97E]/20 text-provenance-gold hover:bg-[#C8A97E]/40 border border-provenance-gold/30 rounded-xs mb-1 font-bold tracking-widest text-[8px]"
          >
            CAPTURE PHYSICAL FRONT FROM CURRENT VIEW
          </button>
          {capturedFrontLocal && capturedFrontWorld && (
            <div className="text-[7px] text-bone-muted space-y-0.5">
              <div className="flex justify-between">
                <span>FRONT LOCAL:</span>
                <span className="text-bone-primary font-bold">
                  [{capturedFrontLocal.x.toFixed(2)}, {capturedFrontLocal.y.toFixed(2)}, {capturedFrontLocal.z.toFixed(2)}]
                </span>
              </div>
              <div className="flex justify-between">
                <span>FRONT WORLD:</span>
                <span className="text-bone-primary font-bold">
                  [{capturedFrontWorld.x.toFixed(2)}, {capturedFrontWorld.y.toFixed(2)}, {capturedFrontWorld.z.toFixed(2)}]
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="text-[7px] text-provenance-gold/90 font-bold uppercase tracking-wider pt-0.5">D17B Green Domain Gates</div>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
