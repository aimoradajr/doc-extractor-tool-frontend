/**
 * API Response Interfaces for PDF Document Extractor
 * Matches backend interfaces exactly for type safety
 */

// =============================================================================
// API Response Types (Backend Contract)
// =============================================================================

/**
 * PDF extraction result from backend processing
 */
export interface PdfExtractionResult {
  text: string;
  pages: number;
  textLength: number;
}

/**
 * Error response from backend
 */
export interface ErrorResponse {
  error: string;
}

/**
 * Main extracted data structure from backend
 */
export interface ExtractedData {
  model?: string; // The AI model used for extraction
  goals?: Goal[];
  bmps?: BMP[];
  implementation?: ImplementationActivity[];
  monitoring?: MonitoringMetric[];
  outreach?: OutreachActivity[];
  geographicAreas?: GeographicArea[];
  contacts?: Contact[];
  organizations?: Organization[];
  reportSummary?: ReportSummary;
}

// =============================================================================
// Domain-Specific Interfaces (Agricultural/Environmental Reports)
// =============================================================================

/**
 * Summary of the watershed plan
 */
export interface ReportSummary {
  summary?: string;
  watershedName?: string;
  planTitle?: string;
  planDate?: string | null;
  authors?: string[];
  organizations?: string[];
  geographicRegion?: string;
  totalGoals: number;
  totalBMPs: number;
  completionRate: number | null;
}

/**
 * A watershed management goal or objective
 */
export interface Goal {
  description: string;
  schedule?: string;

  // id?: string;
  // -- none mvp
  // targetArea?: string;
  // contacts?: Contact[];
  // desiredOutcomes?: string[] | null;

  sourceExcerpt?: string; // Exact text from document where this goal was found
}

/**
 * Best Management Practice (BMP)
 */
export interface BMP {
  name: string;
  description?: string | null;
  /**
   * BMP type/category:
   * - "Nutrient": practices targeting nitrogen or phosphorus (e.g. cover crops, buffer strips)
   * - "Sediment": soil-erosion controls (e.g. terraces, filter strips, check dams)
   * - "Pathogen": bacteria reduction (e.g. livestock exclusion fencing, manure management)
   * - "Habitat": improvements for in-stream or riparian habitat (not just water quality)
   * - "Hydrologic": flow attenuation (e.g. detention ponds, rain gardens)
   * - "Structural": engineered structures
   * - "Non-Structural": management practices
   * - string | null: allows any other category or blank if unknown
   */
  type?:
    | 'Nutrient'
    | 'Sediment'
    | 'Pathogen'
    | 'Habitat'
    | 'Hydrologic'
    | 'Structural'
    | 'Non-Structural'
    | string
    | null;

  quantity?: number | null;
  unit?: string | null; // e.g. "ft", "ac", "ea"
  estimatedCost?: number | null;
  targetAreas?: string[];
  schedule?: string;

  // non-mvp
  // partners?: Organization[];
  // priorityFactors?: string[] | null; // these are factors considered to determine specific location for the BMP

  sourceExcerpt?: string; // Exact text from document where this BMP was found
}

/**
 * Implementation activity or milestone
 */
export interface ImplementationActivity {
  description: string;
  responsibleParties?: Organization[];
  startDate?: string;
  endDate?: string;
  status?: string;
  outcome?: string;
  probableCompletionDate?: string;
  sourceExcerpt?: string;
}

/**
 * Monitoring metric, threshold, or method
 */
export interface MonitoringMetric {
  description: string;
  indicator?: string;
  method?: string;
  frequency?: string;
  thresholds?: Threshold[];
  responsibleParties?: Organization[];
  sampleLocations?: string[];
  sampleSchedule?: string;
  sourceExcerpt?: string;
}

/**
 * Numeric or narrative threshold for a monitored parameter
 */
export interface Threshold {
  parameter: string; // e.g., "Dissolved Oxygen"
  value: string | number;
  units?: string;
}

