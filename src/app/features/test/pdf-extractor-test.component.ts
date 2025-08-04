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
  expandedComparisons = signal<{ [key: string]: boolean }>({});

  // Supported file types
  allowedTypes = ['.pdf'];
  maxFileSize = 10 * 1024 * 1024; // 10MB

  ngOnInit() {
    this.loadPresets();

    // DEBUG: Initialize with test data for debugging (comment out when not needed)
    this.testResult.set({
      testCase: 'preset2-Basket Creek Hickahala Creek 9 Key Element Plan 2018',
      extract_ai_model: 'gpt-4.1',
      compare_ai_model: 'gpt-4.1',
      compare_mode: 'ai',
      metrics: {
        precision: 0.5,
        recall: 0.3,
        f1Score: 0.375,
      },
      details: {
        goals: {
          precision: 0.4,
          recall: 0.2,
          f1Score: 0.2667,
          correctCount: 2,
          totalExtracted: 5,
          totalExpected: 10,
        },
        bmps: {
          precision: 0.7143,
          recall: 0.8333,
          f1Score: 0.7692,
          correctCount: 5,
          totalExtracted: 7,
          totalExpected: 6,
        },
        implementation: {
          precision: 0,
          recall: 0,
          f1Score: 0,
          correctCount: 0,
          totalExtracted: 0,
          totalExpected: 6,
        },
        monitoring: {
          precision: 0,
          recall: 0,
          f1Score: 0,
          correctCount: 0,
          totalExtracted: 0,
          totalExpected: 1,
        },
      },
      comparison: {
        expected: {
          reportSummary: {
            totalGoals: 3,
            totalBMPs: 6,
            completionRate: null,
          },
          goals: [
            {
              description:
                'Implement nutrient BMPs to reduce TN, TP and sediment in the watershed.',
              objective: 'Reduce nutrient and sediment loads.',
              targetArea: 'Basket Creek-Hickahala Creek Watershed',
              sourceExcerpt:
                'Nutrient BMPs will be implemented watershed...target both TN, TP and sediment reduction as soils in MS are known to have high phosphorus content.',
            },
            {
              description:
                'Achieve 50% fecal coliform reduction in Hickahala Creek and 70% in James Wolf Creek.',
              objective: 'Mitigate pathogens and meet TMDL targets.',
              targetArea: 'Hickahala Creek and James Wolf Creek sections',
              sourceExcerpt:
                'The Fecal Coliform TMDL...is calling for a 50% reduction...also calls for a 70% reduction in James Wolf Creek.',
            },
            {
              description:
                'Install BMPs (fencing, ponds, grade stabilization, etc.) prioritizing newly converted pasture areas.',
              objective: 'Mitigate sediment and nutrient issues.',
              targetArea: 'Basket Creek-Hickahala Creek watershed',
              sourceExcerpt:
                'Installation of the following BMPs would mitigate sediment and nutrient issues...BMPs will be prioritized for implementation in the newly converted pasture areas.',
            },
            {
              description:
                'Promote behavior changes and BMPs through education and outreach.',
              objective: 'Improve water quality via community education.',
              targetArea: 'Basket Creek-Hickahala Creek watershed',
              sourceExcerpt:
                "The ultimate goal is to bring about behavior changes and the use of 'best management practices' that will improve water quality.",
            },
            {
              description:
                'Establish Watershed Implementation Team to refine the Watershed Based Plan.',
              objective: 'Team refinement of the plan.',
              schedule: 'Months 1-2',
              sourceExcerpt:
                'Establish Watershed Implementation Team to begin refinement of Watershed Based Plan for Basket Creek-Hickahala Creek watershed.',
            },
            {
              description:
                'Conduct baseline condition monitoring with historical and new data.',
              objective: 'Establish baseline for water quality.',
              schedule: 'Completed using historical data',
              sourceExcerpt:
                'Initiate watershed monitoring Baseline condition monitoring Completed using historical data.',
            },
            {
              description:
                'Meet with landowners to secure commitment to install BMPs.',
              objective: 'Obtain landowner commitment.',
              schedule: 'Months 1-6',
              sourceExcerpt:
                'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas.',
            },
            {
              description:
                'Establish routine meetings for the Team to support plan revision.',
              objective: 'Ongoing plan revision through meetings.',
              schedule: 'Months 1-36',
              sourceExcerpt:
                'Establish routine meeting schedule for WIT to support WBP revision.',
            },
            {
              description:
                'Implement BMPs by schedule per TMDL and project requirements.',
              objective:
                'Install practices for nutrient, sediment, and pathogen problems.',
              schedule: 'Months 6-36',
              sourceExcerpt: 'Implement BMPs BMP installation Months 6-36.',
            },
            {
              description:
                'Coordinate to inspect BMPs installed with Section 319 funds.',
              objective: 'Ensure proper BMP installation.',
              schedule: 'Months 3-36',
              sourceExcerpt:
                'Coordinate with Landowners to inspect BMPs that were installed using Section 319 funds.',
            },
            {
              description:
                'Begin monitoring to collect data on post-BMP water quality.',
              objective: 'Evaluate effectiveness of BMPs.',
              schedule: 'Months 42-48',
              sourceExcerpt:
                'Begin monitoring to collect data on post-BMP water quality Post-BMP Monitoring Months 42-48.',
            },
            {
              description:
                'Finalize education/outreach plan and schedule events.',
              objective: 'Structured education and outreach.',
              schedule: 'Months 8-36',
              sourceExcerpt:
                'Finalize education and outreach plan Education/Outreach events scheduled Months 8-36.',
            },
            {
              description: 'Finalize revised Watershed Based Plan.',
              objective: 'Produce final revised plan.',
              schedule: 'Months 30-36',
              sourceExcerpt:
                'Finalize revised WBP Final Revised WBP Months 30-36.',
            },
          ],
          bmps: [
            {
              name: 'Fencing',
              description:
                'Install fencing on pasturelands and grazing lands to limit livestock access to streams.',
              type: 'Pathogen',
              targetAreas: ['pasturelands', 'lands used for grazing'],
              quantity: 10000,
              unit: 'ft',
              estimatedCost: 23300,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Watering Facilities',
              description:
                'Install watering facilities such as tanks or troughs to provide alternative water sources for livestock, keeping them out of streams.',
              type: 'Pathogen',
              targetAreas: ['pasturelands', 'lands used for grazing'],
              quantity: 3,
              unit: 'ea',
              estimatedCost: 10500,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Heavy Use Area Protection',
              description:
                'Provide protection for heavy use areas to reduce erosion and runoff from locations with high livestock traffic.',
              type: 'Sediment',
              targetAreas: ['heavy use areas', 'pasturelands'],
              quantity: 1240,
              unit: 'ft',
              estimatedCost: 3522,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Ponds',
              description:
                'Construct ponds to manage runoff and provide water for livestock away from streams.',
              type: 'Nutrient',
              targetAreas: ['pasturelands', 'lands used for grazing'],
              quantity: 4,
              unit: 'ea',
              estimatedCost: 36000,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Streambank and Shoreline Protection',
              description:
                'Apply streambank and shoreline protection practices to stabilize banks and prevent erosion.',
              type: 'Sediment',
              targetAreas: ['streams', 'shorelines'],
              quantity: 500,
              unit: 'ft',
              estimatedCost: 80500,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Grade Stabilization Structures',
              description:
                'Install grade stabilization structures to reduce erosion (gully and slope stabilization).',
              type: 'Sediment',
              targetAreas: ['newly converted pasture areas'],
              quantity: 8,
              unit: 'ac',
              estimatedCost: 52878,
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of the recommendations of the TMDLs (this includes implementation of BMPs appropriate for nutrients, sediment, and pathogens)',
                'Ease of showing effectiveness of the BMP(s) through monitoring',
                'Shorter length of time for anticipated results (i.e., within the grant period)',
              ],
              excerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
          ],
          implementation: [
            {
              description:
                'Develop and execute subgrant agreement specifying roles and milestones.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Watershed Implementation Team',
                },
                {
                  name: 'Project Manager',
                },
              ],
              startDate: 'Month 1',
              endDate: null,
              status: 'Planned',
              outcome: null,
              probableCompletionDate: null,
            },
            {
              description:
                'Coordinate meetings, media, and social media promotion for project activities.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Months 1-36',
              endDate: null,
              status: 'Ongoing',
              outcome: null,
              probableCompletionDate: null,
            },
            {
              description:
                'Inform landowners/operators and secure participation for BMP implementation.',
              responsibleParties: [
                {
                  name: 'Tate County SWCD',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'MDEQ',
                },
              ],
              startDate: 'Months 1-6',
              endDate: null,
              status: 'Ongoing',
              outcome: null,
              probableCompletionDate: null,
            },
            {
              description:
                'Determine priority pollutant areas via GIS and site surveys, install BMPs.',
              responsibleParties: [
                {
                  name: 'Tate County SWCD',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'MDEQ',
                },
              ],
              startDate: 'Months 1-36',
              endDate: null,
              status: 'Ongoing',
              outcome: null,
              probableCompletionDate: null,
            },
            {
              description:
                'Monitor baseline and post-BMP water quality conditions.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'USGS',
                },
              ],
              startDate: 'Months 1-36',
              endDate: null,
              status: 'Ongoing',
              outcome: null,
              probableCompletionDate: null,
            },
            {
              description:
                'Conduct inspections and collect GPS/photo documentation of BMP installations.',
              responsibleParties: [
                {
                  name: 'Tate County SWCD',
                },
                {
                  name: 'MACD',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
              ],
              startDate: 'Months 3-36',
              endDate: null,
              status: 'Ongoing',
              outcome: null,
              probableCompletionDate: null,
            },
          ],
          monitoring: [
            {
              description: 'Water quality standards compliance monitoring',
              indicator:
                'Dissolved Oxygen, pH, Temperature, Conductivity, Total Nitrogen, Total Phosphorus, E. coli',
              method: 'Routine chemical and biological sampling; M-BISQ index',
              frequency: 'As scheduled and after BMP installation',
              thresholds: [
                {
                  parameter: 'Dissolved Oxygen',
                  value:
                    'Daily Average of 5.0 mg/L; Instantaneous threshold 4.0 mg/L',
                },
                {
                  parameter: 'Dissolved Oxygen % Sat',
                  value: '≥ 70% - ≤ 125%',
                },
                {
                  parameter: 'pH',
                  value: '6.0-9.0',
                },
                {
                  parameter: 'Temperature',
                  value: 'Not to exceed 90°F',
                },
                {
                  parameter: 'Specific Conductance',
                  value: 'Less than 1000 micromhos/cm',
                },
                {
                  parameter: 'Dissolved Solids',
                  value: 'Monthly avg < 750 mg/L; instantaneous < 1500 mg/L',
                },
                {
                  parameter: 'Total Nitrogen',
                  value: '0.940-1.110 mg/L',
                },
                {
                  parameter: 'Total Phosphorus',
                  value: '0.080-0.120 mg/L',
                },
                {
                  parameter: 'E. coli',
                  value:
                    '30-day geometric mean of 126 per 100 ml; not to exceed 410 per 100 ml more than 10% of the time',
                },
              ],
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'USGS',
                },
              ],
              sampleLocations: [],
              sampleSchedule: null,
            },
          ],
          outreach: [
            {
              name: 'Watershed Education and Outreach',
              description:
                'Conduct workshops, field days, and community events to educate the public on water quality and BMPs.',
              partners: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Tate County Soil and Water Conservation District',
                },
              ],
              indicators: 'Number of events, attendance, survey results',
              schedule: 'Throughout project duration',
              budget: 9000,
              events: [
                {
                  type: 'Water Model Presentations',
                  audience: 'Students, public',
                  materialsProvided: ['Enviroscapes', 'Lesson plans'],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
                {
                  type: 'Teacher Workshops',
                  audience: 'Educators',
                  materialsProvided: ['Educational materials'],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
                {
                  type: 'Adopt A Stream',
                  audience: 'Citizens, teachers, students',
                  materialsProvided: [],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
                {
                  type: 'Watershed Harmony Mobile Classroom',
                  audience: 'K-12, adults',
                  materialsProvided: [],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
                {
                  type: 'Storm Drain Marking',
                  audience: 'Scouts, clubs, citizen groups',
                  materialsProvided: [],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
                {
                  type: 'Train the Trainer',
                  audience: 'Soil and Water districts, Extension Service',
                  materialsProvided: ['Workshop materials'],
                  estimatedParticipants: null,
                  cost: null,
                  date: null,
                },
              ],
              targetAudience: null,
            },
          ],
          geographicAreas: [
            {
              name: 'Basket Creek-Hickahala Creek Watershed',
              counties: ['Tate County'],
              acreage: 35085,
              landUseTypes: [
                {
                  type: 'Cropland',
                  percent: 11,
                },
                {
                  type: 'Forest',
                  percent: 17,
                },
                {
                  type: 'Pasture/Grass',
                  percent: 44,
                },
              ],
              population: null,
              towns: null,
              huc: '080302040403',
              description:
                'Watershed located in Tate County, Mississippi, with diverse land use including cropland, forest, and pasture/grass.',
            },
          ],
          contacts: [],
          organizations: [
            {
              name: 'Natural Resources Conservation Service',
              contact: null,
            },
            {
              name: 'Mississippi Soil and Water Conservation Commission',
              contact: null,
            },
            {
              name: 'Tate County Soil and Water Conservation District',
              contact: null,
            },
            {
              name: 'USGS',
              contact: null,
            },
            {
              name: 'MDEQ',
              contact: null,
            },
          ],
        },
        actual: {
          model: 'gpt-4.1',
          reportSummary: {
            totalGoals: 5,
            totalBMPs: 7,
            completionRate: 0,
          },
          goals: [
            {
              id: 'goal1',
              description:
                'Achieve a 50% reduction in fecal coliform in the section of Hickahala Creek located within the Basket Creek-Hickahala Creek Watershed.',
              objective:
                'Reduce pathogen impairment for recreational use in Hickahala Creek.',
              targetArea:
                'Section of Hickahala Creek within Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Improved water quality',
                'Compliance with TMDL',
              ],
              sourceExcerpt:
                'The Fecal Coliform TMDL for Hickahala Creek is calling for a 50% reduction in the section of Hickahala Creek that is located within the Basket Creek-Hickahala Creek Watershed.',
            },
            {
              id: 'goal2',
              description:
                'Achieve a 70% reduction in fecal coliform in James Wolf Creek.',
              objective:
                'Reduce pathogen impairment for recreational use in James Wolf Creek.',
              targetArea: 'James Wolf Creek',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Improved water quality',
                'Compliance with TMDL',
              ],
              sourceExcerpt:
                'The same TMDL also calls for a 70% reduction in James Wolf Creek. This creek flows into Hickahala Creek from the southeast.',
            },
            {
              id: 'goal3',
              description:
                'Ensure the maximum load of TBODu specified in the TMDL of 1,317 lbs/day will not be exceeded.',
              objective:
                'Maintain organic enrichment, low DO, and nutrient loads within TMDL limits.',
              targetArea:
                'Hickahala and Senatobia Creeks (MS305E), encompassing Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Compliance with TMDL',
                'Improved stream quality',
              ],
              sourceExcerpt:
                'These restrictions will ensure the maximum load of TBODu specified in the TMDL of 1,317 lbs/day will not be exceeded.',
            },
            {
              id: 'goal4',
              description:
                'Implement nutrient BMPs to achieve modeled NPS loads in the TMDL.',
              objective:
                'Reduce nutrient and sediment loads from nonpoint sources.',
              targetArea: 'Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Reduced nutrient and sediment loads',
                'Improved biological integrity',
              ],
              sourceExcerpt:
                'In order to achieve the modeled NPS loads in the TMDL, nutrient BMPs will be implemented watershed.',
            },
            {
              id: 'goal5',
              description:
                'Identify and implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
              objective:
                'Mitigate NPS contributors to pathogens in the watershed.',
              targetArea:
                'Pasturelands and grazing lands in Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Reduced pathogen loading',
                'Improved recreational use',
              ],
              sourceExcerpt:
                'the watershed team will work to identify opportunities to implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
            },
          ],
          bmps: [
            {
              name: 'Fencing',
              description:
                'Install fencing to limit livestock access to streams.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Grazing lands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Watering facilities',
              description:
                'Provide alternative watering facilities for livestock to reduce stream access.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Grazing lands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Heavy use areas',
              description:
                'Stabilize heavy use areas to reduce erosion and sedimentation.',
              type: 'Sediment',
              targetAreas: ['Pasturelands', 'Grazing lands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Ponds',
              description:
                'Construct ponds to manage runoff and improve water quality.',
              type: 'Nutrient',
              targetAreas: ['Basket Creek-Hickahala Creek Watershed'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Streambank and shoreline protection',
              description:
                'Implement streambank and shoreline protection to reduce erosion and sedimentation.',
              type: 'Sediment',
              targetAreas: ['Basket Creek-Hickahala Creek Watershed'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Grade stabilization structures',
              description:
                'Install grade stabilization structures to control gully erosion.',
              type: 'Sediment',
              targetAreas: ['Basket Creek-Hickahala Creek Watershed'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'Implementation of TMDL recommendations',
                'Ease of showing effectiveness',
                'Shorter time for results',
              ],
              sourceExcerpt:
                'installation of the following BMPs would mitigate sediment and nutrient issues in the Basket Creek-Hickahala Creek watershed helping the stream recover: fencing, watering facilities, heavy use areas, ponds, streambank and shoreline protection, and grade stabilization structures.',
            },
            {
              name: 'Nutrient BMPs (in-field conservation practices)',
              description:
                'Implement in-field conservation practices targeting TN, TP, and sediment reduction.',
              type: 'Nutrient',
              targetAreas: ['Basket Creek-Hickahala Creek Watershed'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'MSWCC',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'SWCD',
                },
              ],
              schedule: null,
              priorityFactors: [],
              sourceExcerpt:
                'In order to achieve the modeled NPS loads in the TMDL, nutrient BMPs will be implemented watershed. This will be done by implementing in-field conservation practices that target both TN, TP and sediment reduction as soils in MS are known to have high phosphorus content.',
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
              population: null,
              towns: [],
              huc: '080302040403',
              description:
                'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. This watershed contains many landuse types including agricultural land, pastureland, and forest areas.',
            },
          ],
          contacts: [],
          organizations: [
            {
              name: 'Mississippi Department of Environmental Quality (MDEQ)',
              contact: null,
            },
            {
              name: 'Mississippi Soil and Water Conservation Commission (MSWCC)',
              contact: null,
            },
            {
              name: 'Natural Resources Conservation Service (NRCS)',
              contact: null,
            },
            {
              name: 'Soil and Water Conservation Districts (SWCD)',
              contact: null,
            },
            {
              name: 'USGS',
              contact: null,
            },
            {
              name: 'Tate County Soil and Water Conservation District',
              contact: null,
            },
          ],
        },
      },
      detailedComparisons: {
        goals: [
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Implement nutrient BMPs to reduce TN, TP and sediment in the watershed.',
            actual:
              'Implement nutrient BMPs to achieve modeled NPS loads in the TMDL.',
            message:
              'Similar intent on nutrient BMPs, but extracted lacks explicit TN, TP, sediment mention.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Achieve 50% fecal coliform reduction in Hickahala Creek and 70% in James Wolf Creek.',
            actual:
              'Achieve a 50% reduction in fecal coliform in the section of Hickahala Creek located within the Basket Creek-Hickahala Creek Watershed.',
            message:
              'Extracted covers Hickahala Creek reduction but splits James Wolf Creek into a separate goal.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Achieve 50% fecal coliform reduction in Hickahala Creek and 70% in James Wolf Creek.',
            actual:
              'Achieve a 70% reduction in fecal coliform in James Wolf Creek.',
            message:
              'Extracted covers James Wolf Creek reduction but as a separate goal.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Install BMPs (fencing, ponds, grade stabilization, etc.) prioritizing newly converted pasture areas.',
            actual:
              'Identify and implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
            message:
              'Both focus on BMPs for pasture/grazing lands, but extracted omits prioritization.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Ensure the maximum load of TBODu specified in the TMDL of 1,317 lbs/day will not be exceeded.',
            message: 'Extracted goal not explicitly present in ground truth.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Maintain organic enrichment, low DO, and nutrient loads within TMDL limits.',
            message: 'Extracted goal not explicitly present in ground truth.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Promote behavior changes and BMPs through education and outreach.',
            actual: null,
            message: 'No extracted goal addresses education/outreach.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Establish Watershed Implementation Team to refine the Watershed Based Plan.',
            actual: null,
            message: 'No extracted goal about team establishment.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Conduct baseline condition monitoring with historical and new data.',
            actual: null,
            message: 'No extracted goal about baseline monitoring.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Meet with landowners to secure commitment to install BMPs.',
            actual: null,
            message: 'No extracted goal about landowner commitment.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Establish routine meetings for the Team to support plan revision.',
            actual: null,
            message: 'No extracted goal about routine meetings.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Implement BMPs by schedule per TMDL and project requirements.',
            actual: null,
            message: 'No extracted goal about scheduled BMP implementation.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Coordinate to inspect BMPs installed with Section 319 funds.',
            actual: null,
            message: 'No extracted goal about BMP inspection.',
          },
        ],
        bmps: [
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Fencing',
            actual: 'Fencing',
            message: 'BMP name and intent match.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Watering Facilities',
            actual: 'Watering facilities',
            message: 'Name matches, extracted description less detailed.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Heavy Use Area Protection',
            actual: 'Heavy use areas',
            message:
              "Name similar, extracted omits 'protection' but intent overlaps.",
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Ponds',
            actual: 'Ponds',
            message: 'Name matches, extracted description less detailed.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Streambank and Shoreline Protection',
            actual: 'Streambank and shoreline protection',
            message: 'Name matches, extracted description less detailed.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Grade Stabilization Structures',
            actual: 'Grade stabilization structures',
            message: 'Name matches, extracted description less detailed.',
          },
          {
            type: 'surplus_actual',
            category: 'bmps',
            expected: null,
            actual: 'Nutrient BMPs (in-field conservation practices)',
            message: 'Extracted BMP not explicitly listed in ground truth.',
          },
        ],
        implementation: [
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Develop and execute subgrant agreement specifying roles and milestones.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Coordinate meetings, media, and social media promotion for project activities.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Inform landowners/operators and secure participation for BMP implementation.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Determine priority pollutant areas via GIS and site surveys, install BMPs.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected: 'Monitor baseline and post-BMP water quality conditions.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Conduct inspections and collect GPS/photo documentation of BMP installations.',
            actual: null,
            message: 'No implementation activities extracted.',
          },
        ],
        monitoring: [
          {
            type: 'missing_expected',
            category: 'monitoring',
            expected: 'Water quality standards compliance monitoring',
            actual: null,
            message: 'No monitoring metrics extracted.',
          },
        ],
      },
    });
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
    this.expandedComparisons.set({});
  }

  /**
   * Toggle expansion state for a comparison item
   */
  toggleComparisonDetails(category: string, index: number): void {
    const key = `${category}-${index}`;
    const current = this.expandedComparisons();
    this.expandedComparisons.set({
      ...current,
      [key]: !current[key],
    });
  }

  /**
   * Check if a comparison item is expanded
   */
  isComparisonExpanded(category: string, index: number): boolean {
    const key = `${category}-${index}`;
    return this.expandedComparisons()[key] || false;
  }

  /**
   * Get color class for comparison item type
   */
  getComparisonColor(type: string): string {
    switch (type) {
      case 'perfect_match':
        return 'text-green-600';
      case 'partial_match':
        return 'text-yellow-600';
      case 'surplus_actual':
        return 'text-red-600';
      case 'surplus_actual':
        return 'text-red-600';
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
        return '✅ Match';
      case 'partial_match':
        return '✅ Partial Match';
      case 'surplus_actual':
        return '➕ Extra Found';
      case 'unexpected_extra':
        return '➕ Extra Found';
      case 'missing_expected':
        return '❌ Missing Expected';
      default:
        return '• Unknown';
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
