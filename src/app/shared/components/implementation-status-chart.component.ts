import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ImplementationActivity } from '../../core/interfaces/api.interfaces';

Chart.register(...registerables);

@Component({
  selector: 'app-implementation-status-chart',
  standalone: true,
  imports: [CommonModule],
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
        <canvas #chartCanvas></canvas>
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
export class ImplementationStatusChartComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() implementationData: ImplementationActivity[] = [];

  chart?: Chart;
  completedCount = 0;
  inProgressCount = 0;
  plannedCount = 0;

  ngOnInit() {
    this.calculateCounts();
  }

  ngAfterViewInit() {
    this.createChart();
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

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const data = {
      labels: ['Completed', 'In Progress', 'Planned'],
      datasets: [
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
      ],
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
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
      },
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
