import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommunicationService } from '../../services/communication.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-banner',
  standalone: true,
  imports: [FormsModule, TranslateModule, NgClass, MatTooltipModule, MatSlideToggleModule],
  templateUrl: './bottom-banner.component.html',
  styleUrl: './bottom-banner.component.scss'
})
export class BottomBannerComponent implements OnInit {
  @Input() isHomePage: boolean = true;
  private commService = inject(CommunicationService);
  private translate = inject(TranslateService);
  private eRef = inject(ElementRef);
  private lastScrollTop = 0;
  scrolling = false;
  settingsVisible = false;
  isDarkTheme = true;

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
    this.scrolling = currentScroll > this.lastScrollTop;
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

  clickSettings() {
    this.settingsVisible = !this.settingsVisible;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.settingsVisible = false;
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (!this.isDarkTheme) {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');

    }
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
      particlesElement.style.filter = this.isDarkTheme ? 'invert(0)' : 'invert(1)';
    }
  }

}