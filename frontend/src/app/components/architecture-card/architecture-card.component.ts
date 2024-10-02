import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-architecture-card',
  standalone: true,
  imports: [NgFor, MatTooltipModule, TranslateModule],
  templateUrl: './architecture-card.component.html',
  styleUrl: './architecture-card.component.scss'
})
export class ArchitectureCardComponent {
  @Input() component: any;
}
