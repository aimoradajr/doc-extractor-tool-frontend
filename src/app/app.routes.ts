import { Routes } from '@angular/router';
import { PdfExtractorComponent } from './features/upload/pdf-extractor/pdf-extractor.component';

export const routes: Routes = [
  {
    path: '',
    component: PdfExtractorComponent,
    title: 'PDF Document Extractor',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
