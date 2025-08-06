import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../../../core/services/api.service';
import { MockApiService } from '../../../core/services/mock-api.service';
import { ExtractedData } from '../../../core/interfaces/api.interfaces';
import { ImplementationStatusChartComponent } from '../../../shared/components/implementation-status-chart.component';
import { BmpTypeChartComponent } from '../../../shared/components/bmp-type-chart.component';

@Component({
  selector: 'app-pdf-extractor',
  imports: [
    CommonModule,
    TabViewModule,
    CardModule,
    AccordionModule,
    SplitButtonModule,
    ButtonModule,
    DialogModule,
    ImplementationStatusChartComponent,
    BmpTypeChartComponent,
  ],
  templateUrl: './pdf-extractor.component.html',
  styleUrl: './pdf-extractor.component.scss',
})
export class PdfExtractorComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly mockApiService = inject(MockApiService);

  // 🛠️ DEVELOPMENT DEBUG CONTROLS
  // Set showDebugPanel to false to hide all debug tools in production
  showDebugPanel = signal(false);
  useMockData = signal(false); // Now toggleable from UI

  // Component state with proper typing
  selectedFile = signal<File | null>(null);
  isProcessing = signal(false);
  isTestingConnection = signal(false);
  isDragOver = signal(false);
  extractedData = signal<ExtractedData | null>(null);
  uploadedFileInfo = signal<{
    name: string;
    originalName: string;
    size: number;
  } | null>(null);
  errorMessage = signal<string | null>(null);
  connectionStatus = signal<{
    success: boolean;
    message: string;
    mode?: string;
  } | null>(null);

  // Confirmation modal state
  showConfirmModal = signal(false);
  pendingFile = signal<File | null>(null);

  // Export menu items
  exportMenuItems: MenuItem[] = [
    {
      label: 'JSON',
      icon: 'pi pi-file-export',
      command: () => this.exportData('json'),
    },
    {
      label: 'Excel',
      icon: 'pi pi-file-excel',
      command: () => this.exportData('excel'),
      disabled: true, // Will enable when Excel export is implemented
    },
    {
      label: 'CSV',
      icon: 'pi pi-file',
      command: () => this.exportData('csv'),
      disabled: true, // Will enable when CSV export is implemented
    },
  ];

  /**
   * Get the appropriate service based on mock flag
   */
  private getService() {
    return this.useMockData() ? this.mockApiService : this.apiService;
  }

  /**
   * Initialize component - auto-load mock data if in mock mode
   */
  ngOnInit() {
    if (this.useMockData()) {
      this.loadMockData();
    }
  }

  /**
   * Load mock data automatically to display sample results
   */
  private loadMockData() {
    console.log('🎭 Auto-loading mock data for preview...');

    // Create a dummy file for display purposes
    const dummyFile = new File(['dummy'], 'sample-watershed-report.pdf', {
      type: 'application/pdf',
    });
    this.selectedFile.set(dummyFile);

    // Simply call the existing extractFromPdf function
    // It will automatically use the mock service since useMockData() is true
    this.extractFromPdf();
  }

  /**
   * Toggle between mock and real API
   */
  toggleMockMode() {
    this.useMockData.set(!this.useMockData());
    this.connectionStatus.set(null); // Clear previous connection status

    console.log(
      `🔄 Switched to ${this.useMockData() ? 'MOCK' : 'REAL'} API mode`
    );

    // Auto-load mock data when switching to mock mode
    if (this.useMockData()) {
      this.loadMockData();
    } else {
      // Clear data when switching to real mode
      this.reset();
    }
  }

  /**
   * Trigger file upload dialog when container is clicked
   */
  triggerFileUpload() {
    // Try both file input IDs - regular upload and compact upload
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    const compactFileInput = document.getElementById(
      'file-upload-compact'
    ) as HTMLInputElement;

    // Use the compact input if available (when in results state), otherwise use regular
    const inputToUse = compactFileInput || fileInput;

    if (inputToUse) {
      inputToUse.click();
    }
  }

  /**
   * Show confirmation modal for new file upload when results are already displayed
   */
  showUploadConfirmation(file: File) {
    this.pendingFile.set(file);
    this.showConfirmModal.set(true);
  }

  /**
   * Confirm new file upload - proceed with extraction
   */
  confirmUpload() {
    const file = this.pendingFile();
    if (file) {
      this.selectedFile.set(file);
      this.errorMessage.set(null);
      this.uploadedFileInfo.set(null);
      this.extractedData.set(null);
      this.showConfirmModal.set(false);
      this.pendingFile.set(null);

      // Start extraction
      this.extractFromPdf();
    }
  }

  /**
   * Cancel new file upload
   */
  cancelUpload() {
    this.showConfirmModal.set(false);
    this.pendingFile.set(null);
  }

  /**
   * Handle drag over event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  /**
   * Handle drag leave event
   */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Only hide overlay if leaving the main container
    const currentTarget = event.currentTarget as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget === null || !currentTarget?.contains(relatedTarget)) {
      this.isDragOver.set(false);
    }
  }

  /**
   * Handle drop event
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate PDF file
      if (file.type !== 'application/pdf') {
        this.errorMessage.set('Please select a PDF file.');
        return;
      }

      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        this.errorMessage.set('File size must be less than 100MB.');
        return;
      }

      // If results are already displayed, show confirmation modal
      if (this.extractedData()) {
        this.showUploadConfirmation(file);
        return;
      }

      // Otherwise, proceed directly
      this.selectedFile.set(file);
      this.errorMessage.set(null);
      this.uploadedFileInfo.set(null);
      this.extractedData.set(null);

      // Auto-start extraction immediately
      this.extractFromPdf();
    }
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
        // Clear input value to allow re-selection of the same file
        input.value = '';
        return;
      }

      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        this.errorMessage.set('File size must be less than 100MB.');
        // Clear input value to allow re-selection of the same file
        input.value = '';
        return;
      }

      // If results are already displayed, show confirmation modal
      if (this.extractedData()) {
        this.showUploadConfirmation(file);
        // Clear input value to allow re-selection of the same file
        input.value = '';
        return;
      }

      // Otherwise, proceed directly
      this.selectedFile.set(file);
      this.errorMessage.set(null);
      this.uploadedFileInfo.set(null);
      this.extractedData.set(null);

      // Clear input value to allow re-selection of the same file
      input.value = '';

      // Auto-start extraction immediately
      this.extractFromPdf();
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
    this.uploadedFileInfo.set(null);
    this.extractedData.set(null);

    const service = this.getService();
    service.extractFromPdf(file).subscribe({
      next: (extractedData: ExtractedData) => {
        // console.log('PDF extraction successful:', extractedData);

        // Set the extracted data directly
        this.extractedData.set(extractedData);

        // Track file info for display
        this.uploadedFileInfo.set({
          name: file.name,
          originalName: file.name,
          size: file.size,
        });

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
        // console.log('Backend connected:', response);
        this.connectionStatus.set({
          success: true,
          message: response.message || 'Backend connection successful!',
          mode:
            response.mode || (this.useMockData() ? 'MOCK_MODE' : 'LIVE_MODE'),
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
   * Export extracted data in the specified format
   * Allow raw implementation export later.
   */
  exportData(format: 'json' | 'excel' | 'csv') {
    const data = this.extractedData();
    if (!data) {
      console.warn('No data available for export');
      return;
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');

    switch (format) {
      case 'json':
        this.exportAsJson(data, timestamp);
        break;
      case 'excel':
        console.log('Excel export not yet implemented');
        break;
      case 'csv':
        console.log('CSV export not yet implemented');
        break;
    }
  }

  /**
   * Export data as JSON file
   */
  private exportAsJson(data: ExtractedData, timestamp: string) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `watershed-plan-extraction-${timestamp}.json`;
    link.click();

    window.URL.revokeObjectURL(url);
    // console.log('JSON export completed');
  }

  /**
   * Reset the component to initial state
   *
   * Allows resetting internal elements like input states and all component.
   * Maintains overall reset and default appearance just right.
   */
  reset() {
    this.selectedFile.set(null);
    this.isProcessing.set(false);
    this.isTestingConnection.set(false);
    this.uploadedFileInfo.set(null);
    this.extractedData.set(null);
    this.errorMessage.set(null);
    this.connectionStatus.set(null);
  }

  /**
   * Format processing time from milliseconds to a readable format
   */
  formatProcessingTime(processingTimeMs: number): string {
    if (processingTimeMs < 1000) {
      return `${processingTimeMs} ms`;
    } else if (processingTimeMs < 60000) {
      return `${(processingTimeMs / 1000).toFixed(1)} seconds`;
    } else {
      const minutes = Math.floor(processingTimeMs / 60000);
      const seconds = Math.floor((processingTimeMs % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
  }
}
