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
        precision: 0.54,
        recall: 0.33,
        f1Score: 0.41,
      },
      details: {
        goals: {
          precision: 0.67,
          recall: 0.2,
          f1Score: 0.31,
          correctCount: 2,
          totalExtracted: 3,
          totalExpected: 10,
        },
        bmps: {
          precision: 0.67,
          recall: 0.67,
          f1Score: 0.67,
          correctCount: 4,
          totalExtracted: 6,
          totalExpected: 6,
        },
        implementation: {
          precision: 0.33,
          recall: 0.1,
          f1Score: 0.15,
          correctCount: 1,
          totalExtracted: 3,
          totalExpected: 10,
        },
        monitoring: {
          precision: 1,
          recall: 0.5,
          f1Score: 0.67,
          correctCount: 1,
          totalExtracted: 1,
          totalExpected: 2,
        },
        outreach: {
          precision: 1,
          recall: 0.25,
          f1Score: 0.4,
          correctCount: 1,
          totalExtracted: 1,
          totalExpected: 4,
        },
        geographicAreas: {
          precision: 0.75,
          recall: 0.75,
          f1Score: 0.75,
          correctCount: 3,
          totalExtracted: 4,
          totalExpected: 4,
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
                'Develop, execute, and implement a Subgrant Agreement that specifies the roles, tasks, requirements, and milestones for project implementation.',
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
              probableCompletionDate: 'Month 1',
              outcome: 'Subgrant Agreement executed',
            },
            {
              description:
                'Facilitate meetings, media, and social media promotion of the project, and coordinate activities to fully implement this plan.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Partners',
                },
              ],
              startDate: 'Month 1',
              endDate: 'Month 36',
              outcome: 'Public informed and project activities coordinated',
            },
            {
              description:
                'Inform landowners and operators within the watershed about the project and work to secure commitments from priority area landowners and operators willing to participate.',
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
              startDate: 'Month 1',
              endDate: 'Month 6',
              outcome: 'Landowner commitments secured',
            },
            {
              description:
                'Determine through GIS applications and intensive site surveys the priority areas within the sub-watershed that are contributing significant pollutant loads; install all BMPs in accordance with guidelines.',
              responsibleParties: [
                {
                  name: 'SWCD',
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
              startDate: 'Month 1',
              endDate: 'Month 36',
              outcome: 'Priority areas identified and BMPs installed',
            },
            {
              description:
                'Facilitate the completion and implementation of a plan to monitor baseline water quality conditions in the watershed and track changes resulting from BMPs.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Monitoring Partners',
                },
              ],
              startDate: 'Month 1',
              endDate: 'Month 36',
              outcome: 'Baseline and post-BMP water quality monitoring',
            },
            {
              description:
                'Submit blank copies of standard maintenance agreements to MDEQ.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 13',
              endDate: 'Month 36',
              outcome: 'Maintenance agreements submitted',
            },
            {
              description: 'Conduct inspections of BMPs during construction.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 3',
              endDate: 'Month 36',
              outcome: 'BMP construction inspections completed',
            },
            {
              description:
                'Coordinate the collection of relevant GPS coordinates of all installed BMPs and incorporate this information into a GIS format.',
              responsibleParties: [
                {
                  name: 'SWCD',
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
              startDate: 'Month 3',
              endDate: 'Month 36',
              outcome: 'All BMPs geospatially documented',
            },
            {
              description:
                'Collect photo documentation before, during, and after installation of approved BMPs.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 3',
              endDate: 'Month 36',
              outcome: 'Photo documentation completed',
            },
            {
              description:
                'Report measured or estimated nonpoint source pollutant load reduction, acreage affected, pre-and post-site conditions, and GIS data.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 1',
              endDate: 'Month 36',
              outcome: 'Load reduction and site condition reports submitted',
            },
            {
              description:
                'Establish Watershed Implementation Team to begin refinement of Watershed Based Plan.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'WIT',
                },
              ],
              startDate: 'Month 1',
              probableCompletionDate: 'Month 2',
              outcome: 'WIT established',
            },
            {
              description:
                'Initiate watershed baseline monitoring using historical data.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Monitoring Partners',
                },
              ],
              probableCompletionDate: 'Completed using historical data',
              outcome: 'Baseline condition monitoring completed',
            },
            {
              description:
                'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 1',
              endDate: 'Month 6',
              outcome: 'Landowner commitment secured',
            },
            {
              description:
                'Establish routine meeting schedule for WIT to support watershed plan revision.',
              responsibleParties: [
                {
                  name: 'WIT',
                },
              ],
              startDate: 'Month 1',
              endDate: 'Month 36',
              outcome: 'WIT meetings held and plan revisions supported',
            },
            {
              description: 'Implement BMPs in targeted areas.',
              responsibleParties: [
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 6',
              endDate: 'Month 36',
              outcome: 'BMPs installed',
            },
            {
              description:
                'Begin monitoring to collect data on post-BMP water quality.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Monitoring Partners',
                },
              ],
              startDate: 'Month 42',
              endDate: 'Month 48',
              outcome: 'Post-BMP monitoring completed',
            },
            {
              description:
                'Finalize education and outreach plan and schedule education/outreach events.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'Project Partners',
                },
              ],
              startDate: 'Month 8',
              endDate: 'Month 36',
              outcome:
                'Education/outreach events scheduled and outreach plan finalized',
            },
            {
              description: 'Finalize revised Watershed Based Plan.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'WIT',
                },
              ],
              startDate: 'Month 30',
              endDate: 'Month 36',
              outcome: 'Final revised WBP completed',
            },
          ],
          monitoring: [
            {
              description:
                'Pre-implementation (baseline) monitoring using chemical and biological sampling data to assess stream condition before BMP installation.',
              indicator:
                'M-BISQ score; other chemical and biological parameters',
              method:
                'Standard Operating Procedures; agency Quality Assurance protocols',
              frequency: 'Prior to BMP installation',
              thresholds: [
                {
                  description:
                    'M-BISQ score 10 points below attainment threshold for West Bioregion',
                },
              ],
              responsibleParties: [
                {
                  name: 'Trained personnel',
                  type: 'Agency or partner staff',
                },
              ],
              sampleLocations: [
                'Historical monitoring stations on Basket Creek and Hickahala Creek',
              ],
              sampleSchedule: 'One-time (before BMP installation)',
            },
            {
              description:
                'Post-BMP monitoring to assess water quality changes downstream of BMP activity, compared to baseline data.',
              indicator: 'M-BISQ score; chemical and biological parameters',
              method:
                'Best professional judgement for station selection; SOPs; agency QA protocols',
              frequency:
                'At least 1 year post-BMP, possibly up to 5 or more years',
              thresholds: [],
              responsibleParties: [
                {
                  name: 'Trained personnel',
                  type: 'Agency or partner staff',
                },
              ],
              sampleLocations: [
                'Locations downstream of BMP activity (to be selected)',
              ],
              sampleSchedule:
                'Initiated after BMP installation and stream stabilization, repeated annually or as needed',
            },
          ],
          outreach: [
            {
              name: 'Education and Outreach Events',
              description:
                'Implementation of education and outreach activities to inform and engage the community about water quality, BMPs, and watershed stewardship.',
              partners: [
                {
                  name: 'MDEQ',
                  type: 'Agency',
                },
                {
                  name: 'MSWCC',
                  type: 'Agency',
                },
                {
                  name: 'NRCS',
                  type: 'Agency',
                },
                {
                  name: 'Tate County Soil and Water Conservation District',
                  type: 'Agency',
                },
              ],
              indicators:
                'Number of education/outreach events held; attendance; participant feedback; number of materials distributed',
              schedule: 'Months 8-36',
              budget: 9000,
              targetAudience:
                'Landowners, operators, teachers, students, public, stakeholders in the watershed',
              events: [
                {
                  type: 'Watershed Implementation Team (WIT) Meetings',
                  audience: 'Stakeholders, project partners',
                  materialsProvided: [
                    'Meeting agendas',
                    'Project updates',
                    'Educational materials',
                  ],
                  estimatedParticipants: null,
                  date: 'At least 3 meetings during project period',
                },
                {
                  type: 'Field Days',
                  audience: 'Public, landowners',
                  materialsProvided: [
                    'Demonstration materials',
                    'Refreshments',
                  ],
                  estimatedParticipants: null,
                  date: 'To be scheduled during project period',
                },
              ],
            },
            {
              name: 'MDEQ Statewide Information/Education Programs',
              description:
                'Utilization of MDEQ-developed programs, manuals, literature, books, videos, and public service announcements tailored for the watershed.',
              partners: [
                {
                  name: 'MDEQ',
                  type: 'Agency',
                },
              ],
              indicators:
                'Number of programs delivered; audience reached; feedback and evaluation forms',
              schedule: 'Throughout project period',
              targetAudience:
                'Pre-school to adult; community members; school teachers; students',
              events: [
                {
                  type: 'Water Model Presentations',
                  audience: 'Students, teachers',
                  materialsProvided: [
                    'Enviroscapes models',
                    'Groundwater aquifer models',
                    'Lesson plans',
                  ],
                },
                {
                  type: 'Teacher Workshops',
                  audience: 'Local educators',
                  materialsProvided: [
                    'NPS pollution materials',
                    'Classroom resources',
                  ],
                },
                {
                  type: 'Adopt A Stream Workshops',
                  audience: 'Citizens, teachers, students',
                  materialsProvided: ['Training materials'],
                },
                {
                  type: 'Watershed Harmony Mobile Classroom',
                  audience: 'Kindergarten – adults, 4th/5th grade focus',
                  materialsProvided: ['Mobile classroom resources'],
                },
                {
                  type: 'Storm Drain Marking Projects',
                  audience: 'Scouts, environmental clubs, citizen groups',
                  materialsProvided: ['Storm drain marking kits'],
                },
                {
                  type: 'Train the Trainer Workshops',
                  audience: 'Soil and Water Districts, Extension Service staff',
                  materialsProvided: ['Training materials'],
                },
              ],
            },
            {
              name: 'Stakeholder Engagement and Meetings',
              description:
                'Engage stakeholders through meetings to provide updates, education, and review/modify the watershed plan. Support participation via food, refreshments, and facility rentals.',
              partners: [
                {
                  name: 'MDEQ',
                  type: 'Agency',
                },
                {
                  name: 'MSWCC',
                  type: 'Agency',
                },
                {
                  name: 'NRCS',
                  type: 'Agency',
                },
                {
                  name: 'Tate County Soil and Water Conservation District',
                  type: 'Agency',
                },
              ],
              indicators:
                'Number of meetings, participant attendance, feedback',
              schedule: 'Throughout project period (at least 3 meetings)',
              budget: 4000,
              targetAudience:
                'Watershed Implementation Team (WIT), stakeholders',
              events: [
                {
                  type: 'Stakeholder Meetings',
                  audience: 'WIT members, stakeholders',
                  materialsProvided: [
                    'Food',
                    'Refreshments',
                    'Meeting materials',
                  ],
                  estimatedParticipants: null,
                  date: 'During project period',
                },
              ],
            },
            {
              name: 'Media and Social Media Promotion',
              description:
                'Promotion of the project and outreach activities through media and social media channels.',
              partners: [
                {
                  name: 'MDEQ',
                  type: 'Agency',
                },
              ],
              indicators:
                'Number of media mentions/social media posts; audience reached',
              schedule: 'Months 1-36',
              targetAudience: 'General public',
              events: [
                {
                  type: 'Media Promotion',
                  audience: 'General public',
                  materialsProvided: ['Press releases', 'Social media posts'],
                  date: 'Throughout project period',
                },
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
              towns: null,
              huc: '080302040403',
              description:
                'The major watershed covered by the plan, located in Tate County, Mississippi. Dominant land uses are cropland, forest, and pasture/grass. Identified in the 2011 National Land Cover Database. Includes impaired segments MS305E, MS305M1, and MS305M2.',
            },
            {
              name: 'Hickahala Creek Drainage Area (DA)',
              counties: ['Tate County'],
              acreage: null,
              landUseTypes: null,
              population: null,
              towns: null,
              huc: 'MS305E',
              description:
                "A drainage area included on Mississippi’s 1996 and 1998 Section 303(d) List as an 'evaluated' impairment. Subject to TMDLs for organic enrichment, low dissolved oxygen, and nutrients.",
            },
            {
              name: 'Hickahala Creek (Segment MS305M2)',
              counties: ['Tate County'],
              acreage: null,
              landUseTypes: null,
              population: null,
              towns: null,
              huc: 'MS305M2',
              description:
                'A monitored segment of Hickahala Creek, listed as impaired for recreational use due to high fecal coliform levels.',
            },
            {
              name: 'James-Wolf Creek (Segment MS305M1)',
              counties: ['Tate County'],
              acreage: null,
              landUseTypes: null,
              population: null,
              towns: null,
              huc: 'MS305M1',
              description:
                'A segment that flows into the watershed from the southwest, impaired for recreational use due to high fecal coliform. Confluences with Hickahala Creek.',
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
            totalGoals: 3,
            totalBMPs: 6,
            completionRate: 0,
          },
          goals: [
            {
              description:
                'Restore and maintain the quality of impaired water bodies through the establishment of pollutant specific allowable loads.',
              objective:
                'Restore and maintain water quality in impaired water bodies by establishing pollutant-specific allowable loads (TMDLs).',
              targetArea: 'Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Water bodies meet designated use',
                'Pollutant loads reduced to allowable levels',
              ],
              sourceExcerpt:
                'The TMDL process is designated to restore and maintain the quality of those impaired water bodies through the establishment of pollutant specific allowable loads.',
            },
            {
              description:
                'Achieve a 50% reduction in fecal coliform in the section of Hickahala Creek within the Basket Creek-Hickahala Creek Watershed and a 70% reduction in James Wolf Creek.',
              objective:
                'Reduce pathogen levels to meet water quality standards for recreational use.',
              targetArea:
                'Hickahala Creek and James Wolf Creek within Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Fecal coliform levels reduced by 50% in Hickahala Creek',
                'Fecal coliform levels reduced by 70% in James Wolf Creek',
              ],
              sourceExcerpt:
                'The Fecal Coliform TMDL for Hickahala Creek is calling for a 50% reduction in the section of Hickahala Creek that is located within the Basket Creek-Hickahala Creek Watershed. The same TMDL also calls for a 70% reduction in James Wolf Creek.',
            },
            {
              description:
                'Implement nutrient BMPs and in-field conservation practices to achieve modeled NPS loads in the TMDL for nutrients and sediment.',
              objective:
                'Reduce nutrient and sediment loads through BMP implementation.',
              targetArea: 'Basket Creek-Hickahala Creek Watershed',
              schedule: null,
              contacts: [],
              desiredOutcomes: [
                'Nutrient and sediment loads reduced to modeled NPS loads in TMDL',
              ],
              sourceExcerpt:
                'In order to achieve the modeled NPS loads in the TMDL, nutrient BMPs will be implemented watershed. This will be done by implementing in-field conservation practices that target both TN, TP and sediment reduction as soils in MS are known to have high phosphorus content.',
            },
          ],
          bmps: [
            {
              name: 'Fencing',
              description:
                'Install fencing to limit livestock access to streams.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
              name: 'Watering Facilities',
              description:
                'Install watering facilities to provide alternative water sources for livestock.',
              type: 'Pathogen',
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
              name: 'Heavy Use Areas',
              description:
                'Establish heavy use areas to reduce soil erosion and sedimentation.',
              type: 'Sediment',
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
              name: 'Streambank and Shoreline Protection',
              description:
                'Implement streambank and shoreline protection to reduce erosion and sedimentation.',
              type: 'Sediment',
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
              name: 'Grade Stabilization Structures',
              description:
                'Install grade stabilization structures to control gully erosion and reduce sediment delivery.',
              type: 'Sediment',
              targetAreas: ['Pasturelands', 'Lands used for grazing'],
              quantity: null,
              unit: null,
              estimatedCost: null,
              partners: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
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
          ],
          implementation: [
            {
              description:
                'Implement nutrient BMPs and in-field conservation practices targeting TN, TP, and sediment reduction.',
              responsibleParties: [
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'SWCD',
                },
              ],
              startDate: null,
              endDate: null,
              status: 'planned',
              outcome:
                'Nutrient and sediment loads reduced to modeled NPS loads in TMDL',
              probableCompletionDate: null,
              sourceExcerpt:
                'In order to achieve the modeled NPS loads in the TMDL, nutrient BMPs will be implemented watershed. This will be done by implementing in-field conservation practices that target both TN, TP and sediment reduction as soils in MS are known to have high phosphorus content.',
            },
            {
              description:
                'Identify opportunities to implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
              responsibleParties: [
                {
                  name: 'Watershed team',
                },
                {
                  name: 'NRCS',
                },
                {
                  name: 'MSWCC',
                },
                {
                  name: 'SWCD',
                },
              ],
              startDate: null,
              endDate: null,
              status: 'planned',
              outcome:
                'Mitigate NPS contributors to pathogens in the watershed',
              probableCompletionDate: null,
              sourceExcerpt:
                'the watershed team will work to identify opportunities to implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
            },
            {
              description:
                'Work under a memorandum of agreement (MOA) with the MSWCC to implement this project.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'MSWCC',
                },
              ],
              startDate: null,
              endDate: null,
              status: 'planned',
              outcome:
                'Project implementation, administration, management, and watershed plan revision, as well as hosting and facilitating team meetings',
              probableCompletionDate: null,
              sourceExcerpt:
                'MDEQ plans to work under a memorandum of agreement (MOA) with the MSWCC to implement this project.',
            },
          ],
          monitoring: [
            {
              description:
                'Use biological data and the Mississippi Benthic Index of Stream Quality (M-BISQ) for assessment of biological impairment.',
              indicator: 'Biological impairment (macroinvertebrate index)',
              method: 'Mississippi Benthic Index of Stream Quality (M-BISQ)',
              frequency: null,
              thresholds: [],
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
              ],
              sampleLocations: [
                'Wadeable streams outside of the MS Alluvial Plain',
              ],
              sampleSchedule: null,
              sourceExcerpt:
                'a robust multi-metric benthic macroinvertebrate index, the Mississippi Benthic Index of Stream Quality (M-BISQ), was developed for wadeable streams outside of the MS Alluvial Plain. Using biological data, the evaluated listings for pesticides and sedimentation/siltation were replaced with biological impairment.',
            },
          ],
          outreach: [
            {
              name: 'SWCD Staff Communication with Landowners',
              description:
                'SWCD staff communicate regularly with the local landowners and operators within the watershed as they work to support sign-ups for Farm Bill initiatives.',
              partners: [
                {
                  name: 'SWCD',
                },
                {
                  name: 'NRCS',
                },
              ],
              indicators:
                'Number of landowners engaged, number of Farm Bill sign-ups',
              schedule: null,
              budget: null,
              events: [],
              targetAudience: 'Local landowners and operators',
              sourceExcerpt:
                'SWCD staff communicate regularly with the local landowners and operators within the watershed as they work to support sign-ups for Farm Bill initiatives',
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
                'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. This watershed contains many landuse types including agricultural land, pastureland, and forest areas; however, the dominant landuses identified in the 2011 National Land Cover Database (NLCD) within the watershed are cropland (11%), forest (17%) and pasture/grass (44%).',
              sourceExcerpt:
                'The Basket Creek-Hickahala Creek watershed is located in Tate County and covers 35,085 acres. ... the dominant landuses identified in the 2011 National Land Cover Database (NLCD) within the watershed are cropland (11%), forest (17%) and pasture/grass (44%) (Figure 1).',
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
                'A segment of Hickahala Creek (MS305M2) was also included on the “monitored” portion of MS’s 1998 Section 303(d) List of Impaired Water Bodies.',
              sourceExcerpt:
                'A segment of Hickahala Creek (MS305M2) was also included on the “monitored” portion of MS’s 1998 Section 303(d) List of Impaired Water Bodies.',
            },
          ],
          contacts: [],
          organizations: [
            {
              name: 'Mississippi Department of Environmental Quality (MDEQ)',
              contact: {},
            },
            {
              name: 'Mississippi Soil and Water Conservation Commission (MSWCC)',
              contact: {},
            },
            {
              name: 'Natural Resources Conservation Service (NRCS)',
              contact: {},
            },
            {
              name: 'Soil and Water Conservation Districts (SWCD)',
              contact: {},
            },
            {
              name: 'USGS',
              contact: {},
            },
            {
              name: 'Tate County Soil and Water Conservation District',
              contact: {},
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
              'Implement nutrient BMPs and in-field conservation practices to achieve modeled NPS loads in the TMDL for nutrients and sediment.',
            message:
              'Covers nutrient BMPs and sediment reduction, but omits TN/TP specifics.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Achieve 50% fecal coliform reduction in Hickahala Creek and 70% in James Wolf Creek.',
            actual:
              'Achieve a 50% reduction in fecal coliform in the section of Hickahala Creek within the Basket Creek-Hickahala Creek Watershed and a 70% reduction in James Wolf Creek.',
            message:
              'Numerical targets and creeks match; wording differs slightly.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Restore and maintain the quality of impaired water bodies through the establishment of pollutant specific allowable loads.',
            message: 'Goal is broader than any single expected goal.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Install BMPs (fencing, ponds, grade stabilization, etc.) prioritizing newly converted pasture areas.',
            actual: null,
            message:
              'No extracted goal addresses prioritizing new pasture areas.',
          },
          {
            type: 'missing_expected',
            category: 'goals',
            expected:
              'Promote behavior changes and BMPs through education and outreach.',
            actual: null,
            message: 'No extracted goal on education/outreach.',
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
            message: 'No extracted goal about routine team meetings.',
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
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Watering Facilities',
            actual: 'Watering Facilities',
            message: 'BMP name and purpose match.',
          },
          {
            type: 'partial_match',
            category: 'bmps',
            expected: 'Heavy Use Area Protection',
            actual: 'Heavy Use Areas',
            message:
              'Name is slightly different; both address livestock traffic/erosion.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Ponds',
            actual: 'Ponds',
            message: 'BMP name and function match.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Streambank and Shoreline Protection',
            actual: 'Streambank and Shoreline Protection',
            message: 'BMP name and function match.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Grade Stabilization Structures',
            actual: 'Grade Stabilization Structures',
            message: 'BMP name and function match.',
          },
        ],
        implementation: [
          {
            type: 'partial_match',
            category: 'implementation',
            expected:
              'Inform landowners and operators within the watershed about the project and work to secure commitments from priority area landowners and operators willing to participate.',
            actual:
              'SWCD staff communicate regularly with the local landowners and operators within the watershed as they work to support sign-ups for Farm Bill initiatives.',
            message: 'Both involve landowner communication and engagement.',
          },
          {
            type: 'surplus_actual',
            category: 'implementation',
            expected: null,
            actual:
              'Work under a memorandum of agreement (MOA) with the MSWCC to implement this project.',
            message:
              'MOA with MSWCC not explicitly in expected implementation.',
          },
          {
            type: 'surplus_actual',
            category: 'implementation',
            expected: null,
            actual:
              'Identify opportunities to implement BMPs on pasturelands and lands used for grazing to limit livestock access to streams.',
            message:
              'Specific focus on pasturelands not directly in expected list.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Develop, execute, and implement a Subgrant Agreement that specifies the roles, tasks, requirements, and milestones for project implementation.',
            actual: null,
            message: 'No extracted implementation about Subgrant Agreement.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Facilitate meetings, media, and social media promotion of the project, and coordinate activities to fully implement this plan.',
            actual: null,
            message: 'No extracted implementation about meetings/media.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Determine through GIS applications and intensive site surveys the priority areas within the sub-watershed that are contributing significant pollutant loads; install all BMPs in accordance with guideli',
            actual: null,
            message: 'No extracted implementation about GIS/site surveys.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Facilitate the completion and implementation of a plan to monitor baseline water quality conditions in the watershed and track changes resulting from BMPs.',
            actual: null,
            message:
              'No extracted implementation about baseline monitoring plan.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Submit blank copies of standard maintenance agreements to MDEQ.',
            actual: null,
            message:
              'No extracted implementation about maintenance agreements.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected: 'Conduct inspections of BMPs during construction.',
            actual: null,
            message: 'No extracted implementation about BMP inspections.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Coordinate the collection of relevant GPS coordinates of all installed BMPs and incorporate this information into a GIS format.',
            actual: null,
            message: 'No extracted implementation about GPS/GIS data.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Collect photo documentation before, during, and after installation of approved BMPs.',
            actual: null,
            message: 'No extracted implementation about photo documentation.',
          },
          {
            type: 'missing_expected',
            category: 'implementation',
            expected:
              'Report measured or estimated nonpoint source pollutant load reduction, acreage affected, pre-and post-site conditions, and GIS data.',
            actual: null,
            message:
              'No extracted implementation about reporting pollutant load reduction.',
          },
        ],
        monitoring: [
          {
            type: 'partial_match',
            category: 'monitoring',
            expected:
              'Pre-implementation (baseline) monitoring using chemical and biological sampling data to assess stream condition before BMP installation.',
            actual:
              'Use biological data and the Mississippi Benthic Index of Stream Quality (M-BISQ) for assessment of biological impairment.',
            message:
              'Covers biological assessment, omits chemical/baseline and pre/post distinction.',
          },
          {
            type: 'missing_expected',
            category: 'monitoring',
            expected:
              'Post-BMP monitoring to assess water quality changes downstream of BMP activity, compared to baseline data.',
            actual: null,
            message: 'No extracted monitoring about post-BMP assessment.',
          },
        ],
        outreach: [
          {
            type: 'partial_match',
            category: 'outreach',
            expected: 'Education and Outreach Events',
            actual: 'SWCD Staff Communication with Landowners',
            message:
              'Both involve outreach, but extracted is limited to staff-landowner communication.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected: 'MDEQ Statewide Information/Education Programs',
            actual: null,
            message: 'No extracted outreach about MDEQ programs.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected: 'Stakeholder Engagement and Meetings',
            actual: null,
            message: 'No extracted outreach about stakeholder meetings.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected: 'Media and Social Media Promotion',
            actual: null,
            message: 'No extracted outreach about media/social media.',
          },
        ],
        geographicAreas: [
          {
            type: 'perfect_match',
            category: 'geographicAreas',
            expected: 'Basket Creek-Hickahala Creek Watershed',
            actual: 'Basket Creek-Hickahala Creek Watershed',
            message: 'Watershed name and HUC match.',
          },
          {
            type: 'partial_match',
            category: 'geographicAreas',
            expected: 'Hickahala Creek Drainage Area (DA)',
            actual: 'Hickahala Creek Drainage Area (DA) (MS305E)',
            message: 'Name matches, HUC code present in extracted description.',
          },
          {
            type: 'partial_match',
            category: 'geographicAreas',
            expected: 'James-Wolf Creek (Segment MS305M1)',
            actual: 'James-Wolf Creek (MS305M1)',
            message: 'Name and segment code match.',
          },
          {
            type: 'partial_match',
            category: 'geographicAreas',
            expected: 'Hickahala Creek (Segment MS305M2)',
            actual: 'Hickahala Creek (MS305M2)',
            message: 'Name and segment code match.',
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
