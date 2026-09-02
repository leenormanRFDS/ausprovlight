/**
 * AUSTRALIAN PROVENANCE PROJECT — THE FIVE PILLARS RELATIONAL MATRIX
 * Architectural Authority: Dr. Mara Voss, Elliot Zhang, Sofia Vale, Noah Bennett, Ruby Hart
 */

export interface PillarConnection {
  targetPillarId: 'community' | 'opal' | 'town' | 'tourism' | 'heritage';
  targetPillarName: string;
  relationshipType: 'FEEDS' | 'ENABLES' | 'ANCHORS' | 'PRESERVES' | 'FUNDED_BY';
  title: string;
  description: string;
  evidenceProof: string;
}

export interface FivePillarDetail {
  id: 'community' | 'opal' | 'town' | 'tourism' | 'heritage';
  index: string;
  code: string;
  name: string;
  subtitle: string;
  personality: 'Human & Participatory' | 'Scientific, Material & Geological' | 'Spatial & Geographic' | 'Immersive & Expansive' | 'Archival, Historical & Human';
  tagline: string;
  badgeLevel: 'CONSENSUS' | 'LEVEL_3' | 'LIDAR_TWIN' | 'LEVEL_1' | 'KOKATHA_PROTOCOL';
  themeColor: string;
  accentBg: string;
  
  // The 5 Canonical Questions
  whatIsIt: {
    statement: string;
    elaboration: string;
    coreMechanism: string;
  };
  whyDoesItMatter: {
    statement: string;
    elaboration: string;
    impactQuote: string;
  };
  whatWeAreDoingInAndamooka: {
    summary: string;
    initiatives: Array<{ title: string; detail: string; status: 'ACTIVE' | 'DEPLOYED' | 'IN_CONSULTATION' }>;
    locusEvidence: string;
  };
  howItConnects: {
    summary: string;
    primaryBridges: PillarConnection[];
  };
  whatBecomesPossibleBeyond: {
    vision: string;
    applications: Array<{ domain: string; potential: string }>;
  };

  // Specific visual personality data
  uniqueArtifact: {
    type: 'consensus_panel' | 'xrf_spectrogram' | 'lidar_spatial_mesh' | 'xr_collector_journey' | 'archival_field_journal';
    title: string;
    metadata: Record<string, string>;
  };
}

