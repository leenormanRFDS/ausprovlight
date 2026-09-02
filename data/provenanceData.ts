/**
 * AUSTRALIAN PROVENANCE PROJECT — MASTER RELATIONAL DATA
 * Curated by Sofia Vale (Narrative IA) & Noah Bennett (Data Architect)
 */

export interface PillarData {
  id: 'community' | 'opal' | 'town' | 'tourism' | 'heritage';
  code: string;
  name: string;
  shortDefinition: string;
  fullNarrative: string;
  keyPrinciple: string;
  inputsFrom: Array<{ pillar: string; relationship: string }>;
  outputsTo: Array<{ pillar: string; relationship: string }>;
  liveMetrics: Array<{ label: string; value: string }>;
  actionLabel: string;
  actionRoute?: string;
  badgeLevel: 'CONSENSUS' | 'LEVEL_3' | 'LIDAR_TWIN' | 'LEVEL_1' | 'KOKATHA_PROTOCOL';
}

export const PILLARS_SYSTEM: Record<string, PillarData> = {
  community: {
    id: 'community',
    code: 'PIL-01',
    name: 'COMMUNITY',
    shortDefinition: 'Community-consensus grading and democratic value standards',
    fullNarrative:
      'APP creates infrastructure through which the community defines and communicates its own value. Rather than having pricing imposed by external middlemen, local miners and elders deliberate in sheds and halls to establish the Andamooka Matrix Standard (M1–M9).',
    keyPrinciple: 'APP does not dictate value. The community defines, evidences, and preserves its own worth.',
    inputsFrom: [
      { pillar: 'HERITAGE', relationship: 'Oral histories & generational mining knowledge inform grading consensus.' },
      { pillar: 'TOURISM', relationship: 'Visitor revenue flows directly into community-managed civic trusts.' },
    ],
    outputsTo: [
      { pillar: 'OPAL', relationship: 'Establishes verified classification rules for miners at point of extraction.' },
      { pillar: 'TOWN', relationship: 'Prioritizes civic infrastructure and public space regeneration.' },
    ],
    liveMetrics: [
      { label: 'CONSENSUS PANELS', value: '4 LOCAL MINER BOARDS' },
      { label: 'GRADING MATRIX', value: 'M-01 TO M-09 STANDARD' },
      { label: 'SOVEREIGN PROTOCOL', value: 'KOKATHA CULTURAL CONSENT' },
    ],
    actionLabel: 'EXPLORE CONSENSUS STANDARD',
    badgeLevel: 'CONSENSUS',
  },
  opal: {
    id: 'opal',
    code: 'PIL-02',
    name: 'OPAL',
    shortDefinition: 'Miner-side scientific fingerprinting & 3D digital twins',
    fullNarrative:
      'Using portable XRF spectroscopy and micro-photogrammetry directly at the shaft mouth, each stone receives an immutable digital fingerprint. Physical specimens are permanently bound to their exact stratigraphic horizon, mining claim, and miner.',
    keyPrinciple: 'Every stone carries an unforgeable geological origin story before leaving the miner’s hands.',
    inputsFrom: [
      { pillar: 'COMMUNITY', relationship: 'Standardized grading parameters ensure objective evaluation.' },
      { pillar: 'TOWN', relationship: 'Geospatial field coordinate mapping anchors the mine claim in 3D space.' },
    ],
    outputsTo: [
      { pillar: 'TOURISM', relationship: 'Enables global collectors to inspect 3D twins and acquire authenticated RWAs.' },
      { pillar: 'HERITAGE', relationship: 'Records geological deep-time data into the public scientific archive.' },
    ],
    liveMetrics: [
      { label: 'INITIAL SPECIMEN', value: 'AOSA-AND-LUN-001' },
      { label: 'SPECTRAL CONFIDENCE', value: '99.98% XRF ACCURACY' },
      { label: 'STRATIGRAPHY', value: 'BULLDOG SHALE (110 Ma)' },
    ],
    actionLabel: 'INSPECT 3D SPECIMEN TWIN',
    actionRoute: '/opal',
    badgeLevel: 'LEVEL_3',
  },
  town: {
    id: 'town',
    code: 'PIL-03',
    name: 'TOWN',
    shortDefinition: '6-layer LiDAR spatial digital twin and settlement record',
    fullNarrative:
      'Andamooka is mapped using high-density aerial and ground LiDAR. This is not merely a visual map; it is a multi-dimensional spatial information system encompassing subterranean dugout dwellings, historical shafts, utility networks, and terrain elevation.',
    keyPrinciple: 'A living spatial model bridging century-old underground history with future civic planning.',
    inputsFrom: [
      { pillar: 'HERITAGE', relationship: 'Maps historic 1930s dugout structures and pioneer shaft networks.' },
      { pillar: 'COMMUNITY', relationship: 'Local knowledge identifies unrecorded community landmarks and trails.' },
    ],
    outputsTo: [
      { pillar: 'TOURISM', relationship: 'Forms the spatial foundation for immersive XR walking tours.' },
      { pillar: 'OPAL', relationship: 'Provides millimeter-accurate claim boundary coordinates for field loci.' },
    ],
    liveMetrics: [
      { label: 'TERRAIN RESOLUTION', value: '2cm AERIAL LIDAR' },
      { label: 'DEPTH LAYERS', value: 'Z0 SURFACE TO Z5 DEEP' },
      { label: 'MAPPED DUGOUTS', value: '42 HISTORIC STRUCTURES' },
    ],
    actionLabel: 'EXPLORE SPATIAL LAYERS',
    badgeLevel: 'LIDAR_TWIN',
  },
  tourism: {
    id: 'tourism',
    code: 'PIL-04',
    name: 'TOURISM',
    shortDefinition: 'Remote XR exploration, real-world asset acquisition, and local economic loops',
    fullNarrative:
      'A collector or traveler anywhere in the world can virtually walk the dusty tracks of Andamooka, explore underground mines, meet local artisans, inspect 3D digital twins, purchase authenticated physical opals, and support town preservation.',
    keyPrinciple: 'Creating deep relationships with place, not superficial retail transactions.',
    inputsFrom: [
      { pillar: 'TOWN', relationship: 'Spatial digital twin provides the interactive virtual environment.' },
      { pillar: 'OPAL', relationship: 'Authenticated specimens offer real-world acquisition continuity.' },
    ],
    outputsTo: [
      { pillar: 'COMMUNITY', relationship: 'Transactions funnel provenance fees back to civic development funds.' },
      { pillar: 'HERITAGE', relationship: 'Elevates global awareness of pioneering and Indigenous legacies.' },
    ],
    liveMetrics: [
      { label: 'EXPERIENCE MODEL', value: 'ON-COUNTRY & REMOTE XR' },
      { label: 'ECONOMIC REINVEST', value: 'PROVENANCE TO COMMUNITY' },
      { label: 'AUTHENTICATION', value: 'PHYSICAL-TO-DIGITAL CONTINUITY' },
    ],
    actionLabel: 'VIEW VISITOR PROTOCOL',
    badgeLevel: 'LEVEL_1',
  },
  heritage: {
    id: 'heritage',
    code: 'PIL-05',
    name: 'HERITAGE',
    shortDefinition: 'Pioneering histories, subterranean dugout preservation, and cultural memory',
    fullNarrative:
      'Heritage is not passive museum nostalgia. In Andamooka, hand-hewn sandstone dugouts, oral histories of 1930s prospectors, and deep-time Indigenous geological lore are captured in interactive digital archives to sustain community identity and pride.',
    keyPrinciple: 'Making heritage discoverable and economically valuable without reducing it to spectacle.',
    inputsFrom: [
      { pillar: 'COMMUNITY', relationship: 'Living custodians and long-term miners record oral testimonies.' },
      { pillar: 'OPAL', relationship: 'Scientific fossil specimens link biological prehistory to current culture.' },
    ],
    outputsTo: [
      { pillar: 'TOWN', relationship: 'Preserves physical heritage buildings by giving them digital permanence.' },
      { pillar: 'COMMUNITY', relationship: 'Strengthens pioneering pride and protects cultural memory.' },
    ],
    liveMetrics: [
      { label: 'ORAL HISTORIES', value: '28 RECORDED TESTIMONIES' },
      { label: 'PIONEER DUGOUTS', value: 'CIRCA 1930 RESTORATIONS' },
      { label: 'CULTURAL CONTINUITY', value: 'KOKATHA ELDER DIALOGUES' },
    ],
    actionLabel: 'BROWSE HERITAGE ARCHIVES',
    badgeLevel: 'KOKATHA_PROTOCOL',
  },
};

