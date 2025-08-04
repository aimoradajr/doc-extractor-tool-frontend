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
/**
 * Represents a goal within the context of watershed plans.
 *
 * A goal defines a broad, desired outcome or objective that the watershed plan aims to achieve,
 * such as improving water quality, restoring habitat, or reducing pollutant loads. Goals are
 * typically aspirational and provide direction for the planning process.
 *
 * In contrast to Best Management Practices (BMPs) and implementation actions, which are specific,
 * actionable steps or techniques used to achieve the goals, a goal is a high-level statement of
 * intent. BMPs and implementation measures are developed and selected to fulfill these goals.
 *
 * @property description - A textual description of the goal.
 * @property schedule - (Optional) The timeline or schedule associated with achieving the goal.
 * @property sourceExcerpt - (Optional) The exact text from the source document where this goal was identified.
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
 * Represents a Best Management Practice (BMP) within the context of watershed management plans.
 *
 * A BMP is a specific technique, action, or structural solution implemented to address particular
 * environmental concerns in a watershed, such as reducing nutrient runoff, controlling sediment,
 * improving habitat, or managing hydrology. BMPs are practical, actionable measures—examples include
 * cover crops, buffer strips, detention ponds, livestock exclusion fencing, or rain gardens.
 *
 * In contrast to a "Goal," which is a broad, aspirational outcome (e.g., "improve water quality"),
 * a BMP is a concrete method or intervention used to achieve those goals. BMPs are often selected,
 * designed, and implemented as part of the plan to fulfill the stated goals.
 *
 * BMPs also differ from "Implementation Activities," which are the specific steps, milestones,
 * or actions taken to put BMPs (and other plan elements) into practice. Implementation activities
 * may include planning, permitting, construction, outreach, or monitoring tasks associated with
 * deploying BMPs.
 *
 * Examples of BMPs:
 * - Cover crops (to reduce nutrient runoff)
 * - Buffer strips (to filter sediment and nutrients)
 * - Detention ponds (to manage stormwater and reduce flooding)
 * - Livestock exclusion fencing (to prevent streambank erosion)
 * - Rain gardens (to improve infiltration and water quality)
 * - Terraces (to control soil erosion)
 * - Manure management systems (to reduce pathogen runoff)
 * - Riparian habitat restoration (to improve habitat quality)
 *
 * @property name - The name of the BMP.
 * @property description - (Optional) A description of the BMP.
 * @property type - (Optional) The category/type of BMP (e.g., "Nutrient", "Sediment", etc.).
 * @property quantity - (Optional) The amount or number of BMPs.
 * @property unit - (Optional) The unit for the quantity (e.g., "ft", "ac", "ea").
 * @property estimatedCost - (Optional) Estimated cost for the BMP.
 * @property targetAreas - (Optional) Areas where the BMP is applied.
 * @property schedule - (Optional) Timeline or schedule for the BMP.
 * @property sourceExcerpt - (Optional) Exact text from the source document where this BMP was identified.
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
 * Represents an implementation activity or milestone within the context of watershed management plans.
 *
 * An implementation activity is a specific action, task, or milestone that is carried out to put the watershed plan into practice.
 * These activities are the concrete steps taken to achieve the plan's goals and to deploy Best Management Practices (BMPs).
 * Examples include project planning, permitting, construction, public outreach, monitoring, or reporting.
 *
 * Note: Sometimes implementation activities are labeled as "milestones" in watershed plans.
 *
 * Implementation activities differ from "Goals" and "BMPs" as follows:
 * - A "Goal" is a broad, aspirational outcome or objective (e.g., "improve water quality") that the plan aims to achieve.
 * - A "BMP" (Best Management Practice) is a specific technique or intervention (e.g., buffer strips, rain gardens) used to address environmental concerns and fulfill the goals.
 * - An "Implementation Activity" is the actionable step or milestone (e.g., "install buffer strips in subwatershed A by 2025") that puts BMPs and other plan elements into effect.
 *
 * @property description - A textual description of the implementation activity.
 * @property responsibleParties - (Optional) Organizations or individuals responsible for the activity.
 * @property status - (Optional) The current status of the activity (e.g., "planned", "in progress", "completed").
 * @property sourceExcerpt - (Optional) The exact text from the source document where this activity was identified.
 */
export interface ImplementationActivity {
  description: string;
  responsibleParties?: Organization[];
  status?: string;

  // -- non-mvp
  // startDate?: string;
  // endDate?: string;
  // outcome?: string;
  // probableCompletionDate?: string;

  // meta
  sourceExcerpt?: string; // Exact text from document where this implementation was found
}

/**
 * Monitoring metric, threshold, or method (for watershed plans)
 */
/**
 * Represents a monitoring metric, threshold, or method within the context of watershed plans.
 *
 * Monitoring metrics are used to track progress toward plan goals and to evaluate the effectiveness of implemented BMPs and activities.
 * These metrics may include chemical, biological, or physical parameters (e.g., "Total Suspended Solids", "M-BISQ"), the type of monitoring,
 * the method used, frequency, thresholds, and sampling locations.
 *
 * @property parameter - What you’re measuring (e.g. "Total Suspended Solids", "M-BISQ").
 * @property type - (Optional) The type of monitoring (e.g. "chemical", "biological", "physical", etc.).
 * @property method - (Optional) The method used for measurement (e.g. "MDEQ macroinvert protocol", "Standard 2540D turbidimeter").
 * @property frequency - (Optional) How often or when monitoring occurs (e.g. "monthly", "at start/end of project", "2x in 5 yrs").
 * @property thresholds - (Optional) Numeric or categorical thresholds you’re comparing against.
 * @property locations - (Optional) Where samples are taken (station IDs, coordinates, etc.).
 */
export interface MonitoringMetric {
  parameter: string;
  type?: string;
  method?: string;
  frequency?: string;
  thresholds?: Threshold[];
  locations?: string[];
}

/**
 * A simple threshold or criterion for a monitored parameter.
 *
 * For MVP we collapse operator, value, and units into a single free-form description.
 */
export interface Threshold {
  /** e.g. "Dissolved Oxygen" */
  parameter: string;

  /** e.g. ">= 5 mg/L (daily avg), >= 4 mg/L (instantaneous)" or "pH 6.0–9.0" */
  description: string;
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
