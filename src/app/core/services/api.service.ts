import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExtractedData } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Extract data from a PDF file
   * @param file - The PDF file to process
   * @returns Observable with extracted data
   */
  extractFromPdf(file: File): Observable<ExtractedData> {
    const formData = new FormData();
    formData.append('pdf', file);

    const extractMode = 'extract2'; // Default extract mode (extract1, extract2, extract3)

    return this.http.post<ExtractedData>(
      `${this.baseUrl}/${extractMode}`,
      formData
    );
  }

  /**
   * Test backend connection
   * @returns Observable with backend status
   */
  testConnection(): Observable<any> {
    console.log('🌐 REAL API: Testing connection to:', this.baseUrl);
    return this.http.get(`${this.baseUrl.replace('/api', '')}`);
  }
}
