/**
 * AUSTRALIAN PROVENANCE PROJECT
 * Future Tourism & Place Relationship System Types
 * Curated by Dr. Mara Voss (Creative Director), Sofia Vale (Narrative), Noah Bennett (Systems Architect) & Ruby Hart (Product/Community)
 */

export interface TourismJourneyStep {
  id: string;
  stepNumber: number;
  stageCode: 'DIGITAL_DISCOVERY' | 'STORY' | 'PARTICIPATION' | 'OWNERSHIP' | 'PLACE';
  stageTitle: string;
  title: string;
  subtitle: string;
  locationOrigin: {
    name: string;
    coordinates: string;
    timezone: string;
  };
  locationDestination: {
    name: string;
    coordinates: string;
    geologicalLocus: string;
  };
  narrativeOverview: string;
  immersiveDetails: {
    sensoryCue: string;
    spatialPerspective: string;
    keyQuote: string;
    speakerName?: string;
    speakerRole?: string;
  };
  telemetryMetrics: Array<{
    label: string;
    value: string;
    unit?: string;
    status?: 'active' | 'verified' | 'linked' | 'delivered';
  }>;
  interactionType: 
    | 'SPATIAL_TWIN_ENTRY'
    | 'STREET_EXPLORATION'
    | 'PERSON_ENCOUNTER'
    | 'ORAL_HISTORY_AUDIO'
    | 'MINE_DESCENT'
    | 'OPAL_EXTRACTION'
    | 'DIGITAL_TWIN_3D'
    | 'PROVENANCE_LEDGER'
    | 'CIVIC_ACQUISITION'
    | 'PHYSICAL_DISPATCH_DELIVERY';
  actionPrompt: string;
  relationshipBondNote: string;
}

export interface CivicValueSplit {
  category: string;
  stakeholder: string;
  percentage: number;
  amountAUD: number;
  description: string;
  impactMetric: string;
  color: string;
  pillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage';
}

export interface ParticipationInitiative {
  id: string;
  category: 
    | 'LOCAL_ARTISTS'
    | 'HERITAGE_RESTORATION'
    | 'CROWDFUNDING'
    | 'LOCAL_BUSINESSES'
    | 'COMMUNITY_INITIATIVES'
    | 'XR_TOURISM'
    | 'EDUCATIONAL_EXPERIENCES';
  title: string;
  subtitle: string;
  location: string;
  leadPerson: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  description: string;
  placeOutcome: string;
  targetGoalAUD: number;
  currentFundedAUD: number;
  supporterCount: number;
  perks: Array<{
    title: string;
    minContributionAUD: number;
    deliverable: string;
    digitalTwinAttached?: boolean;
  }>;
  status: 'ACTIVE' | 'ACCELERATED' | 'COMPLETED' | 'PERPETUAL';
  tags: string[];
}

export interface PlaceVersusEcommerceComparison {
  dimension: string;
  conventionalEcommerce: string;
  appPlaceRelationship: string;
  whyItMatters: string;
}
