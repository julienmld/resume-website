import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { Chart, ChartType, DoughnutController, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, BarController } from 'chart.js';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BackendService } from '../../services/backend.service';
import { StatisticDTO } from '../../models/StatisticDTO';
import { AppearOnScrollDirective } from '../../services/appear-on-scroll.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommunicationService } from '../../services/communication.service';
import { get } from 'http';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgIf, TranslateModule, AppearOnScrollDirective, MatProgressSpinnerModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements AfterViewInit, OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('barCanvasWrapper') barCanvasWrapper!: ElementRef;
  private comService = inject(CommunicationService);
  private translateService = inject(TranslateService);
  private backendService = inject(BackendService);
  private platformId = inject(PLATFORM_ID);
  translations: any;
  doughnutChart!: Chart;
  barChart!: Chart;
  months: string[] = [];
  statisticDTO: StatisticDTO | undefined;
  loading: boolean = true;
  barChartInitialized: boolean = false;

  ngOnInit(): void {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

    this.comService.buttonClicked$.subscribe(() => {
      setTimeout(() => {
        this.translateCharts();
      }, 100);
    });
  }

  ngAfterViewInit(): void {
    this.translateService.get('statistics-page').subscribe((res: string) => {
      this.translations = res;
    });

    this.months = this.getTranslatedMonths();
    if (isPlatformBrowser(this.platformId)) {
      this.backendService.getStatistics().subscribe((res: StatisticDTO) => {
        this.statisticDTO = res;
        this.loading = false;
        this.createDoughnutChart();
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !this.barChartInitialized) {
                this.barChartInitialized = true;
                this.createBarChart();
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(this.barCanvasWrapper.nativeElement);
      });
      /**this.statisticDTO = {
        "numberDeveloper": 5,
        "numberRecruiter": 4,
        "numberStudent": 6,
        "numberClient": 2,
        "numberCurious": 9,
        "numberOther": 3,
        "deviceStatistics": new Map<number, number[]>([
          [8, [10, 0]],
          [9, [0, 0]],
          [10, [0, 0]],
          [11, [0, 0]],
          [12, [7, 3]],
        ])
      }

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.loading = false;
          this.createDoughnutChart();
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !this.barChartInitialized) {
                  this.barChartInitialized = true;
                  this.createBarChart();
                }
              });
            },
            { threshold: 0.1 }
          );

          observer.observe(this.barCanvasWrapper.nativeElement);
        }, 2000);
      }*/
    }
  }

  translateCharts() {
    this.translateService.get('statistics-page').subscribe((res: string) => {
      this.translations = res;
    });

    const english = this.translateService.getDefaultLang() === 'en';
    this.months = this.getTranslatedMonths();
    this.doughnutChart.data.labels = [this.translations.developers, this.translations.recruiters, this.translations.students, this.translations.clients, this.translations.curious, this.translations.others];
    this.doughnutChart.data.datasets[0].label = this.translations.visitors;
    this.doughnutChart.update();

    const monthsToDisplay: string[] = [];
    this.statisticDTO?.deviceStatistics.forEach((value, key) => {
      monthsToDisplay.push(english ? this.months[key - 1] : this.months[key - 1]);
    });
    this.barChart.data.labels = monthsToDisplay;
    this.barChart.data.datasets[0].label = this.translations.computers;
    this.barChart.data.datasets[1].label = this.translations.mobiles;
    this.barChart.update();

  }

  getTranslatedMonths(): string[] {
    switch (this.translateService.getDefaultLang()) {
      case 'en':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      case 'sp':
        return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      case 'fr':
      default:
        return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    }
  }

  createDoughnutChart() {
    const canvas = this.doughnutCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (this.statisticDTO) {
      this.doughnutChart = new Chart(ctx, {
        type: 'doughnut' as ChartType,
        data: {
          labels: [this.translations.developers, this.translations.recruiters, this.translations.students, this.translations.clients, this.translations.curious, this.translations.others],
          datasets: [
            {
              label: this.translations.visitors,
              data: [this.statisticDTO.numberDeveloper, this.statisticDTO.numberRecruiter, this.statisticDTO.numberStudent, this.statisticDTO.numberClient, this.statisticDTO.numberCurious, this.statisticDTO.numberOther],
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
              labels: {
                color: 'white',
              }
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }

  }

  createBarChart() {
    const monthsToDisplay: string[] = [];
    const computerToDisplay: number[] = [];
    const mobileToDisplay: number[] = [];

    this.statisticDTO?.deviceStatistics.forEach((value, key) => {
      monthsToDisplay.push(this.months[key - 1]);
      computerToDisplay.push(value[0]);
      mobileToDisplay.push(value[1]);
    });

    const ctx = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: {
        labels: monthsToDisplay,
        datasets: [
          {
            label: this.translations.computers,
            data: computerToDisplay,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1,
          },
          {
            label: this.translations.mobiles,
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
            ticks: {
              color: 'white',
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
            }
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}