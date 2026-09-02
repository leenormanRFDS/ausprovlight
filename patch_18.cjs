const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /\/\/ Point-to-line-segment Euclidean distance in 2D specimen space[\s\S]*?\/\/ Assign Forensic Isolation Test Variables \(Directive 17B\)/;

const replacement = `// Point-to-line-segment Euclidean distance in 3D specimen space
        float opalDistToSegment3D(vec3 p, vec3 a, vec3 b) {
          vec3 ba = b - a;
          vec3 pa = p - a;
          float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          return length(pa - ba * h);
        }

        // Computes the authoritative precious opal occurrence mask [0.0 - 1.0]
        // and regional domain classification in NORMALIZED SPECIMEN SPACE [-1.0, +1.0]^3:
        // X = -1 (left) to +1 (right)
        // Y = -1 (base) to +1 (top crest)
        // Z = -1 (back) to +1 (front facet)
        void opalEvaluateOccurrence(
          vec3 localPos, 
          vec3 localNormal, 
          out float outPreciousMask, 
          out float outGreenDomain, 
          out float outBlueDomain
        ) {
          // Normalized Specimen Coordinate System [-1, +1]^3
          vec3 specimenPos = clamp(((localPos - uLocalBoundsMin) / (uLocalBoundsMax - uLocalBoundsMin)) * 2.0 - 1.0, -1.0, 1.0);

          // Domain warp for organic geological boundaries
          vec3 wp = opalDomainWarp(specimenPos * 6.0);
          float geoJitter = (opalNoise3D(wp * 4.5) * 0.015) + (opalNoise3D(specimenPos * 24.0) * 0.006);
          float macroJitter = opalNoise3D(specimenPos * 8.0) * 0.04;

          // Front-facing depth envelope: precious facets are on front face (Z > 0.0 in specimen space)
          // Relaxed so the seam can wrap around physical edges
          float depthEnvelope = smoothstep(-0.4, 0.5, specimenPos.z);

          // -------------------------------------------------------------------------
          // 1. DOMAIN A — PRIMARY GREEN LODE
          // Irregular 3D silica seam with variable width, sub-lobes, matrix interruptions,
          // narrower necks, and continuation around facets.
          // -------------------------------------------------------------------------
          
          // Primary 3D Seam (sweeping from lower right to upper right/center, wrapping around Z)
          vec3 G0 = vec3(0.10, -0.30, 0.20);
          vec3 G1 = vec3(0.35,  0.05, 0.45); // wraps to the front facet
          vec3 G2 = vec3(0.58,  0.35, 0.30); // primary emerald core
          vec3 G3 = vec3(0.70,  0.60, 0.05); // right flank crest, curving back
          vec3 G4 = vec3(0.45,  0.75, -0.10); // upper taper, receding

          float dG01 = opalDistToSegment3D(specimenPos, G0, G1);
          float dG12 = opalDistToSegment3D(specimenPos, G1, G2);
          float dG23 = opalDistToSegment3D(specimenPos, G2, G3);
          float dG34 = opalDistToSegment3D(specimenPos, G3, G4);

          // Sub-lobe branching from G1 into the lower center
          vec3 G_Lobe = vec3(0.15, 0.15, 0.50);
          float dGLobe = opalDistToSegment3D(specimenPos, G1, G_Lobe);

          // Variable widths (necks and broader windows)
          // Pinch at G2-G3 (neck), broad at G1-G2 (window)
          float sG01 = smoothstep(0.28, 0.08, dG01 + geoJitter + macroJitter);
          float sG12 = smoothstep(0.35, 0.10, dG12 + geoJitter + macroJitter * 1.5); // Broader exposed window
          float sG23 = smoothstep(0.18, 0.04, dG23 + geoJitter); // Narrower neck
          float sG34 = smoothstep(0.22, 0.05, dG34 + geoJitter);
          float sGLobe = smoothstep(0.20, 0.05, dGLobe + geoJitter); // Branching sub-lobe

          float greenLodeRaw = max(max(max(sG01, sG12), max(sG23, sG34)), sGLobe) * depthEnvelope;

          // -------------------------------------------------------------------------
          // 2. DOMAIN B — COBALT / VIOLET SHOULDER
          // Isolated, separate physical domain on the upper-left bevel
          // -------------------------------------------------------------------------
          vec3 B0 = vec3(-0.45, 0.20, 0.25);
          vec3 B1 = vec3(-0.30, 0.55, 0.35); // Cobalt shoulder core
          vec3 B2 = vec3(-0.10, 0.75, 0.10); // Wraps towards top

          float dB01 = opalDistToSegment3D(specimenPos, B0, B1);
          float dB12 = opalDistToSegment3D(specimenPos, B1, B2);

          float sB01 = smoothstep(0.25, 0.06, dB01 + geoJitter + macroJitter);
          float sB12 = smoothstep(0.28, 0.07, dB12 + geoJitter + macroJitter);

          float blueShoulderRaw = max(sB01, sB12) * depthEnvelope;

          // -------------------------------------------------------------------------
          // 3. MATRIX INTERRUPTIONS & EXCLUSIONS
          // Physical potch/host sandstone notch interrupting areas
          // -------------------------------------------------------------------------
          
          // Central notch between domains
          vec3 notchPos = vec3(0.05, 0.55, 0.30);
          float notchDist = length(specimenPos - notchPos);
          float centralMatrixPass = smoothstep(0.15, 0.28, notchDist + geoJitter * 0.5);

          // Interruption crossing the green seam at G1-G2
          vec3 interruptPos = vec3(0.45, 0.20, 0.40);
          float interruptDist = length(specimenPos - interruptPos);
          float seamInterruption = smoothstep(0.08, 0.18, interruptDist + geoJitter);

          float matrixPass = centralMatrixPass * seamInterruption;

          // -------------------------------------------------------------------------
          // 4. ORIENTATION & BOUNDARY EXCLUSIONS
          // - Allow some side/edge wrapping, but exclude pure back face
          // -------------------------------------------------------------------------
          float frontFaceLock = smoothstep(-0.35, 0.10, localNormal.z);
          float baseCutoff = smoothstep(-0.45, -0.20, specimenPos.y);
          float leftBaseCutoff = smoothstep(-0.65, -0.35, specimenPos.x);

          // Gate combinations for Green
          float greenMatrixPass = greenLodeRaw * matrixPass;
          float greenFrontFace = greenLodeRaw * frontFaceLock;
          float greenBaseCutoff = greenLodeRaw * baseCutoff;
          float greenLeftBaseCutoff = greenLodeRaw * leftBaseCutoff;
          float activeGreen = greenLodeRaw * matrixPass * frontFaceLock * baseCutoff * leftBaseCutoff;

          // Gate combinations for Blue
          float blueMatrixPass = blueShoulderRaw * matrixPass;
          float blueFrontFace = blueShoulderRaw * frontFaceLock;
          float blueBaseCutoff = blueShoulderRaw * baseCutoff;
          float blueLeftBaseCutoff = blueShoulderRaw * leftBaseCutoff;
          float activeBlue = blueShoulderRaw * matrixPass * frontFaceLock * baseCutoff * leftBaseCutoff;
          
          // High frequency patch exclusion (dark potch patches inside the main seam)
          float patchExclusion = smoothstep(0.15, 0.65, opalNoise3D(specimenPos * 14.0));
          activeGreen *= mix(0.7, 1.0, patchExclusion);
          activeBlue *= mix(0.6, 1.0, patchExclusion);

          // Assign Forensic Isolation Test Variables (Directive 17B)`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
