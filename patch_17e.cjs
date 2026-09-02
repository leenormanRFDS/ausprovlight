const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /\/\/ Point-to-line-segment Euclidean distance in 3D specimen space[\s\S]*?\/\/ Assign Forensic Isolation Test Variables \(Directive 17B\)/;

const replacement = `// Point-to-line-segment Euclidean distance in 2D specimen space (X, Y)
        float opalDistToSegment2D(vec2 p, vec2 a, vec2 b) {
          vec2 ba = b - a;
          vec2 pa = p - a;
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

          // Front-facing depth envelope: precious facets are on front face (Z > 0.0 in specimen space)
          float depthEnvelope = smoothstep(0.0, 0.35, specimenPos.z);

          // -------------------------------------------------------------------------
          // 1. DOMAIN A — PRIMARY GREEN LODE (Right-central facet & right flank)
          // Seam traversing right flank and right-central facet in specimen space
          // -------------------------------------------------------------------------
          vec2 G0 = vec2(0.15, -0.25); // Lower-right matrix entry
          vec2 G1 = vec2(0.35, 0.05);  // Right-central lower wedge
          vec2 G2 = vec2(0.55, 0.35);  // Primary emerald facet core
          vec2 G3 = vec2(0.65, 0.60);  // Right flank crest
          vec2 G4 = vec2(0.50, 0.78);  // Upper right flank taper

          float dG01 = opalDistToSegment2D(specimenPos.xy, G0, G1);
          float dG12 = opalDistToSegment2D(specimenPos.xy, G1, G2);
          float dG23 = opalDistToSegment2D(specimenPos.xy, G2, G3);
          float dG34 = opalDistToSegment2D(specimenPos.xy, G3, G4);

          // Vein widths in normalized specimen space [-1, 1]
          float sG01 = smoothstep(0.20, 0.06, dG01 + geoJitter);
          float sG12 = smoothstep(0.24, 0.07, dG12 + geoJitter);
          float sG23 = smoothstep(0.25, 0.07, dG23 + geoJitter);
          float sG34 = smoothstep(0.18, 0.05, dG34 + geoJitter);

          float greenLodeRawXY = max(max(sG01, sG12), max(sG23, sG34));
          float greenLodeRaw = greenLodeRawXY * depthEnvelope;

          // -------------------------------------------------------------------------
          // 2. DOMAIN B — COBALT / VIOLET SHOULDER (Upper-left shoulder / bevel)
          // Spatially distinct from green lode, angled bevel orientation
          // -------------------------------------------------------------------------
          vec2 B0 = vec2(-0.45, 0.20); // Lower-left shoulder transition
          vec2 B1 = vec2(-0.30, 0.50); // Cobalt shoulder core
          vec2 B2 = vec2(-0.15, 0.72); // Upper shoulder crest

          float dB01 = opalDistToSegment2D(specimenPos.xy, B0, B1);
          float dB12 = opalDistToSegment2D(specimenPos.xy, B1, B2);

          float sB01 = smoothstep(0.18, 0.06, dB01 + geoJitter);
          float sB12 = smoothstep(0.20, 0.06, dB12 + geoJitter);

          float blueShoulderRawXY = max(sB01, sB12);
          float blueShoulderRaw = blueShoulderRawXY * depthEnvelope;

          // -------------------------------------------------------------------------
          // 3. CENTRAL MATRIX EXCLUSION (Dark notch observed between the two domains)
          // Physical potch/host sandstone notch interrupting upper-central area
          // -------------------------------------------------------------------------
          vec2 notchPos = vec2(0.05, 0.55);
          float notchDist = length(specimenPos.xy - notchPos);
          float matrixPass = smoothstep(0.10, 0.22, notchDist + geoJitter * 0.5);

          // -------------------------------------------------------------------------
          // 4. ORIENTATION & BOUNDARY EXCLUSIONS
          // - Reverse / back face: non-diffractive (normal facing away from front facet)
          // - Lower base (Y < -0.35): non-diffractive finger-grip host matrix
          // - Left flank base (X < -0.50): non-diffractive host matrix
          // -------------------------------------------------------------------------
          float frontFaceLock = smoothstep(-0.10, 0.20, localNormal.z);
          float baseCutoff = smoothstep(-0.45, -0.25, specimenPos.y);
          float leftBaseCutoff = smoothstep(-0.60, -0.40, specimenPos.x);

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

          // EXPOSE DIAGNOSTICS FOR 17E
          g_testGreenLodeRawXY = greenLodeRawXY;
          g_testDepthEnvelope = depthEnvelope;
          g_testFrontFaceLock = frontFaceLock;
          g_testSpecimenPosZ = specimenPos.z;

          // Assign Forensic Isolation Test Variables (Directive 17B)`;

