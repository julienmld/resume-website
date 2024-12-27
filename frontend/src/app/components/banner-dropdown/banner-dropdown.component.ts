import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-dropdown',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, TranslateModule],
  templateUrl: './banner-dropdown.component.html',
  styleUrl: './banner-dropdown.component.scss'
})
export class BannerDropdownComponent {
  @Input() title: string = '';
  @Input() pages: string[] = [];
  private router = inject(Router);
  isOpen = false;

  toggleDropdown(state: boolean) {
    this.isOpen = state;
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}