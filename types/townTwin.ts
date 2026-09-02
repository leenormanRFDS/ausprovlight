/**
 * AUSTRALIAN PROVENANCE PROJECT
 * Town Spatial Digital Twin & Spatial Information System (SIS) Types
 * Curated by Noah Bennett (Systems Architect) & Elliot Zhang (Creative Technologist)
 */

export type SpatialScaleId = 
  | 'AUSTRALIA'
  | 'SOUTH_AUSTRALIA'
  | 'ANDAMOOKA_REGION'
  | 'TOWN_SETTLEMENT'
  | 'STREET_ARTERY'
  | 'BUILDING_DUGOUT'
  | 'MINE_FIELD'
  | 'ASSET_SPECIMEN'
  | 'STORY_PROVENANCE';

export interface SpatialScaleDefinition {
  id: SpatialScaleId;
  stepNumber: string;
  name: string;
  subtitle: string;
  scaleRatio: string;
  altitudeDisplay: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  coordinates: {
    lat: number;
    lon: number;
    elevationAHD: number;
    crs: string;
  };
  summary: string;
  spatialSignificance: string;
  keyMetrics: Array<{ label: string; value: string; hint?: string }>;
  associatedEntityIds: string[];
}

export type SpatialLayerCategory = 
  | 'TERRAIN'
  | 'STREETS'
  | 'BUILDINGS'
  | 'MINE_AREAS'
  | 'HERITAGE'
  | 'STORIES'
  | 'INFRASTRUCTURE'
  | 'TOURISM'
  | 'FUTURE_OPPORTUNITIES';

export interface SpatialLayerConfig {
  id: SpatialLayerCategory;
  name: string;
  code: string;
  color: string;
  accentColor: string;
  iconName: string;
  description: string;
  defaultVisible: boolean;
  opacity: number;
  entityCount: number;
  dataSourceFormat: 'LAS_LIDAR_POINT_CLOUD' | 'GEOJSON_VECTOR' | 'GLTF_3D_MESH' | 'DEM_ELEVATION_RASTER' | 'SPATIAL_POSTGIS';
  resolutionTolerance: string;
  lastSurveyDate: string;
}

export interface SubterraneanHorizon {
  depthStartM: number;
  depthEndM: number;
  code: string;
  name: string;
  lithology: string;
  color: string;
  hydraulicConductivity: string;
  thermalConstantC: string;
  opalProductivity: 'NONE' | 'RARE_FLOAT' | 'PRIMARY_SEAM_ZONE' | 'BASEMENT';
  description: string;
}

export interface SpatialEntity {
  id: string;
  layer: SpatialLayerCategory;
  scale: SpatialScaleId;
  name: string;
  vernacularName?: string;
  category: string;
  description: string;
  
  // Spatial Coordinates
  coordinates: {
    latitude: number;
    longitude: number;
    elevationAHD: number; // Australian Height Datum in meters
    depthMeters?: number; // Subterranean depth (negative or positive underground)
    gridReference: string; // MGA Zone 53
  };

  // 3D Visual Coordinates (local WebGL space: x, y, z)
  spatialPosition: [number, number, number];
  geometryType: 'POINT_OF_INTEREST' | 'POLYLINE_TRACK' | '3D_DUGOUT_VOLUME' | '3D_VERTICAL_SHAFT' | 'MINE_CONCESSION_POLYGON' | 'SURFACE_STRUCTURE';

  // Architectural / Field Metadata
  attributes: Record<string, string | number | boolean>;
  
  // Provenance / Historical Context
  history?: {
    establishedDate?: string;
    pioneerCustodians?: string[];
    traditionalSignificance?: string;
    oralHistoryAudioUrl?: string;
    transcriptExcerpt?: string;
  };

  // Live SIS Telemetry
  telemetry?: {
    temperatureC?: number;
    humidityPct?: number;
    structuralIntegrityPct?: number;
    radiationBqKg?: number;
    lastInspected?: string;
  };

  // Associated Links
  associatedSpecimenCatalogId?: string;
  futureOpportunityPotential?: string;
  provenanceEvidenceHash?: string;
}

export interface TownTwinDataset {
  systemMetadata: {
    version: string;
    crs: string; // Coordinate Reference System (e.g. EPSG:7853 - GDA2020 / MGA Zone 53)
    surveyOperator: string;
    lidarPrecisionMm: number;
    coverageSquareKm: number;
    immutableGenesisHash: string;
    lastTelemetrySync: string;
  };
  scales: SpatialScaleDefinition[];
  layers: SpatialLayerConfig[];
  subterraneanHorizons: SubterraneanHorizon[];
  entities: SpatialEntity[];
}
