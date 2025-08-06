import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BMP } from '../../core/interfaces/api.interfaces';

@Component({
  selector: 'app-bmp-cost-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="h-full flex flex-col">
      <div class="chart-header mb-4 flex-shrink-0">
        <h3 class="text-lg font-semibold text-gray-800 text-center">
          BMP Cost Analysis
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          Total Cost: {{ totalCost | currency }}
        </p>
      </div>

      <div class="chart-wrapper relative flex-1 w-full min-h-0">
        <canvas
          baseChart
          [type]="'bar'"
          [labels]="barChartLabels"
          [datasets]="barChartDatasets"
          [options]="barChartOptions"
          [legend]="false"
        ></canvas>
      </div>
    </div>
  `,
  styles: [
    `
      .bmp-cost-chart-container {
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class BmpCostChartComponent implements OnInit {
  @Input() bmpData: BMP[] = [];

  // Bar Chart properties following ng2-charts pattern
  public barChartLabels: string[] = [];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [];
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  costData: { name: string; cost: number; color: string }[] = [];
  totalCost = 0;

  // Color scheme for different cost ranges
  private getColorForCost(cost: number, maxCost: number): string {
    const ratio = cost / maxCost;
    if (ratio > 0.8) return '#dc2626'; // Red for highest costs
    if (ratio > 0.6) return '#ea580c'; // Orange for high costs
    if (ratio > 0.4) return '#f59e0b'; // Amber for medium costs
    if (ratio > 0.2) return '#84cc16'; // Lime for low costs
    return '#10b981'; // Green for lowest costs
  }

  ngOnInit() {
    this.calculateCostData();
    this.setupChart();
  }

  private calculateCostData() {
    // Filter BMPs that have estimated costs and sort by cost descending
    const bmpsWithCosts = this.bmpData
      .filter((bmp) => bmp.estimatedCost && bmp.estimatedCost > 0)
      .sort((a, b) => (b.estimatedCost || 0) - (a.estimatedCost || 0));

    // Take top 10 most expensive BMPs to avoid overcrowding
    const topBmps = bmpsWithCosts.slice(0, 10);

    const maxCost = Math.max(...topBmps.map((bmp) => bmp.estimatedCost || 0));

    this.costData = topBmps.map((bmp) => ({
      name: bmp.name,
      cost: bmp.estimatedCost || 0,
      color: this.getColorForCost(bmp.estimatedCost || 0, maxCost),
    }));

    this.totalCost = this.bmpData.reduce(
      (sum, bmp) => sum + (bmp.estimatedCost || 0),
      0
    );
  }

  private setupChart() {
    const labels = this.costData.map((item) => {
      // Truncate long names for chart readability
      return item.name.length > 15
        ? item.name.substring(0, 15) + '...'
        : item.name;
    });
    const data = this.costData.map((item) => item.cost);
    const colors = this.costData.map((item) => item.color);

    // Generate border colors (slightly darker)
    const borderColors = colors.map((color) => this.darkenColor(color));

    // Set labels
    this.barChartLabels = labels;

    // Set datasets
    this.barChartDatasets = [
      {
        label: 'Estimated Cost ($)',
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: borderColors,
      },
    ];

    // Set options
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide legend since we only have one dataset
        },
        tooltip: {
          callbacks: {
            title: (context: any) => {
              // Show full name in tooltip
              const index = context[0].dataIndex;
              return this.costData[index].name;
            },
            label: (context: any) => {
              const value = context.parsed.y;
              return `Estimated Cost: $${value.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Best Management Practices',
            font: {
              size: 12,
            },
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            font: {
              size: 10,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Estimated Cost ($)',
            font: {
              size: 12,
            },
          },
          ticks: {
            callback: function (value: any) {
              return '$' + value.toLocaleString();
            },
            font: {
              size: 10,
            },
          },
          beginAtZero: true,
        },
      },
      animation: {
        duration: 1000,
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
