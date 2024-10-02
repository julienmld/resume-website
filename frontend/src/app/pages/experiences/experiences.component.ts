import { Component } from '@angular/core';
import { upsizeAnimation } from '../../animations/upsizeAnimation';
import { NgFor } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimelineComponent } from "../../components/timeline/timeline.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [NgFor, MatTooltipModule, TimelineComponent, CardComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
  animations: [upsizeAnimation]
})
export class ExperiencesComponent {
  studiesTimeline = ['experiences-page.studies-timeline.cupge', 'experiences-page.studies-timeline.esir', 'experiences-page.studies-timeline.imageEt', 'experiences-page.studies-timeline.internship', 'experiences-page.studies-timeline.diploma']
  sopraTimeline = ['experiences-page.sopra-timeline.internship', 'experiences-page.sopra-timeline.contract', 'experiences-page.sopra-timeline.sprint', 'experiences-page.sopra-timeline.transverse', 'experiences-page.sopra-timeline.freelance']

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
