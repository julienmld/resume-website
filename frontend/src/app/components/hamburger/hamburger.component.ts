import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent implements OnInit {
  private router = inject(Router);
  private lastScrollTop = 0;
  scrolling = false;

  ngOnInit(): void {
    if (typeof window !== "undefined") {
      window.addEventListener('load', () => {
        const banner = document.querySelector('.sidebarIconToggle');
        if (banner) {
          banner.classList.add('show');
        }
      });
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(): void {
    const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
    this.scrolling = currentScroll > this.lastScrollTop;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  open(page: string) {
    this.close();
    this.router.navigate([page]);
  }

  close() {
    document.getElementById('openSidebarMenu')?.click();
  }

}