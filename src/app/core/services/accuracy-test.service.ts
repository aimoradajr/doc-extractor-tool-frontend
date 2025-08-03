import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AccuracyTestResult,
  PresetOption,
  PresetsResponse,
} from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccuracyTestService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/accuracy`;

  /**
   * Get available test presets
   */
  getPresets(): Observable<PresetOption[]> {
    return this.http
      .get<PresetsResponse>(`${this.baseUrl}/presets`)
      .pipe(map((response) => response.presets));
  }

  /**
   * Run accuracy test with preset
   */
  runTestWithPreset(presetId: string): Observable<AccuracyTestResult> {
    const formData = new FormData();
    formData.append('mode', 'preset');
    formData.append('preset', presetId);

    return this.http.post<AccuracyTestResult>(`${this.baseUrl}/test`, formData);
  }

  /**
   * Run accuracy test with file upload
   */
  runTestWithFile(file: File): Observable<AccuracyTestResult> {
    const formData = new FormData();
    formData.append('mode', 'upload');
    formData.append('pdf', file);

    return this.http.post<AccuracyTestResult>(`${this.baseUrl}/test`, formData);
  }
}