/**
 * Education/outreach event or program
 */
export interface OutreachActivity {
  name: string;
  description?: string;
  partners?: Organization[];
  indicators?: string;
  schedule?: string;
  budget?: number;
  events?: EventDetail[];
  targetAudience?: string;
  sourceExcerpt?: string;
}

/**
 * Detail for a single outreach event
 */
export interface EventDetail {
  type: string;
  audience?: string;
  materialsProvided?: string[];
  estimatedParticipants?: number;
  cost?: number;
  date?: string;
}

/**
 * Watershed, subwatershed, or area of interest
 */
export interface GeographicArea {
  name: string;
  counties?: string[] | null;
  acreage?: number | null;
  landUseTypes?: LandUseType[] | null;
  population?: number | null;
  towns?: string[] | null;
  huc?: string | null;
  description?: string;
  sourceExcerpt?: string;
}

/**
 * Land use type and percent
 */
export interface LandUseType {
  type: string; // e.g., "cropland"
  percent: number; // e.g., 11
}

/**
 * Contact for a person/team member/agency
 */
export interface Contact {
  name?: string | null;
  role?: string | null;
  organization?: string | null;
  phone?: string | null;
  email?: string | null;
}

/**
 * Organization or agency involved
 */
export interface Organization {
  name: string;
  contact?: Contact;
  sourceExcerpt?: string;
}

// =============================================================================
// Accuracy Testing Types
// =============================================================================

/**
 * Result from accuracy testing
 */
export interface AccuracyTestResult {
  testCase: string;
  extract_ai_model?: string; // The AI model used for extraction
  compare_ai_model?: string; // The AI model used for comparison (undefined for default mode)
  compare_mode?: string; // The comparison mode used ("ai" or "default")
  metrics: {
    precision: number;
    recall: number;
    f1Score: number;
  };
  details: {
    goals: AccuracyMetric;
    bmps: AccuracyMetric;
    implementation: AccuracyMetric;
    monitoring: AccuracyMetric;
    outreach: AccuracyMetric;
    geographicAreas: AccuracyMetric;
  };
  // DEBUG DATA - Compare expected vs actual
  comparison?: {
    expected: ExtractedData; // Ground truth data
    actual: ExtractedData; // AI extracted data
  };
  // DETAILED COMPARISONS - Show exactly what matched/didn't match
  detailedComparisons?: {
    goals: ComparisonDetail[];
    bmps: ComparisonDetail[];
    implementation: ComparisonDetail[];
    monitoring: ComparisonDetail[];
    outreach: ComparisonDetail[];
    geographicAreas: ComparisonDetail[];
  };
}

/**
 * Detailed comparison for individual items
 */
export interface ComparisonDetail {
  type:
    | 'perfect_match'
    | 'partial_match'
    | 'missing_expected'
    | 'surplus_actual';
  category:
    | 'goals'
    | 'bmps'
    | 'implementation'
    | 'monitoring'
    | 'outreach'
    | 'geographicAreas';
  expected?: string | null; // What we expected to find
  actual?: string | null; // What we actually found
  similarity?: number; // Similarity score (0-1) for partial matches
  message: string; // Human-readable explanation
}

/**
 * Accuracy metrics for a specific data type
 */
export interface AccuracyMetric {
  precision: number;
  recall: number;
  f1Score: number;
  correctCount: number;
  totalExtracted: number;
  totalExpected: number;
}

/**
 * Test case definition
 */
export interface TestCase {
  id: string;
  name: string;
  pdfPath: string;
  groundTruthPath: string;
  hasGroundTruth: boolean;
}

/**
 * Preset option for testing
 */
export interface PresetOption {
  id: string;
  name: string;
  pdfFile: string;
  groundTruthFile: string;
}

/**
 * API response for /presets endpoint
 */
export interface PresetsResponse {
  presets: PresetOption[];
}
