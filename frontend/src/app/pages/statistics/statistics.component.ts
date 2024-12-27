import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Chart, ChartType, DoughnutController, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, BarController } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BackendService } from '../../services/backend.service';
import { StatisticDTO } from '../../models/StatisticDTO';
import { AppearOnScrollDirective } from '../../services/appear-on-scroll.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [TranslateModule, AppearOnScrollDirective, MatProgressSpinnerModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  loading: boolean = true;
  translateService = inject(TranslateService);
  backendService = inject(BackendService);
  translations: any;
  doughnutChart!: Chart;
  barChart!: Chart;
  months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
    this.translateService.get('statistics-page').subscribe((res: string) => {
      this.translations = res;
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.backendService.getStatistics().subscribe((res: StatisticDTO) => {
        this.loading = false;
        this.createDoughnutChart(res);
        this.createBarChart(res);
      });
      /**let s: any = {
        "numberDeveloper": 5,
        "numberRecruiter": 4,
        "numberStudent": 6,
        "numberClient": 2,
        "numberCurious": 9,
        "numberOther": 3,
        "deviceStatistics": {
          "8": [
            10,
            0
          ],
          "9": [
            0,
            0
          ],
          "10": [
            0,
            0
          ],
          "11": [
            0,
            0
          ],
          "12": [
            7,
            3
          ]
        }
      }

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('dialogShown', 'true');
        setTimeout(() => {
          this.loading = false;
          this.createDoughnutChart(s);
          this.createBarChart(s);
        }, 1000);
      }*/


    }
  }

  createDoughnutChart(statisticDTO: StatisticDTO) {
    const canvas = this.doughnutCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut' as ChartType,
      data: {
        labels: [this.translations.developer, this.translations.recruiter, this.translations.student, this.translations.client, this.translations.curious, this.translations.other],
        datasets: [
          {
            label: this.translations.visitors,
            data: [statisticDTO.numberDeveloper, statisticDTO.numberRecruiter, statisticDTO.numberStudent, statisticDTO.numberClient, statisticDTO.numberCurious, statisticDTO.numberOther],
            backgroundColor: ['#FF6384', '#6B5B95', '#88B04B', '#F7CAC9', '#36A2EB', '#955251'],
            hoverBackgroundColor: ['#FF6384', '#6B5B95', '#88B04B', '#F7CAC9', '#36A2EB', '#955251']
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          delay: 700,
          duration: 400,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }

  createBarChart(statisticDTO: StatisticDTO) {

    const monthsToDisplay: string[] = [];
    const computerToDisplay: number[] = [];
    const mobileToDisplay: number[] = [];

    for (const [key, value] of Object.entries(statisticDTO.deviceStatistics)) {
      monthsToDisplay.push(this.months[parseInt(key) - 1]);
      computerToDisplay.push(value[0]);
      mobileToDisplay.push(value[1]);
    }

    const ctx = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: {
        labels: monthsToDisplay,
        datasets: [
          {
            label: this.translations.computer,
            data: computerToDisplay,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1,
          },
          {
            label: this.translations.mobile,
            data: mobileToDisplay,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }

}
