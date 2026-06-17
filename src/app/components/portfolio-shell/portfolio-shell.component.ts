import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-portfolio-shell',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, AboutComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, EducationComponent, ContactComponent, FooterComponent],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-education />
      <app-contact />
    </main>
    <app-footer />
  `
})
export class PortfolioShellComponent {}
