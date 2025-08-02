/**
 * Represents a PDF file upload response
 */
export interface UploadResponse {
  jobId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  status: JobStatus;
}

/**
 * Represents the status of a processing job
 */
export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

/**
 * Represents extraction results from a PDF
 */
export interface ExtractionResults {
  jobId: string;
  fileName: string;
  status: JobStatus;
  extractedData: {
    title?: string;
    summary?: string;
    keyFindings: string[];
    metadata: {
      pageCount: number;
      wordCount: number;
      extractedAt: Date;
    };
    rawText: string;
    sections: DocumentSection[];
  };
  processingTime: number;
  accuracy: number;
}

/**
 * Represents a section within a document
 */
export interface DocumentSection {
  title: string;
  content: string;
  pageNumber: number;
  confidence: number;
}

/**
 * Represents job status information
 */
export interface JobStatusResponse {
  jobId: string;
  status: JobStatus;
  progress: number;
  message?: string;
  estimatedTimeRemaining?: number;
}
