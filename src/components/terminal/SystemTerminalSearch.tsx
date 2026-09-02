import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldCheck, MapPin, Sparkles, User, FileText, Database, ArrowRight, X, Compass, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ANDAMOOKA_OPAL_SPECIMEN_001 } from '../../data/andamookaOpalSpecimen';

interface SearchResultItem {
  id: string;
  category: 'ASSET' | 'PLACE' | 'PERSON' | 'STORY' | 'CONSENSUS_RULE' | 'SURVEY_LAYER';
  title: string;
  subtitle: string;
  hash: string;
  coordinates?: string;
  route: string;
  status: string;
  metadata: { [key: string]: string };
}

const REGISTRY_DATABASE: SearchResultItem[] = [
  {
    id: 'AOSA-AND-LUN-001',
    category: 'ASSET',
    title: 'Andamooka Matrix Opal Specimen // Lunatic 01',
    subtitle: 'The Lunatic Shimmer • 42.3ct Matrix Opal with PBR 3D Twin & Micro-XRF Assays',
    hash: '0x8f4d92a1c9e3b4827d0f91a788c2e64b',
    coordinates: '30°27\'12" S | 137°09\'54" E',
    route: '/opal',
    status: 'VERIFIED ON-SITE',
    metadata: {
      'Miner': 'Matt Kathagen & Field Crew',
      'Field': 'Lunatic Field (Central Ridge)',
      'Depth': '14.2m Subterranean',
      'Scan Precision': '20µm Micro-Photogrammetry',
    },
  },
  {
    id: 'PARCEL-LIDAR-AND-042',
    category: 'PLACE',
    title: 'Historic One-Room Dugout No. 04',
    subtitle: '1934 Hand-cut Calcrete Dugout with 4K Photogrammetry & Thermal Envelope Data',
    hash: '0x3c71a990e1f48b11c97a44f2d8b193aa',
    coordinates: '30°27\'04" S | 137°09\'48" E',
    route: '/town',
    status: 'SURVEYED LiDAR',
    metadata: {
      'Construction': '1934 Hand-Dug Sandstone',
      'Point Cloud': '12.4M Points @ 2mm Res',
      'Structural State': 'Intact / Thermally Stable',
    },
  },
  {
    id: 'PERSON-MINER-KATHAGEN',
    category: 'PERSON',
    title: 'Kathagen Family Mining Syndicate',
    subtitle: 'Third-Generation Outback Miners • Lunatic & Teatree Flat Claims',
    hash: '0x99e821fa091b482cdd1189acbe4091fe',
    coordinates: 'Lunatic Ridge Shaft 042',
    route: '/pillars?pillar=community',
    status: 'REGISTERED ORIGIN',
    metadata: {
      'Active Claims': '3 Mineral Tenements',
      'Consensus Role': 'Grading Committee Delegate',
      'Attestation Count': '28 Verified Specimens',
    },
  },
  {
    id: 'ORAL-HIST-ARCHIVE-1930',
    category: 'STORY',
    title: 'The Great 1930 Rainstorm & Surface Flash Discovery',
    subtitle: 'Recorded Audio Testimony of Sam Brooks • Reconstructed in Geospatial Archive',
    hash: '0x55d140e98ab71109cef48102aae90184',
    coordinates: 'Boundary Creek Outcrop',
    route: '/heritage',
    status: 'ARCHIVED AUDIO',
    metadata: {
      'Recorded': '1974 Oral History Tape',
      'Duration': '14m 22s Resampled @ 96kHz',
      'Custodian': 'Andamooka Historical Trust',
    },
  },
  {
    id: 'STD-ANDAMOOKA-MATRIX-V2',
    category: 'CONSENSUS_RULE',
    title: 'Community Consensus Matrix Opal Grading Standard v2.4',
    subtitle: 'Civic-ratified 5-Tier Valuation Matrix (Porosity, Hue, Dispersion, Matrix Hardness)',
    hash: '0x718a99fc01e2376bbda89210eefa9092',
    coordinates: 'Andamooka Community Hall',
    route: '/pillars?pillar=community',
    status: 'COMMUNITY RATIFIED',
    metadata: {
      'Signatories': '64 Local Miners & Cutters',
      'Ratified Date': '2024-03-12',
      'Civic Consensus': '94.2% Agreement',
    },
  },
  {
    id: 'XR-TOURISM-GERMANY-FLOW',
    category: 'SURVEY_LAYER',
    title: 'Cross-Border Real-World Asset Acquisition Pipeline',
    subtitle: 'Digital Twin Remote Inspection to Physical Custodial Shipment Workflow',
    hash: '0x12bb409aa8fe10283c7490fecc89012a',
    coordinates: 'Andamooka → Frankfurt Hub',
    route: '/tourism',
    status: 'ACTIVE DEMONSTRATOR',
    metadata: {
      'Provenance Anchor': 'Dual Physical + 3D Token',
      'Civic Royalty': '8.5% Direct to Town Trust',
      'Logistics': 'Insured Secure Courier',
    },
  },
];

