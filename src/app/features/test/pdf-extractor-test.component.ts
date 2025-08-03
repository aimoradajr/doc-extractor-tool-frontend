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

  // Supported file types
  allowedTypes = ['.pdf'];
  maxFileSize = 10 * 1024 * 1024; // 10MB

  ngOnInit() {
    this.loadPresets();

    // DEBUG: Initialize with test data for debugging (comment out when not needed)
    this.testResult.set({
      testCase: 'preset2-Basket Creek Hickahala Creek 9 Key Element Plan 2018',
      model: 'gpt-3.5-turbo',
      metrics: {
        precision: 0.5,
        recall: 0.3,
        f1Score: 0.375,
      },
      details: {
        goals: {
          precision: 0.5,
          recall: 0.3,
          f1Score: 0.375,
          correctCount: 3,
          totalExtracted: 6,
          totalExpected: 10,
        },
        bmps: {
          precision: 1,
          recall: 1,
          f1Score: 1,
          correctCount: 6,
          totalExtracted: 6,
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
                'Install fencing to limit livestock access to streams and reduce pathogen and nutrient inputs.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Grazing lands'],
              quantity: 10000,
              unit: 'ft',
              estimatedCost: 23300,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'Prioritized for implementation in pasture areas',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'TMDL recommendations',
                'Ease of monitoring effectiveness',
                'Shorter time for anticipated results',
              ],
            },
            {
              name: 'Tank/Trough (Watering Facilities)',
              description:
                'Install watering facilities for livestock away from streams to reduce stream access.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Grazing lands'],
              quantity: 3,
              unit: 'ea',
              estimatedCost: 10500,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'Prioritized for implementation in pasture areas',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
                'TMDL recommendations',
              ],
            },
            {
              name: 'Ponds',
              description:
                'Construct ponds to manage runoff and sedimentation from grazing areas.',
              type: 'Sediment',
              targetAreas: ['Pasturelands'],
              quantity: 4,
              unit: 'ea',
              estimatedCost: 36000,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'Prioritized for implementation in pasture areas',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
              ],
            },
            {
              name: 'Streambank and Shoreline Protection',
              description:
                'Implement measures to protect streambanks and shorelines from erosion.',
              type: 'Sediment',
              targetAreas: ['Streambanks'],
              quantity: 500,
              unit: 'ft',
              estimatedCost: 80500,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'To be implemented along streambanks',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
              ],
            },
            {
              name: 'Grade Stabilization Structure',
              description:
                'Install structures to stabilize grades and prevent erosion.',
              type: 'Sediment',
              targetAreas: ['Erosion-prone areas'],
              quantity: 8,
              unit: 'ac',
              estimatedCost: 52878,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'To be implemented in erosion-prone areas',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
              ],
            },
            {
              name: 'Heavy Use Area Protection',
              description:
                'Protect high-traffic areas from erosion and nutrient/pollutant runoff.',
              type: 'Sediment',
              targetAreas: ['High-traffic livestock areas'],
              quantity: 1240,
              unit: 'ft',
              estimatedCost: 35252,
              partners: [
                {
                  name: 'Natural Resources Conservation Service',
                },
                {
                  name: 'Mississippi Soil and Water Conservation Commission',
                },
              ],
              schedule: 'To be implemented in high-use areas',
              priorityFactors: [
                'Likely water quality benefit',
                'Willing landowners',
              ],
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
          model: 'gpt-3.5-turbo',
          reportSummary: {
            totalGoals: 6,
            totalBMPs: 6,
            completionRate: 0.5,
          },
          goals: [
            {
              description:
                'Develop a TMDL to address pollutants causing biological impairment in Hickahala Creek.',
              objective: 'Develop TMDL for biological impairment',
              targetArea: 'Hickahala Creek',
              schedule: '2003',
              contacts: [],
              desiredOutcomes: ['TMDL development'],
              sourceExcerpt:
                'A TMDL was developed to address those pollutants.',
            },
            {
              description:
                'Implement nutrient BMPs to reduce sediment and nutrient issues in the watershed.',
              objective: 'Implement nutrient BMPs',
              targetArea: 'Basket Creek-Hickahala Creek watershed',
              schedule: 'ongoing',
              contacts: [],
              desiredOutcomes: ['Sediment and nutrient reduction'],
              sourceExcerpt: 'nutrient BMPs will be implemented watershed.',
            },
            {
              description:
                'Reduce fecal coliform levels in Hickahala Creek by 50% and in James Wolf Creek by 70%.',
              objective: 'Reduce fecal coliform levels',
              targetArea: 'Hickahala Creek, James Wolf Creek',
              schedule: '2003',
              contacts: [],
              desiredOutcomes: ['Fecal coliform reduction'],
              sourceExcerpt:
                'Fecal coliform TMDL for Hickahala Creek is calling for a 50% reduction.',
            },
            {
              description:
                'Prioritize BMPs for implementation in newly converted pasture areas.',
              objective: 'Prioritize BMPs in pasture areas',
              targetArea: 'Pasture areas',
              schedule: 'ongoing',
              contacts: [],
              desiredOutcomes: ['Effective BMP placement'],
              sourceExcerpt:
                'BMPs will be prioritized for implementation in the newly converted pasture.',
            },
            {
              description:
                'Ensure no future impacts to water quality from permitted facilities by meeting water quality standards for pathogens.',
              objective: 'Prevent water quality impacts',
              targetArea: 'Permitted facilities',
              schedule: 'ongoing',
              contacts: [],
              desiredOutcomes: ['Compliance with water quality standards'],
              sourceExcerpt:
                'no future impacts are expected to water quality from permitted facilities.',
            },
            {
              description:
                'Identify opportunities to implement BMPs on pasturelands to limit livestock access to streams.',
              objective: 'Implement BMPs on pasturelands',
              targetArea: 'Pasturelands',
              schedule: 'ongoing',
              contacts: [],
              desiredOutcomes: ['Livestock access limitation'],
              sourceExcerpt:
                'the watershed team will work to identify opportunities to implement BMPs on pasturelands.',
            },
          ],
          bmps: [
            {
              name: 'Fencing',
              description:
                'Install fencing to limit livestock access to streams.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Livestock access limitation'],
            },
            {
              name: 'Watering facilities',
              description:
                'Construct watering facilities away from streams to reduce nutrient runoff.',
              type: 'Nutrient',
              targetAreas: ['Pasturelands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Nutrient runoff reduction'],
            },
            {
              name: 'Ponds',
              description:
                'Create ponds to capture sediment and nutrients from runoff.',
              type: 'Sediment',
              targetAreas: ['Pasturelands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Sediment capture'],
            },
            {
              name: 'Streambank and shoreline protection',
              description:
                'Implement measures to stabilize streambanks and protect shorelines.',
              type: 'Sediment',
              targetAreas: ['Streambanks, Shorelines'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Erosion prevention'],
            },
            {
              name: 'Grade stabilization structures',
              description:
                'Install structures to prevent erosion and sedimentation.',
              type: 'Sediment',
              targetAreas: ['Erosion-prone areas'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Erosion prevention'],
            },
            {
              name: 'Heavy use areas',
              description:
                'Designate heavy use areas to concentrate livestock impact and reduce runoff.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [],
              schedule: 'ongoing',
              priorityFactors: ['Livestock impact reduction'],
            },
          ],
          implementation: [],
          monitoring: [],
          outreach: [],
          geographicAreas: [],
          contacts: [],
          organizations: [],
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
              'Implement nutrient BMPs to reduce sediment and nutrient issues in the watershed.',
            message:
              'Covers nutrient BMPs and sediment, but omits TN/TP specifics.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Achieve 50% fecal coliform reduction in Hickahala Creek and 70% in James Wolf Creek.',
            actual:
              'Reduce fecal coliform levels in Hickahala Creek by 50% and in James Wolf Creek by 70%.',
            message: 'Semantically equivalent; wording differs.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Install BMPs (fencing, ponds, grade stabilization, etc.) prioritizing newly converted pasture areas.',
            actual:
              'Prioritize BMPs for implementation in newly converted pasture areas.',
            message: 'Focuses on prioritization, omits BMP types.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Develop a TMDL to address pollutants causing biological impairment in Hickahala Creek.',
            message: 'TMDL development not explicitly listed in ground truth.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Ensure no future impacts to water quality from permitted facilities by meeting water quality standards for pathogens.',
            message:
              'No direct match in ground truth; related to pathogen standards.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Identify opportunities to implement BMPs on pasturelands to limit livestock access to streams.',
            message: 'Related to BMPs on pasturelands, but not a direct match.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Promote behavior changes and BMPs through education and outreach.',
            actual: null,
            message: 'No extracted goal about education/outreach.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Establish Watershed Implementation Team to refine the Watershed Based Plan.',
            actual: null,
            message: 'No extracted goal about team refinement.',
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
            message: 'No extracted goal about ongoing meetings.',
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
            message: 'BMP name and purpose match.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Tank/Trough (Watering Facilities)',
            actual: 'Watering facilities',
            message: 'Same BMP, slightly different naming.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Ponds',
            actual: 'Ponds',
            message: 'Purpose matches, description less detailed.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Streambank and Shoreline Protection',
            actual: 'Streambank and shoreline protection',
            message: 'Same BMP, minor wording difference.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Grade Stabilization Structure',
            actual: 'Grade stabilization structures',
            message: 'Same BMP, pluralization difference.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Heavy Use Area Protection',
            actual: 'Heavy use areas',
            message: 'Same BMP, description less detailed.',
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
            message: 'No monitoring activities extracted.',
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
