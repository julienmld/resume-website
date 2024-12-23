import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent {
  private router = inject(Router);

  open(page: string) {
    document.getElementById('openSidebarMenu')?.click();
    this.router.navigate([page]);
  }
  
}
