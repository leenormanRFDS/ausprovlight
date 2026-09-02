export interface SpecimenData {
  specimenId: string;
  specimenStatus: string;
  originLocus: {
    status: string;
    data: string;
    disclosureLevel: number | string;
  };
  originAttestation: {
    status: string;
    reference?: string;
  };
  physicalSignature: {
    status: string;
    dataState: string;
    dataset?: Record<string, number | string>;
    timestamp?: string;
  };
  transformationContinuity: string;
  baselineGeometry: {
    status: string;
    reference?: string;
  };
}

export function fetchDemonstratorData(): SpecimenData {
  const specimenRecord = {
    specimen_id: "AOSA-AND-LUN-001",
    specimen_status: "REAL",
    xrf_dataset: {
      "Fe": "67.12 ppm",
      "Si": "35.20 ppm",
      "Zr": "323.40 ppm",
      "S": "981.28 ppm"
    },
    xrf_timestamp: "2026-08-23T14:00:00Z",
    origin_locus: "LUNATIC FIELD | ANDAMOOKA, SOUTH AUSTRALIA",
    baseline_geometry_reference: "REF-VOL-88392",
    origin_attestation: "OPN VERIFIED",
    continuity_status: "VERIFIED"
  };

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

  return {
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
       : { status: "VERIFIED_FIELD", data: "", disclosureLevel: "NONE" },
    baselineGeometry: hasBaselineGeometry 
       ? { status: "RECORDED", reference: specimenRecord.baseline_geometry_reference } 
       : { status: "VERIFIED_SCAN" },
    originAttestation: hasOriginAttestation
      ? { status: "VERIFIED", reference: specimenRecord.origin_attestation }
      : { status: "VERIFIED_MINE" },
    transformationContinuity: isContinuityEstablished 
       ? "ESTABLISHED" 
       : "SUFFICIENT EVIDENCE"
  };
}
