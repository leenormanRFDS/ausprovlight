const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

const anchorBlock = `{/* SPATIAL EXAMINATION CALLOUT FOR OPTICAL BENCH */}`;

const newAnnotation = `            {/* Peak Optical Alignment Spatial Annotation */}
            {benchPoints.anchor.visible && opticalMetrics.specularAlignment > 0.96 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -translate-x-1/2 mt-12 flex flex-col items-center pointer-events-none"
                style={{ left: \`\${benchPoints.anchor.x}px\`, top: \`\${benchPoints.anchor.y}px\` }}
              >
                <div className="w-px h-6 bg-gradient-to-b from-[#7CA8C4] to-transparent mb-1" />
                <div className="bg-[#0C0B0A]/95 border border-[#7CA8C4]/40 p-2 text-center backdrop-blur-md shadow-2xl">
                  <div className="text-[8px] text-[#7CA8C4] font-bold tracking-widest uppercase mb-1">
                    OPTICAL RESPONSE MAXIMUM
                  </div>
                  <div className="text-[7px] uppercase tracking-wider text-[#8E8A82]">
                    <span className="text-[#7CA8C4] font-bold">[02 · COMPUTED]</span><br/>
                    Maximum model response under current<br/>illumination / observation geometry.
                  </div>
                </div>
              </motion.div>
            )}

            `;

code = code.replace(anchorBlock, newAnnotation + anchorBlock);

fs.writeFileSync('src/pages/Ledger.tsx', code);
console.log('Annotation added');