export const FIVE_PILLARS_DATA: Record<string, FivePillarDetail> = {
  community: {
    id: 'community',
    index: '01',
    code: 'PIL-01',
    name: 'COMMUNITY',
    subtitle: 'Consensus Standard & Democratic Governance',
    personality: 'Human & Participatory',
    tagline: 'Value defined from within, not imposed from without.',
    badgeLevel: 'CONSENSUS',
    themeColor: '#C5A059',
    accentBg: 'rgba(197, 160, 89, 0.05)',

    whatIsIt: {
      statement: 'A participatory, consensus-based value and grading standard created and governed directly by local miners, traditional custodians, and town elders.',
      elaboration: 'Rather than accepting volatile grading dictated by external distributors, Andamooka’s mining community uses structured consensus deliberation to formally codify the physical, geological, and cultural criteria of matrix opal.',
      coreMechanism: 'Multi-stakeholder voting panels, open shed grading conventions, and Kokatha cultural consent protocols.',
    },

    whyDoesItMatter: {
      statement: 'When a community loses control over how its material heritage is evaluated, it loses both its economic sovereignty and its cultural narrative.',
      elaboration: 'For decades, opaque intermediaries captured up to 90% of the downstream value created by outback miners. By establishing a verified, transparent consensus standard at the point of origin, the community retains economic pride, stabilizes fair compensation, and sets its own terms for global trade.',
      impactQuote: '“APP does not arrive and dictate value to Andamooka. APP provides the digital and legal scaffolding so Andamooka can define and defend its own value.”',
    },

    whatWeAreDoingInAndamooka: {
      summary: 'Codifying the Andamooka Matrix Standard (M-01 through M-09) and structuring sovereign community reinvestment agreements.',
      initiatives: [
        {
          title: 'The Andamooka Matrix Standard',
          detail: '4 local master miner panels formulated objective matrix grade tiers based on porosity, sugar-acid reaction depth, and natural pinfire density.',
          status: 'DEPLOYED',
        },
        {
          title: 'Kokatha Custodianship Protocol',
          detail: 'Formal engagement protocols ensuring geological extraction acknowledges traditional land custodianship and cultural heritage boundaries.',
          status: 'ACTIVE',
        },
        {
          title: 'Civic Provenance Trust',
          detail: 'A perpetual community endowment model where secondary market provenance fees reinvest directly into local water, power, and heritage maintenance.',
          status: 'IN_CONSULTATION',
        },
      ],
      locusEvidence: 'Miners Hall & Matt Kathagen Workshop, Andamooka Township (30°27\' S, 137°10\' E)',
    },

    howItConnects: {
      summary: 'Community consensus provides the foundational validation rules that make Opal authentic and Town development democratic.',
      primaryBridges: [
        {
          targetPillarId: 'opal',
          targetPillarName: 'OPAL',
          relationshipType: 'FEEDS',
          title: 'Community Defines the Grading Rules for Opal',
          description: 'Miners on the consensus board establish the exact thresholds and categories used by field scientists when registering stones at the shaft mouth.',
          evidenceProof: 'Matrix Standard M-01 to M-09 verified at point of extraction.',
        },
        {
          targetPillarId: 'town',
          targetPillarName: 'TOWN',
          relationshipType: 'ANCHORS',
          title: 'Community Decisions Direct Spatial Development',
          description: 'LiDAR mapping priorities and public infrastructure restorations are prioritized by consensus vote rather than external developers.',
          evidenceProof: 'Town council and miners joint spatial asset priority list #2026-A.',
        },
        {
          targetPillarId: 'heritage',
          targetPillarName: 'HERITAGE',
          relationshipType: 'PRESERVES',
          title: 'Living Custodians Steward Cultural Memory',
          description: 'Generations of oral histories and pioneering stories are recorded and authenticated directly by town residents and Kokatha elders.',
          evidenceProof: 'Oral history archive 28 active testimonies.',
        },
      ],
    },

    whatBecomesPossibleBeyond: {
      vision: 'Any regional or artisan community worldwide can establish sovereign consensus standards for their unique cultural or material output.',
      applications: [
        { domain: 'First Nations Art', potential: 'Traditional custodians authenticate sacred ochres and motifs through clan-level consensus councils.' },
        { domain: 'Artisanal Agriculture', potential: 'Regional coffee and cacao co-operatives set self-determined fair value standards directly to global buyers.' },
        { domain: 'Heritage Craft Guilds', potential: 'Master stone-masons and timber craftspeople preserve apprentice standards on an immutable registry.' },
      ],
    },

    uniqueArtifact: {
      type: 'consensus_panel',
      title: 'COMMUNITY CONSENSUS DELIBERATION PANEL #04',
      metadata: {
        'CONVENED LOCUS': 'ANDAMOOKA SHED 3B',
        'VOTING MINERS': '12 INDEPENDENT MINER VOICES',
        'STATUS': 'M-04 INDUSTRIAL STANDARD RATIFIED',
        'KOKATHA PROTOCOL': 'CONSENT TIER 1 RECORDED',
      },
    },
  },

  opal: {
    id: 'opal',
    index: '02',
    code: 'PIL-02',
    name: 'OPAL',
    subtitle: 'Miner-Side Fingerprinting & 3D Twins',
    personality: 'Scientific, Material & Geological',
    tagline: 'Scientific certainty bound to Cretaceous deep-time.',
    badgeLevel: 'LEVEL_3',
    themeColor: '#5C7D91',
    accentBg: 'rgba(92, 125, 145, 0.06)',

    whatIsIt: {
      statement: 'Miner-side scientific characterization, trace-element XRF spectroscopy, and 3D sub-millimeter digital twinning.',
      elaboration: 'Before an opal leaves the miner’s hands, it is spectroscopically analyzed, micro-photogrammetrically scanned, and cataloged with its exact subterranean stratigraphic horizon and mine claim coordinates.',
      coreMechanism: 'Portable X-ray Fluorescence (pXRF), multi-spectral optical reflectance, and sub-millimeter 3D mesh reconstruction.',
    },

    whyDoesItMatter: {
      statement: 'Without miner-side scientific binding, 70% of opals traded globally lose their geographic origin, allowing synthetic substitutes and origin laundering to erode real value.',
      elaboration: 'Andamooka matrix opal is geologically unique—formed in the 110-million-year-old Bulldog Shale of the Cretaceous Eromanga Sea. Capturing its chemical and spectral DNA at the mine mouth proves irreplaceable natural rarity and ensures the miner is permanently credited.',
      impactQuote: '“Every stone carries an unforgeable geological birth certificate written in trace elements before it ever enters global commerce.”',
    },

    whatWeAreDoingInAndamooka: {
      summary: 'Deploying mobile field laboratory units across Lunatic Field, German Gully, and Teatree Flat to register raw and treated matrix opals.',
      initiatives: [
        {
          title: 'Field XRF Chemical Profiling',
          detail: 'Recording trace ratios of Fe, Zr, Ba, and S that form the unique geochemical fingerprint of the Andamooka field strata.',
          status: 'DEPLOYED',
        },
        {
          title: '3D Photogrammetric Digital Twins',
          detail: 'High-resolution surface mesh capturing play-of-colour diffraction at varying angles for digital inspection in full 3D.',
          status: 'DEPLOYED',
        },
        {
          title: 'Mine-Shaft Level Registration',
          detail: 'Binding physical specimen AOSA-AND-LUN-001 directly to Claim #4192 at 12m depth with miner Matt Kathagen.',
          status: 'ACTIVE',
        },
      ],
      locusEvidence: 'Lunatic Field Shaft #7, Claim 4192, 12.4m Below Surface (30°27\'12" S, 137°09\'54" E)',
    },

    howItConnects: {
      summary: 'Scientific opal data establishes the real-world asset (RWA) value that powers global tourism and expands the town’s spatial archive.',
      primaryBridges: [
        {
          targetPillarId: 'town',
          targetPillarName: 'TOWN',
          relationshipType: 'ANCHORS',
          title: 'Opal Stratigraphy Anchors Town Geology',
          description: 'Subterranean geological data gathered during opal scanning feeds the 3D subterranean layers of the Town spatial digital twin.',
          evidenceProof: '12m shaft depth borehole strata incorporated into Town Layer Z3.',
        },
        {
          targetPillarId: 'tourism',
          targetPillarName: 'TOURISM',
          relationshipType: 'ENABLES',
          title: '3D Twins Enable Remote Global Exploration',
          description: 'Collectors worldwide can inspect the exact microscopic play-of-colour and purchase the physical stone with complete trust.',
          evidenceProof: '3D Specimen twin AOSA-AND-LUN-001 connected to global acquisition portal.',
        },
        {
          targetPillarId: 'community',
          targetPillarName: 'COMMUNITY',
          relationshipType: 'FEEDS',
          title: 'Physical Proof Protects Miner Remuneration',
          description: 'Indisputable origin certificates guarantee miners receive full consensus market value when selling to international buyers.',
          evidenceProof: 'Miners ledger verified certification rate 100%.',
        },
      ],
    },

    whatBecomesPossibleBeyond: {
      vision: 'Any high-value natural mineral, gemstone, or scientific specimen can carry an unalterable origin fingerprint throughout its entire lifecycle.',
      applications: [
        { domain: 'Conflict-Free Gemstones', potential: 'Verifying emerald, ruby, and sapphire origin at artisanal mine shafts worldwide.' },
        { domain: 'Critical Minerals', potential: 'Tracking lithium, cobalt, and rare earth elements from sustainable extraction to battery packs.' },
        { domain: 'Meteorites & Fossils', potential: 'Scientific provenance registration preventing black-market fossil pillaging and counterfeit sales.' },
      ],
    },

    uniqueArtifact: {
      type: 'xrf_spectrogram',
      title: 'pXRF SPECTRAL SIGNATURE // AOSA-AND-LUN-001',
      metadata: {
        'SiO2 MATRIX': '91.4% HYDRATED AMORPHOUS SILICA',
        'Fe CONTENT': '2.14% (IRONSTONE HOST IDENTIFIER)',
        'Zr TRACE': '142 PPM (ANDAMOOKA HORIZON)',
        'SPECTRAL CONFIDENCE': '99.98% GEOGRAPHIC CERTAINTY',
      },
    },
  },

  town: {
    id: 'town',
    index: '03',
    code: 'PIL-03',
    name: 'TOWN',
    subtitle: 'Spatial Digital Twin & 6-Layer Terrain',
    personality: 'Spatial & Geographic',
    tagline: 'A living spatial model bridging century-old dugouts with future planning.',
    badgeLevel: 'LIDAR_TWIN',
    themeColor: '#A39580',
    accentBg: 'rgba(163, 149, 128, 0.06)',

    whatIsIt: {
      statement: 'A comprehensive 6-layer spatial digital twin combining aerial LiDAR, ground scans, subterranean dugout interiors, and mining claims.',
      elaboration: 'Andamooka is mapped not merely as a 2D map, but as a dense spatial information system. From the surface terrain down to underground mining galleries, every structure, track, and historical relic has its precise spatial coordinate.',
      coreMechanism: 'High-density aerial drone LiDAR, terrestrial SLAM scans, and geospatial cadastral layer synthesis (Z0 to Z5).',
    },

    whyDoesItMatter: {
      statement: 'Remote outback settlements exist outside conventional metropolitan GIS systems, leaving their infrastructure invisible to planning, preservation, and global engagement.',
      elaboration: 'By creating a millimeter-accurate digital twin, Andamooka becomes discoverable to the entire world. Subterranean dugouts carved in 1930 are preserved against erosion, infrastructure deficits are evidenced with precision, and future civic investments can be planned collaboratively.',
      impactQuote: '“The digital twin is not a passive tourist visual—it is a spatial operating system for the town’s past, present, and future.”',
    },

    whatWeAreDoingInAndamooka: {
      summary: 'Conducting aerial drone surveys and interior SLAM scans of historic dugouts, operational mining fields, and civic assets.',
      initiatives: [
        {
          title: 'Aerial LiDAR Terrain Survey',
          detail: 'Mapping 140 square kilometers of Andamooka township, shaft tailings, and access tracks at 2cm resolution.',
          status: 'DEPLOYED',
        },
        {
          title: 'Subterranean Dugout Interior Scanning',
          detail: '42 historical dugout homes and workshops preserved as millimeter-accurate 3D point-cloud environments.',
          status: 'ACTIVE',
        },
        {
          title: 'Underground Mine Gallery Mapping',
          detail: 'Z-depth mapping connecting surface claims to active 10-18m subterranean opal drives and sandstone chambers.',
          status: 'IN_CONSULTATION',
        },
      ],
      locusEvidence: 'Andamooka Township Core to German Gully (Surface Z0: 76m AHD to Bedrock Z5: 58m AHD)',
    },

    howItConnects: {
      summary: 'The spatial digital twin provides the geographic ground that hosts Tourism exploration and anchors Heritage structures.',
      primaryBridges: [
        {
          targetPillarId: 'tourism',
          targetPillarName: 'TOURISM',
          relationshipType: 'ENABLES',
          title: 'Spatial Twin Enables Virtual XR Tourism',
          description: 'Remote visitors navigate exact 3D models of Andamooka streets, entering dugouts and shafts as if standing on country.',
          evidenceProof: 'Virtual spatial walking tour #01 German Gully trial deployed.',
        },
        {
          targetPillarId: 'heritage',
          targetPillarName: 'HERITAGE',
          relationshipType: 'PRESERVES',
          title: '3D Scans Protect Vulnerable Dugout Architecture',
          description: 'Sandstone structures prone to weather erosion are digitally locked into architectural history with sub-millimeter fidelity.',
          evidenceProof: 'Historic 1933 Pioneer Cottage #03 structural point-cloud recorded.',
        },
        {
          targetPillarId: 'opal',
          targetPillarName: 'OPAL',
          relationshipType: 'FEEDS',
          title: 'Claim Boundaries Provide Exact Mining Loci',
          description: 'Every extracted gem is tied to its spatial coordinate on the 3D grid, preventing claim disputes and verifying origin.',
          evidenceProof: 'Claim 4192 centroid coordinates linked to Specimen 001.',
        },
      ],
    },

    whatBecomesPossibleBeyond: {
      vision: 'Any remote, historic, or vulnerable community can create an immutable spatial twin to attract investment and protect vernacular architecture.',
      applications: [
        { domain: 'Desert & Vernacular Architecture', potential: 'Documenting cave dwellings in Cappadocia or subterranean towns in Coober Pedy & White Cliffs.' },
        { domain: 'Remote Island Communities', potential: 'Monitoring coastal erosion, sea level changes, and cultural sacred sites with millimeter LiDAR.' },
        { domain: 'Post-Industrial Mining Towns', potential: 'Transforming legacy shafts and industrial landscapes into economic educational twins.' },
      ],
    },

    uniqueArtifact: {
      type: 'lidar_spatial_mesh',
      title: 'SPATIAL DIGITAL TWIN // LAYER Z0–Z5 ELEVATION MESH',
      metadata: {
        'SURFACE RESOLUTION': '2.1 CM AERIAL LIDAR',
        'ELEVATION RANGE': '76.4m TO 58.1m AHD',
        'POINT CLOUD DENSITY': '450 POINTS / M²',
        'COORDINATE REF': 'GDA2020 / MGA ZONE 53',
      },
    },
  },

  tourism: {
    id: 'tourism',
    index: '04',
    code: 'PIL-04',
    name: 'TOURISM',
    subtitle: 'Immersive XR Exploration & Local Economic Reinvestment',
    personality: 'Immersive & Expansive',
    tagline: 'Connecting global collectors to place while cycling value back to the community.',
    badgeLevel: 'LEVEL_1',
    themeColor: '#8FA382',
    accentBg: 'rgba(143, 163, 130, 0.06)',

    whatIsIt: {
      statement: 'Next-generation remote XR exploration, digital-to-physical real world asset (RWA) acquisition, and regenerative tourism infrastructure.',
      elaboration: 'A traveler or collector in Munich, Tokyo, or Sydney can walk the red-dirt tracks of Andamooka, step into underground mines, meet the artisan, inspect the 3D twin of an opal, and purchase the authenticated physical stone shipped with full chain of custody.',
      coreMechanism: 'WebXR spatial streaming, physical-to-digital escrow, and automated civic royalty distribution smart contracts.',
    },

    whyDoesItMatter: {
      statement: 'Isolated frontier towns cannot survive solely on seasonal drive-through tourism; they need perpetual, high-value global connections.',
      elaboration: 'Standard tourism turns towns into passive postcards. APP tourism creates reciprocal relationships: international enthusiasts invest directly in the town’s preservation, while acquiring authenticated pieces of Australian geological history with undeniable provenance.',
      impactQuote: '“Tourism should not merely consume a place. It should enrich the miners, artists, and custodians who keep the place alive.”',
    },

    whatWeAreDoingInAndamooka: {
      summary: 'Building immersive digital trails that allow global visitors to discover local miners and buy directly from source.',
      initiatives: [
        {
          title: 'Global-to-Local XR Experience Portal',
          detail: 'Interactive walkthroughs allowing remote users to experience temperature, soundscapes, and dugout interiors.',
          status: 'DEPLOYED',
        },
        {
          title: 'Physical RWA Provenance Delivery',
          detail: 'Inspected stones shipped globally with encrypted physical QR certificates and miner-signed field logs.',
          status: 'ACTIVE',
        },
        {
          title: 'Local Creator Marketplace',
          detail: 'Direct-to-consumer sales for Andamooka lapidaries, sculptors, and historical books without distributor markups.',
          status: 'IN_CONSULTATION',
        },
      ],
      locusEvidence: 'Andamooka Outback Gateway & Global Digital Portal (Accessible Worldwide)',
    },

    howItConnects: {
      summary: 'Tourism generates the international capital and engagement that funds Community development and celebrates Heritage.',
      primaryBridges: [
        {
          targetPillarId: 'community',
          targetPillarName: 'COMMUNITY',
          relationshipType: 'FUNDED_BY',
          title: 'Tourism Revenue Flows into Civic Trusts',
          description: 'A percentage of every remote RWA purchase and digital tour ticket is automatically routed to town water and health initiatives.',
          evidenceProof: 'Community Trust allocation model 7.5% per verified transaction.',
        },
        {
          targetPillarId: 'heritage',
          targetPillarName: 'HERITAGE',
          relationshipType: 'ENABLES',
          title: 'Global Visitors Discover Forgotten Pioneers',
          description: 'Interactive storytelling elevates pioneering histories and Kokatha culture to an appreciative international audience.',
          evidenceProof: 'Over 14,000 international digital engagements recorded.',
        },
        {
          targetPillarId: 'opal',
          targetPillarName: 'OPAL',
          relationshipType: 'FEEDS',
          title: 'Demand for Authenticated Provenance',
          description: 'Informed global buyers actively demand miner-side XRF certificates, rewarding ethical and transparent miners.',
          evidenceProof: '100% of portal buyers requested full spectral verification ledger.',
        },
      ],
    },

    whatBecomesPossibleBeyond: {
      vision: 'Any remote heritage landscape can transform into a sustainable, global-facing digital economy without overcrowding delicate ecosystems.',
      applications: [
        { domain: 'Remote National Parks', potential: 'Virtual eco-tourism funding ranger conservation programs in fragile wilderness areas.' },
        { domain: 'Ancient Archaeological Sites', potential: 'Allowing global scholars to explore fragile tombs or ruins without physical foot-traffic damage.' },
        { domain: 'Artisan Villages', potential: 'Japanese pottery towns or Peruvian weavers selling directly to global collectors via interactive twins.' },
      ],
    },

    uniqueArtifact: {
      type: 'xr_collector_journey',
      title: 'COLLECTOR JOURNEY SIMULATOR // MUNICH TO ANDAMOOKA',
      metadata: {
        'DISCOVERY POINT': 'REMOTE XR SPATIAL ENGINE',
        'SPECIMEN INSPECTED': 'AOSA-AND-LUN-001 (3D TWIN)',
        'SETTLEMENT MODEL': 'PHYSICAL RWA DELIVERY + LOCAL ROYALTY',
        'COMMUNITY IMPACT': 'DIRECT CIVIC REINVESTMENT ALLOCATED',
      },
    },
  },

  heritage: {
    id: 'heritage',
    index: '05',
    code: 'PIL-05',
    name: 'HERITAGE',
    subtitle: 'Pioneer Dugouts, Oral Histories & Cultural Memory',
    personality: 'Archival, Historical & Human',
    tagline: 'Preserving the pioneering spirit and ancient Kokatha deep-time memory.',
    badgeLevel: 'KOKATHA_PROTOCOL',
    themeColor: '#C47D68',
    accentBg: 'rgba(196, 125, 104, 0.06)',

    whatIsIt: {
      statement: 'A living historical archive preserving 1930s pioneering dugout architecture, miner oral testimonies, and deep-time Indigenous cultural memory.',
      elaboration: 'Heritage is not passive museum nostalgia; it is the living memory of human survival and endurance in one of earth’s harshest environments. APP captures hand-written diaries, audio oral histories, and architectural blueprints before they are lost to time.',
      coreMechanism: 'High-fidelity audio oral history capture, architectural cross-section blueprinting, and Kokatha cultural narrative archiving.',
    },

    whyDoesItMatter: {
      statement: 'When oral histories and pioneering structures vanish, a town loses its soul and becomes vulnerable to abandonment.',
      elaboration: 'Andamooka’s dugouts and early miner stories represent a singular chapter of Australian resilience. Documenting the hand-hewn tools, the 1930s discovery during a dust storm, and the ancient Kokatha land tracks ensures future generations understand their roots.',
      impactQuote: '“Heritage is the anchor that prevents a community from drifting into anonymity. It turns geography into home.”',
    },

    whatWeAreDoingInAndamooka: {
      summary: 'Digitally archiving the Pioneer Dugout Complex, recording miner memoirs, and establishing cultural continuity with Kokatha elders.',
      initiatives: [
        {
          title: 'The 1930 Pioneer Dugout Archive',
          detail: 'Detailed interior scans, historical photographs, and provenance records of the first four dugouts constructed in German Gully.',
          status: 'DEPLOYED',
        },
        {
          title: 'Voices of the Outback Audio Project',
          detail: '28 high-definition oral histories with miners who worked the shafts between 1945 and 1980.',
          status: 'ACTIVE',
        },
        {
          title: 'Kokatha Cultural Memory Collaboration',
          detail: 'Documenting the deep-time geological understanding of ochre and opal in the traditional desert landscape.',
          status: 'IN_CONSULTATION',
        },
      ],
      locusEvidence: 'Historic Pioneer Cottages, German Gully Reserve (Registered State Heritage Locus #14802)',
    },

    howItConnects: {
      summary: 'Heritage provides the cultural depth that gives Community its identity and enriches Town digital architecture.',
      primaryBridges: [
        {
          targetPillarId: 'community',
          targetPillarName: 'COMMUNITY',
          relationshipType: 'ANCHORS',
          title: 'Generational Knowledge Informs Consensus',
          description: 'Old miners’ understandings of sandstone formations and matrix veins directly guide current grading panels.',
          evidenceProof: 'Historical classification records integrated into Consensus Module M.',
        },
        {
          targetPillarId: 'town',
          targetPillarName: 'TOWN',
          relationshipType: 'PRESERVES',
          title: 'Heritage Buildings Form the Core of the Spatial Twin',
          description: 'Historical dugouts are precisely cataloged on the town map, securing grant funding for structural restorations.',
          evidenceProof: 'State Heritage site 14802 mapped into LiDAR Layer Z0–Z2.',
        },
        {
          targetPillarId: 'tourism',
          targetPillarName: 'TOURISM',
          relationshipType: 'FEEDS',
          title: 'Authentic Human Stories Power XR Narratives',
          description: 'Recorded oral histories and pioneer memoirs become the narrated audio tracks for international XR visitors.',
          evidenceProof: 'Audio soundscape #04 (1938 Pioneer Testimony) licensed for XR guide.',
        },
      ],
    },

    whatBecomesPossibleBeyond: {
      vision: 'Any historic, rural, or indigenous community can preserve vulnerable oral histories and vernacular structures before physical loss.',
      applications: [
        { domain: 'Disappearing Languages & Songlines', potential: 'Preserving endangered oral dialects bound to exact geographic coordinates.' },
        { domain: 'Pioneer & Pastoral Homesteads', potential: 'Creating digital memorials of hand-crafted outback stations and timber mills.' },
        { domain: 'Maritime & Lighthouse Heritage', potential: 'Archiving remote coastal settlements and nautical trade routes with audio memoirs.' },
      ],
    },

    uniqueArtifact: {
      type: 'archival_field_journal',
      title: 'ARCHIVAL FIELD DISPATCH // GERMAN GULLY 1933',
      metadata: {
        'ORIGINAL DISPATCH': 'HAND-WRITTEN LOG BY ROY SHEPHERD',
        'DISCOVERY CIRCUMSTANCE': 'POST-DUST STORM FLASHING FLOATERS',
        'DUGOUT SPEC': '3m x 4m HAND-HEWN IN RED SANDSTONE',
        'ARCHIVAL STATUS': 'DIGITIZED WITH HIGH-RES MULTI-SPECTRAL SCAN',
      },
    },
  },
};
