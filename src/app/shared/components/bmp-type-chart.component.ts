import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BMP } from '../../core/interfaces/api.interfaces';

@Component({
  selector: 'app-bmp-type-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="h-full flex flex-col">
      <div class="chart-header mb-4 flex-shrink-0">
        <h3 class="text-lg font-semibold text-gray-800 text-center">
          BMP Distribution by Type
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          Total BMPs: {{ totalBMPs }}
        </p>
      </div>

      <div class="chart-wrapper relative flex-1 w-full min-h-0">
        <canvas
          baseChart
          [type]="'pie'"
          [labels]="pieChartLabels"
          [datasets]="pieChartDatasets"
          [options]="pieChartOptions"
          [legend]="true"
        ></canvas>
      </div>

      <div class="chart-summary mt-4 flex-shrink-0">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          @for (item of typeCounts; track item.type) {
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="text-lg font-bold" [style.color]="item.color">
              {{ item.count }}
            </div>
            <div class="text-xs text-gray-700">{{ item.type }}</div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .bmp-chart-container {
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class BmpTypeChartComponent implements OnInit {
  @Input() bmpData: BMP[] = [];

  // Pie Chart properties following ng2-charts pattern
  public pieChartLabels: string[] = [];
  public pieChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  typeCounts: { type: string; count: number; color: string }[] = [];
  totalBMPs = 0;

  // Color scheme for different BMP types
  private colorMap: { [key: string]: string } = {
    Nutrient: '#10b981', // Green
    Sediment: '#f59e0b', // Amber
    Pathogen: '#ef4444', // Red
    Habitat: '#8b5cf6', // Purple
    Hydrologic: '#3b82f6', // Blue
    Structural: '#6b7280', // Gray
    'Non-Structural': '#84cc16', // Lime
    Other: '#f97316', // Orange
  };

  ngOnInit() {
    this.calculateTypeCounts();
    this.setupChart();
  }

  private calculateTypeCounts() {
    const typeCountMap: { [key: string]: number } = {};

    this.bmpData.forEach((bmp) => {
      const type = bmp.type || 'Other';
      typeCountMap[type] = (typeCountMap[type] || 0) + 1;
    });

    this.typeCounts = Object.entries(typeCountMap)
      .map(([type, count]) => ({
        type,
        count,
        color: this.colorMap[type] || this.colorMap['Other'],
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending

    this.totalBMPs = this.bmpData.length;
  }

  private setupChart() {
    const labels = this.typeCounts.map((item) => item.type);
    const data = this.typeCounts.map((item) => item.count);
    const colors = this.typeCounts.map((item) => item.color);

    // Generate border colors (slightly darker)
    const borderColors = colors.map((color) => this.darkenColor(color));

    // Set labels
    this.pieChartLabels = labels;

    // Set datasets
    this.pieChartDatasets = [
      {
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverBackgroundColor: borderColors,
      },
    ];

    // Set options
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: {
              size: 11,
            },
            generateLabels: (chart: any) => {
              const data = chart.data;
              if (data.labels && data.datasets.length) {
                return data.labels.map((label: any, i: any) => {
                  const value = data.datasets[0].data[i] as number;
                  const percentage =
                    this.totalBMPs > 0
                      ? Math.round((value / this.totalBMPs) * 100)
                      : 0;
                  const backgroundColor = Array.isArray(
                    data.datasets[0].backgroundColor
                  )
                    ? (data.datasets[0].backgroundColor[i] as string)
                    : (data.datasets[0].backgroundColor as string);
                  const borderColor = Array.isArray(
                    data.datasets[0].borderColor
                  )
                    ? (data.datasets[0].borderColor[i] as string)
                    : (data.datasets[0].borderColor as string);
                  return {
                    text: `${label}: ${value} (${percentage}%)`,
                    fillStyle: backgroundColor,
                    strokeStyle: borderColor,
                    lineWidth: 2,
                    hidden: false,
                    index: i,
                  };
                });
              }
              return [];
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed;
              const percentage =
                this.totalBMPs > 0
                  ? Math.round((value / this.totalBMPs) * 100)
                  : 0;
              return `${label}: ${value} BMPs (${percentage}%)`;
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

  private darkenColor(color: string): string {
    // Simple color darkening - convert hex to RGB, darken, convert back
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 30);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 30);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 30);
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}
