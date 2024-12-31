import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-bottom-banner',
  standalone: true,
  imports: [TranslateModule, MatTooltipModule, NgClass],
  templateUrl: './bottom-banner.component.html',
  styleUrl: './bottom-banner.component.scss'
})
export class BottomBannerComponent implements OnInit {
  @Input() isHomePage: boolean = true;
  private commService = inject(CommunicationService);
  private translate = inject(TranslateService);
  private lastScrollTop = 0;
  scrolling = false;

  ngOnInit(): void {
    if (typeof window !== "undefined") {
      window.addEventListener('load', () => {
        const banner = document.querySelector('.bottom-banner');
        if (banner) {
          banner.classList.add('show');
        }
      });

      if (window.innerWidth < 1000) {
        window.addEventListener('scroll', this.onScroll.bind(this));
      }
    }
  }

  onScroll(): void {
    const currentScroll = document.documentElement.scrollTop;
    if (currentScroll > this.lastScrollTop) {
      this.scrolling = true;
    } else {
      this.scrolling = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  changeLanguage(language: string): void {
    this.translate.setDefaultLang(language);
    this.commService.notifyButtonClicked();
    this.translate.get('easter-egg.first-indication').subscribe((res: string) => {
      console.clear();
      console.log(res);
    });
  }

  downloadCV() {
    const pdfUrl = this.translate.store.defaultLang === 'fr' ? 'assets/document/cv_fr.pdf' : 'assets/document/cv_en.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Julien_MAILLARD.pdf';
    link.click();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

}