import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PortfolioService, Education } from '../../services/portfolio.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="py-5 section-dark">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Education</span>
          <h2 class="section-title">Academic Background</h2>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="edu-card" *ngFor="let edu of education; let i = index">
              <div class="edu-icon">
                <i class="bi" [class]="i === 0 ? 'bi-mortarboard-fill' : 'bi-award'"></i>
              </div>
              <div class="edu-content">
                <h5 class="edu-degree">{{ edu.degree }}</h5>
                <div class="edu-inst" *ngIf="edu.institution">{{ edu.institution }}</div>
                <div class="edu-meta">
                  <span class="edu-period"><i class="bi bi-calendar3 me-1"></i>{{ edu.period }}</span>
                  <span class="edu-loc" *ngIf="edu.location"><i class="bi bi-geo-alt me-1"></i>{{ edu.location }}</span>
                </div>
              </div>
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
    .edu-card { display: flex; gap: 1.25rem; align-items: flex-start; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem; margin-bottom: 1rem; transition: all 0.3s; }
    .edu-card:hover { border-color: rgba(108,99,255,0.4); }
    .edu-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(108,99,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .edu-icon i { font-size: 1.3rem; color: #6c63ff; }
    .edu-degree { color: #fff; font-size: 1rem; font-weight: 700; margin: 0 0 0.25rem; }
    .edu-inst { color: #6c63ff; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; }
    .edu-meta { display: flex; gap: 1rem; flex-wrap: wrap; }
    .edu-period, .edu-loc { color: rgba(255,255,255,0.45); font-size: 0.8rem; }
  `]
})
export class EducationComponent implements OnInit, OnDestroy {
  education: Education[] = [];
  private sub!: Subscription;
  constructor(private svc: PortfolioService) {}
  ngOnInit() {
    // ✅ FIX: store subscription to unsubscribe on destroy
    this.sub = this.svc.data$.subscribe(d => this.education = d.education);
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }
}