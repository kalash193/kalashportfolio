import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-5 section-dark">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Experience</span>
          <h2 class="section-title">Work Journey</h2>
        </div>
        <div class="timeline">
          <div class="timeline-item" *ngFor="let exp of experience">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <div class="exp-header d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                <div>
                  <h4 class="exp-role">{{ exp.role }}</h4>
                  <div class="exp-company"><i class="bi bi-building me-1"></i>{{ exp.company }}</div>
                </div>
                <div class="text-end">
                  <div class="exp-period badge-period">{{ exp.period }}</div>
                  <div class="exp-location"><i class="bi bi-geo-alt me-1"></i>{{ exp.location }}</div>
                </div>
              </div>
              <ul class="exp-bullets">
                <li *ngFor="let b of exp.bullets">{{ b }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-dark { background: #0d0d1f; }
    .section-badge { background: rgba(108,99,255,0.15); color: #a29bfe; padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .section-title { color: #fff; font-size: 2.2rem; font-weight: 700; margin-top: 0.75rem; }
    .timeline { position: relative; padding-left: 2rem; }
    .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #6c63ff, transparent); }
    .timeline-item { position: relative; margin-bottom: 2rem; }
    .timeline-dot { position: absolute; left: -2.4rem; top: 1.5rem; width: 14px; height: 14px; border-radius: 50%; background: #6c63ff; border: 3px solid #0d0d1f; box-shadow: 0 0 0 3px rgba(108,99,255,0.3); }
    .timeline-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem; transition: border-color 0.3s; }
    .timeline-card:hover { border-color: rgba(108,99,255,0.4); }
    .exp-role { color: #fff; font-size: 1.15rem; font-weight: 700; margin: 0 0 0.25rem; }
    .exp-company { color: #6c63ff; font-size: 0.9rem; font-weight: 600; }
    .badge-period { background: rgba(108,99,255,0.15); color: #a29bfe; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; }
    .exp-location { color: rgba(255,255,255,0.4); font-size: 0.8rem; margin-top: 0.25rem; }
    .exp-bullets { padding-left: 1.25rem; margin: 0; }
    .exp-bullets li { color: rgba(255,255,255,0.65); font-size: 0.9rem; line-height: 1.7; margin-bottom: 0.4rem; }
  `]
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experience: Experience[] = [];
  private sub!: Subscription;
  constructor(private svc: PortfolioService) {}
  ngOnInit() {
    // ✅ FIX: store subscription to unsubscribe on destroy
    this.sub = this.svc.data$.subscribe(d => this.experience = d.experience);
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }
}