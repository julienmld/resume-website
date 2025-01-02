import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('firstSlideIn', [
      transition(':enter', [
        style({ transform: 'translateX({{translateX}})', opacity: 0 }),
        animate('1s 0.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('secundSlideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate('1s 1.9s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  private platformId: Object = inject(PLATFORM_ID);
  isVisible = false;
  isMobile = true;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isVisible = true;
      }, 300);
    }

    if (typeof window !== "undefined") {
      this.isMobile = window.innerWidth < 1000;
    }
  }

}