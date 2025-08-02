import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import {
  UploadResponse,
  ExtractedData,
} from '../../../core/interfaces/api.interfaces';

@Component({
  selector: 'app-pdf-extractor',
  imports: [CommonModule],
  templateUrl: './pdf-extractor.component.html',
  styleUrl: './pdf-extractor.component.scss',
})
export class PdfExtractorComponent {
  private readonly apiService = inject(ApiService);

  // Component state with proper typing
  selectedFile = signal<File | null>(null);
  isProcessing = signal(false);
  extractionResponse = signal<UploadResponse | null>(null);
  extractedData = signal<ExtractedData | null>(null);
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
      this.extractionResponse.set(null);
      this.extractedData.set(null);
    }
  }

  /**
   * Extract data from the selected PDF file
   */
  extractFromPdf() {
    const file = this.selectedFile();
    if (!file) return;

    this.isProcessing.set(true);
    this.errorMessage.set(null);
    this.extractionResponse.set(null);
    this.extractedData.set(null);

    this.apiService.extractFromPdf(file).subscribe({
      next: (response: UploadResponse) => {
        console.log('PDF extraction successful:', response);
        this.extractionResponse.set(response);

        // Set the structured extracted data
        if (response.extracted) {
          this.extractedData.set(response.extracted);
          console.log('Structured data extracted:', response.extracted);
        }

        this.isProcessing.set(false);
      },
      error: (error: any) => {
        console.error('PDF extraction failed:', error);
        this.errorMessage.set(
          `Extraction failed: ${
            error.error?.error || error.message || 'Please try again.'
          }`
        );
        this.isProcessing.set(false);
      },
    });
  }

  /**
   * Test backend connection
   */
  testConnection() {
    this.apiService.testConnection().subscribe({
      next: (response: any) => {
        console.log('Backend connected:', response);
        this.errorMessage.set(null);
      },
      error: (error: any) => {
        console.error('Connection failed:', error);
        this.errorMessage.set(
          `Backend connection failed: ${
            error.message || 'Check if backend is running on port 5000'
          }`
        );
      },
    });
  }

  /**
   * Reset the component to initial state
   */
  reset() {
    this.selectedFile.set(null);
    this.isProcessing.set(false);
    this.extractionResponse.set(null);
    this.extractedData.set(null);
    this.errorMessage.set(null);
  }
}
