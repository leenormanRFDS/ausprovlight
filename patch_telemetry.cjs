const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// Update telemetry UI rendering
code = code.replace(
  '<span className="text-[#38D39F]">GREEN DOMAIN RESPONSE:</span>',
  '<span className="text-[#38D39F]">GREEN DOMAIN RESPONSE:</span>'
);

code = code.replace(
  '<div className="w-full bg-black/80 h-1.5 border border-hairline overflow-hidden">',
  `              <div className="grid grid-cols-3 gap-1 pt-0.5 pb-0.5 text-bone-muted border-b border-hairline-subtle mb-0.5">
                <div>cosThetaI: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosThetaI}</span></div>
                <div>cosThetaV: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosThetaV}</span></div>
                <div>cosHalf: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosHalf}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-1 pb-1 text-bone-muted">
                <div>λ Green: <span className="text-bone-primary font-bold">{calibrationTelemetry.lambdaGreen}nm</span></div>
                <div>λ Blue: <span className="text-bone-primary font-bold">{calibrationTelemetry.lambdaBlue}nm</span></div>
              </div>
              <div className="w-full bg-black/80 h-1.5 border border-hairline overflow-hidden">`
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
