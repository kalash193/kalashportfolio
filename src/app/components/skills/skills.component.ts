import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-5 section-darker">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Skills</span>
          <h2 class="section-title">Technical Arsenal</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let skill of skills">
            <div class="skill-card h-100">
              <div class="skill-card-header">
                <i class="bi" [class]="getCategoryIcon(skill.category)"></i>
                <h5>{{ skill.category }}</h5>
              </div>
              <div class="skill-tags">
                <span class="skill-tag" *ngFor="let item of skill.items">{{ item }}</span>
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
    .skill-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem; transition: all 0.3s; }
    .skill-card:hover { border-color: rgba(108,99,255,0.5); transform: translateY(-4px); background: rgba(108,99,255,0.05); }
    .skill-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .skill-card-header i { font-size: 1.4rem; color: #6c63ff; }
    .skill-card-header h5 { color: #fff; margin: 0; font-size: 1rem; font-weight: 600; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .skill-tag { background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.25); color: #a29bfe; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 500; }
  `]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.data$.subscribe(d => this.skills = d.skills); }

  getCategoryIcon(cat: string): string {
    const map: Record<string, string> = {
      'Frontend': 'bi-layout-text-window-reverse', 'Backend': 'bi-server',
      'Database': 'bi-database', 'Tools & DevOps': 'bi-tools', 'Soft Skills': 'bi-people'
    };
    return map[cat] || 'bi-code-slash';
  }
}
