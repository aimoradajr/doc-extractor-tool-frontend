import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-pdf-extractor',
  imports: [CommonModule],
  templateUrl: './pdf-extractor.component.html',
  styleUrl: './pdf-extractor.component.scss',
})
export class PdfExtractorComponent {
  private readonly apiService = inject(ApiService);

  // Simplified component state
  selectedFile = signal<File | null>(null);
  isUploading = signal(false);
  uploadResponse = signal<any>(null);
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
      this.uploadResponse.set(null);
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
    this.uploadResponse.set(null);

    this.apiService.uploadFile(file).subscribe({
      next: (response: any) => {
        console.log('Upload successful:', response);
        this.uploadResponse.set(response);
        this.isUploading.set(false);
      },
      error: (error: any) => {
        console.error('Upload failed:', error);
        this.errorMessage.set(
          `Upload failed: ${error.message || 'Please try again.'}`
        );
        this.isUploading.set(false);
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
    this.isUploading.set(false);
    this.uploadResponse.set(null);
    this.errorMessage.set(null);
  }
}
