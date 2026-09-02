import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Server-side data
  const specimenRecord = {
    specimen_id: "AOSA-AND-LUN-001",
    specimen_status: "REAL",
    xrf_dataset: {
      "Fe": 0.12,
      "Si": 45.20,
      "O": 53.40,
      "H": 1.28
    },
    xrf_timestamp: "2026-08-23T14:00:00Z",
    origin_locus: "LUNATIC FIELD\nANDAMOOKA, SOUTH AUSTRALIA",
    baseline_geometry_reference: "REF-VOL-88392",
    origin_attestation: "AOSA VERIFIED",
    continuity_status: "VERIFIED"
  };

  // Public Experience API
  app.get('/api/specimen', (req, res) => {
    const hasPhysicalSignature = !!specimenRecord.xrf_dataset;
    const hasOriginLocus = !!specimenRecord.origin_locus;
    const hasBaselineGeometry = !!specimenRecord.baseline_geometry_reference;
    const hasOriginAttestation = !!specimenRecord.origin_attestation;
    
    const isContinuityEstablished = 
      hasPhysicalSignature && 
      hasOriginLocus && 
      hasBaselineGeometry && 
      hasOriginAttestation && 
      specimenRecord.continuity_status === "VERIFIED";

    res.json({
      specimenId: specimenRecord.specimen_id,
      specimenStatus: specimenRecord.specimen_status,
      physicalSignature: {
        status: hasPhysicalSignature ? "RECORDED" : "UNAVAILABLE",
        dataState: hasPhysicalSignature ? "REAL" : "NULL",
        dataset: specimenRecord.xrf_dataset,
        timestamp: specimenRecord.xrf_timestamp
      },
      originLocus: hasOriginLocus 
         ? { status: "VERIFIED", data: specimenRecord.origin_locus, disclosureLevel: 3 } 
         : { status: "PENDING_VERIFIED_RECORD", data: null, disclosureLevel: "NONE" },
      baselineGeometry: hasBaselineGeometry 
         ? { status: "RECORDED", reference: specimenRecord.baseline_geometry_reference } 
         : { status: "PENDING_VERIFIED_RECORD" },
      originAttestation: hasOriginAttestation
        ? { status: "VERIFIED", reference: specimenRecord.origin_attestation }
        : { status: "PENDING_VERIFIED_RECORD" },
      transformationContinuity: isContinuityEstablished 
         ? "ESTABLISHED" 
         : "INSUFFICIENT EVIDENCE"
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Instrument server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
