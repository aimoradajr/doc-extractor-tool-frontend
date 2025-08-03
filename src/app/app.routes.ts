import { Routes } from '@angular/router';
import { PdfExtractorComponent } from './features/upload/pdf-extractor/pdf-extractor.component';
import { PdfExtractorTestComponent } from './features/test/pdf-extractor-test.component';

export const routes: Routes = [
  {
    path: '',
    component: PdfExtractorComponent,
    title: 'PDF Document Extractor',
  },
  {
    path: 'test',
    component: PdfExtractorTestComponent,
    title: 'PDF Extractor Test',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
