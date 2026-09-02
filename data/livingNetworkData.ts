/**
 * AUSTRALIAN PROVENANCE PROJECT — LIVING SYSTEM TOPOLOGY DATA
 * Curated by Noah Bennett (Systems Architect) & Sofia Vale (Information Architect)
 */

export type SystemNodeId = 'community' | 'opal' | 'town' | 'tourism' | 'heritage' | 'provenance';

export interface SystemNode {
  id: SystemNodeId;
  code: string;
  name: string;
  subtitle: string;
  category: 'HUMAN' | 'MATERIAL' | 'SPATIAL' | 'GLOBAL' | 'ARCHIVAL' | 'CORE_NEXUS';
  color: string;
  accentRgb: string;
  position: { x: number; y: number }; // percentage coordinates for responsive graph [0-100]
  headlineAxiom: string;
  causalRole: string;
  outgoingCount: number;
  incomingCount: number;
  liveStats: Array<{ label: string; value: string }>;
  deepDiveRoute: string;
  evidenceAnchor: string;
}

export interface SystemEdge {
  id: string;
  from: SystemNodeId;
  to: SystemNodeId;
  vectorChannel: 'VALUE_CHAIN' | 'GEOLOGICAL_PHYSICAL' | 'CULTURAL_MEMORY' | 'GOVERNANCE';
  fromLabel: string;
  toLabel: string;
  causalStatement: string; // The explicit Sofia Vale causal statement
  mechanism: string;
  dataPayload: string;
  realWorldEvidence: string;
  stepInSequence?: number; // 1-7 in the master loop
}

export interface SystemLoopStep {
  step: number;
  fromNode: SystemNodeId;
  toNode: SystemNodeId;
  title: string;
  causalAxiom: string;
  narrativeDetail: string;
  systemAction: string;
  evidenceProof: string;
}

export interface SystemSimulationEvent {
  id: string;
  title: string;
  description: string;
  originNode: SystemNodeId;
  targetCascade: SystemNodeId[];
  telemetryLogs: Array<{ node: SystemNodeId; timestamp: string; message: string }>;
  impactMetric: string;
}

