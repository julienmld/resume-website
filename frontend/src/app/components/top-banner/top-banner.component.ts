import { Component, inject, OnInit } from '@angular/core';
import { BannerButtonComponent } from '../banner-button/banner-button.component';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BannerDropdownComponent } from "../banner-dropdown/banner-dropdown.component";

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [BannerButtonComponent, RouterLink, TranslateModule, BannerDropdownComponent],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss'
})
export class TopBannerComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    if (typeof window !== "undefined") {
      window.addEventListener('load', () => {
        const banner = document.querySelector('.top-banner');
        if (banner) {
          banner.classList.add('show');
        }
      });
    }
  }

  redirectHome() {
    this.router.navigate(['']);
  }

}