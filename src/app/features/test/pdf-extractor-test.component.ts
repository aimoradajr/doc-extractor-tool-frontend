import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccuracyTestService } from '../../core/services/accuracy-test.service';
import {
  AccuracyTestResult,
  PresetOption,
} from '../../core/interfaces/api.interfaces';

@Component({
  selector: 'app-pdf-extractor-test',
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf-extractor-test.component.html',
  styleUrl: './pdf-extractor-test.component.scss',
})
export class PdfExtractorTestComponent implements OnInit {
  private accuracyTestService = inject(AccuracyTestService);

  // Component state
  mode = signal<'upload' | 'preset'>('preset');
  selectedFile = signal<File | null>(null);
  selectedPreset = signal<string>('');
  presetOptions = signal<PresetOption[]>([]);
  isLoading = signal(false);
  isLoadingPresets = signal(false);
  testResult = signal<AccuracyTestResult | null>(null);
  errorMessage = signal<string | null>(null);

  // Supported file types
  allowedTypes = ['.pdf'];
  maxFileSize = 10 * 1024 * 1024; // 10MB

  ngOnInit() {
    this.loadPresets();
  }

  /**
   * Switch between upload and preset modes
   */
  switchMode(newMode: 'upload' | 'preset') {
    this.mode.set(newMode);
    this.reset();
  }

  /**
   * Load available presets from the API
   */
  loadPresets() {
    this.isLoadingPresets.set(true);
    this.errorMessage.set(null);

    this.accuracyTestService.getPresets().subscribe({
      next: (presets: PresetOption[]) => {
        this.presetOptions.set(presets);
        this.isLoadingPresets.set(false);
      },
      error: (error: any) => {
        console.error('Failed to load presets:', error);
        this.errorMessage.set('Failed to load preset options');
        this.isLoadingPresets.set(false);

        // Mock data for development (matching API structure)
        this.presetOptions.set([
          {
            id: 'preset1',
            name: 'Bell Creek Muddy Creek Watershed Plan 2012',
            pdfFile: 'Bell_Creek_Muddy_Creek_Watershed_Plan_2012.pdf',
            groundTruthFile: 'Bell_Creek_Muddy_Creek_Watershed_Plan_2012.json',
          },
          {
            id: 'preset2',
            name: 'Basket Creek Hickahala Creek 9 Key Element Plan 2018',
            pdfFile: 'Basket_Creek_Hickahala_Creek_9_Key_Element_Plan_2018.pdf',
            groundTruthFile:
              'Basket_Creek_Hickahala_Creek_9_Key_Element_Plan_2018.json',
          },
          {
            id: 'preset3',
            name: 'Pickwick Reservoir Watershed Plan 2009',
            pdfFile: 'Pickwick_Reservoir_Watershed_Plan_2009.pdf',
            groundTruthFile: 'Pickwick_Reservoir_Watershed_Plan_2009.json',
          },
          {
            id: 'preset4',
            name: 'Broken Pumpkin 9 Key Element Plan 2019',
            pdfFile: 'Broken_Pumpkin_9_Key_Element_Plan_2019.pdf',
            groundTruthFile: 'Broken_Pumpkin_9_Key_Element_Plan_2019.json',
          },
        ]);
      },
    });
  }

  /**
   * Handle file selection for upload mode
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.selectedFile.set(null);
      return;
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!this.allowedTypes.includes(fileExtension)) {
      this.errorMessage.set(
        `Invalid file type. Allowed types: ${this.allowedTypes.join(', ')}`
      );
      this.selectedFile.set(null);
      return;
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      this.errorMessage.set(
        `File too large. Maximum size: ${this.maxFileSize / 1024 / 1024}MB`
      );
      this.selectedFile.set(null);
      return;
    }

    this.selectedFile.set(file);
    this.errorMessage.set(null);
  }

  /**
   * Run the accuracy test
   */
  runTest() {
    const currentMode = this.mode();

    if (currentMode === 'preset' && !this.selectedPreset()) {
      this.errorMessage.set('Please select a preset');
      return;
    }

    if (currentMode === 'upload' && !this.selectedFile()) {
      this.errorMessage.set('Please select a PDF file');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.testResult.set(null);

    // Choose the appropriate API method based on mode
    const testObservable =
      currentMode === 'preset'
        ? this.accuracyTestService.runTestWithPreset(this.selectedPreset())
        : this.accuracyTestService.runTestWithFile(this.selectedFile()!);

    testObservable.subscribe({
      next: (result: AccuracyTestResult) => {
        this.testResult.set(result);
        this.isLoading.set(false);
        console.log('Test completed:', result);
      },
      error: (error: any) => {
        console.error('Test failed:', error);
        this.errorMessage.set('Test failed. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Reset all form state
   */
  reset() {
    this.selectedFile.set(null);
    this.selectedPreset.set('');
    this.testResult.set(null);
    this.errorMessage.set(null);
  }

  /**
   * Get color class for comparison item type
   */
  getComparisonColor(type: string): string {
    switch (type) {
      case 'perfect_match':
        return 'text-green-600';
      case 'unexpected_extra':
        return 'text-yellow-600';
      case 'missing_expected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  /**
   * Get icon for comparison item type
   */
  getComparisonIcon(type: string): string {
    switch (type) {
      case 'perfect_match':
        return '✅';
      case 'unexpected_extra':
        return '❓';
      case 'missing_expected':
        return '❌';
      default:
        return '•';
    }
  }

  /**
   * Format percentage for display
   */
  formatPercentage(value: number): string {
    return (value * 100).toFixed(1) + '%';
  }

  /**
   * Get metric color based on value
   */
  getMetricColor(value: number): string {
    if (value >= 0.8) return 'text-green-600';
    if (value >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  }
}