export const SYSTEM_NODES: Record<SystemNodeId, SystemNode> = {
  provenance: {
    id: 'provenance',
    code: 'CORE-NEXUS',
    name: 'PROVENANCE',
    subtitle: 'The Central Connection & Verification Engine',
    category: 'CORE_NEXUS',
    color: '#D4AF37',
    accentRgb: '212, 175, 55',
    position: { x: 50, y: 50 },
    headlineAxiom: 'Infrastructure that connects people, places, and assets.',
    causalRole: 'The immutable relational nexus where all five streams converge, verify, and cross-reference.',
    outgoingCount: 5,
    incomingCount: 5,
    liveStats: [
      { label: 'RECORD INTEGRITY', value: '100% UNFORGEABLE' },
      { label: 'CROSS-NODE VERIFICATIONS', value: '4,812 ATTESTATIONS' },
      { label: 'SOVEREIGN LEDGER', value: 'CIVIC PERPETUITY' },
    ],
    deepDiveRoute: '/project',
    evidenceAnchor: 'The Australian Provenance Engine (Andamooka Proof-01)',
  },
  community: {
    id: 'community',
    code: 'PIL-01',
    name: 'COMMUNITY',
    subtitle: 'Democratic Consensus & Value Governance',
    category: 'HUMAN',
    color: '#C5A059',
    accentRgb: '197, 160, 89',
    position: { x: 26, y: 22 },
    headlineAxiom: 'Community creates consensus; consensus creates standards.',
    causalRole: 'Defines the rules of authenticity, ethics, and valuation from within rather than accepting external dictates.',
    outgoingCount: 3,
    incomingCount: 3,
    liveStats: [
      { label: 'ACTIVE PANELS', value: '4 LOCAL MINER BOARDS' },
      { label: 'CONSENSUS STANDARD', value: 'M-01 TO M-09 RATIFIED' },
      { label: 'INDIGENOUS PROTOCOL', value: 'KOKATHA CULTURAL CONSENT' },
    ],
    deepDiveRoute: '/pillars?pillar=community',
    evidenceAnchor: 'Miners Hall & Local Shed Panels, Andamooka Township',
  },
  opal: {
    id: 'opal',
    code: 'PIL-02',
    name: 'OPAL',
    subtitle: 'Miner-Side Fingerprinting & Physical-to-Digital Twin',
    category: 'MATERIAL',
    color: '#5C7D91',
    accentRgb: '92, 125, 145',
    position: { x: 74, y: 22 },
    headlineAxiom: 'Standards create trustworthy, unforgeable asset identity.',
    causalRole: 'Captures miner-side XRF spectroscopic signatures and 3D twins, binding the physical specimen to the miner and deep-time geology.',
    outgoingCount: 3,
    incomingCount: 3,
    liveStats: [
      { label: 'FINGERPRINT CONFIDENCE', value: '99.98% XRF SPECTRAL' },
      { label: 'CALIBRATED SPECIMEN', value: 'AOSA-AND-LUN-001' },
      { label: 'GEOLOGICAL EPOCH', value: '110Ma BULLDOG SHALE' },
    ],
    deepDiveRoute: '/opal',
    evidenceAnchor: 'Lunatic Field Shaft #7, 12.4m Depth, Claim 4192',
  },
  town: {
    id: 'town',
    code: 'PIL-03',
    name: 'TOWN',
    subtitle: '6-Layer Spatial Digital Twin & Lidar Terrain',
    category: 'SPATIAL',
    color: '#A39580',
    accentRgb: '163, 149, 128',
    position: { x: 82, y: 72 },
    headlineAxiom: 'Asset identity strengthens spatial place intelligence.',
    causalRole: 'Translates subterranean shafts, historical dugouts, and cadastral claims into a millimeter-accurate 3D spatial twin.',
    outgoingCount: 3,
    incomingCount: 3,
    liveStats: [
      { label: 'SPATIAL RESOLUTION', value: '2.1cm AERIAL LIDAR' },
      { label: 'DEPTH LAYERS', value: 'Z0 SURFACE TO Z5 BEDROCK' },
      { label: 'REGISTERED DUGOUTS', value: '42 HISTORIC STRUCTURES' },
    ],
    deepDiveRoute: '/town',
    evidenceAnchor: 'Andamooka 140km² Spatial Grid (GDA2020 / MGA Zone 53)',
  },
  tourism: {
    id: 'tourism',
    code: 'PIL-04',
    name: 'TOURISM',
    subtitle: 'Immersive XR Exploration & Direct RWA Acquisition',
    category: 'GLOBAL',
    color: '#8FA382',
    accentRgb: '143, 163, 130',
    position: { x: 50, y: 92 },
    headlineAxiom: 'Place intelligence enables new tourism and global participation.',
    causalRole: 'Allows global collectors and travelers to explore Andamooka in XR, inspect authenticated 3D twins, and purchase physical RWAs directly from miners.',
    outgoingCount: 3,
    incomingCount: 3,
    liveStats: [
      { label: 'GLOBAL ACCESS', value: 'REMOTE WEBXR ENGINE' },
      { label: 'COLLECTOR JOURNEY', value: 'MUNICH ➔ ANDAMOOKA' },
      { label: 'REINVESTMENT RATE', value: '7.5% CIVIC ENDOWMENT' },
    ],
    deepDiveRoute: '/tourism',
    evidenceAnchor: 'Global Remote XR Explorer & Outback Gateway Portal',
  },
  heritage: {
    id: 'heritage',
    code: 'PIL-05',
    name: 'HERITAGE',
    subtitle: 'Subterranean Dugouts, Oral Witness & Deep Memory',
    category: 'ARCHIVAL',
    color: '#C47D68',
    accentRgb: '196, 125, 104',
    position: { x: 18, y: 72 },
    headlineAxiom: 'Heritage feeds human stories back into tourism and community identity.',
    causalRole: 'Archives 1930s pioneering dugout architecture, binaural oral memoirs, and 45,000+ years of Kokatha custodianship as living evidence.',
    outgoingCount: 3,
    incomingCount: 3,
    liveStats: [
      { label: 'ORAL WITNESSES', value: '28 RECORDED MEMOIRS' },
      { label: 'PIONEER DUGOUTS', value: '1930 GERMAN GULLY #03' },
      { label: 'PRESERVATION FUND', value: 'DUGOUT CONSERVATION TRUST' },
    ],
    deepDiveRoute: '/heritage',
    evidenceAnchor: 'Historic Pioneer Cottages, State Heritage Locus #14802',
  },
};

