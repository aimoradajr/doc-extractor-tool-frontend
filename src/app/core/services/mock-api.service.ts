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
    model: 'gpt-4.1',
    reportSummary: {
      summary:
        'This watershed plan addresses water quality impairments in the Basket Creek-Hickahala Creek Watershed in Tate County, Mississippi. It outlines causes of impairment, expected pollutant load reductions, proposed management measures, and technical and financial assistance for implementing best management practices (BMPs) to restore and protect water quality.',
      watershedName: 'Basket Creek-Hickahala Creek Watershed',
      planTitle: 'Basket Creek-Hickahala Creek Watershed Plan',
      planDate: '2018-09-20',
      authors: [],
      organizations: [
        'Mississippi Department of Environmental Quality',
        'Mississippi Soil and Water Conservation Commission',
        'Natural Resources Conservation Service',
        'Tate County Soil and Water Conservation District',
        'USGS',
      ],
      geographicRegion: 'Tate County, Mississippi',
      totalGoals: 3,
      totalBMPs: 6,
      completionRate: 0,
    },
    goals: [
      {
        description:
          'Reduce organic enrichment, low dissolved oxygen, and nutrient loads to meet TMDL standards in Hickahala and Senatobia Creeks.',
        schedule: 'Ongoing, as per TMDL implementation',
        sourceExcerpt:
          'The TMDL for Organic Enrichment, Low DO, and Nutrients for Hickahala and Senatobia Creeks (MS305E), which encompasses Basket Creek-Hickahala Creek Watershed, states that restrictions on NPDES permitting activities will be put in place.',
      },
      {
        description:
          'Achieve a 50% reduction in fecal coliform in Hickahala Creek and a 70% reduction in James Wolf Creek.',
        schedule: 'As specified in the Fecal Coliform TMDL (2003)',
        sourceExcerpt:
          'The Fecal Coliform TMDL for Hickahala Creek is calling for a 50% reduction in the section of Hickahala Creek that is located within the Basket Creek-Hickahala Creek Watershed. The same TMDL also calls for a 70% reduction in James Wolf Creek.',
      },
      {
        id: 'goal3',
        description:
          'Implement BMPs to mitigate sediment and nutrient issues in the watershed, prioritizing newly converted pasture areas.',
        schedule: 'Prioritized during project implementation period',
        sourceExcerpt:
          'Based on their analysis, installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
    ],
    bmps: [
      {
        name: 'Fencing',
        description:
          'Install fencing to limit livestock access to streams, reducing pathogen and sediment inputs.',
        type: 'Pathogen',
        targetAreas: ['pasturelands', 'lands used for grazing'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
      {
        name: 'Watering Facilities',
        description:
          'Provide alternative watering facilities for livestock to reduce direct stream access.',
        type: 'Pathogen',
        targetAreas: ['pasturelands', 'lands used for grazing'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
      {
        name: 'Heavy Use Areas',
        description:
          'Stabilize heavy use areas to reduce soil erosion and sediment delivery to streams.',
        type: 'Sediment',
        targetAreas: ['pasturelands', 'lands used for grazing'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
      {
        name: 'Ponds',
        description:
          'Construct ponds to capture runoff and reduce nutrient and sediment transport.',
        type: 'Nutrient',
        targetAreas: ['pasturelands', 'lands used for grazing'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
      {
        name: 'Streambank and Shoreline Protection',
        description:
          'Implement streambank and shoreline protection measures to reduce erosion and sedimentation.',
        type: 'Sediment',
        targetAreas: ['streams', 'shorelines'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
      {
        name: 'Grade Stabilization Structures',
        description:
          'Install grade stabilization structures to control gully erosion and reduce sediment delivery.',
        type: 'Sediment',
        targetAreas: ['pasturelands', 'lands used for grazing'],
        quantity: null,
        unit: null,
        estimatedCost: null,
        schedule: 'During project implementation period',
        sourceExcerpt:
          'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
      },
    ],
    implementation: [
      {
        description:
          'Implement nutrient BMPs by installing in-field conservation practices targeting TN, TP, and sediment reduction.',
        responsibleParties: [
          {
            name: 'Natural Resources Conservation Service',
          },
          {
            name: 'Mississippi Soil and Water Conservation Commission',
          },
        ],
        status: 'planned',
        sourceExcerpt:
          'In order to achieve the modeled NPS loads in the TMDL, nutrient BMPs will be implemented watershed. This will be done by implementing in-field conservation practices that target both TN, TP and sediment reduction as soils in MS are known to have high phosphorus content.',
      },
      {
        description:
          'Identify and implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
        responsibleParties: [
          {
            name: 'Natural Resources Conservation Service',
          },
          {
            name: 'Mississippi Soil and Water Conservation Commission',
          },
        ],
        status: 'planned',
        sourceExcerpt:
          'the watershed team will work to identify opportunities to implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
      },
      {
        description:
          'Work under a memorandum of agreement (MOA) with MSWCC to implement project activities, including administration, management, and watershed plan revision.',
        responsibleParties: [
          {
            name: 'Mississippi Department of Environmental Quality',
          },
          {
            name: 'Mississippi Soil and Water Conservation Commission',
          },
        ],
        status: 'planned',
        sourceExcerpt:
          'MDEQ plans to work under a memorandum of agreement (MOA) with the MSWCC to implement this project. Project partners provided the funding amounts used to estimate costs for BMP installation.',
      },
    ],
    monitoring: [
      {
        parameter: 'Biological impairment (macroinvertebrate index)',
        type: 'biological',
        method: 'Mississippi Benthic Index of Stream Quality (M-BISQ)',
        frequency: 'As part of biological monitoring program',
        thresholds: [],
        locations: ['wadeable streams outside of the MS Alluvial Plain'],
      },
    ],
    outreach: [
      {
        type: 'Farm Bill Initiative Outreach',
        description:
          'SWCD staff communicate regularly with local landowners and operators to support sign-ups for Farm Bill initiatives.',
        schedule: 'Ongoing during project period',
        indicator:
          'Number of landowners engaged; number of sign-ups for Farm Bill initiatives',
        partners: [
          'Soil and Water Conservation Districts',
          'Natural Resources Conservation Service',
        ],
      },
    ],
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
        population: null,
        towns: [],
        huc: '080302040403',
        description:
          'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. This watershed contains many landuse types including agricultural land, pastureland, and forest areas.',
        sourceExcerpt:
          'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. This watershed contains many landuse types including agricultural land, pastureland, and forest areas; however, the dominant landuses identified in the 2011 National Land Cover Database (NLCD) within the watershed are cropland (11%), forest (17%) and pasture/grass (44%) (Figure 1).',
      },
      {
        name: 'Hickahala Creek Drainage Area (DA) (MS305E)',
        counties: ['Tate County'],
        acreage: null,
        landUseTypes: [],
        population: null,
        towns: [],
        huc: null,
        description:
          'Hickahala Creek Drainage Area (DA) (MS305E) was included on MS’s 1996 and 1998 Section 303(d) List as an “evaluated” impairment.',
        sourceExcerpt:
          'Hickahala Creek Drainage Area (DA) (MS305E) was included on MS’s 1996 and 1998 Section 303(d) List as an “evaluated” impairment versus “monitored” impairment as there were no water quality data to verify impairment status of the stream.',
      },
      {
        name: 'James-Wolf Creek (MS305M1)',
        counties: ['Tate County'],
        acreage: null,
        landUseTypes: [],
        population: null,
        towns: [],
        huc: null,
        description:
          'A segment of James-Wolf Creek (MS305M1) that flows into the watershed and confluences with Hickahala Creek from the southwest.',
        sourceExcerpt:
          'This segment, along with a segment of James-Wolf Creek (MS305M1) that flows into the watershed and confluences with Hickahala Creek from the southwest, was assessed as impaired for recreational use due to high levels of fecal coliform in the water.',
      },
      {
        name: 'Hickahala Creek (MS305M2)',
        counties: ['Tate County'],
        acreage: null,
        landUseTypes: [],
        population: null,
        towns: [],
        huc: null,
        description:
          'A segment of Hickahala Creek (MS305M2) was included on the “monitored” portion of MS’s 1998 Section 303(d) List of Impaired Water Bodies.',
        sourceExcerpt:
          'A segment of Hickahala Creek (MS305M2) was also included on the “monitored” portion of MS’s 1998 Section 303(d) List of Impaired Water Bodies.',
      },
    ],
    contacts: [],
    organizations: [
      {
        name: 'Mississippi Department of Environmental Quality',
        contact: {
          name: '',
          role: '',
        },
      },
      {
        name: 'Mississippi Soil and Water Conservation Commission',
        contact: {
          name: '',
          role: '',
        },
      },
      {
        name: 'Natural Resources Conservation Service',
        contact: {
          name: '',
          role: '',
        },
      },
      {
        name: 'Tate County Soil and Water Conservation District',
        contact: {
          name: '',
          role: '',
        },
      },
      {
        name: 'USGS',
        contact: {
          name: '',
          role: '',
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
