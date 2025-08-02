/**
 * API Response Interfaces for PDF Document Extractor
 * Based on analysis of agricultural/environmental watershed reports
 */

// =============================================================================
// API Response Types
// =============================================================================

/**
 * Response from PDF upload endpoint
 */
export interface UploadResponse {
  success: boolean;
  jobId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date | string;
  message?: string;
}

/**
 * Job processing status response
 */
export interface JobStatusResponse {
  jobId: string;
  status: JobStatus;
  progress: number;
  message?: string;
  estimatedTimeRemaining?: number;
}

/**
 * Main extraction results from PDF processing
 */
export interface ExtractionResults {
  jobId: string;
  fileName: string;
  status: JobStatus;
  processingTime: number;
  accuracy: number;
  extractedAt: Date | string;

  // Core extracted data
  reportSummary: ReportSummary;
  goals: Goal[];
  bmps: BMP[];
  implementationActivities: ImplementationActivity[];
  monitoringMetrics: MonitoringMetric[];
  outreachActivities: OutreachActivity[];
  geographicAreas: GeographicArea[];
  contacts: Contact[];
  organizations: Organization[];

  // Raw extraction data
  rawText?: string;
  metadata: {
    pageCount: number;
    wordCount: number;
    documentType: string;
    extractionMethod: string;
  };
}

/**
 * Processing job status enumeration
 */
export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
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
  completionRate: number;
  reportType?: string;
  watershedName?: string;
  reportingPeriod?: string;
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
  desiredOutcomes?: string[];
  priority?: 'High' | 'Medium' | 'Low';
  status?: 'Not Started' | 'In Progress' | 'Completed';
}

/**
 * Best Management Practice (BMP)
 */
export interface BMP {
  name: string;
  description?: string;
  type?:
    | 'Nutrient'
    | 'Pathogen'
    | 'Sediment'
    | 'Habitat'
    | 'Water Quality'
    | string;
  targetAreas?: string[];
  quantity?: number;
  unit?: string; // e.g. "ft", "ac", "ea"
  estimatedCost?: number;
  actualCost?: number;
  partners?: Organization[];
  schedule?: string;
  priorityFactors?: string[];
  implementationStatus?: 'Planned' | 'In Progress' | 'Completed' | 'Delayed';
  effectiveness?: number; // 0-100 percentage
}

/**
 * Implementation activity or milestone
 */
export interface ImplementationActivity {
  description: string;
  responsibleParties?: Organization[];
  startDate?: string;
  endDate?: string;
  status?: 'Planned' | 'Active' | 'Completed' | 'Cancelled';
  outcome?: string;
  probableCompletionDate?: string;
  budget?: number;
  associatedBMPs?: string[]; // References to BMP names
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
  currentValue?: number | string;
  trend?: 'Improving' | 'Stable' | 'Declining' | 'Unknown';
}

/**
 * Numeric or narrative threshold for a monitored parameter
 */
export interface Threshold {
  parameter: string; // e.g., "Dissolved Oxygen"
  value: string | number;
  units?: string;
  comparisonOperator?: '<' | '>' | '<=' | '>=' | '=';
  thresholdType?: 'Target' | 'Warning' | 'Critical';
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
  actualCost?: number;
  events?: EventDetail[];
  targetAudience?: string;
  participantCount?: number;
  effectiveness?: string;
}

/**
 * Detail for a single outreach event
 */
export interface EventDetail {
  type: string;
  audience?: string;
  materialsProvided?: string[];
  estimatedParticipants?: number;
  actualParticipants?: number;
  cost?: number;
  date?: string;
  location?: string;
  feedback?: string;
}

/**
 * Watershed, subwatershed, or area of interest
 */
export interface GeographicArea {
  name: string;
  counties?: string[];
  acreage?: number;
  landUseTypes?: LandUseType[];
  population?: number;
  towns?: string[];
  huc?: string; // Hydrologic Unit Code
  description?: string;
  waterBodies?: string[];
  majorLandowners?: string[];
}

/**
 * Land use type and percentage
 */
export interface LandUseType {
  type: string; // e.g., "cropland", "forest", "urban"
  percent: number; // e.g., 11
  acres?: number;
}

/**
 * Contact for a person/team member/agency
 */
export interface Contact {
  name: string;
  role?: string;
  organization?: string;
  phone?: string;
  email?: string;
  address?: string;
  isPrimaryContact?: boolean;
}

/**
 * Organization or agency involved
 */
export interface Organization {
  name: string;
  contact?: Contact;
  type?: 'Government' | 'Non-Profit' | 'Private' | 'Academic' | 'Other';
  role?: string; // e.g., "Lead Agency", "Partner", "Contractor"
  fundingContribution?: number;
}