export const SYSTEM_EDGES: SystemEdge[] = [
  // 1. COMMUNITY ➔ OPAL (Consensus creates standards)
  {
    id: 'comm-to-opal',
    from: 'community',
    to: 'opal',
    vectorChannel: 'GOVERNANCE',
    fromLabel: 'COMMUNITY',
    toLabel: 'OPAL',
    causalStatement: 'Community creates consensus; that consensus creates objective grading standards.',
    mechanism: 'Miners and town elders ratify the Andamooka Matrix Standard (M-01 to M-09), establishing the geological benchmarks applied during miner-side spectral registration.',
    dataPayload: 'Standard thresholds: Porosity index, reaction depth, pinfire spectrum tiers.',
    realWorldEvidence: 'Andamooka Matrix Standard Ratification Protocol #2026-M4.',
    stepInSequence: 1,
  },
  // 2. OPAL ➔ TOWN (Asset identity strengthens place intelligence)
  {
    id: 'opal-to-town',
    from: 'opal',
    to: 'town',
    vectorChannel: 'GEOLOGICAL_PHYSICAL',
    fromLabel: 'OPAL',
    toLabel: 'TOWN',
    causalStatement: 'Trustworthy asset identity strengthens 3D spatial place intelligence.',
    mechanism: 'Each registered stone carries precise shaft coordinates and stratigraphic borehole data (Bulldog Shale at 12m), grounding the subterranean layers of the 6-layer town twin.',
    dataPayload: 'Claim 4192 centroid, shaft depth 12.4m, sub-surface geology vector.',
    realWorldEvidence: 'Lunatic Field borehole registration tied to Town Layer Z3.',
    stepInSequence: 2,
  },
  // 3. TOWN ➔ TOURISM (Place intelligence enables new tourism)
  {
    id: 'town-to-tourism',
    from: 'town',
    to: 'tourism',
    vectorChannel: 'GEOLOGICAL_PHYSICAL',
    fromLabel: 'TOWN',
    toLabel: 'TOURISM',
    causalStatement: 'Spatial place intelligence enables interactive, millimeter-accurate virtual tourism.',
    mechanism: 'LiDAR point-cloud meshes and subterranean scans are transformed into interactive WebXR environments, allowing a collector in Munich to walk German Gully.',
    dataPayload: '2.1cm LiDAR surface terrain, 3D dugout interiors, navigational tracks.',
    realWorldEvidence: 'Andamooka XR Spatial Walking Tour #01 German Gully trial.',
    stepInSequence: 3,
  },
  // 4. TOURISM ➔ COMMUNITY (Tourism creates new economic participation)
  {
    id: 'tourism-to-comm',
    from: 'tourism',
    to: 'community',
    vectorChannel: 'VALUE_CHAIN',
    fromLabel: 'TOURISM',
    toLabel: 'COMMUNITY',
    causalStatement: 'Global tourism and RWA purchases create sovereign economic participation that strengthens the community.',
    mechanism: 'A 7.5% perpetual provenance fee from every remote specimen acquisition and digital tour ticket is deposited into the community-managed Civic Provenance Trust.',
    dataPayload: 'Smart contract royalty distribution, direct miner payout ledger.',
    realWorldEvidence: 'Town water filtration and youth apprenticeship fund allocation.',
    stepInSequence: 4,
  },
  // 5. HERITAGE ➔ TOURISM (Heritage feeds stories back into tourism)
  {
    id: 'heritage-to-tourism',
    from: 'heritage',
    to: 'tourism',
    vectorChannel: 'CULTURAL_MEMORY',
    fromLabel: 'HERITAGE',
    toLabel: 'TOURISM',
    causalStatement: 'Heritage feeds authentic human stories and historical evidence directly into the tourism experience.',
    mechanism: 'Binaural recordings of pioneer miners and Kokatha traditional lore become the narrated spatial soundscapes for remote travelers exploring dugouts.',
    dataPayload: 'Oral witness audio clips, archival dispatch scans, 1933 dust storm diary entries.',
    realWorldEvidence: 'Roy Shepherd 1933 discovery dispatch integrated into German Gully XR guide.',
    stepInSequence: 5,
  },
  // 6. HERITAGE ➔ COMMUNITY (Heritage strengthens community identity)
  {
    id: 'heritage-to-comm',
    from: 'heritage',
    to: 'community',
    vectorChannel: 'CULTURAL_MEMORY',
    fromLabel: 'HERITAGE',
    toLabel: 'COMMUNITY',
    causalStatement: 'Archived heritage strengthens community pride, historical memory, and generational continuity.',
    mechanism: 'Younger miners and town residents access validated family oral histories and architectural documentation of dugouts built by their grandparents.',
    dataPayload: '28 miner oral histories, Kokatha cultural consent protocols, genealogical maps.',
    realWorldEvidence: 'Community contribution ledger in the Living Heritage Archive.',
    stepInSequence: 6,
  },
  // 7. COMMUNITY ➔ HERITAGE (Community preserves heritage)
  {
    id: 'comm-to-heritage',
    from: 'community',
    to: 'heritage',
    vectorChannel: 'GOVERNANCE',
    fromLabel: 'COMMUNITY',
    toLabel: 'HERITAGE',
    causalStatement: 'Living community custodians record oral evidence and preserve physical structures.',
    mechanism: 'Local elders and miners actively participate in consensus verification panels to validate historical memoirs and allocate trust funds for dugout restoration.',
    dataPayload: 'Consensus verification votes, oral recording attestation certificates.',
    realWorldEvidence: 'Dugout Conservation Trust stonemasonry funding vote.',
    stepInSequence: 7,
  },
  // 8. TOWN ➔ HERITAGE (Spatial twin protects heritage buildings)
  {
    id: 'town-to-heritage',
    from: 'town',
    to: 'heritage',
    vectorChannel: 'GEOLOGICAL_PHYSICAL',
    fromLabel: 'TOWN',
    toLabel: 'HERITAGE',
    causalStatement: 'Spatial digital twins provide millimeter-accurate structural monitoring for historic dugouts.',
    mechanism: 'High-density LiDAR scans record sandstone degradation and structural risks, triggering preventive stonemasonry interventions before physical collapse occurs.',
    dataPayload: 'Point-cloud displacement metrics, wall crack millimeter tracking.',
    realWorldEvidence: 'State Heritage site 14802 3D structural risk register.',
  },
  // 9. OPAL ➔ TOURISM (Authenticated specimens enable confident global acquisition)
  {
    id: 'opal-to-tourism',
    from: 'opal',
    to: 'tourism',
    vectorChannel: 'VALUE_CHAIN',
    fromLabel: 'OPAL',
    toLabel: 'TOURISM',
    causalStatement: 'Miner-side 3D specimen twins allow international collectors to buy physical stones with absolute trust.',
    mechanism: 'Multi-spectral 3D models allow remote inspection of micro-diffraction patterns, backed by an encrypted physical QR certificate accompanying the real stone.',
    dataPayload: 'Sub-millimeter 3D mesh, pXRF elemental ratios, miner identity signature.',
    realWorldEvidence: 'Specimen AOSA-AND-LUN-001 physical delivery to Munich collector.',
  },
  // 10. TOURISM ➔ OPAL (Ethical demand rewards miner-side transparency)
  {
    id: 'tourism-to-opal',
    from: 'tourism',
    to: 'opal',
    vectorChannel: 'VALUE_CHAIN',
    fromLabel: 'TOURISM',
    toLabel: 'OPAL',
    causalStatement: 'Informed global buyers actively demand certified provenance, rewarding miners who register at the shaft.',
    mechanism: 'Collectors bypass secondary market opacity, paying premium fair-trade prices directly to miners who use the APP field laboratory.',
    dataPayload: 'Direct purchase orders, miner remuneration escrow contracts.',
    realWorldEvidence: '100% miner payout rate for certified Andamooka matrix stones.',
  },
  // 11. COMMUNITY ➔ TOWN (Consensus guides spatial development)
  {
    id: 'comm-to-town',
    from: 'community',
    to: 'town',
    vectorChannel: 'GOVERNANCE',
    fromLabel: 'COMMUNITY',
    toLabel: 'TOWN',
    causalStatement: 'Community decisions direct town spatial priorities and public infrastructure planning.',
    mechanism: 'Local residents use the 3D twin to identify water runoff vulnerabilities, track maintenance needs, and zone heritage areas collaboratively.',
    dataPayload: 'Civic asset priority rankings, drainage diversion project coordinates.',
    realWorldEvidence: 'Andamooka Town Council & Progress Association joint spatial priority register.',
  },
];

