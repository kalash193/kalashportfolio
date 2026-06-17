import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-5 section-darker">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Projects</span>
          <h2 class="section-title">Things I've Built</h2>
        </div>
        <div class="row g-4">
          <div class="col-lg-6" *ngFor="let project of projects">
            <div class="project-card h-100">
              <div class="project-top">
                <div class="project-icon"><i class="bi bi-folder2-open"></i></div>
                <div class="project-links">
                  <a [href]="project.github" target="_blank" class="project-link" *ngIf="project.github" title="GitHub"><i class="bi bi-github"></i></a>
                  <a [href]="project.live" target="_blank" class="project-link" *ngIf="project.live" title="Live"><i class="bi bi-box-arrow-up-right"></i></a>
                </div>
              </div>
              <h4 class="project-title">{{ project.title }}</h4>
              <p class="project-desc">{{ project.description }}</p>
              <ul class="project-bullets">
                <li *ngFor="let b of project.bullets">{{ b }}</li>
              </ul>
              <div class="project-tech mt-auto pt-3">
                <span class="tech-tag" *ngFor="let t of project.tech">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-darker { background: #080814; }
    .section-badge { background: rgba(108,99,255,0.15); color: #a29bfe; padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .section-title { color: #fff; font-size: 2.2rem; font-weight: 700; margin-top: 0.75rem; }
    .project-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; transition: all 0.3s; }
    .project-card:hover { border-color: rgba(108,99,255,0.5); transform: translateY(-5px); background: rgba(108,99,255,0.05); }
    .project-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .project-icon { font-size: 2rem; color: #6c63ff; }
    .project-links { display: flex; gap: 0.75rem; }
    .project-link { color: rgba(255,255,255,0.5); font-size: 1.2rem; text-decoration: none; transition: color 0.2s; }
    .project-link:hover { color: #6c63ff; }
    .project-title { color: #fff; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
    .project-desc { color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-bottom: 0.75rem; }
    .project-bullets { padding-left: 1.25rem; margin: 0; }
    .project-bullets li { color: rgba(255,255,255,0.6); font-size: 0.85rem; line-height: 1.6; margin-bottom: 0.3rem; }
    .tech-tag { background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); color: #00d4ff; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-right: 0.35rem; margin-bottom: 0.35rem; display: inline-block; }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.data$.subscribe(d => this.projects = d.projects); }
}
