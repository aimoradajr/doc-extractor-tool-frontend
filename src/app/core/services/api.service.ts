import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UploadResponse, ExtractedData } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Extract data from a PDF file
   * @param file - The PDF file to process
   * @returns Observable with extraction response including structured data
   */
  extractFromPdf(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('pdf', file);

    console.log('Extracting from PDF using:', `${this.baseUrl}/extract`);

    return this.http.post<UploadResponse>(`${this.baseUrl}/extract`, formData);
  }

  /**
   * Test backend connection
   * @returns Observable with backend status
   */
  testConnection(): Observable<any> {
    console.log('Testing connection to:', this.baseUrl);
    return this.http.get(`${this.baseUrl.replace('/api', '')}`);
  }
}
