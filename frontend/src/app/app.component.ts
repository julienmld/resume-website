import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { HamburgerComponent } from "./components/hamburger/hamburger.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBannerComponent, BottomBannerComponent, TranslateModule, HamburgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: []
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);
  private platformId: Object = inject(PLATFORM_ID);
  isHomePage: boolean = false;

  ngOnInit(): void {

    if (typeof window !== "undefined") {
      const particlesElement = document.getElementById('particles-js');
      if (particlesElement) {
        particlesElement.style.filter = 'invert(1)';
      }
    }

    this.translate.setDefaultLang('fr');
    this.translate.get('easter-egg.first-indication').subscribe((res: string) => {
      console.log(res);
    });

    if (isPlatformBrowser(this.platformId) && localStorage.getItem('dialogShown') === null) {
      setTimeout(() => {
        this.openDialog();
      }, 6000);
    }

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.isHomePage = !['/architecture', '/statistics', '/skills', '/experiences', '/contact-me'].includes(event.url);

      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      disableClose: true
    });
  }

}