export const MASTER_SYSTEM_LOOP: SystemLoopStep[] = [
  {
    step: 1,
    fromNode: 'community',
    toNode: 'opal',
    title: 'COMMUNITY CREATES CONSENSUS',
    causalAxiom: 'Community creates consensus ➔ Consensus creates objective standards.',
    narrativeDetail: 'Miners, traditional Kokatha custodians, and town elders gather in local sheds to codify grading rules for Andamooka matrix opal (M-01 to M-09), establishing sovereignty over value.',
    systemAction: 'Consensus parameters are published to the field registration engine.',
    evidenceProof: 'Matrix Standard M-04 Ratification Protocol, Shed 3B.',
  },
  {
    step: 2,
    fromNode: 'opal',
    toNode: 'town',
    title: 'STANDARDS CREATE TRUSTED ASSET IDENTITY',
    causalAxiom: 'Objective standards create unforgeable physical & digital asset identity.',
    narrativeDetail: 'At the shaft mouth, raw opal is spectroscopically analyzed via pXRF, 3D scanned, and pinned to its exact subterranean depth (Bulldog Shale, 12.4m) and miner claim.',
    systemAction: '3D specimen twin and elemental fingerprint recorded with shaft coordinates.',
    evidenceProof: 'Specimen AOSA-AND-LUN-001 linked to Claim #4192.',
  },
  {
    step: 3,
    fromNode: 'town',
    toNode: 'tourism',
    title: 'ASSET IDENTITY STRENGTHENS PLACE INTELLIGENCE',
    causalAxiom: 'Verified asset coordinates anchor a 6-layer spatial digital twin of the town.',
    narrativeDetail: 'Subterranean geological data, surface LiDAR terrain, historic dugouts, and active claims are unified into a spatial information system representing Andamooka in full 3D.',
    systemAction: 'Spatial twin coordinates render interactive terrain and dugout interiors.',
    evidenceProof: '140km² LiDAR point cloud (Z0 Surface to Z5 Bedrock).',
  },
  {
    step: 4,
    fromNode: 'town',
    toNode: 'tourism',
    title: 'PLACE INTELLIGENCE ENABLES GLOBAL XR TOURISM',
    causalAxiom: 'Spatial intelligence allows travelers worldwide to explore and connect with place.',
    narrativeDetail: 'A visitor in Munich or Tokyo walks through Andamooka’s virtual twin, visits working mine drives, meets local creators, and inspects authenticated 3D specimens.',
    systemAction: 'Remote WebXR session streaming spatial environment and asset previews.',
    evidenceProof: 'Munich-to-Andamooka collector interactive expedition pathway.',
  },
  {
    step: 5,
    fromNode: 'tourism',
    toNode: 'community',
    title: 'TOURISM CREATES ECONOMIC PARTICIPATION',
    causalAxiom: 'Remote asset acquisition cycles capital directly into local community trusts.',
    narrativeDetail: 'When the international collector acquires the physical opal, payment flows directly to the miner, while a 7.5% perpetual provenance fee funds town water and apprentice trusts.',
    systemAction: 'Escrow settlement, physical courier dispatch, and community trust distribution.',
    evidenceProof: 'Civic Provenance Trust deposit receipt #TR-8821.',
  },
  {
    step: 6,
    fromNode: 'heritage',
    toNode: 'tourism',
    title: 'HERITAGE FEEDS AUTHENTIC STORIES BACK INTO THE SYSTEM',
    causalAxiom: 'Preserved pioneer memoirs and Kokatha oral history enrich tourism with human depth.',
    narrativeDetail: 'Recorded oral histories, hand-written 1930s dust storm diaries, and dugout architecture provide the emotional narrative backbone that makes tourism meaningful.',
    systemAction: 'Binaural soundscape streaming synced to spatial GPS nodes.',
    evidenceProof: '1933 Pioneer Field Journal scan and oral audio memoir #04.',
  },
  {
    step: 7,
    fromNode: 'heritage',
    toNode: 'community',
    title: 'THE SYSTEM CLOSES AND REINFORCES',
    causalAxiom: 'Historical preservation and economic sovereignty empower the community to thrive.',
    narrativeDetail: 'With restored civic pride, secure funding, and verified cultural memory, the community holds greater authority to convene new consensus panels, starting the cycle anew.',
    systemAction: 'Continuous self-reinforcing provenance loop active and verified.',
    evidenceProof: 'Self-sustaining regenerative economic flywheel verified.',
  },
];

