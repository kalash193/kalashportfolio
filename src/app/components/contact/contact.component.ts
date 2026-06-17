import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, HeroData } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-5 section-darker">
      <div class="container py-4">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Contact</span>
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-sub">I'm currently looking for new opportunities. Feel free to reach out!</p>
        </div>
        <div class="row justify-content-center g-4" *ngIf="hero">
          <div class="col-md-4">
            <a [href]="'mailto:' + hero.email" class="contact-card text-decoration-none">
              <div class="contact-icon"><i class="bi bi-envelope-fill"></i></div>
              <div class="contact-label">Email</div>
              <div class="contact-value">{{ hero.email }}</div>
            </a>
          </div>
          <div class="col-md-4">
            <a [href]="'tel:' + hero.phone" class="contact-card text-decoration-none">
              <div class="contact-icon"><i class="bi bi-telephone-fill"></i></div>
              <div class="contact-label">Phone</div>
              <div class="contact-value">{{ hero.phone }}</div>
            </a>
          </div>
          <div class="col-md-4">
            <a [href]="hero.github" target="_blank" class="contact-card text-decoration-none">
              <div class="contact-icon"><i class="bi bi-github"></i></div>
              <div class="contact-label">GitHub</div>
              <div class="contact-value">github.com/kalash193</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-darker { background: #080814; }
    .section-badge { background: rgba(108,99,255,0.15); color: #a29bfe; padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
    .section-title { color: #fff; font-size: 2.2rem; font-weight: 700; margin-top: 0.75rem; }
    .section-sub { color: rgba(255,255,255,0.5); font-size: 1rem; }
    .contact-card { display: flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem 1.5rem; text-align: center; transition: all 0.3s; }
    .contact-card:hover { border-color: rgba(108,99,255,0.5); transform: translateY(-4px); background: rgba(108,99,255,0.05); }
    .contact-icon { width: 60px; height: 60px; border-radius: 50%; background: rgba(108,99,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
    .contact-icon i { font-size: 1.5rem; color: #6c63ff; }
    .contact-label { color: rgba(255,255,255,0.4); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem; }
    .contact-value { color: #fff; font-size: 0.9rem; font-weight: 500; word-break: break-all; }
  `]
})
export class ContactComponent implements OnInit {
  hero!: HeroData;
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.data$.subscribe(d => this.hero = d.hero); }
}
