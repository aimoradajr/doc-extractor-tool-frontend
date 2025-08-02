import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ExtractedData } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  /**
   * Mock sample data for testing without consuming API tokens
   */
  private readonly mockExtractedData: ExtractedData = {
    reportSummary: {
      totalGoals: 2,
      totalBMPs: 1,
      completionRate: null,
    },
    goals: [
      {
        id: '080302040403',
        description: 'Identification of Causes and Sources of Impairment',
        objective:
          'Restore and maintain the quality of impaired water bodies through the establishment of pollutant specific allowable loads',
        targetArea: 'Basket Creek-Hickahala Creek Watershed',
        contacts: [],
        desiredOutcomes: [
          'Restoration of water quality',
          'Establishment of pollutant specific allowable loads',
        ],
      },
      {
        description: 'Expected Load Reduction',
        objective:
          'Ensure the maximum load of TBODu specified in the TMDL of 1,317 lbs/day will not be exceeded',
        targetArea: 'Basket Creek-Hickahala Creek Watershed',
        contacts: [],
        desiredOutcomes: [
          '50% reduction in fecal coliform in Hickahala Creek',
          '70% reduction in James Wolf Creek',
        ],
      },
    ],
    bmps: [
      {
        name: 'Fencing',
        type: 'Sediment',
        targetAreas: ['Basket Creek-Hickahala Creek Watershed'],
        partners: [],
        priorityFactors: [
          'Likely water quality benefit',
          'Willing landowners',
          'Implementation of the recommendations of the TMDLs',
          'Ease of showing effectiveness of the BMP(s) through monitoring',
          'Shorter length of time for anticipated results',
        ],
      },
    ],
    implementation: [],
    monitoring: [],
    outreach: [],
    geographicAreas: [
      {
        name: 'Basket Creek-Hickahala Creek Watershed',
        counties: ['Tate County'],
        acreage: 35085,
        landUseTypes: [
          {
            type: 'cropland',
            percent: 11,
          },
          {
            type: 'forest',
            percent: 17,
          },
          {
            type: 'pasture/grass',
            percent: 44,
          },
        ],
        towns: [],
        huc: '080302040403',
        description:
          'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. This watershed contains many landuse types including agricultural land, pastureland, and forest areas.',
      },
    ],
    contacts: [],
    organizations: [
      {
        name: 'Mississippi Soil and Water Conservation Commission',
      },
      {
        name: 'Natural Resources Conservation Service',
      },
      {
        name: 'Soil and Water Conservation Districts',
      },
    ],
  } as ExtractedData;

  private readonly mockExtractedData2: ExtractedData = {
    reportSummary: {
      totalGoals: 1,
      totalBMPs: 9,
      completionRate: null,
    },
    goals: [
      {
        description:
          'Reduce nutrient and sediment loading, achieve standards for Low DO/Organic enrichment ands narrative standards for nutrient loading, and Fish and Wildlife Support designated use',
        objective:
          'Continue existing programs and projects related to farmer education, BMP implementation, and habitat conservation',
        targetArea: 'Entire watershed',
        schedule: '2012-2014',
        contacts: [
          {
            name: 'Mark Gilbert',
            role: null,
            organization: 'MSWCC',
          },
          {
            name: null,
            role: null,
            organization: 'NRCS',
          },
          {
            name: null,
            role: null,
            organization: 'Tippah Co. SWCD',
          },
        ],
        desiredOutcomes: null,
      },
    ],
    bmps: [
      {
        name: 'Grade Stabilization Structures',
        description: null,
        type: null,
        targetAreas: ['Entire Watershed'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        partners: [
          {
            name: 'Local landowners',
          },
        ],
        schedule: '2012-2014',
        priorityFactors: null,
      },
    ],
    implementation: [],
    monitoring: [],
    outreach: [],
    geographicAreas: [
      {
        name: 'Bell Creek-West Prong Muddy Creek Watershed',
        counties: null,
        acreage: null,
        landUseTypes: null,
        population: null,
        towns: null,
        huc: null,
        description:
          'The targeted area for this project is the cropland and pastureland in Tippah County that lie within the watershed boundaries.',
      },
    ],
    contacts: [
      {
        name: 'Mark Gilbert',
        role: null,
        organization: 'MSWCC',
        phone: '601-354-7645',
        email: null,
      },
      {
        name: null,
        role: null,
        organization: 'NRCS',
        phone: '662-837-4464 ext. 3',
        email: null,
      },
      {
        name: null,
        role: null,
        organization: 'Tippah Co. SWCD',
        phone: '662-837-4464 ext. 3',
        email: null,
      },
    ],
    organizations: [
      {
        name: 'MSWCC',
        contact: {
          name: 'Mark Gilbert',
          role: null,
        },
      },
      {
        name: 'NRCS',
        contact: {
          name: null,
          role: null,
        },
      },
      {
        name: 'Tippah Co. SWCD',
        contact: {
          name: null,
          role: null,
        },
      },
    ],
  } as ExtractedData;

  /**
   * Mock PDF extraction that returns sample data
   * @param file - The PDF file (ignored in mock)
   * @returns Observable with mock ExtractedData (matching live API)
   */
  extractFromPdf(file: File): Observable<ExtractedData> {
    console.log('🎭 MOCK: Using mock data for PDF extraction');

    // Simulate processing delay (1-3 seconds)
    const randomDelay = Math.random() * 2000 + 1000;

    return of(this.mockExtractedData).pipe(delay(randomDelay));
  }

  /**
   * Mock connection test
   * @returns Observable with mock connection status
   */
  testConnection(): Observable<any> {
    console.log('🎭 MOCK: Connection test using mock service');

    return of({
      status: 'ok',
      message: 'Mock backend connected successfully',
      timestamp: new Date().toISOString(),
      mode: 'MOCK_MODE',
    }).pipe(delay(500));
  }
}
