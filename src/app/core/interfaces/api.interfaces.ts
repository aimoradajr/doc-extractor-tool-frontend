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
  totalGoals: number;
  totalBMPs: number;
  completionRate: number | null;
}

/**
 * A watershed management goal or objective
 */
export interface Goal {
  id?: string;
  description: string;
  objective?: string;
  targetArea?: string;
  schedule?: string;
  contacts?: Contact[];
  desiredOutcomes?: string[] | null;
}

/**
 * Best Management Practice (BMP)
 */
export interface BMP {
  name: string;
  description?: string | null;
  type?: 'Nutrient' | 'Pathogen' | 'Sediment' | string | null;
  targetAreas?: string[];
  quantity?: number | null;
  unit?: string | null; // e.g. "ft", "ac", "ea"
  estimatedCost?: number | null;
  partners?: Organization[];
  schedule?: string;
  priorityFactors?: string[] | null;
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
}

// =============================================================================
// Accuracy Testing Types
// =============================================================================

// =============================================================================
// Accuracy Testing Types
// =============================================================================

/**
 * Result from accuracy testing
 */
export interface AccuracyTestResult {
  testCase: string;
  extract_ai_model?: string;
  compare_ai_model?: string;
  compare_mode?: string;
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
    outreach?: AccuracyMetric;
  };
  comparison?: {
    expected: any;
    actual: any;
  };
  detailedComparisons?: {
    goals: ComparisonItem[];
    bmps: ComparisonItem[];
    implementation: ComparisonItem[];
    monitoring: ComparisonItem[];
    outreach?: ComparisonItem[];
  };
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
 * Comparison item for detailed analysis
 */
export interface ComparisonItem {
  type:
    | 'perfect_match'
    | 'surplus_actual'
    | 'missing_expected'
    | 'partial_match';
  category: string;
  expected: string | null;
  actual: string | null;
  message: string;
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
 * API response for presets endpoint
 */
export interface PresetsResponse {
  presets: PresetOption[];
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
