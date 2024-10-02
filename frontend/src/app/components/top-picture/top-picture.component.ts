import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-top-picture',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './top-picture.component.html',
  styleUrl: './top-picture.component.scss'
})
export class TopPictureComponent {
  @Input() title: string = '';
}
