import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-5 section-dark">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">About Me</span>
          <h2 class="section-title">Who Am I?</h2>
        </div>
        <div class="row align-items-center g-4">
          <div class="col-lg-5 text-center">
            <div class="about-avatar-box">
              <div class="about-avatar"><span>KD</span></div>
              <div class="about-stats row g-3 mt-3">
                <div class="col-6">
                  <div class="stat-box">
                    <div class="stat-num">3+</div>
                    <div class="stat-label">Projects Built</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-box">
                    <div class="stat-num">5mo</div>
                    <div class="stat-label">Internship</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-box">
                    <div class="stat-num">40%</div>
                    <div class="stat-label">Bug Reduction</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-box">
                    <div class="stat-num">3yr</div>
                    <div class="stat-label">B.Sc. IT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <p class="about-text">{{ about }}</p>
            <div class="about-highlights mt-4">
              <div class="highlight-item"><i class="bi bi-check-circle-fill text-primary me-2"></i>Open to relocation to Pune</div>
              <div class="highlight-item"><i class="bi bi-check-circle-fill text-primary me-2"></i>Available to join immediately</div>
              <div class="highlight-item"><i class="bi bi-check-circle-fill text-primary me-2"></i>Actively building GitHub portfolio</div>
              <div class="highlight-item"><i class="bi bi-check-circle-fill text-primary me-2"></i>Self-learner with online certifications</div>
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
    .about-avatar { width: 160px; height: 160px; border-radius: 50%; background: linear-gradient(135deg, #6c63ff, #a29bfe); display: flex; align-items: center; justify-content: center; margin: 0 auto; }
    .about-avatar span { font-size: 3.5rem; font-weight: 800; color: #fff; }
    .stat-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1rem; text-align: center; }
    .stat-num { font-size: 1.6rem; font-weight: 700; color: #6c63ff; }
    .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
    .about-text { color: rgba(255,255,255,0.7); font-size: 1rem; line-height: 1.8; }
    .highlight-item { color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; font-size: 0.9rem; }
  `]
})
export class AboutComponent implements OnInit, OnDestroy {
  about = '';
  private sub!: Subscription;
  constructor(private svc: PortfolioService) {}
  ngOnInit() {
    // ✅ FIX: store subscription to unsubscribe on destroy
    this.sub = this.svc.data$.subscribe(d => this.about = d.about);
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }
}