import { Component, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { Chart, ChartType, DoughnutController, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale, BarController, RadialLinearScale, PointElement, LineElement, Filler, RadarController } from 'chart.js';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BackendService } from '../../services/backend.service';
import { StatisticDTO } from '../../models/StatisticDTO';
import { AppearOnScrollDirective } from '../../services/appear-on-scroll.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommunicationService } from '../../services/communication.service';

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
  @ViewChild('radarCanvas') radarCanvas!: ElementRef;
  @ViewChild('radarCanvasWrapper') radarCanvasWrapper!: ElementRef;

  private comService = inject(CommunicationService);
  private translateService = inject(TranslateService);
  private backendService = inject(BackendService);
  private platformId = inject(PLATFORM_ID);
  private monthsToDisplay: string[] = [];
  translations: any;
  doughnutChart!: Chart;
  barChart!: Chart;
  radarChart!: Chart;
  statisticDTO: StatisticDTO | undefined;
  loading: boolean = true;
  barChartInitialized: boolean = false;
  radarChartInitialized: boolean = false;

  ngOnInit(): void {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
    Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
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

    if (isPlatformBrowser(this.platformId)) {
      this.backendService.getStatistics().subscribe((res: StatisticDTO) => {
      /**const res = {
        "developers": [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        "recruiters": [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        "students": [[0, 0, 0, 1, 1], [0, 0, 0, 0, 1]],
        "clients": [[1, 0, 0, 0, 0], [1, 2, 3, 4, 5]],
        "curious": [[0, 0, 0, 1, 1], [0, 0, 0, 2, 2]],
        "others": [[0, 0, 0, 0, 1], [1, 2, 3, 4, 5]]
      }*/

      this.statisticDTO = res;
      this.setTranslatedMonths();
      this.createDoughnutChart();
      const barObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.barChartInitialized) {
              this.barChartInitialized = true;
              this.createBarChart();
            }
          });
        },
        { threshold: 0.3 }
      );

      barObserver.observe(this.barCanvasWrapper.nativeElement);

      const radarObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.radarChartInitialized) {
              this.radarChartInitialized = true;
              this.createRadarChart();
            }
          });
        },
        { threshold: 0.3 }
      );
      radarObserver.observe(this.radarCanvasWrapper.nativeElement);
      });
    }
  }

  translateCharts() {
    this.translateService.get('statistics-page').subscribe((res: string) => {
      this.translations = res;
    });

    this.setTranslatedMonths();
    this.doughnutChart.data.labels = [this.translations.developers, this.translations.recruiters, this.translations.students, this.translations.clients, this.translations.curious, this.translations.others];
    this.doughnutChart.data.datasets[0].label = this.translations.visitors;
    this.doughnutChart.update();
    this.barChart.data.labels = this.monthsToDisplay;
    this.barChart.data.datasets[0].label = this.translations.computers;
    this.barChart.data.datasets[1].label = this.translations.mobiles;
    this.barChart.update();
    this.radarChart.data.labels = [this.translations.developers, this.translations.recruiters, this.translations.students, this.translations.clients, this.translations.curious, this.translations.others];
    this.radarChart.data.datasets[0].label = this.translations.computers;
    this.radarChart.data.datasets[1].label = this.translations.mobiles;
    this.radarChart.update();
  }

  setTranslatedMonths() {
    this.monthsToDisplay = [];
    let months: string[] = [];
    switch (this.translateService.getDefaultLang()) {
      case 'en':
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        break;
      case 'sp':
        months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        break;
      case 'fr':
      default:
        months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        break;
    }
    const currentMonth = new Date().getMonth() + 1;
    for (let i = 4; i > -1; i--) {
      const month = ((currentMonth - i - 1 + 12) % 12) + 1;
      this.monthsToDisplay.push(months[month - 1]);
    }
  }

  createDoughnutChart() {
    const developers = this.statisticDTO?.developers.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    const recruiters = this.statisticDTO?.recruiters.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    const students = this.statisticDTO?.students.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    const clients = this.statisticDTO?.clients.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    const curious = this.statisticDTO?.curious.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    const others = this.statisticDTO?.others.flat().reduce((acc, value) => acc + (value ?? 0), 0);
    this.loading = false;
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
              data: [developers ?? 0, recruiters ?? 0, students ?? 0, clients ?? 0, curious ?? 0, others ?? 0],
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
    const computers = [0, 0, 0, 0, 0];
    const mobiles = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      computers[i] = computers[i] + (this.statisticDTO?.developers[0][i] ?? 0) +
        (this.statisticDTO?.recruiters[0][i] ?? 0) +
        (this.statisticDTO?.students[0][i] ?? 0) +
        (this.statisticDTO?.clients[0][i] ?? 0) +
        (this.statisticDTO?.curious[0][i] ?? 0) +
        (this.statisticDTO?.others[0][i] ?? 0);
      mobiles[i] = mobiles[i] + (this.statisticDTO?.developers[1][i] ?? 0) +
        (this.statisticDTO?.recruiters[1][i] ?? 0) +
        (this.statisticDTO?.students[1][i] ?? 0) +
        (this.statisticDTO?.clients[1][i] ?? 0) +
        (this.statisticDTO?.curious[1][i] ?? 0) +
        (this.statisticDTO?.others[1][i] ?? 0);
    }

    const ctx = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: {
        labels: this.monthsToDisplay,
        datasets: [
          {
            label: this.translations.computers,
            data: computers,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1,
          },
          {
            label: this.translations.mobiles,
            data: mobiles,
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

  createRadarChart() {
    const ctx = this.radarCanvas.nativeElement.getContext('2d');
    this.radarChart = new Chart(ctx, {
      type: 'radar' as ChartType,
      data: {
        labels: [this.translations.developers, this.translations.recruiters, this.translations.students, this.translations.clients, this.translations.curious, this.translations.others],
        datasets: [
          {
            label: this.translations.computers,
            data: [
              this.statisticDTO?.developers[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.recruiters[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.students[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.clients[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.curious[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.others[0].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#36A2EB',
            borderWidth: 2,
            pointBackgroundColor: '#36A2EB',
            pointBorderColor: '#fff',
          },
          {
            label: this.translations.mobiles,
            data: [
              this.statisticDTO?.developers[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.recruiters[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.students[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.clients[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.curious[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0,
              this.statisticDTO?.others[1].reduce((accumulator, currentValue) => accumulator + (currentValue ?? 0), 0) ?? 0
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#FF6384',
            borderWidth: 2,
            pointBackgroundColor: '#FF6384',
            pointBorderColor: '#fff',
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              color: 'white',
            },
            grid: {
              color: 'white',
            },
            ticks: {
              color: 'black',
            },
            pointLabels: {
              color: 'white',
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}