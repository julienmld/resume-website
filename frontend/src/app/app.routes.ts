import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { ArchitectureComponent } from './pages/architecture/architecture.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'architecture', component: ArchitectureComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'experiences', component: ExperiencesComponent },
    { path: 'contact-me', component: ContactComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
