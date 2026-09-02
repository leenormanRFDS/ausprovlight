export type EvidenceType = 'PERSON' | 'HOME' | 'STORY' | 'BUILDING' | 'TOWN' | 'TIME';

export interface PersonEvidence {
  id: string;
  name: string;
  role: string;
  era: string;
  lifeSpan: string;
  quote: string;
  biography: string;
  connectionToPlace: string;
  homeId: string;
  storyId: string;
  buildingId: string;
  districtId: string;
  timeEpochId: string;
  archivalPhotoUrl?: string;
  audioTrackTitle?: string;
  audioTranscript?: string;
  custodianshipConsent: string;
}

export interface HomeEvidence {
  id: string;
  name: string;
  dugoutNumber: string;
  builder: string;
  yearBuilt: number;
  geologicalStratum: string;
  depthMeters: number;
  thermalSurfaceTempC: number;
  thermalSubterraneanTempC: number;
  structuralMaterial: string;
  architecturalNotes: string;
  currentPhysicalCondition: 'PRISTINE' | 'VULNERABLE' | 'ACTIVELY_STABILIZED' | 'HISTORIC_RUIN';
  stabilizationFundedPercent: number;
  pointCloudVerticesCount: number;
  personId: string;
  buildingId: string;
  districtId: string;
  timeEpochId: string;
}

export interface StoryEvidence {
  id: string;
  title: string;
  narratorName: string;
  recordedDate: string;
  thematicCategory: 'FIRST_DISCOVERY' | 'DUGOUT_LIFE' | 'KOKATHA_DREAMING' | 'SURVIVAL_DROUGHT' | 'LAPIDARY_CRAFT';
  audioDuration: string;
  binauralSoundscape: string;
  shortExcerpt: string;
  fullTranscript: string;
  archivalReference: string;
  culturalConsentStamp: string;
  personId: string;
  homeId: string;
  buildingId: string;
  districtId: string;
  timeEpochId: string;
}

export interface BuildingEvidence {
  id: string;
  name: string;
  originalPurpose: string;
  yearConstructed: number;
  constructionTechnique: string;
  historicalSignificance: string;
  physicalAddress: string;
  gpsCoordinates: string;
  structuralRiskFactors: string[];
  restorationStatus: 'UNDER_THREAT' | 'PARTIALLY_RESTORED' | 'STABILIZED_APP' | 'MONITORED';
  restorationBudgetRequiredAUD: number;
  restorationBudgetRaisedAUD: number;
  digitalTwinAccuracyMm: number;
  archivalPhotosCount: number;
  personId: string;
  homeId: string;
  storyId: string;
  districtId: string;
  timeEpochId: string;
}

export interface TownDistrictEvidence {
  id: string;
  name: string;
  geologicalSetting: string;
  historicalRole: string;
  settlementPattern: string;
  coordinates: string;
  activeHeritageSitesCount: number;
  connectedPeopleCount: number;
  connectedStoriesCount: number;
  timeEpochId: string;
}

export interface TimeEpochEvidence {
  id: string;
  epochName: string;
  timeframe: string;
  geologicalEra: string;
  historicalSummary: string;
  definingArtefact: string;
  humanReality: string;
  preservationObjective: string;
}

export interface HeritageLivingArchiveNode {
  person: PersonEvidence;
  home: HomeEvidence;
  story: StoryEvidence;
  building: BuildingEvidence;
  town: TownDistrictEvidence;
  time: TimeEpochEvidence;
}

export interface HeritageDimension {
  id: 'DISCOVERABLE' | 'INTERACTIVE' | 'IMMERSIVE' | 'PARTICIPATORY' | 'ECONOMICALLY_USEFUL';
  title: string;
  subtitle: string;
  corePrinciple: string;
  digitalMechanism: string;
  physicalHeritageImpact: string;
  color: string;
  iconName: string;
  stats: { label: string; value: string }[];
}

export interface CommunityArchiveSubmission {
  id: string;
  contributorName: string;
  contributorRelationship: string;
  submissionType: 'PHOTOGRAPH' | 'AUDIO_ORAL' | 'WRITTEN_MEMOIR' | 'PHYSICAL_ARTEFACT';
  title: string;
  yearOfOrigin: string;
  storyDescription: string;
  verificationStatus: 'COMMUNITY_CONSENSUS_VERIFIED' | 'UNDER_REVIEW' | 'ARCHIVED';
  preservationAction: string;
}