export const SYSTEM_SIMULATION_EVENTS: SystemSimulationEvent[] = [
  {
    id: 'event-mine-extraction',
    title: 'SIMULATE: Miner-Side Extraction at Lunatic Field',
    description: 'Miner Matt Kathagen extracts a 42-carat matrix opal at Shaft #7. Watch how the signal flows across the entire network in real time.',
    originNode: 'opal',
    targetCascade: ['opal', 'community', 'town', 'tourism', 'provenance'],
    telemetryLogs: [
      { node: 'opal', timestamp: '00.12s', message: 'pXRF elemental signature captured: SiO2 91.4%, Fe 2.14%, Zr 142ppm.' },
      { node: 'community', timestamp: '00.48s', message: 'Grading panel consensus validates grade tier M-04.' },
      { node: 'town', timestamp: '00.85s', message: 'Shaft 3D locus locked at 30°27\'12"S 137°09\'54"E, Depth 12.4m.' },
      { node: 'tourism', timestamp: '01.20s', message: '3D Specimen twin deployed to global XR gallery for remote inspection.' },
      { node: 'provenance', timestamp: '01.55s', message: 'Specimen AOSA-AND-LUN-001 immutable birth certificate registered.' },
    ],
    impactMetric: 'NEW REAL-WORLD ASSET RECORDED WITH UNFORGEABLE ORIGIN',
  },
  {
    id: 'event-munich-collector',
    title: 'SIMULATE: Global Collector Acquisition in Munich',
    description: 'A collector in Germany explores German Gully in XR, inspects the 3D twin of Specimen #001, and purchases the physical stone.',
    originNode: 'tourism',
    targetCascade: ['tourism', 'opal', 'community', 'heritage', 'provenance'],
    telemetryLogs: [
      { node: 'tourism', timestamp: '00.15s', message: 'Virtual walking tour completed; physical-to-digital escrow initiated.' },
      { node: 'opal', timestamp: '00.50s', message: 'Encrypted QR seal prepared for physical specimen courier dispatch.' },
      { node: 'community', timestamp: '00.90s', message: 'Direct miner payout released; 7.5% routed to Civic Endowment Trust.' },
      { node: 'heritage', timestamp: '01.30s', message: 'German Gully oral history audio licensing royalty credited.' },
      { node: 'provenance', timestamp: '01.70s', message: 'Chain of custody updated: Miner (Andamooka) ➔ Collector (Munich).' },
    ],
    impactMetric: 'DIRECT-TO-MINER VALUE TRANSFERRED + LOCAL CIVIC REINVESTMENT',
  },
  {
    id: 'event-dugout-restoration',
    title: 'SIMULATE: Historic 1930 Dugout Structural Conservation',
    description: 'Sub-millimeter LiDAR detects wall fissure risk on Pioneer Dugout #03. Provenance royalties fund stonemason restoration.',
    originNode: 'heritage',
    targetCascade: ['heritage', 'town', 'community', 'tourism', 'provenance'],
    telemetryLogs: [
      { node: 'town', timestamp: '00.20s', message: 'LiDAR displacement sensor alerts: 1.4mm sandstone settling on West wall.' },
      { node: 'heritage', timestamp: '00.60s', message: 'Dugout Conservation Trust releases capital from civic tourism royalties.' },
      { node: 'community', timestamp: '01.00s', message: 'Local stonemason and youth apprentice deployed for lime-mortar repointing.' },
      { node: 'tourism', timestamp: '01.40s', message: 'Virtual tour updated with live restoration telemetry and mason story.' },
      { node: 'provenance', timestamp: '01.80s', message: 'Conservation provenance certificate issued for State Heritage site 14802.' },
    ],
    impactMetric: 'PHYSICAL VERNACULAR HERITAGE PERMANENTLY PRESERVED',
  },
];
