import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import {
  JobStatus,
  UploadResponse,
  ExtractionResults,
  JobStatusResponse,
} from '../../../core/interfaces';

@Component({
  selector: 'app-pdf-extractor',
  imports: [CommonModule],
  templateUrl: './pdf-extractor.component.html',
  styleUrl: './pdf-extractor.component.scss',
})
export class PdfExtractorComponent {
  private readonly apiService = inject(ApiService);

  // Component state using signals (Angular 17+ pattern)
  selectedFile = signal<File | null>(null);
  isUploading = signal(false);
  uploadProgress = signal(0);
  currentJobId = signal<string | null>(null);
  jobStatus = signal<JobStatus>(JobStatus.PENDING);
  extractionResults = signal<ExtractionResults | null>(null);
  errorMessage = signal<string | null>(null);

  /**
   * Handle file selection from input or drag & drop
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate PDF file
      if (file.type !== 'application/pdf') {
        this.errorMessage.set('Please select a PDF file.');
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.errorMessage.set('File size must be less than 10MB.');
        return;
      }

      this.selectedFile.set(file);
      this.errorMessage.set(null);
    }
  }

  /**
   * Upload the selected PDF file
   */
  uploadFile() {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    this.errorMessage.set(null);

    this.apiService.uploadFile(file).subscribe({
      next: (response: UploadResponse) => {
        console.log('Upload successful:', response);
        this.currentJobId.set(response.jobId);
        this.jobStatus.set(response.status);
        this.isUploading.set(false);

        // Start polling for job status
        this.pollJobStatus();
      },
      error: (error: any) => {
        console.error('Upload failed:', error);
        this.errorMessage.set('Upload failed. Please try again.');
        this.isUploading.set(false);
      },
    });
  }

  /**
   * Poll job status until completion
   */
  private pollJobStatus() {
    const jobId = this.currentJobId();
    if (!jobId) return;

    const pollInterval = setInterval(() => {
      this.apiService.getJobStatus(jobId).subscribe({
        next: (status: JobStatusResponse) => {
          this.jobStatus.set(status.status);
          this.uploadProgress.set(status.progress || 0);

          if (status.status === JobStatus.COMPLETED) {
            clearInterval(pollInterval);
            this.loadExtractionResults();
          } else if (status.status === JobStatus.FAILED) {
            clearInterval(pollInterval);
            this.errorMessage.set(status.message || 'Processing failed.');
          }
        },
        error: (error: any) => {
          console.error('Status check failed:', error);
          clearInterval(pollInterval);
          this.errorMessage.set('Failed to check processing status.');
        },
      });
    }, 2000); // Poll every 2 seconds
  }

  /**
   * Load extraction results when job is completed
   */
  private loadExtractionResults() {
    const jobId = this.currentJobId();
    if (!jobId) return;

    this.apiService.getExtractionResults(jobId).subscribe({
      next: (results: ExtractionResults) => {
        console.log('Results loaded:', results);
        this.extractionResults.set(results);
      },
      error: (error: any) => {
        console.error('Failed to load results:', error);
        this.errorMessage.set('Failed to load extraction results.');
      },
    });
  }

  /**
   * Reset the component to initial state
   */
  reset() {
    this.selectedFile.set(null);
    this.isUploading.set(false);
    this.uploadProgress.set(0);
    this.currentJobId.set(null);
    this.jobStatus.set(JobStatus.PENDING);
    this.extractionResults.set(null);
    this.errorMessage.set(null);
  }

  /**
   * Get status display text
   */
  getStatusText(): string {
    switch (this.jobStatus()) {
      case JobStatus.PENDING:
        return 'Waiting to start...';
      case JobStatus.PROCESSING:
        return 'Processing document...';
      case JobStatus.COMPLETED:
        return 'Processing complete!';
      case JobStatus.FAILED:
        return 'Processing failed';
      default:
        return 'Unknown status';
    }
  }
}