export const TRIAD_ENTITIES = [
  {
    type: 'PEOPLE',
    kicker: 'HUMAN SOVEREIGNTY',
    title: 'Every person has a place and an identity.',
    description:
      'Miners, traditional custodians, historians, stonecutters, and creators. People give materials their purpose, their craft, and their human context. Without the miner who dug the shaft or the community that validated the stone, an asset is simply an anonymous rock.',
    concreteExample: 'Matt Kathagen & local Andamooka miners establishing consensus standards in local sheds.',
    tag: 'CUSTODIANS & MINERS',
  },
  {
    type: 'PLACE',
    kicker: 'GEOLOGICAL & CIVIC GROUND',
    title: 'Every place has a deep geological and cultural story.',
    description:
      'The ancient seabed of the Cretaceous Eromanga Sea, 110 million years of sedimentary deposition, the Kokatha desert landscape, and the subterranean dugout architecture. Place is the non-negotiable anchor of all provenance.',
    concreteExample: 'Lunatic Field, 30°27\'12" S 137°09\'54" E, Bulldog Shale formation at 12m depth.',
    tag: 'ANDAMOOKA, SOUTH AUSTRALIA',
  },
  {
    type: 'ASSET',
    kicker: 'MATERIAL EVIDENCE',
    title: 'Every asset has a continuous, verifiable history.',
    description:
      'Matrix opal, fossil specimens, pioneering dugout dwellings, or hand-hewn tools. Value is not manufactured by artificial hype—it is revealed when the asset’s origin, scientific baseline, and chain of custody are made transparently discoverable.',
    concreteExample: 'Specimen AOSA-AND-LUN-001 with verified XRF chemical and spectral fingerprint.',
    tag: 'AUTHENTICATED MATRIX OPAL',
  },
];

export const FLYWHEEL_STEPS = [
  { step: '01', name: 'PLACE', desc: 'Identify unique geological, historical, and community locus.' },
  { step: '02', name: 'DISCOVER', desc: 'Uncover hidden narratives, scientific baselines, and cultural memory.' },
  { step: '03', name: 'PROVE', desc: 'Capture miner-side XRF fingerprints and spatial LiDAR twins.' },
  { step: '04', name: 'IDENTIFY', desc: 'Bind physical asset to immutable digital record without intermediaries.' },
  { step: '05', name: 'CONNECT', desc: 'Integrate into the five living pillars of community and town.' },
  { step: '06', name: 'EXPERIENCE', desc: 'Enable global discovery through immersive spatial XR and digital twins.' },
  { step: '07', name: 'VALUE', desc: 'Realize genuine economic value based on authentic provenance.' },
  { step: '08', name: 'REINVEST', desc: 'Cycle revenue back to Kokatha Country and local town regeneration.' },
];
