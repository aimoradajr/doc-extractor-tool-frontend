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
        'This watershed plan outlines strategies for addressing sediment impairment in the Broken Pumpkin Creek Watershed in east central Mississippi. The plan details causes of impairment, expected load reductions, proposed best management practices (BMPs), implementation schedules, monitoring metrics, and outreach activities to improve water quality and aquatic habitat. It covers the watershed area in Noxubee and Lowndes counties and aims to achieve significant sediment reduction through coordinated efforts.',
      watershedName: 'Broken Pumpkin Creek Watershed',
      planTitle:
        'Broken Pumpkin Creek Watershed Plan 9 Key Element Plan HUC 031601060307 MWS 8113 GY19 Watershed Implementation Project',
      planDate: '2019-03-08',
      authors: [],
      organizations: [
        'Mississippi Department of Environmental Quality',
        'Mississippi Soil and Water Conservation Commission',
        'Natural Resource Conservation Service',
        'Noxubee County Soil and Water Conservation District',
        'Lowndes County Soil and Water Conservation District',
        'USGS',
      ],
      geographicRegion: 'Noxubee and Lowndes counties, Mississippi',
      totalGoals: 8,
      totalBMPs: 31,
      completionRate: 0,
    },
    goals: [
      {
        description:
          'Reduce sediment yields in the Broken Pumpkin Creek watershed by 77-97% to reflect stable conditions.',
        schedule: 'Project duration',
        sourceExcerpt:
          'a reduction in sediment of 77% to 97% is recommended in the Broken Pumpkin Creek watershed.',
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
          'Coordinate with partners to determine priority areas contributing significant pollutant loads.',
        schedule: 'Months 1-2',
        sourceExcerpt:
          'Coordinate with the MDEQ, NRCS, MSWCC, USGS, and the Noxubee and Lowndes Co. Soil and Water Districts to determine priority areas that are contributing significant pollutant loads',
      },
      {
        description:
          'Establish Watershed Implementation Team to refine the Watershed Based Plan.',
        schedule: 'Months 1-2',
        sourceExcerpt:
          'Establish Watershed Implementation Team to begin refinement of Watershed Based Plan for Broken Pumpkin Creek Watershed',
      },
      {
        description:
          'Initiate watershed monitoring to establish baseline conditions.',
        schedule: 'Completed using historical data',
        sourceExcerpt:
          'Initiate watershed monitoring Baseline condition monitoring Completed using historical data',
      },
      {
        description:
          'Secure landowner commitments to install BMPs in priority areas.',
        schedule: 'Months 1-6',
        sourceExcerpt:
          'Meet with landowners and cooperators to secure commitments to install BMPs in priority areas',
      },
      {
        description:
          'Implement BMPs in targeted areas to reduce sediment and improve water quality.',
        schedule: 'Months 6-36',
        sourceExcerpt: 'Implement BMPs BMP installation Months 6-36',
      },
      {
        description:
          'Finalize education and outreach plan and schedule events.',
        schedule: 'Months 8-36',
        sourceExcerpt:
          'Finalize education and outreach plan Education/Outreach events scheduled Months 8-36',
      },
    ],
    bmps: [
      {
        name: 'Brush Management',
        description:
          'Control or removal of undesirable brush species to reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 5,
        unit: 'ac',
        estimatedCost: 222.15,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Brush Management ac 5 $44.43 $222.15',
      },
      {
        name: 'Herbaceous Weed Management',
        description:
          'Control of herbaceous weeds to improve vegetative cover and reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 325,
        unit: 'ac',
        estimatedCost: 21060,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Herbaceous Weed Management ac 325 $64.80 $21,060.00',
      },
      {
        name: 'Prescribed Burning',
        description:
          'Controlled burning to manage vegetation and reduce wildfire risk.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 350,
        unit: 'ac',
        estimatedCost: 14920.5,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Prescribed Burning ac 350 $42.63 $14,920.50',
      },
      {
        name: 'Cover Crop',
        description:
          'Planting cover crops to reduce soil erosion and improve soil health.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 55,
        unit: 'ac',
        estimatedCost: 26611.2,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Critical Area Planting ac 55 $483.84 $26,611.20',
      },
      {
        name: 'Sediment Basin',
        description: 'Construction of basins to trap sediment from runoff.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 5000,
        unit: 'cu yd',
        estimatedCost: 16700,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Sediment Basin cu yd 5000 $3.34 $16,700.00',
      },
      {
        name: 'Diversion',
        description:
          'Construction of channels or berms to divert runoff and reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 2500,
        unit: 'cu yd',
        estimatedCost: 6000,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Diversion cu yd 2500 $2.40 $6,000.00',
      },
      {
        name: 'Pond',
        description: 'Construction of ponds to capture runoff and sediment.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 20000,
        unit: 'ft',
        estimatedCost: 44400,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Fence ft 20000 $2.22 $44,400.00',
      },
      {
        name: 'Field Border',
        description:
          'Establishment of vegetative borders around fields to trap sediment.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 54,
        unit: 'ac',
        estimatedCost: 34084.8,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Field Border ac 54 $631.20 $34,084.80',
      },
      {
        name: 'Filter Strip',
        description:
          'Planting filter strips to trap sediment and nutrients from runoff.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 50,
        unit: 'ac',
        estimatedCost: 7317.5,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Filter Strip ac 50 $146.35 $7,317.50',
      },
      {
        name: 'Firebreak',
        description:
          'Establishment of firebreaks to control prescribed burns and prevent wildfire spread.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
          'Establishment of grassed waterways to convey runoff and reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 10,
        unit: 'ac',
        estimatedCost: 17538.1,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Grassed Waterway ac 10 $1,753.81 $17,538.10',
      },
      {
        name: 'Irrigation Pipeline',
        description:
          'Installation of pipelines for irrigation to improve water management.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 20000,
        unit: 'ft',
        estimatedCost: 437000,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Irrigation Pipeline ft 20000 $21.85 $437,000.00',
      },
      {
        name: 'Irrigation Reservoir',
        description: 'Construction of reservoirs for irrigation water storage.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 40000,
        unit: 'cu yd',
        estimatedCost: 328400,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Irrigation Reservoir cu yd 40000 $8.21 $328,400.00',
      },
      {
        name: 'Land Clearing',
        description: 'Clearing land to prepare for conservation practices.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 20,
        unit: 'ac',
        estimatedCost: 10613,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Land Clearing ac 20 $530.65 $10,613.00',
      },
      {
        name: 'Tree/Shrub Preparation',
        description: 'Preparation of land for tree and shrub establishment.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 350,
        unit: 'ac',
        estimatedCost: 89267.5,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Tree/Shrub Preparation ac 350 $255.05 $89,267.50',
      },
      {
        name: 'Forage and Biomass Planting',
        description: 'Planting forage and biomass crops to improve soil cover.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 60,
        unit: 'ac',
        estimatedCost: 6568.8,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Forage and Biomass Planting ac 60 $109.48 $6,568.80',
      },
      {
        name: 'Livestock Pipeline',
        description:
          'Installation of pipelines to provide water for livestock.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 8000,
        unit: 'ft',
        estimatedCost: 15280,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Livestock Pipeline ft 8000 $1.91 $15,280.00',
      },
      {
        name: 'Prescribed Grazing',
        description:
          'Managed grazing to improve pasture condition and reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 15000,
        unit: 'ft',
        estimatedCost: 15600,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Heavy Use Area Protection ft 15000 $1.04 $15,600.00',
      },
      {
        name: 'Livestock Shelter Structure',
        description:
          'Construction of shelters for livestock to reduce impacts on sensitive areas.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 2000,
        unit: 'ft',
        estimatedCost: 6760,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Livestock Shelter Structure ft 2000 $3.38 $6,760.00',
      },
      {
        name: 'Stream Crossing',
        description:
          'Installation of stabilized stream crossings for livestock or equipment.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 4400,
        unit: 'ft',
        estimatedCost: 9064,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Structure for Water Control ft 4400 $2.06 $9,064.00',
      },
      {
        name: 'Terrace',
        description:
          'Construction of terraces to reduce slope length and control erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 9000,
        unit: 'ft',
        estimatedCost: 14310,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Terrace ft 9000 $1.59 $14,310.00',
      },
      {
        name: 'Tree/Shrub Establishment',
        description:
          'Establishment of trees and shrubs to stabilize soil and improve habitat.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 66700,
        unit: 'ea',
        estimatedCost: 28014,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Tree/Shrub Establishment ea 66700 $0.42 $28,014.00',
      },
      {
        name: 'Watering Facility',
        description:
          'Installation of watering facilities for livestock to reduce stream access.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 2500,
        unit: 'ft',
        estimatedCost: 13475,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Underground Outlet ft 2500 $5.39 $13,475.00',
      },
      {
        name: 'Early Successional Habitat Development/Management',
        description:
          'Development and management of early successional habitat for wildlife.',
        type: 'other',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
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
          'Improvement of forest stands to enhance habitat and reduce erosion.',
        type: 'Sediment',
        targetAreas: ['Broken Pumpkin Creek Watershed'],
        quantity: 500,
        unit: 'ac',
        estimatedCost: 105295,
        schedule: 'Full Project Implementation',
        sourceExcerpt: 'Forest Stand Improvement ac 500 $210.59 $105,295.00',
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
          'Facilitate meetings, media, and social media promotion of the project, and coordinate activities to fully implement this plan.',
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
          'Determine priority areas within the sub-watershed contributing significant pollutant loads using GIS applications and site surveys.',
        responsibleParties: [
          {
            name: 'local SWCD',
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
            name: 'local SWCD',
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
            name: 'monitoring partners',
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
            name: 'local SWCD',
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
          'Submit blank copies of standard maintenance agreements to MDEQ. (Months 13-36)',
      },
      {
        description: 'Conduct inspections of BMPs during construction.',
        responsibleParties: [
          {
            name: 'local SWCD',
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
          'Conduct inspections of BMPs during construction (Months 3-36)',
      },
      {
        description:
          'Collect GPS coordinates of all installed BMPs and incorporate into GIS format.',
        responsibleParties: [
          {
            name: 'local SWCD',
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
          'Coordinate with and support the local SWCD, MSWCC and NRCS in the collection of relevant GPS coordinates of all installed BMPs and incorporate this information into a GIS format. (Months 3-36)',
      },
      {
        description:
          'Collect photo documentation before, during, and after installation of BMPs.',
        responsibleParties: [
          {
            name: 'local SWCD',
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
          'Collect adequate photo documentation before, during, and after installation of the approved BMPs (Months 3-36)',
      },
      {
        description:
          'Report measured or estimated nonpoint source pollutant load reduction, acreage affected, pre-and post-site conditions, and GIS data.',
        responsibleParties: [
          {
            name: 'local SWCD',
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
        frequency: 'Not specified',
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
        locations: ['Broken Pumpkin Creek'],
      },
      {
        parameter: 'pH',
        type: 'chemical',
        method: 'In-situ field measurement',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'pH',
            description: '6.0-9.0',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
      },
      {
        parameter: 'Temperature',
        type: 'physical',
        method: 'In-situ field measurement',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'Temperature',
            description: 'Not to exceed 90°F',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt: 'Temperature Not to exceed 90°F',
      },
      {
        parameter: 'Specific Conductance',
        type: 'chemical',
        method: 'In-situ field measurement',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'Specific Conductance',
            description: 'Less Than 1000 micromhos/cm',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt: 'Specific Conductance Less Than 1000 micromhos/cm',
      },
      {
        parameter: 'Dissolved Solids',
        type: 'chemical',
        method: 'Water chemistry analysis',
        frequency: 'Monthly average',
        thresholds: [
          {
            parameter: 'Dissolved Solids',
            description:
              'Monthly average less than 750 mg/L; instantaneous threshold less than 1500 mg/L',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt:
          'Dissolved Solids Monthly average less than 750 mg/L; instantaneous threshold less than 1500 mg/L',
      },
      {
        parameter: 'Total Suspended Solids',
        type: 'chemical',
        method: 'Water chemistry analysis',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'Total Suspended Solids',
            description: '65 mg/L',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt: 'Total Suspended Solids 65 mg/L',
      },
      {
        parameter: 'Turbidity',
        type: 'physical',
        method: 'In-situ field measurement',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'Turbidity',
            description: '75 NTU',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt: 'Turbidity 75 NTU',
      },
      {
        parameter: 'Chemical Oxygen Demand',
        type: 'chemical',
        method: 'Water chemistry analysis',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'Chemical Oxygen Demand',
            description: '35 mg/L',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt: 'Chemical Oxygen Demand 35 mg/L',
      },
      {
        parameter: 'M-BISQ (Mississippi Benthic Index of Stream Quality)',
        type: 'biological',
        method: 'Biological community monitoring',
        frequency: 'Not specified',
        thresholds: [
          {
            parameter: 'M-BISQ East Bioregion',
            description: '71.6 Calibration 3',
          },
        ],
        locations: ['Broken Pumpkin Creek'],
        sourceExcerpt:
          'M-BISQ East Bioregion 71.6 Calibration 3 (Applicable to waters outside the Mississippi Alluvial Plain)',
      },
    ],
    outreach: [
      {
        type: 'education program',
        description:
          'Water Model Presentations using Enviroscapes and groundwater aquifer models with interactive lesson plans.',
        schedule: 'As needed',
        indicator: 'Number of presentations and participants',
        partners: ['MDEQ'],
        sourceExcerpt:
          'Water Model Presentations - Enviroscapes and groundwater aquifer models distributed statewide with training and related interactive lesson plans.',
      },
      {
        type: 'teacher workshop',
        description:
          'Teacher Workshops to train educators about NPS pollution and provide classroom materials.',
        schedule: 'As needed',
        indicator: 'Number of workshops and trained educators',
        partners: ['MDEQ'],
        sourceExcerpt:
          'Teacher Workshops – train educators in proximity to the watershed about NPS pollution and provide materials and information that can be used in their classrooms.',
      },
      {
        type: 'public workshop',
        description:
          'Adopt A Stream workshops and training venues for citizens, teachers, and students.',
        schedule: 'As needed',
        indicator: 'Number of workshops and participants',
        partners: ['MDEQ'],
        sourceExcerpt:
          'Adopt A Stream - workshops and training venues for citizens, teachers, and students in the Dry Creek Watershed.',
      },
      {
        type: 'mobile classroom',
        description:
          'Watershed Harmony Mobile Classroom for K-12 and adults with public education objectives.',
        schedule: 'As needed',
        indicator: 'Number of classroom visits and participants',
        partners: ['MDEQ'],
        sourceExcerpt:
          'Watershed Harmony Mobile Classroom - for ages kindergarten – adults with state and federal public education objectives tailored for 4 th and 5 th grade students.',
      },
      {
        type: 'train-the-trainer workshop',
        description:
          'Train the Trainer workshops and materials for Soil and Water districts, Extension Service, etc.',
        schedule: 'As needed',
        indicator: 'Number of trainers trained',
        partners: ['MDEQ'],
        sourceExcerpt:
          '“Train the Trainer” - workshops and materials for Soil and Water districts, Extension Service, etc.',
      },
      {
        type: 'stakeholder meeting',
        description:
          'Broken Pumpkin Creek Watershed Implementation Team (WIT) will participate in a minimum of 3 face-to-face meetings.',
        schedule: 'At least 3 meetings during project',
        indicator: 'Number of meetings held and participants',
        partners: ['MDEQ', 'WIT'],
        sourceExcerpt:
          'the stakeholder group forming the Broken Pumpkin Creek Watershed Implementation Team (WIT) will participate in a minimum of 3 face-to-face meetings.',
      },
      {
        type: 'field day',
        description:
          'Host field days to showcase implemented BMPs for the public.',
        schedule: 'During project period',
        indicator: 'Number of field days held',
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
      },
    ],
    contacts: [],
    organizations: [
      {
        name: 'Mississippi Department of Environmental Quality',
        contact: {},
      },
      {
        name: 'Mississippi Soil and Water Conservation Commission',
        contact: {},
      },
      {
        name: 'Natural Resource Conservation Service',
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
