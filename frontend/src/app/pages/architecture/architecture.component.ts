import { Component } from '@angular/core';
import { ArchitectureCardComponent } from '../../components/architecture-card/architecture-card.component';
import { ArchitectureArrowComponent } from '../../components/architecture-arrow/architecture-arrow.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { upsizeAnimation } from '../../animations/upsizeAnimation';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [NgFor, ArchitectureCardComponent, ArchitectureArrowComponent, MatTooltipModule, TranslateModule, MatButtonModule],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
  animations: [upsizeAnimation,
    trigger('spin', [
      transition(':increment', [
        style({ transform: 'rotate(0deg)' }),
        animate('1s ease-out', style({ transform: 'rotate(360deg)' }))
      ])
    ])
  ]
})
export class ArchitectureComponent {
  spinValue: number = 0;
  technos: any[] = [
    { label: 'Amplify', img: 'amplify.jpg', part: 'schema' },
    { label: 'API Gateway', img: 'apigateway.png', part: 'schema' },
    { label: 'Lambda', img: 'lambda.png', part: 'schema' },
    { label: 'DynamoDB', img: 'dynamo.jpg', part: 'schema' },
    { label: 'IAM', img: 'iam.jpg', part: 'schema' },
    { label: 'Secret Manager', img: 'secretmanager.jpg', part: 'schema' }
  ];

  schema = {
    frontend: {
      images: ['amplify.jpg', 'angular.png'],
      text: "architecture-page.frontend"
    },
    apigateway: {
      images: ['apigateway.png'],
      text: "architecture-page.gateway"
    },
    backend: {
      images: ['lambda.png', 'spring.svg'],
      text: "architecture-page.backend"
    },
    database: {
      images: ['dynamo.jpg'],
      text: "architecture-page.database"
    },
    iam: {
      images: ['iam.jpg'],
      text: "architecture-page.iam"
    },
    secretManager: {
      images: ['secretmanager.jpg'],
      text: "architecture-page.secret-manager"
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  changeColor() {
    this.spinValue++;
  }

}