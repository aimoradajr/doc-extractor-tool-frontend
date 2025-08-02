import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Upload a PDF file for processing
   * @param file - The PDF file to upload
   * @returns Observable with upload response
   */
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);

    console.log('Uploading to:', `${this.baseUrl}/upload`);

    return this.http.post(`${this.baseUrl}/upload`, formData);
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
