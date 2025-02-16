import { Component, } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { upsizeAnimation } from '../../animations/upsizeAnimation';
import { CardComponent } from '../../components/card/card.component';
import { AppearOnScrollDirective } from '../../services/appear-on-scroll.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgClass, MatTooltipModule, CardComponent, AppearOnScrollDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  animations: [upsizeAnimation]
})
export class SkillsComponent {
  technos: any[] = [
    { label: 'Java', img: 'java.webp', part: 'backend' },
    { label: 'Maven', img: 'maven.webp', part: 'backend' },
    { label: 'Spring', img: 'spring.svg', part: 'backend' },
    { label: 'Angular', img: 'angular.webp', part: 'frontend' },
    { label: 'Terraform', img: 'terraform.webp', part: 'devops' },
    { label: 'Ansible', img: 'ansible.webp', part: 'devops' },
    { label: 'Kubernetes', img: 'kubernetes.webp', part: 'devops' },
    { label: 'Helm', img: 'helm.webp', part: 'devops' },
    { label: 'Gitlab', img: 'gitlab.webp', part: 'devops' },
    { label: 'Jenkins', img: 'jenkins.webp', part: 'devops' },
    { label: 'Linux', img: 'linux.webp', part: 'devops' },
    { label: 'Cypress', img: 'cypress.webp', part: 'devops' },
    { label: 'SAFe', img: 'safe.webp', part: 'transverse' }
  ];

  backendTimeline = ['skills-page.backend-timeline.sprint', 'skills-page.backend-timeline.training', 'skills-page.backend-timeline.cracn', 'skills-page.backend-timeline.esir'];
  frontendTimeline = ['skills-page.frontend-timeline.sprint', 'skills-page.frontend-timeline.training', 'skills-page.frontend-timeline.cracn', 'skills-page.frontend-timeline.esir'];
  devopsTimeline = ['skills-page.devops-timeline.sprint', 'skills-page.devops-timeline.cracn'];
  transverseTimeline = [ 'skills-page.transverse-timeline.safe', 'skills-page.transverse-timeline.recruit', 'skills-page.transverse-timeline.tutor'];


  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}