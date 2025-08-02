import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  UploadResponse,
  ExtractionResults,
  JobStatusResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000/api';

  /**
   * Upload a PDF file for processing
   * @param file - The PDF file to upload
   * @returns Observable with upload response
   */
  uploadFile(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(`${this.baseUrl}/upload`, formData);
  }

  /**
   * Get extraction results by job ID
   * @param jobId - The job ID returned from upload
   * @returns Observable with extraction results
   */
  getExtractionResults(jobId: string): Observable<ExtractionResults> {
    return this.http.get<ExtractionResults>(`${this.baseUrl}/results/${jobId}`);
  }

  /**
   * Get job status
   * @param jobId - The job ID to check
   * @returns Observable with job status
   */
  getJobStatus(jobId: string): Observable<JobStatusResponse> {
    return this.http.get<JobStatusResponse>(`${this.baseUrl}/status/${jobId}`);
  }
}
