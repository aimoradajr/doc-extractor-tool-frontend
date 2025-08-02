import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { MockApiService } from '../../../core/services/mock-api.service';
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
  private readonly mockApiService = inject(MockApiService);

  // 🎭 TOGGLE THIS FLAG TO SWITCH BETWEEN REAL API AND MOCK
  // Set to true for development without consuming tokens
  private readonly useMockData = true;

  // Component state with proper typing
  selectedFile = signal<File | null>(null);
  isProcessing = signal(false);
  isTestingConnection = signal(false);
  extractionResponse = signal<UploadResponse | null>(null);
  extractedData = signal<ExtractedData | null>(null);
  errorMessage = signal<string | null>(null);
  connectionStatus = signal<{
    success: boolean;
    message: string;
    mode?: string;
  } | null>(null);

  /**
   * Get the appropriate service based on mock flag
   */
  private getService() {
    return this.useMockData ? this.mockApiService : this.apiService;
  }

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

    const service = this.getService();
    service.extractFromPdf(file).subscribe({
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
    this.isTestingConnection.set(true);
    this.errorMessage.set(null);
    this.connectionStatus.set(null);

    const service = this.getService();
    service.testConnection().subscribe({
      next: (response: any) => {
        console.log('Backend connected:', response);
        this.connectionStatus.set({
          success: true,
          message: response.message || 'Backend connection successful!',
          mode: response.mode || (this.useMockData ? 'MOCK_MODE' : 'LIVE_MODE'),
        });
        this.isTestingConnection.set(false);
      },
      error: (error: any) => {
        console.error('Connection failed:', error);
        this.connectionStatus.set({
          success: false,
          message:
            error.message || 'Connection failed - check if backend is running',
        });
        this.isTestingConnection.set(false);
      },
    });
  }

  /**
   * Reset the component to initial state
   */
  reset() {
    this.selectedFile.set(null);
    this.isProcessing.set(false);
    this.isTestingConnection.set(false);
    this.extractionResponse.set(null);
    this.extractedData.set(null);
    this.errorMessage.set(null);
    this.connectionStatus.set(null);
  }
}
