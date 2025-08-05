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
  selectedExtractMode = signal<string>('extract2');
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
      testCase: 'preset4-Broken Pumpkin 9 Key Element Plan 2019',
      extract_ai_model: 'gpt-4.1',
      compare_ai_model: 'gpt-4.1',
      compare_mode: 'ai',
      metrics: {
        precision: 0.74,
        recall: 0.67,
        f1Score: 0.7,
      },
      details: {
        goals: {
          precision: 0.25,
          recall: 0.5,
          f1Score: 0.33,
          correctCount: 2,
          totalExtracted: 8,
          totalExpected: 4,
        },
        bmps: {
          precision: 1,
          recall: 1,
          f1Score: 1,
          correctCount: 10,
          totalExtracted: 10,
          totalExpected: 10,
        },
        implementation: {
          precision: 0.9,
          recall: 0.9,
          f1Score: 0.9,
          correctCount: 9,
          totalExtracted: 10,
          totalExpected: 10,
        },
        monitoring: {
          precision: 1,
          recall: 1,
          f1Score: 1,
          correctCount: 9,
          totalExtracted: 9,
          totalExpected: 9,
        },
        outreach: {
          precision: 0.57,
          recall: 0.4,
          f1Score: 0.47,
          correctCount: 4,
          totalExtracted: 7,
          totalExpected: 10,
        },
        geographicAreas: {
          precision: 1,
          recall: 1,
          f1Score: 1,
          correctCount: 1,
          totalExtracted: 1,
          totalExpected: 1,
        },
      },
      comparison: {
        expected: {
          reportSummary: {
            totalGoals: 1,
            totalBMPs: 8,
            completionRate: 0,
          },
          goals: [
            {
              description:
                'Reduce sediment loading in Broken Pumpkin Creek to restore aquatic life use and improve water quality.',
              sourceExcerpt:
                'This analysis identified sediment as the primary probable stressor of the water body and a TMDL was developed... Based on the ranges of stable and unstable yield values, a reduction in sediment of 77% to 97% is recommended in the Broken Pumpkin Creek watershed.',
            },
            {
              description:
                'Implement best management practices (BMPs) to control nonpoint source pollution and achieve TMDL targets.',
              sourceExcerpt:
                'The USDA NRCS has a list of approved BMPS to address sedimentation and this list will be used to identify candidate BMPs in Broken Pumpkin Creek watershed.',
            },
            {
              description:
                'Monitor water quality and track biological integrity to evaluate the effectiveness of implemented BMPs.',
              sourceExcerpt:
                'Facilitate... the completion and implementation of an effective and efficient plan to monitor baseline water quality conditions in the watershed and track changes in water quality over time resulting from the BMPs implemented through this project.',
            },
            {
              description:
                'Engage and educate stakeholders to promote community involvement and support for watershed protection.',
              sourceExcerpt:
                'The ultimate goal is to bring about behavior changes and the use of “best management practices” that will improve water quality and the overall quality of life in the watershed.',
            },
          ],
          bmps: [
            {
              name: 'Brush Management',
              type: 'Non-Structural',
              quantity: 5,
              unit: 'ac',
              estimatedCost: 222.15,
              sourceExcerpt:
                'installation of the following BMPs would help to mitigate sediment issues in Broken Pumpkin Creek watershed: brush management;',
            },
            {
              name: 'Herbaceous Weed Management',
              type: 'Non-Structural',
              quantity: 325,
              unit: 'ac',
              estimatedCost: 21060,
              sourceExcerpt:
                'brush management; weed management; prescribed burning;',
            },
            {
              name: 'Prescribed Burning',
              type: 'Non-Structural',
              quantity: 350,
              unit: 'ac',
              estimatedCost: 14920.5,
              sourceExcerpt:
                'weed management; prescribed burning; cover crops;',
            },
            {
              name: 'Cover Crop',
              type: 'Nutrient',
              quantity: 2500,
              unit: 'ac',
              estimatedCost: 139650,
              sourceExcerpt:
                'prescribed burning; cover crops; critical area planting;',
            },
            {
              name: 'Critical Area Planting',
              type: 'Sediment',
              quantity: 55,
              unit: 'ac',
              estimatedCost: 26611.2,
              sourceExcerpt:
                'cover crops; critical area planting; sediment basins;',
            },
            {
              name: 'Sediment Basin',
              type: 'Sediment',
              quantity: 5000,
              unit: 'cu yd',
              estimatedCost: 16700,
              sourceExcerpt:
                'critical area planting; sediment basins; diversions;',
            },
            {
              name: 'Diversion',
              type: 'Sediment',
              quantity: 2500,
              unit: 'cu yd',
              estimatedCost: 6000,
              sourceExcerpt: 'sediment basins; diversions; ponds;',
            },
            {
              name: 'Pond',
              type: 'Hydrologic',
              quantity: 8000,
              unit: 'cu yd',
              estimatedCost: 31440,
              sourceExcerpt: 'diversions; ponds; fencing;',
            },
            {
              name: 'Fence',
              type: 'Structural',
              quantity: 20000,
              unit: 'ft',
              estimatedCost: 44400,
              sourceExcerpt: 'ponds; fencing; filter strips and field borders;',
            },
            {
              name: 'Field Border',
              type: 'Sediment',
              quantity: 54,
              unit: 'ac',
              estimatedCost: 34084.8,
              sourceExcerpt:
                'fencing; filter strips and field borders; firebreaks;',
            },
            {
              name: 'Filter Strip',
              type: 'Sediment',
              quantity: 50,
              unit: 'ac',
              estimatedCost: 7317.5,
              sourceExcerpt:
                'fencing; filter strips and field borders; firebreaks;',
            },
            {
              name: 'Firebreak',
              type: 'Structural',
              quantity: 11000,
              unit: 'ft',
              estimatedCost: 2640,
              sourceExcerpt:
                'filter strips and field borders; firebreaks; grade stabilization structures;',
            },
            {
              name: 'Grade Stabilization Structure',
              type: 'Structural',
              quantity: 18,
              unit: 'ea',
              estimatedCost: 180000,
              sourceExcerpt:
                'firebreaks; grade stabilization structures; grassed waterways;',
            },
            {
              name: 'Grassed Waterway',
              type: 'Sediment',
              quantity: 10,
              unit: 'ac',
              estimatedCost: 17538.1,
              sourceExcerpt:
                'grade stabilization structures; grassed waterways; irrigation pipeline;',
            },
            {
              name: 'Irrigation Pipeline',
              type: 'Structural',
              quantity: 20000,
              unit: 'ft',
              estimatedCost: 437000,
              sourceExcerpt:
                'grassed waterways; irrigation pipeline; irrigation reservoirs;',
            },
            {
              name: 'Irrigation Reservoir',
              type: 'Hydrologic',
              quantity: 40000,
              unit: 'cu yd',
              estimatedCost: 328400,
              sourceExcerpt:
                'irrigation pipeline; irrigation reservoirs; land clearing;',
            },
            {
              name: 'Land Clearing',
              type: 'Non-Structural',
              quantity: 20,
              unit: 'ac',
              estimatedCost: 10613,
              sourceExcerpt:
                'irrigation reservoirs; land clearing; forage and biomass planting;',
            },
            {
              name: 'Tree/Shrub Preparation',
              type: 'Habitat',
              quantity: 350,
              unit: 'ac',
              estimatedCost: 89267.5,
              sourceExcerpt:
                'land clearing; forage and biomass planting; livestock management practices;',
            },
            {
              name: 'Forage and Biomass Planting',
              type: 'Non-Structural',
              quantity: 60,
              unit: 'ac',
              estimatedCost: 6568.8,
              sourceExcerpt:
                'land clearing; forage and biomass planting; livestock management practices;',
            },
            {
              name: 'Livestock Pipeline',
              type: 'Structural',
              quantity: 8000,
              unit: 'ft',
              estimatedCost: 15280,
              sourceExcerpt:
                'forage and biomass planting; livestock management practices; streambank and shoreline protection;',
            },
            {
              name: 'Prescribed Grazing',
              type: 'Non-Structural',
              quantity: 500,
              unit: 'ac',
              estimatedCost: 28565,
              sourceExcerpt:
                'forage and biomass planting; livestock management practices; streambank and shoreline protection;',
            },
            {
              name: 'Heavy Use Area Protection',
              type: 'Structural',
              quantity: 15000,
              unit: 'ft',
              estimatedCost: 15600,
              sourceExcerpt:
                'livestock management practices; streambank and shoreline protection; water control structures;',
            },
            {
              name: 'Livestock Shelter Structure',
              type: 'Structural',
              quantity: 2000,
              unit: 'ft',
              estimatedCost: 6760,
              sourceExcerpt:
                'livestock management practices; streambank and shoreline protection; water control structures;',
            },
            {
              name: 'Stream Crossing',
              type: 'Structural',
              quantity: 3000,
              unit: 'ft',
              estimatedCost: 14460,
              sourceExcerpt:
                'livestock management practices; streambank and shoreline protection; water control structures;',
            },
            {
              name: 'Streambank and Shoreline Protection',
              type: 'Habitat',
              quantity: 275,
              unit: 'ft',
              estimatedCost: 50479,
              sourceExcerpt:
                'livestock management practices; streambank and shoreline protection; water control structures;',
            },
            {
              name: 'Structure for Water Control',
              type: 'Structural',
              quantity: 4400,
              unit: 'ft',
              estimatedCost: 9064,
              sourceExcerpt:
                'streambank and shoreline protection; water control structures; terraces;',
            },
            {
              name: 'Terrace',
              type: 'Sediment',
              quantity: 9000,
              unit: 'ft',
              estimatedCost: 14310,
              sourceExcerpt:
                'water control structures; terraces; underground outlets;',
            },
            {
              name: 'Tree/Shrub Establishment',
              type: 'Habitat',
              quantity: 66700,
              unit: 'ea',
              estimatedCost: 28014,
              sourceExcerpt:
                'terraces; underground outlets; habitat development and management; and forest stand improvements.',
            },
            {
              name: 'Watering Facility',
              type: 'Structural',
              quantity: 2400,
              unit: 'gal',
              estimatedCost: 6744,
              sourceExcerpt:
                'terraces; underground outlets; habitat development and management; and forest stand improvements.',
            },
            {
              name: 'Underground Outlet',
              type: 'Structural',
              quantity: 2500,
              unit: 'ft',
              estimatedCost: 13475,
              sourceExcerpt:
                'terraces; underground outlets; habitat development and management; and forest stand improvements.',
            },
            {
              name: 'Early Successional Habitat Development/Management',
              type: 'Habitat',
              quantity: 25,
              unit: 'ac',
              estimatedCost: 600.75,
              sourceExcerpt:
                'underground outlets; habitat development and management; and forest stand improvements.',
            },
            {
              name: 'Forest Stand Improvement',
              type: 'Habitat',
              quantity: 500,
              unit: 'ac',
              estimatedCost: 105295,
              sourceExcerpt:
                'underground outlets; habitat development and management; and forest stand improvements.',
            },
          ],
          implementation: [
            {
              description:
                'Develop, execute, and implement a Subgrant Agreement that specifies roles, tasks, requirements, and milestones for project implementation.',
              status: 'planned',
              sourceExcerpt:
                'Work to develop, execute, and implement a Subgrant Agreement that specifies the roles, tasks, requirements, and milestones for project implementation. (Month 1)',
            },
            {
              description:
                'Facilitate meetings, media, and social media promotion of the project; coordinate activities to fully implement the plan.',
              status: 'planned',
              sourceExcerpt:
                'Facilitate, in coordination with MDEQ and other partners, meetings, media and social media promotion of the project, and coordinate activities to fully implement this plan. (Months 1-36)',
            },
            {
              description:
                'Inform landowners and operators within the watershed about the project and secure commitments from priority area landowners and operators willing to participate.',
              status: 'planned',
              sourceExcerpt:
                'Work with the Tallahatchie County SWCD, MSWCC, NRCS, and MDEQ to inform landowners and operators within the watershed about the project and work to secure commitments from priority area landowners and operators who are willing to participate in the project. (Months 1-6)',
            },
            {
              description:
                'Determine priority areas within the sub-watershed contributing significant pollutant loads using GIS applications and intensive site surveys.',
              status: 'planned',
              sourceExcerpt:
                'Work with the local SWCD, MSWCC, NRCS, and MDEQ to determine through GIS applications and intensive site surveys the priority areas within the sub-watershed that are contributing significant pollutant loads. (Months 1-36)',
            },
            {
              description:
                'Install all BMPs in accordance with NRCS Technical Field Manual or other approved guidelines.',
              status: 'planned',
              sourceExcerpt:
                'All BMPs shall be installed in accordance with the guidelines developed in the latest edition of the NRCS Technical Field Manual, or other approved guidelines. (Months 1-36)',
            },
            {
              description:
                'Complete and implement a baseline water quality monitoring plan and track changes in water quality over time resulting from implemented BMPs.',
              status: 'planned',
              sourceExcerpt:
                'Facilitate, in cooperation with MDEQ and other monitoring partners, the completion and implementation of an effective and efficient plan to monitor baseline water quality conditions in the watershed and track changes in water quality over time resulting from the BMPs implemented through this project. (Plan Completion:  Months 1-2); Implementation:  Months 3-36)',
            },
            {
              description:
                'Submit blank copies of standard maintenance agreements to MDEQ.',
              status: 'planned',
              sourceExcerpt:
                'Submit blank copies of standard maintenance agreements to MDEQ. (Months 13-36)',
            },
            {
              description: 'Conduct inspections of BMPs during construction.',
              status: 'planned',
              sourceExcerpt:
                'Conduct inspections of BMPs during construction (Months 3-36)',
            },
            {
              description:
                'Collect GPS coordinates of all installed BMPs and incorporate into GIS format according to Federal Geographic Data Committee standards.',
              status: 'planned',
              sourceExcerpt:
                'Coordinate with and support the local SWCD, MSWCC and NRCS in the collection of relevant GPS coordinates of all installed BMPs and incorporate this information into a GIS format. All geospatial data shall be collected in a manner consistent with the Federal Geographic Data committee-endorsed standards. (Months 3-36)',
            },
            {
              description:
                'Collect adequate photo documentation before, during, and after installation of approved BMPs.',
              status: 'planned',
              sourceExcerpt:
                'Collect adequate photo documentation before, during, and after installation of the approved BMPs (Months 3-36)',
            },
            {
              description:
                'Report measured or estimated nonpoint source pollutant load reduction, acreage affected, pre- and post-site conditions, and GIS data.',
              status: 'planned',
              sourceExcerpt:
                'Report measured, or estimated, nonpoint source pollutant load reduction, acreage affected, pre-and post- site conditions, and GIS data (1-36)',
            },
            {
              description:
                'Target priority areas for BMPs in coordination with project partners.',
              status: 'planned',
              sourceExcerpt:
                'Coordinate with the MDEQ, NRCS, MSWCC, USGS, and the Noxubee and Lowndes Co. Soil and Water Districts to determine priority areas that are contributing significant pollutant loads to Broken Pumpkin Creek Watershed. (Months 1-2)',
            },
            {
              description:
                'Establish Watershed Implementation Team (WIT) to begin refinement of the watershed-based plan.',
              status: 'planned',
              sourceExcerpt:
                'Establish Watershed Implementation Team to begin refinement of Watershed Based Plan for Broken Pumpkin Creek Watershed. (Months 1-2)',
            },
            {
              description:
                'Initiate baseline condition monitoring using historical data.',
              status: 'completed',
              sourceExcerpt:
                'Initiate watershed monitoring  Baseline condition monitoring Completed using historical data',
            },
            {
              description:
                'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas.',
              status: 'planned',
              sourceExcerpt:
                'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas. (Months 1-6)',
            },
            {
              description:
                'Establish routine meeting schedule for WIT to support watershed plan revision.',
              status: 'planned',
              sourceExcerpt:
                'Establish routine meeting schedule for WIT to support WBP revision. (Months 1-36)',
            },
            {
              description: 'Implement BMPs in the watershed.',
              status: 'planned',
              sourceExcerpt: 'Implement BMPs BMP installation (Months 6-36)',
            },
            {
              description: 'Inspect BMPs installed using Section 319 funds.',
              status: 'planned',
              sourceExcerpt:
                'Coordinate with Landowners to inspect BMPs that were installed using Section 319 funds (Months 3-36)',
            },
            {
              description:
                'Begin monitoring to collect data on post-BMP water quality.',
              status: 'planned',
              sourceExcerpt:
                'Begin monitoring to collect data on post BMP water quality (Months 42-48)',
            },
            {
              description:
                'Finalize education and outreach plan and schedule events.',
              status: 'planned',
              sourceExcerpt:
                'Finalize education and outreach plan Education/Outreach events scheduled (Months 8-36)',
            },
          ],
          monitoring: [
            {
              parameter: 'Dissolved Oxygen',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'Dissolved Oxygen',
                  description:
                    '>= 5 mg/L (daily avg), >= 4 mg/L (instantaneous), 70–125% saturation',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'pH',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'pH',
                  description: '6.0–9.0',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Temperature',
              type: 'physical',
              thresholds: [
                {
                  parameter: 'Temperature',
                  description: '<= 90°F',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Specific Conductance',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'Specific Conductance',
                  description: '< 1000 micromhos/cm',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Dissolved Solids',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'Dissolved Solids',
                  description:
                    '< 750 mg/L (monthly avg), < 1500 mg/L (instantaneous)',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Total Suspended Solids',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'Total Suspended Solids',
                  description: '<= 65 mg/L',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Turbidity',
              type: 'physical',
              thresholds: [
                {
                  parameter: 'Turbidity',
                  description: '<= 75 NTU',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'Chemical Oxygen Demand',
              type: 'chemical',
              thresholds: [
                {
                  parameter: 'Chemical Oxygen Demand',
                  description: '<= 35 mg/L',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
            {
              parameter: 'M-BISQ (Mississippi Benthic Index of Stream Quality)',
              type: 'biological',
              method: 'MDEQ macroinvertebrate protocol',
              thresholds: [
                {
                  parameter:
                    'M-BISQ (Mississippi Benthic Index of Stream Quality)',
                  description: '>= 71.6 (East Bioregion Attainment Score)',
                },
              ],
              locations: ['TB146', 'TB562'],
            },
          ],
          outreach: [
            {
              type: 'presentation',
              description:
                'Water Model Presentations (Enviroscapes and groundwater aquifer models) distributed statewide with training and lesson plans',
              partners: ['MDEQ'],
            },
            {
              type: 'teacher workshop',
              description:
                'Train educators near the watershed about nonpoint source (NPS) pollution and provide materials for classroom use',
              partners: ['MDEQ'],
            },
            {
              type: 'workshop',
              description:
                'Adopt A Stream workshops and training for citizens, teachers, and students in the Dry Creek Watershed',
              partners: ['MDEQ'],
            },
            {
              type: 'mobile classroom',
              description:
                'Watershed Harmony Mobile Classroom for ages kindergarten–adults, tailored for 4th and 5th grade students',
              partners: ['MDEQ'],
            },
            {
              type: 'train-the-trainer',
              description:
                'Workshops and materials for Soil and Water Conservation Districts and Extension Service',
              partners: ['MDEQ', 'SWCD', 'Extension Service'],
            },
            {
              type: 'stakeholder meeting',
              description:
                'Broken Pumpkin Creek Watershed Implementation Team (WIT) face-to-face meetings to provide updates, review, and modify the plan',
              schedule: 'at least 3 meetings during project',
              partners: ['MDEQ', 'WIT', 'local stakeholders'],
            },
            {
              type: 'field day',
              description:
                'Host field days to showcase implemented BMPs to the public',
              partners: ['MDEQ', 'WIT'],
            },
            {
              type: 'education/outreach event',
              description:
                'Education events including training workshops, festival event planning, soil and water conservation field days, poster/art/writing projects',
              partners: ['MDEQ', 'WIT', 'local stakeholders'],
            },
            {
              type: 'incentive',
              description:
                'Provide food, refreshments, and facility support for stakeholder meetings and outreach events as allowed under Section 319',
              partners: ['MDEQ'],
            },
            {
              type: 'evaluation',
              description:
                'Use evaluation forms, pre-test/post-test, surveys, and attendance reporting to measure outreach success',
              indicator:
                'number of people attending workshops, trainings, events',
              partners: ['MDEQ'],
            },
          ],
          geographicAreas: [
            {
              huc: '031601060307',
              watershedName: 'Broken Pumpkin Creek Watershed',
              counties: ['Noxubee', 'Lowndes'],
              state: 'Mississippi',
            },
          ],
          contacts: [
            {
              name: 'Mississippi Department of Environmental Quality',
              role: 'Lead Agency / Project Management',
              organization: 'MDEQ',
            },
            {
              name: 'Mississippi Soil and Water Conservation Commission',
              role: 'Implementation Partner',
              organization: 'MSWCC',
            },
            {
              name: 'Natural Resources Conservation Service',
              role: 'Technical Assistance / Implementation Partner',
              organization: 'NRCS',
            },
            {
              name: 'Noxubee County Soil and Water Conservation District',
              role: 'Local Partner',
              organization: 'Noxubee County SWCD',
            },
            {
              name: 'Lowndes County Soil and Water Conservation District',
              role: 'Local Partner',
              organization: 'Lowndes County SWCD',
            },
            {
              name: 'United States Geological Survey',
              role: 'Monitoring Partner',
              organization: 'USGS',
            },
            {
              name: 'Extension Service',
              role: 'Education/Outreach Partner',
              organization: 'Extension Service',
            },
          ],
          organizations: [
            {
              name: 'Mississippi Department of Environmental Quality (MDEQ)',
            },
            {
              name: 'Mississippi Soil and Water Conservation Commission (MSWCC)',
            },
            {
              name: 'Natural Resources Conservation Service (NRCS)',
            },
            {
              name: 'Noxubee County Soil and Water Conservation District',
            },
            {
              name: 'Lowndes County Soil and Water Conservation District',
            },
            {
              name: 'United States Geological Survey (USGS)',
            },
            {
              name: 'Local Landowners',
            },
            {
              name: 'Soil and Water Conservation Districts (SWCDs)',
            },
            {
              name: 'Extension Service',
            },
          ],
        },
        actual: {
          model: 'gpt-4.1',
          reportSummary: {
            summary:
              'This watershed plan outlines strategies for addressing sediment impairment in the Broken Pumpkin Creek Watershed in east central Mississippi. The plan details causes of impairment, expected load reductions, proposed best management practices (BMPs), implementation schedules, monitoring metrics, and outreach activities to improve water quality and habitat. It covers the watershed area in Noxubee and Lowndes counties and aims to achieve significant sediment reduction through coordinated efforts.',
            watershedName: 'Broken Pumpkin Creek Watershed',
            planTitle:
              'Broken Pumpkin Watershed Plan 9 Key Element Plan HUC 031601060307 MWS 8113 GY19 Watershed Implementation Project',
            planDate: '2019-03-08',
            authors: [],
            organizations: [
              'Mississippi Department of Environmental Quality (MDEQ)',
              'Mississippi Soil and Water Conservation Commission (MSWCC)',
              'Natural Resource Conservation Service (NRCS)',
              'Noxubee County Soil and Water Conservation District',
              'Lowndes County Soil and Water Conservation District',
              'USGS',
            ],
            geographicRegion: 'Noxubee and Lowndes counties, Mississippi',
            totalGoals: 8,
            totalBMPs: 32,
            completionRate: 0,
          },
          goals: [
            {
              description:
                'Reduce sediment yields in the Broken Pumpkin Creek watershed by 77-97% to reflect stable conditions.',
              schedule: 'Project duration',
              sourceExcerpt:
                'a reduction in sediment of 77% to 97% is recommended in the Broken Pumpkin Creek watershed',
            },
            {
              description:
                'Install approved BMPs to address sedimentation in the watershed.',
              schedule: 'Project duration',
              sourceExcerpt:
                'installation of the following BMPs would help to mitigate sediment issues in Broken Pumpkin Creek watershed',
            },
            {
              description:
                'Coordinate with MDEQ, NRCS, MSWCC, USGS, and local Soil and Water Districts to determine priority areas contributing significant pollutant loads.',
              schedule: 'Months 1-2',
              sourceExcerpt:
                'Coordinate with the MDEQ, NRCS, MSWCC, USGS, and the Noxubee and Lowndes Co. Soil and Water Districts to determine priority areas',
            },
            {
              description:
                'Establish Watershed Implementation Team (WIT) to refine the Watershed Based Plan.',
              schedule: 'Months 1-2',
              sourceExcerpt:
                'Establish Watershed Implementation Team to begin refinement of Watershed Based Plan',
            },
            {
              description:
                'Initiate baseline watershed monitoring using historical data.',
              schedule: 'Project start',
              sourceExcerpt:
                'Initiate watershed monitoring Baseline condition monitoring Completed using historical data',
            },
            {
              description:
                'Secure commitments from landowners and cooperators to install BMPs in priority areas.',
              schedule: 'Months 1-6',
              sourceExcerpt:
                'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas',
            },
            {
              description: 'Implement BMPs in targeted areas of the watershed.',
              schedule: 'Months 6-36',
              sourceExcerpt: 'Implement BMPs BMP installation Months 6-36',
            },
            {
              description:
                'Begin post-BMP monitoring to collect data on water quality improvements.',
              schedule: 'Months 42-48',
              sourceExcerpt:
                'Begin monitoring to collect data on post- BMP water quality',
            },
          ],
          bmps: [
            {
              name: 'Brush Management',
              description:
                'Control or removal of undesirable brush species to reduce sediment runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 5,
              unit: 'ac',
              estimatedCost: 222.15,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Brush Management ac 5 $44.43 $222.15',
            },
            {
              name: 'Herbaceous Weed Management',
              description:
                'Management of herbaceous weeds to improve vegetative cover and reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 325,
              unit: 'ac',
              estimatedCost: 21060,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Herbaceous Weed Management ac 325 $64.80 $21,060.00',
            },
            {
              name: 'Prescribed Burning',
              description:
                'Controlled burning to manage vegetation and improve habitat.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 350,
              unit: 'ac',
              estimatedCost: 14920.5,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Prescribed Burning ac 350 $42.63 $14,920.50',
            },
            {
              name: 'Cover Crop',
              description:
                'Planting cover crops to reduce soil erosion and sediment runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 2500,
              unit: 'ac',
              estimatedCost: 139650,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Cover Crop ac 2500 $55.86 $139,650.00',
            },
            {
              name: 'Critical Area Planting',
              description:
                'Planting vegetation in areas highly susceptible to erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 55,
              unit: 'ac',
              estimatedCost: 26611.2,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Critical Area Planting ac 55 $483.84 $26,611.20',
            },
            {
              name: 'Sediment Basin',
              description:
                'Construction of basins to capture and settle sediment from runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 5000,
              unit: 'cu yd',
              estimatedCost: 16700,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Sediment Basin cu yd 5000 $3.34 $16,700.00',
            },
            {
              name: 'Diversion',
              description:
                'Earth channels or ditches to divert runoff and reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 2500,
              unit: 'cu yd',
              estimatedCost: 6000,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Diversion cu yd 2500 $2.40 $6,000.00',
            },
            {
              name: 'Pond',
              description:
                'Construction of ponds to capture runoff and sediment.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 8000,
              unit: 'cu yd',
              estimatedCost: 31440,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Pond cu yd 8000 $3.93 $31,440.00',
            },
            {
              name: 'Fence',
              description:
                'Installation of fencing to exclude livestock from sensitive areas.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 20000,
              unit: 'ft',
              estimatedCost: 44400,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Fence ft 20000 $2.22 $44,400.00',
            },
            {
              name: 'Field Border',
              description:
                'Establishment of vegetated borders around fields to filter runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 54,
              unit: 'ac',
              estimatedCost: 34084.8,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Field Border ac 54 $631.20 $34,084.80',
            },
            {
              name: 'Filter Strip',
              description:
                'Vegetated strips to filter sediment and pollutants from runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 50,
              unit: 'ac',
              estimatedCost: 7317.5,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Filter Strip ac 50 $146.35 $7,317.50',
            },
            {
              name: 'Firebreak',
              description:
                'Creation of firebreaks to control prescribed burns and prevent erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 11000,
              unit: 'ft',
              estimatedCost: 2640,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Firebreak ft 11000 $0.24 $2,640.00',
            },
            {
              name: 'Grade Stabilization Structure',
              description:
                'Structures to stabilize grades and prevent gully erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 18,
              unit: 'ea',
              estimatedCost: 180000,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Grade Stabilization Structure ea 18 $10,000.00 $180,000.00',
            },
            {
              name: 'Grassed Waterway',
              description:
                'Vegetated channels to convey runoff and reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 10,
              unit: 'ac',
              estimatedCost: 17538.1,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Grassed Waterway ac 10 $1,753.81 $17,538.10',
            },
            {
              name: 'Irrigation Pipeline',
              description:
                'Installation of pipelines for efficient irrigation and reduced runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 20000,
              unit: 'ft',
              estimatedCost: 437000,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Irrigation Pipeline ft 20000 $21.85 $437,000.00',
            },
            {
              name: 'Irrigation Reservoir',
              description:
                'Construction of reservoirs for irrigation water storage.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 40000,
              unit: 'cu yd',
              estimatedCost: 328400,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Irrigation Reservoir cu yd 40000 $8.21 $328,400.00',
            },
            {
              name: 'Land Clearing',
              description:
                'Clearing land for improved management and reduced erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 20,
              unit: 'ac',
              estimatedCost: 10613,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Land Clearing ac 20 $530.65 $10,613.00',
            },
            {
              name: 'Tree/Shrub Preparation',
              description:
                'Preparation of land for tree and shrub establishment.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 350,
              unit: 'ac',
              estimatedCost: 89267.5,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Tree/Shrub Preparation ac 350 $255.05 $89,267.50',
            },
            {
              name: 'Forage and Biomass Planting',
              description:
                'Planting forage and biomass crops to improve soil cover.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 60,
              unit: 'ac',
              estimatedCost: 6568.8,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Forage and Biomass Planting ac 60 $109.48 $6,568.80',
            },
            {
              name: 'Livestock Pipeline',
              description:
                'Installation of pipelines for livestock watering to reduce stream access.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 8000,
              unit: 'ft',
              estimatedCost: 15280,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Livestock Pipeline ft 8000 $1.91 $15,280.00',
            },
            {
              name: 'Prescribed Grazing',
              description:
                'Managed grazing to maintain vegetative cover and reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 500,
              unit: 'ac',
              estimatedCost: 28565,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Prescribed Grazing ac 500 $57.13 $28,565.00',
            },
            {
              name: 'Heavy Use Area Protection',
              description:
                'Protection of areas with heavy livestock or equipment use to reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 15000,
              unit: 'ft',
              estimatedCost: 15600,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Heavy Use Area Protection ft 15000 $1.04 $15,600.00',
            },
            {
              name: 'Livestock Shelter Structure',
              description:
                'Structures to shelter livestock and reduce impact on sensitive areas.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 2000,
              unit: 'ft',
              estimatedCost: 6760,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Livestock Shelter Structure ft 2000 $3.38 $6,760.00',
            },
            {
              name: 'Stream Crossing',
              description:
                'Construction of stable stream crossings to reduce bank erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 3000,
              unit: 'ft',
              estimatedCost: 14460,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Stream Crossing ft 3000 $4.82 $14,460.00',
            },
            {
              name: 'Streambank and Shoreline Protection',
              description:
                'Stabilization of streambanks and shorelines to prevent erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 275,
              unit: 'ft',
              estimatedCost: 50479,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Streambank and Shoreline Protection ft 275 $183.56 $50,479.00',
            },
            {
              name: 'Structure for Water Control',
              description:
                'Installation of structures to control water flow and reduce erosion.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 4400,
              unit: 'ft',
              estimatedCost: 9064,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Structure for Water Control ft 4400 $2.06 $9,064.00',
            },
            {
              name: 'Terrace',
              description:
                'Construction of terraces to reduce slope length and runoff velocity.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 9000,
              unit: 'ft',
              estimatedCost: 14310,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Terrace ft 9000 $1.59 $14,310.00',
            },
            {
              name: 'Tree/Shrub Establishment',
              description:
                'Establishment of trees and shrubs for erosion control and habitat.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 66700,
              unit: 'ea',
              estimatedCost: 28014,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Tree/Shrub Establishment ea 66700 $0.42 $28,014.00',
            },
            {
              name: 'Watering Facility',
              description:
                'Installation of watering facilities for livestock to reduce stream access.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 2400,
              unit: 'gal',
              estimatedCost: 6744,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Watering Facility gal 2400 $2.81 $6,744.00',
            },
            {
              name: 'Underground Outlet',
              description:
                'Installation of underground outlets to safely convey runoff.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 2500,
              unit: 'ft',
              estimatedCost: 13475,
              schedule: 'Full Project Implementation',
              sourceExcerpt: 'Underground Outlet ft 2500 $5.39 $13,475.00',
            },
            {
              name: 'Early Successional Habitat Development/Management',
              description:
                'Development and management of early successional habitats.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 25,
              unit: 'ac',
              estimatedCost: 600.75,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Early Successional Habitat Development/Management ac 25 $24.03 $600.75',
            },
            {
              name: 'Forest Stand Improvement',
              description:
                'Improvement of forest stands for erosion control and habitat.',
              type: 'Sediment',
              targetAreas: ['Broken Pumpkin Creek watershed'],
              quantity: 500,
              unit: 'ac',
              estimatedCost: 105295,
              schedule: 'Full Project Implementation',
              sourceExcerpt:
                'Forest Stand Improvement ac 500 $210.59 $105,295.00',
            },
          ],
          implementation: [
            {
              description:
                'Develop, execute, and implement a Subgrant Agreement specifying roles, tasks, requirements, and milestones for project implementation.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
              ],
              status: 'planned',
              sourceExcerpt:
                'Work to develop, execute, and implement a Subgrant Agreement that specifies the roles, tasks, requirements, and milestones for project implementation. (Month 1)',
            },
            {
              description:
                'Facilitate meetings, media, and social media promotion of the project and coordinate activities to fully implement this plan.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
              ],
              status: 'planned',
              sourceExcerpt:
                'Facilitate, in coordination with MDEQ and other partners, meetings, media and social media promotion of the project, and coordinate activities to fully implement this plan. (Months 1-36)',
            },
            {
              description:
                'Inform landowners and operators within the watershed about the project and secure commitments from priority area landowners and operators.',
              responsibleParties: [
                {
                  name: 'Tallahatchie County SWCD',
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
              status: 'planned',
              sourceExcerpt:
                'Work with the Tallahatchie County SWCD, MSWCC, NRCS, and MDEQ to inform landowners and operators within the watershed about the project and work to secure commitments from priority area landowners and operators who are willing to participate in the project. (Months 1-6)',
            },
            {
              description:
                'Determine priority areas within the sub-watershed contributing significant pollutant loads using GIS applications and intensive site surveys.',
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
              status: 'planned',
              sourceExcerpt:
                'Work with the local SWCD, MSWCC, NRCS, and MDEQ to determine through GIS applications and intensive site surveys the priority areas within the sub-watershed that are contributing significant pollutant loads. (Months 1-36)',
            },
            {
              description:
                'Install all BMPs in accordance with NRCS Technical Field Manual or other approved guidelines.',
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
              ],
              status: 'planned',
              sourceExcerpt:
                'All BMPs shall be installed in accordance with the guidelines developed in the latest edition of the NRCS Technical Field Manual, or other approved guidelines. (Months 1-36)',
            },
            {
              description:
                'Complete and implement a plan to monitor baseline water quality conditions and track changes over time.',
              responsibleParties: [
                {
                  name: 'MDEQ',
                },
                {
                  name: 'USGS',
                },
                {
                  name: 'SWCD',
                },
              ],
              status: 'planned',
              sourceExcerpt:
                'Facilitate, in cooperation with MDEQ and other monitoring partners, the completion and implementation of an effective and efficient plan to monitor baseline water quality conditions in the watershed and track changes in water quality over time resulting from the BMPs implemented through this project. (Plan Completion: Months 1-2); Implementation: Months 3-36)',
            },
            {
              description:
                'Submit blank copies of standard maintenance agreements to MDEQ.',
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
              ],
              status: 'planned',
              sourceExcerpt:
                'Submit blank copies of standard maintenance agreements to MDEQ. (Months 13-36)',
            },
            {
              description: 'Conduct inspections of BMPs during construction.',
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
              ],
              status: 'planned',
              sourceExcerpt:
                'Conduct inspections of BMPs during construction (Months 3-36)',
            },
            {
              description:
                'Collect GPS coordinates of all installed BMPs and incorporate into GIS format.',
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
              ],
              status: 'planned',
              sourceExcerpt:
                'Coordinate with and support the local SWCD, MSWCC and NRCS in the collection of relevant GPS coordinates of all installed BMPs and incorporate this information into a GIS format. (Months 3-36)',
            },
            {
              description:
                'Collect photo documentation before, during, and after installation of approved BMPs.',
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
              ],
              status: 'planned',
              sourceExcerpt:
                'Collect adequate photo documentation before, during, and after installation of the approved BMPs (Months 3-36)',
            },
            {
              description:
                'Report measured or estimated nonpoint source pollutant load reduction, acreage affected, pre-and post-site conditions, and GIS data.',
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
              status: 'planned',
              sourceExcerpt:
                'Report measured, or estimated, nonpoint source pollutant load reduction, acreage affected, pre-and post- site conditions, and GIS data (1-36)',
            },
          ],
          monitoring: [
            {
              parameter: 'Dissolved Oxygen',
              type: 'chemical',
              method: 'In-situ field measurement',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Dissolved Oxygen',
                  description:
                    'Daily Average of 5.0 mg/L; Instantaneous threshold of 4.0 mg/L',
                },
                {
                  parameter: 'Dissolved Oxygen % Sat',
                  description: '≥ 70% - ≤ 125%',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt:
                'Dissolved Oxygen Daily Average of 5.0 mg/L; Instantaneous threshold of 4.0 mg/L',
            },
            {
              parameter: 'pH',
              type: 'chemical',
              method: 'In-situ field measurement',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'pH',
                  description: '6.0-9.0',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'pH 6.0-9.0',
            },
            {
              parameter: 'Temperature',
              type: 'chemical',
              method: 'In-situ field measurement',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Temperature',
                  description: 'Not to exceed 90°F',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'Temperature Not to exceed 90°F',
            },
            {
              parameter: 'Specific Conductance',
              type: 'chemical',
              method: 'In-situ field measurement',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Specific Conductance',
                  description: 'Less Than 1000 micromhos/cm',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'Specific Conductance Less Than 1000 micromhos/cm',
            },
            {
              parameter: 'Dissolved Solids',
              type: 'chemical',
              method: 'Water chemistry analysis',
              frequency: 'monthly average and instantaneous',
              thresholds: [
                {
                  parameter: 'Dissolved Solids',
                  description:
                    'Monthly average less than 750 mg/L; instantaneous threshold less than 1500 mg/L',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt:
                'Dissolved Solids Monthly average less than 750 mg/L; instantaneous threshold less than 1500 mg/L',
            },
            {
              parameter: 'Total Suspended Solids',
              type: 'chemical',
              method: 'Water chemistry analysis',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Total Suspended Solids',
                  description: '65 mg/L',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'Total Suspended Solids 65 mg/L',
            },
            {
              parameter: 'Turbidity',
              type: 'chemical',
              method: 'In-situ field measurement',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Turbidity',
                  description: '75 NTU',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'Turbidity 75 NTU',
            },
            {
              parameter: 'Chemical Oxygen Demand',
              type: 'chemical',
              method: 'Water chemistry analysis',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'Chemical Oxygen Demand',
                  description: '35 mg/L',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt: 'Chemical Oxygen Demand 35 mg/L',
            },
            {
              parameter: 'M-BISQ (Mississippi Benthic Index of Stream Quality)',
              type: 'biological',
              method: 'Benthic macroinvertebrate sampling and scoring',
              frequency: 'as scheduled in monitoring plan',
              thresholds: [
                {
                  parameter: 'M-BISQ East Bioregion',
                  description: '71.6 Calibration 3',
                },
              ],
              locations: ['TB146', 'TB562'],
              sourceExcerpt:
                'M-BISQ East Bioregion 71.6 Calibration 3 (Applicable to waters outside the Mississippi Alluvial Plain)',
            },
          ],
          outreach: [
            {
              type: 'education program',
              description:
                'Water Model Presentations using Enviroscapes and groundwater aquifer models with interactive lesson plans.',
              schedule: 'as needed',
              indicator: 'number of presentations, participant feedback',
              partners: ['MDEQ'],
              sourceExcerpt:
                'Water Model Presentations - Enviroscapes and groundwater aquifer models distributed statewide with training and related interactive lesson plans.',
            },
            {
              type: 'teacher workshop',
              description:
                'Workshops to train educators about NPS pollution and provide classroom materials.',
              schedule: 'as needed',
              indicator: 'number of workshops, educator participation',
              partners: ['MDEQ'],
              sourceExcerpt:
                'Teacher Workshops – train educators in proximity to the watershed about NPS pollution and provide materials and information that can be used in their classrooms.',
            },
            {
              type: 'public workshop',
              description:
                'Adopt A Stream workshops and training venues for citizens, teachers, and students.',
              schedule: 'as needed',
              indicator: 'number of workshops, participant feedback',
              partners: ['MDEQ'],
              sourceExcerpt:
                'Adopt A Stream - workshops and training venues for citizens, teachers, and students in the Dry Creek Watershed.',
            },
            {
              type: 'mobile classroom',
              description:
                'Watershed Harmony Mobile Classroom for K-adult audiences with tailored education objectives.',
              schedule: 'as needed',
              indicator: 'number of classroom visits, participant feedback',
              partners: ['MDEQ'],
              sourceExcerpt:
                'Watershed Harmony Mobile Classroom - for ages kindergarten – adults with state and federal public education objectives tailored for 4 th and 5 th grade students.',
            },
            {
              type: 'train the trainer',
              description:
                'Workshops and materials for Soil and Water districts, Extension Service, etc.',
              schedule: 'as needed',
              indicator: 'number of trainers trained, workshop feedback',
              partners: ['MDEQ'],
              sourceExcerpt:
                '“Train the Trainer” - workshops and materials for Soil and Water districts, Extension Service, etc.',
            },
            {
              type: 'stakeholder meeting',
              description:
                'Minimum of 3 face-to-face meetings for the Watershed Implementation Team (WIT) to provide updates and review/modify the watershed plan.',
              schedule: 'at least 3 meetings during project',
              indicator: 'number of meetings, participant attendance',
              partners: ['MDEQ', 'WIT'],
              sourceExcerpt:
                'the stakeholder group forming the Broken Pumpkin Creek Watershed Implementation Team (WIT) will participate in a minimum of 3 face-to-face meetings.',
            },
            {
              type: 'field day',
              description:
                'Host field days to showcase implemented BMPs for the public.',
              schedule: 'during project',
              indicator: 'number of field days, public attendance',
              partners: ['MDEQ', 'WIT'],
              sourceExcerpt:
                'hosting field days to showcase the implemented BMPs for the public.',
            },
          ],
          geographicAreas: [
            {
              huc: '031601060307',
              watershedName: 'Broken Pumpkin Creek Watershed',
              counties: ['Noxubee', 'Lowndes'],
              state: 'Mississippi',
              sourceExcerpt:
                'The Broken Pumpkin Creek watershed is located in Noxubee and Lowndes counties in east central Mississippi covering 24,573 acres.',
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
              name: 'Natural Resource Conservation Service (NRCS)',
              contact: {},
            },
            {
              name: 'Noxubee County Soil and Water Conservation District',
              contact: {},
            },
            {
              name: 'Lowndes County Soil and Water Conservation District',
              contact: {},
            },
            {
              name: 'USGS',
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
              'Reduce sediment loading in Broken Pumpkin Creek to restore aquatic life use and improve water quality.',
            actual:
              'Reduce sediment yields in the Broken Pumpkin Creek watershed by 77-97% to reflect stable conditions.',
            message:
              'Both address sediment reduction; extracted is more quantitative, ground truth is broader.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Implement best management practices (BMPs) to control nonpoint source pollution and achieve TMDL targets.',
            actual:
              'Install approved BMPs to address sedimentation in the watershed.',
            message:
              'Both focus on BMP implementation; extracted is narrower in scope.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Monitor water quality and track biological integrity to evaluate the effectiveness of implemented BMPs.',
            actual:
              'Initiate baseline watershed monitoring using historical data.',
            message:
              'Both mention monitoring; extracted focuses on baseline/historical data.',
          },
          {
            type: 'partial_match',
            category: 'goals',
            expected:
              'Engage and educate stakeholders to promote community involvement and support for watershed protection.',
            actual:
              'Establish Watershed Implementation Team (WIT) to refine the Watershed Based Plan.',
            message:
              'Both involve stakeholder engagement; extracted is more about team formation.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Coordinate with MDEQ, NRCS, MSWCC, USGS, and local Soil and Water Districts to determine priority areas contributing significant pollutant loads.',
            message: 'Extracted goal is more specific than ground truth.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Secure commitments from landowners and cooperators to install BMPs in priority areas.',
            message:
              'Extracted goal is an implementation detail, not a ground truth goal.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual: 'Implement BMPs in targeted areas of the watershed.',
            message:
              'Extracted goal overlaps with BMP implementation but is redundant.',
          },
          {
            type: 'surplus_actual',
            category: 'goals',
            expected: null,
            actual:
              'Begin post-BMP monitoring to collect data on water quality improvements.',
            message:
              'Extracted goal is a monitoring step, not a distinct ground truth goal.',
          },
        ],
        bmps: [
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Brush Management',
            actual: 'Brush Management',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Herbaceous Weed Management',
            actual: 'Herbaceous Weed Management',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Prescribed Burning',
            actual: 'Prescribed Burning',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Cover Crop',
            actual: 'Cover Crop',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Critical Area Planting',
            actual: 'Critical Area Planting',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Sediment Basin',
            actual: 'Sediment Basin',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Diversion',
            actual: 'Diversion',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Pond',
            actual: 'Pond',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Fence',
            actual: 'Fence',
            message: 'BMP name matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'bmps',
            expected: 'Field Border',
            actual: 'Field Border',
            message: 'BMP name matches exactly.',
          },
        ],
        implementation: [
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Develop, execute, and implement a Subgrant Agreement that specifies roles, tasks, requirements, and milestones for project implementation.',
            actual:
              'Develop, execute, and implement a Subgrant Agreement specifying roles, tasks, requirements, and milestones for project implementation.',
            message: 'Wording is nearly identical.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Facilitate meetings, media, and social media promotion of the project; coordinate activities to fully implement the plan.',
            actual:
              'Facilitate meetings, media, and social media promotion of the project and coordinate activities to fully implement this plan.',
            message: 'Wording is nearly identical.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Inform landowners and operators within the watershed about the project and secure commitments from priority area landowners and operators willing to participate.',
            actual:
              'Inform landowners and operators within the watershed about the project and secure commitments from priority area landowners and operators.',
            message: 'Wording is nearly identical.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Determine priority areas within the sub-watershed contributing significant pollutant loads using GIS applications and intensive site surveys.',
            actual:
              'Determine priority areas within the sub-watershed contributing significant pollutant loads using GIS applications and intensive site surveys.',
            message: 'Wording is identical.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Install all BMPs in accordance with NRCS Technical Field Manual or other approved guidelines.',
            actual:
              'Install all BMPs in accordance with NRCS Technical Field Manual or other approved guidelines.',
            message: 'Wording is identical.',
          },
          {
            type: 'partial_match',
            category: 'implementation',
            expected:
              'Complete and implement a baseline water quality monitoring plan and track changes in water quality over time resulting from implemented BMPs.',
            actual:
              'Complete and implement a plan to monitor baseline water quality conditions and track changes over time.',
            message:
              'Extracted omits reference to BMPs but is otherwise similar.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected:
              'Submit blank copies of standard maintenance agreements to MDEQ.',
            actual:
              'Submit blank copies of standard maintenance agreements to MDEQ.',
            message: 'Wording is identical.',
          },
          {
            type: 'perfect_match',
            category: 'implementation',
            expected: 'Conduct inspections of BMPs during construction.',
            actual: 'Conduct inspections of BMPs during construction.',
            message: 'Wording is identical.',
          },
          {
            type: 'partial_match',
            category: 'implementation',
            expected:
              'Collect GPS coordinates of all installed BMPs and incorporate into GIS format according to Federal Geographic Data Committee standards.',
            actual:
              'Collect GPS coordinates of all installed BMPs and incorporate into GIS format.',
            message: 'Extracted omits reference to FGDC standards.',
          },
          {
            type: 'partial_match',
            category: 'implementation',
            expected:
              'Collect adequate photo documentation before, during, and after installation of approved BMPs.',
            actual:
              'Collect photo documentation before, during, and after installation of approved BMPs.',
            message: "Extracted omits 'adequate' but otherwise matches.",
          },
        ],
        monitoring: [
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Dissolved Oxygen',
            actual: 'Dissolved Oxygen',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'pH',
            actual: 'pH',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Temperature',
            actual: 'Temperature',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Specific Conductance',
            actual: 'Specific Conductance',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Dissolved Solids',
            actual: 'Dissolved Solids',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Total Suspended Solids',
            actual: 'Total Suspended Solids',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Turbidity',
            actual: 'Turbidity',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'Chemical Oxygen Demand',
            actual: 'Chemical Oxygen Demand',
            message: 'Parameter matches exactly.',
          },
          {
            type: 'perfect_match',
            category: 'monitoring',
            expected: 'M-BISQ (Mississippi Benthic Index of Stream Quality)',
            actual: 'M-BISQ (Mississippi Benthic Index of Stream Quality)',
            message: 'Parameter matches exactly.',
          },
        ],
        outreach: [
          {
            type: 'partial_match',
            category: 'outreach',
            expected:
              'Water Model Presentations (Enviroscapes and groundwater aquifer models) distributed statewide with training and lesson plans',
            actual:
              'Water Model Presentations using Enviroscapes and groundwater aquifer models with interactive lesson plans.',
            message:
              "Both describe water model presentations; extracted omits 'statewide' and 'training'.",
          },
          {
            type: 'partial_match',
            category: 'outreach',
            expected:
              'Train educators near the watershed about nonpoint source (NPS) pollution and provide materials for classroom use',
            actual:
              'Workshops to train educators about NPS pollution and provide classroom materials.',
            message: 'Both describe teacher workshops on NPS pollution.',
          },
          {
            type: 'partial_match',
            category: 'outreach',
            expected:
              'Adopt A Stream workshops and training for citizens, teachers, and students in the Dry Creek Watershed',
            actual:
              'Adopt A Stream workshops and training venues for citizens, teachers, and students.',
            message:
              'Both describe Adopt A Stream workshops; extracted omits watershed specificity.',
          },
          {
            type: 'partial_match',
            category: 'outreach',
            expected:
              'Watershed Harmony Mobile Classroom for ages kindergarten–adults, tailored for 4th and 5th grade students',
            actual:
              'Watershed Harmony Mobile Classroom for K-adult audiences with tailored education objectives.',
            message:
              'Both describe mobile classroom; extracted omits grade specificity.',
          },
          {
            type: 'surplus_actual',
            category: 'outreach',
            expected: null,
            actual:
              'Workshops and materials for Soil and Water districts, Extension Service, etc.',
            message:
              'Extracted describes train-the-trainer, which is similar but not identical to ground truth.',
          },
          {
            type: 'partial_match',
            category: 'outreach',
            expected:
              'Broken Pumpkin Creek Watershed Implementation Team (WIT) face-to-face meetings to provide updates, review, and modify the plan',
            actual:
              'Minimum of 3 face-to-face meetings for the Watershed Implementation Team (WIT) to provide updates and review/modify the watershed plan.',
            message:
              'Both describe WIT meetings; extracted specifies minimum number.',
          },
          {
            type: 'perfect_match',
            category: 'outreach',
            expected:
              'Host field days to showcase implemented BMPs to the public',
            actual:
              'Host field days to showcase implemented BMPs for the public.',
            message: 'Wording is nearly identical.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected:
              'Education events including training workshops, festival event planning, soil and water conservation field days, poster/art/writing projects',
            actual: null,
            message:
              'No extracted outreach item covers this broad education/outreach event.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected:
              'Provide food, refreshments, and facility support for stakeholder meetings and outreach events as allowed under Section 319',
            actual: null,
            message: 'No extracted outreach item covers incentives/support.',
          },
          {
            type: 'missing_expected',
            category: 'outreach',
            expected:
              'Use evaluation forms, pre-test/post-test, surveys, and attendance reporting to measure outreach success',
            actual: null,
            message: 'No extracted outreach item covers evaluation activities.',
          },
        ],
        geographicAreas: [
          {
            type: 'perfect_match',
            category: 'geographicAreas',
            expected:
              'Broken Pumpkin Creek Watershed, HUC: 031601060307, Mississippi',
            actual:
              'Broken Pumpkin Creek Watershed, HUC: 031601060307, Mississippi',
            message: 'Geographic area matches exactly.',
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
        ? this.accuracyTestService.runTestWithPreset(
            this.selectedPreset(),
            this.selectedExtractMode()
          )
        : this.accuracyTestService.runTestWithFile(
            this.selectedFile()!,
            this.selectedExtractMode()
          );

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
    this.selectedExtractMode.set('extract2');
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
