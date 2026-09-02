/**
 * AUSTRALIAN PROVENANCE PROJECT
 * Generalized Provenance Object Architecture
 * Curated by Noah Bennett (Systems Architect) & Dr. Mara Voss (Creative Director)
 */

export interface ProvenanceNode {
  id: string;
  stepNumber: string;
  title: string;
  category: 'ORIGIN' | 'PHYSICAL' | 'SCIENCE' | 'GEOLOGY' | 'RECORD' | 'JOURNEY' | 'CUSTODY';
  subtitle: string;
  description: string;
  evidenceType: string;
  verificationLevel: 'MEMBER_RATIFIED' | 'SPECTRAL_VERIFIED' | 'LIDAR_COORDINATE' | 'IMMUTABLE_HASH' | 'PHYSICAL_SEAL';
  timestamp?: string;
  coordinates?: string;
  operator?: string;
  details?: Record<string, string | number>;
  mediaRef?: string;
}

export interface ElementalConcentration {
  element: string;
  symbol: string;
  valuePpm: number;
  percentageWeight: string;
  geologicalSignificance: string;
  spectralPeakKev: number;
}

export interface ScientificFingerprintData {
  specimenId: string;
  scanDate: string;
  spectrometerModel: string;
  calibrationProtocol: string;
  elements: ElementalConcentration[];
  refractiveIndex: {
    value: number;
    tolerance: number;
    method: string;
  };
  specificGravity: {
    value: number;
    method: string;
  };
  silicaLatticeSpacingNm: number;
  diffractionWavelengths: string[];
  treatmentClassification: 'NATURAL_UNTREATED' | 'CARBONIZED_MATRIX_BENCHMARK' | 'STABILIZED' | 'SYNTHETIC_SIMULANT';
  matrixHostRatio: string;
  cryptographicSignature: string;
}

export interface GeologicalProfile {
  era: string;
  period: string;
  ageMa: number;
  formationName: string;
  basin: string;
  depositionalEnvironment: string;
  paleoContext: string;
  silicaPrecipitationMechanism: string;
  depthHorizonMeters: number;
}

export interface ProvenanceObjectData {
  id: string;
  assetType: 'GEOLOGICAL_SPECIMEN' | 'HERITAGE_ARTIFACT' | 'CULTURAL_CREATION' | 'ARCHITECTURAL_STRUCTURE';
  title: string;
  vernacularName: string;
  catalogId: string;
  status: 'VERIFIED' | 'UNDER_ATTESTATION' | 'IN_TRANSIT' | 'PERMANENT_VAULT';
  
  // Physical & Spatial Origin
  origin: {
    field: string;
    subField: string;
    mineName: string;
    shaftNumber: string;
    town: string;
    region: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
      elevationMeters: number;
      gridRef: string;
    };
    traditionalCustodians: string;
    custodianProtocol: string;
  };

  // Human Origin
  extractor: {
    minerName: string;
    claimHolder: string;
    extractionDate: string;
    witnesses: string[];
    minerSideAttestationHash: string;
  };

  // 3D Twin & Geometry
  digitalTwin: {
    modelUrl: string;
    meshPolygonCount: number;
    textureResolution: string;
    scanningMethod: string;
    volumetricMm3: number;
    massGrams: number;
    dimensionsMm: { x: number; y: number; z: number };
    baselineHash: string;
  };

  // Scientific Evidence
  science: ScientificFingerprintData;

  // Geological Lineage
  geology: GeologicalProfile;

  // Community Grading & Standard
  communityStandard: {
    standardName: string;
    gradeCode: string;
    gradeDescription: string;
    bodyTone: string;
    brightnessLevel: string;
    patternType: string;
    fireDominance: string[];
    consensusPanel: string;
    ratificationDate: string;
  };

  // Full Provenance Chain
  provenanceChain: ProvenanceNode[];

  // Global Journey & Continuity
  globalJourney: {
    currentLocation: string;
    custodyChain: Array<{
      holder: string;
      role: string;
      date: string;
      verifiedLocus: string;
    }>;
    civicReinvestmentPercentage: number;
    targetDestinationDemonstrator: {
      destination: string;
      journeyType: string;
      continuityGuarantee: string;
    };
  };
}