interface SystemTerminalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemTerminalSearch: React.FC<SystemTerminalSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResults = REGISTRY_DATABASE.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesText =
      item.id.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.hash.toLowerCase().includes(q) ||
      (item.coordinates && item.coordinates.toLowerCase().includes(q)) ||
      Object.entries(item.metadata).some(([k, v]) =>
        k.toLowerCase().includes(q) || v.toLowerCase().includes(q)
      );
    return matchesCategory && matchesText;
  });

  const handleSelectResult = (route: string) => {
    onClose();
    navigate(route);
  };

  const categories = [
    { id: 'ALL', label: 'ALL RECORDS' },
    { id: 'ASSET', label: 'SPECIMENS' },
    { id: 'PLACE', label: 'SPATIAL / LiDAR' },
    { id: 'PERSON', label: 'PEOPLE & MINERS' },
    { id: 'STORY', label: 'ORAL HISTORIES' },
    { id: 'CONSENSUS_RULE', label: 'CIVIC STANDARDS' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#050505]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl bg-[#0C0B09] border border-hairline-gold shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col max-h-[82vh] overflow-hidden crosshair-corner"
        >
          {/* Terminal Title Bar */}
          <div className="p-4 bg-[#14120D] border-b border-[rgba(197,160,89,0.2)] flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-mono-tech tracking-[0.25em] text-[#C5A059] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>AUSTRALIAN PROVENANCE REGISTRY // QUERY TERMINAL</span>
            </div>
            <div className="flex items-center gap-4 text-[9px] font-mono-tech text-[#8E8A82]">
              <span className="hidden sm:inline">PILOT 01: ANDAMOOKA PROTOCOL</span>
              <button
                onClick={onClose}
                className="p-1 hover:text-[#F5F3ED] text-[#8E8A82] transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[rgba(242,240,235,0.08)] bg-[#0A0907] flex items-center gap-4">
            <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specimen hash, miner attestation, LiDAR parcel ID, oral history, or coordinate..."
              autoFocus
              className="w-full bg-transparent font-mono-tech text-sm sm:text-base text-[#F5F3ED] placeholder-[#5E5A52] focus:outline-none tracking-wider"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-mono-tech text-[#8E8A82] hover:text-[#F5F3ED] uppercase tracking-widest px-2 py-1 bg-[#1A1812] border border-[#333]"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#080706] border-b border-[rgba(242,240,235,0.06)] flex items-center gap-2 overflow-x-auto text-[9px] font-mono-tech tracking-[0.18em]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 uppercase whitespace-nowrap transition-all border ${
                  selectedCategory === c.id
                    ? 'border-[#C5A059] bg-[#1C180F] text-[#F5F3ED] font-bold'
                    : 'border-transparent text-[#777] hover:text-[#DDD] hover:border-[#333]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Query Results List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-[rgba(242,240,235,0.04)]">
            {filteredResults.length === 0 ? (
              <div className="py-16 text-center text-[#777] font-mono-tech text-xs tracking-widest">
                <Database className="w-8 h-8 text-[#555] mx-auto mb-3 opacity-50" />
                <span>NO PROVENANCE RECORDS MATCH CURRENT SPECIFICATION</span>
              </div>
            ) : (
              filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item.route)}
                  className="pt-3 first:pt-0 p-3 sm:p-4 rounded border border-[rgba(242,240,235,0.04)] hover:border-[#C5A059] bg-[#0A0907] hover:bg-[#14120C] cursor-pointer transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-[9px] font-mono-tech">
                      <span className="px-1.5 py-0.5 bg-[#1C180F] text-[#C5A059] border border-[rgba(197,160,89,0.3)] font-bold">
                        {item.category}
                      </span>
                      <span className="text-[#888] font-bold tracking-wider">{item.id}</span>
                      {item.coordinates && (
                        <span className="text-[#666] hidden md:inline">
                          • {item.coordinates}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-mono-tech px-2 py-0.5 border border-[#8FA382]/40 text-[#8FA382] uppercase self-start sm:self-auto">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-display font-light text-base sm:text-lg text-[#F5F3ED] tracking-[0.1em] group-hover:text-[#C5A059] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="font-serif-editorial italic text-xs sm:text-sm text-[#A09B90] mb-3">
                    {item.subtitle}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[rgba(242,240,235,0.06)] text-[8px] font-mono-tech text-[#777]">
                    {Object.entries(item.metadata).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[#555] uppercase tracking-wider">{key}:</span>
                        <span className="text-[#BBB] font-mono truncate">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[8px] font-mono-tech text-[#555] group-hover:text-[#C5A059] transition-colors pt-2">
                    <span className="truncate max-w-[280px]">HASH: {item.hash}</span>
                    <span className="flex items-center gap-1">
                      <span>INSPECT PROVENANCE DOSSIER</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Terminal Footer */}
          <div className="p-3 bg-[#080705] border-t border-[rgba(197,160,89,0.15)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[8px] font-mono-tech text-[#6E6A62]">
            <div className="flex items-center gap-3">
              <span>KEYS: [↑/↓ Navigate] [↵ Select] [ESC Close]</span>
              <span className="opacity-40">|</span>
              <span className="text-[#C5A059]">6 VERIFIED DEMONSTRATOR RECORDS INDEXED</span>
            </div>
            <div>
              <span>AUSTRALIAN PROVENANCE PROJECT // PROTOCOL REGISTRY</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
