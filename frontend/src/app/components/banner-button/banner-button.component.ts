import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './banner-button.component.html',
  styleUrl: './banner-button.component.scss'
})
export class BannerButtonComponent {
  @Input() label: string = '';
}
