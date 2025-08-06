import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ImplementationActivity } from '../../core/interfaces/api.interfaces';

@Component({
  selector: 'app-implementation-status-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="h-full flex flex-col overflow-hidden">
      <div class="chart-header mb-4 flex-shrink-0">
        <h3 class="text-lg font-semibold text-gray-800 text-center">
          Implementation Status Overview
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          Total Activities: {{ implementationData.length }}
        </p>
      </div>

      <div class="chart-wrapper relative flex-1 w-full min-h-0">
        <canvas
          baseChart
          [type]="'doughnut'"
          [labels]="doughnutChartLabels"
          [datasets]="doughnutChartDatasets"
          [options]="doughnutChartOptions"
          [legend]="true"
        ></canvas>
      </div>

      <div
        class="chart-summary mt-4 flex-shrink-0 grid grid-cols-3 gap-4 text-center"
      >
        <div class="bg-green-50 p-3 rounded-lg">
          <div class="text-2xl font-bold text-green-600">
            {{ completedCount }}
          </div>
          <div class="text-sm text-green-700">Completed</div>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">
            {{ inProgressCount }}
          </div>
          <div class="text-sm text-blue-700">In Progress</div>
        </div>
        <div class="bg-yellow-50 p-3 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">
            {{ plannedCount }}
          </div>
          <div class="text-sm text-yellow-700">Planned</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .implementation-chart-container {
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class ImplementationStatusChartComponent implements OnInit {
  @Input() implementationData: ImplementationActivity[] = [];

  // Doughnut Chart properties following ng2-charts pattern
  public doughnutChartLabels: string[] = [
    'Completed',
    'In Progress',
    'Planned',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  completedCount = 0;
  inProgressCount = 0;
  plannedCount = 0;

  ngOnInit() {
    this.calculateCounts();
    this.setupChart();
  }

  private calculateCounts() {
    this.completedCount = this.implementationData.filter(
      (item) => item.status?.toLowerCase() === 'completed'
    ).length;

    this.inProgressCount = this.implementationData.filter(
      (item) =>
        item.status?.toLowerCase() === 'in-progress' ||
        item.status?.toLowerCase() === 'in progress'
    ).length;

    this.plannedCount = this.implementationData.filter(
      (item) => item.status?.toLowerCase() === 'planned'
    ).length;
  }

  private setupChart() {
    // Set datasets
    this.doughnutChartDatasets = [
      {
        data: [this.completedCount, this.inProgressCount, this.plannedCount],
        backgroundColor: [
          '#10b981', // Green for completed
          '#3b82f6', // Blue for in progress
          '#f59e0b', // Yellow for planned
        ],
        borderColor: ['#059669', '#2563eb', '#d97706'],
        borderWidth: 2,
        hoverBackgroundColor: ['#047857', '#1d4ed8', '#b45309'],
      },
    ];

    // Set options
    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%', // Creates the donut hole
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = this.implementationData.length;
              const percentage =
                total > 0 ? Math.round((value / total) * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        duration: 1000,
      },
      elements: {
        arc: {
          borderWidth: 2,
        },
      },
    };
  }
}