code = code.replace(regex, replacement);

const shaderVarsRegex = /float g_testBlueFrontFaceLock;\n        float g_testBlueBaseCutoff;\n        float g_testBlueLeftBaseCutoff;\n        float g_testBlueAllGates;/;

const shaderVarsReplacement = `float g_testBlueFrontFaceLock;
        float g_testBlueBaseCutoff;
        float g_testBlueLeftBaseCutoff;
        float g_testBlueAllGates;
        float g_testGreenLodeRawXY;
        float g_testDepthEnvelope;
        float g_testFrontFaceLock;
        float g_testSpecimenPosZ;`;

code = code.replace(shaderVarsRegex, shaderVarsReplacement);

const newModesRegex = /\/\/ Diagnostic Mode 35: TEST Y — PRODUCTION SPECTRAL RGB[\s\S]*?gl_FragColor = vec4\(spectralTest \* 2\.0, 1\.0\);\n        }/;

const newModesReplacement = `// Diagnostic Mode 35: TEST Y — PRODUCTION SPECTRAL RGB
        if (uDebugMode == 35) {
          vec3 L = normalize(uKeyLightDir);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);
          float nSilica = 1.450;
          float dGreen = 221.0 + opalSpacingField(vOpalLocalPos) * 6.5;
          float dBlue = 188.0 + opalSpacingField(vOpalLocalPos) * 5.5;
          float shiftFactor = sqrt(max(0.0, nSilica * nSilica - 1.0 + cosThetaI * cosThetaI));
          float lambdaGreen = 2.0 * dGreen * shiftFactor;
          float lambdaBlue = 2.0 * dBlue * shiftFactor;
          vec3 spectralGreen = spectralDiffractionRGB(lambdaGreen);
          vec3 spectralBlue = spectralDiffractionRGB(lambdaBlue);
          vec3 spectralTest = spectralGreen * g_greenFireMask + spectralBlue * g_blueFireMask;
          gl_FragColor = vec4(spectralTest * 2.0, 1.0);
        }

        // Diagnostic Mode 36: 17E TEST 1 - RAW GREEN WITH NO Z OR NORMAL GATING
        if (uDebugMode == 36) {
          gl_FragColor = vec4(vec3(g_testGreenLodeRawXY), 1.0);
        }

        // Diagnostic Mode 37: 17E TEST 2 - DEPTH ENVELOPE ONLY
        if (uDebugMode == 37) {
          gl_FragColor = vec4(vec3(g_testGreenLodeRawXY * g_testDepthEnvelope), 1.0);
        }

        // Diagnostic Mode 38: 17E TEST 3 - FRONT FACE LOCK ONLY
        if (uDebugMode == 38) {
          gl_FragColor = vec4(vec3(g_testGreenLodeRawXY * g_testFrontFaceLock), 1.0);
        }

        // Diagnostic Mode 39: 17E TEST 4 - VISUALISE specimenPos.z
        if (uDebugMode == 39) {
          float zVis = g_testSpecimenPosZ * 0.5 + 0.5;
          gl_FragColor = vec4(vec3(zVis), 1.0);
        }`;

code = code.replace(newModesRegex, newModesReplacement);

const uiButtonsRegex = /\{ id: 35, label: '35 · TEST Y: SPECTRAL RGB' \},/;

const uiButtonsReplacement = `{ id: 35, label: '35 · TEST Y: SPECTRAL RGB' },
          { id: 36, label: '36 · 17E TEST 1: RAW GREEN NO Z' },
          { id: 37, label: '37 · 17E TEST 2: DEPTH ENV ONLY' },
          { id: 38, label: '38 · 17E TEST 3: FRONT FACE ONLY' },
          { id: 39, label: '39 · 17E TEST 4: VISUALISE Z' },`;

code = code.replace(uiButtonsRegex, uiButtonsReplacement);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
