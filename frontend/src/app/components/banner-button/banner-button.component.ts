import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './banner-button.component.html',
  styleUrl: './banner-button.component.scss'
})
export class BannerButtonComponent {
  @Input() label: string = '';
}