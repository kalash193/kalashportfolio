import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, HeroData } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero-section d-flex align-items-center">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="container position-relative">
        <div class="row align-items-center min-vh-100 py-5">
          <div class="col-lg-7 hero-content">
            <div class="hero-greeting mb-2">
              <span class="greeting-badge"><i class="bi bi-hand-wave me-2"></i>Hello, I'm</span>
            </div>
            <h1 class="hero-name mb-2">{{ hero.name }}</h1>
            <div class="hero-roles mb-3">
              <span class="role-tag" *ngFor="let role of hero.roles">{{ role }}</span>
            </div>
            <p class="hero-tagline mb-4">{{ hero.tagline }}</p>
            <div class="hero-meta mb-4">
              <span class="meta-item"><i class="bi bi-geo-alt me-1"></i>{{ hero.location }}</span>
              <span class="meta-item"><i class="bi bi-envelope me-1"></i>{{ hero.email }}</span>
            </div>
            <div class="hero-actions d-flex flex-wrap gap-3">
              <a href="#projects" class="btn btn-primary-custom">
                <i class="bi bi-folder2-open me-2"></i>View Projects
              </a>
              <a href="#contact" class="btn btn-outline-custom">
                <i class="bi bi-chat-dots me-2"></i>Get In Touch
              </a>
              <a [href]="hero.github" target="_blank" class="btn btn-ghost-custom">
                <i class="bi bi-github me-2"></i>GitHub
              </a>
            </div>
          </div>
          <div class="col-lg-5 d-none d-lg-flex justify-content-center">
            <div class="hero-avatar-wrap">
              <div class="hero-avatar">
                <span class="avatar-initials">KD</span>
              </div>
              <div class="floating-card card-1">
                <i class="bi bi-code-slash text-primary"></i>
                <span>React.js</span>
              </div>
              <div class="floating-card card-2">
                <i class="bi bi-layers text-success"></i>
                <span>Angular</span>
              </div>
              <div class="floating-card card-3">
                <i class="bi bi-database text-warning"></i>
                <span>MySQL</span>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-indicator">
          <a href="#about"><i class="bi bi-chevron-double-down"></i></a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section { background: linear-gradient(135deg, #0a0a14 0%, #0d0d2b 50%, #0a0a14 100%); min-height: 100vh; position: relative; overflow: hidden; }
    .hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }
    .shape { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
    .shape-1 { width: 500px; height: 500px; background: #6c63ff; top: -100px; right: -100px; animation: float 8s ease-in-out infinite; }
    .shape-2 { width: 300px; height: 300px; background: #00d4ff; bottom: 100px; left: -50px; animation: float 10s ease-in-out infinite reverse; }
    .shape-3 { width: 200px; height: 200px; background: #ff6584; top: 40%; left: 40%; animation: float 6s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
    .greeting-badge { background: rgba(108,99,255,0.15); border: 1px solid rgba(108,99,255,0.3); color: #a29bfe; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.9rem; display: inline-block; }
    .hero-name { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; background: linear-gradient(135deg, #fff 0%, #a29bfe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.1; }
    .hero-roles { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .role-tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; }
    .hero-tagline { font-size: 1.1rem; color: rgba(255,255,255,0.6); max-width: 500px; line-height: 1.6; }
    .hero-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; }
    .meta-item { color: rgba(255,255,255,0.5); font-size: 0.85rem; }
    .btn-primary-custom { background: linear-gradient(135deg, #6c63ff, #a29bfe); color: #fff; border: none; padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 600; transition: all 0.3s; }
    .btn-primary-custom:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(108,99,255,0.4); color: #fff; }
    .btn-outline-custom { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 600; transition: all 0.3s; }
    .btn-outline-custom:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: #fff; }
    .btn-ghost-custom { background: transparent; color: rgba(255,255,255,0.6); border: none; padding: 0.75rem 1.25rem; font-weight: 500; transition: all 0.3s; }
    .btn-ghost-custom:hover { color: #fff; }
    .hero-avatar-wrap { position: relative; width: 320px; height: 320px; }
    .hero-avatar { width: 240px; height: 240px; border-radius: 50%; background: linear-gradient(135deg, #6c63ff33, #a29bfe33); border: 2px solid rgba(108,99,255,0.4); display: flex; align-items: center; justify-content: center; margin: 40px auto; }
    .avatar-initials { font-size: 5rem; font-weight: 800; background: linear-gradient(135deg, #6c63ff, #a29bfe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .floating-card { position: absolute; background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.5rem; color: #fff; font-size: 0.8rem; font-weight: 600; animation: float 4s ease-in-out infinite; }
    .card-1 { top: 10px; right: 0; animation-delay: 0s; }
    .card-2 { bottom: 80px; left: 0; animation-delay: 1s; }
    .card-3 { bottom: 10px; right: 20px; animation-delay: 2s; }
    .scroll-indicator { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); }
    .scroll-indicator a { color: rgba(255,255,255,0.4); font-size: 1.5rem; text-decoration: none; animation: bounce 2s infinite; display: block; }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  `]
})
export class HeroComponent implements OnInit {
  hero!: HeroData;
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.data$.subscribe(d => this.hero = d.hero); }
}
