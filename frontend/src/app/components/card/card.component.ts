import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslateModule, TimelineComponent, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() timeline: any = {};
  @Input() isDescriptionToTheLeft: boolean = true;
}
