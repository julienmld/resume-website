import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
        style({ transform: 'translateX(10%)', opacity: 0 }),
        animate('1s 0.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('firstSlideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0 }),
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
export class HomeComponent {
  isVisible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isVisible = true;
      }, 300);
    }
  }

}
