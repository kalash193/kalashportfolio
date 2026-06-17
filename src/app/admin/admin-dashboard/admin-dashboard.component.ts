import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mb-4">
      <h4 class="text-white fw-bold mb-1">Dashboard</h4>
      <p class="text-muted small">Manage all sections of your portfolio</p>
    </div>
    <div class="row g-3">
      <div class="col-sm-6 col-lg-3" *ngFor="let card of cards">
        <a [routerLink]="card.route" class="dash-card text-decoration-none d-block">
          <div class="dash-icon"><i class="bi" [class]="card.icon"></i></div>
          <div class="dash-title">{{ card.title }}</div>
          <div class="dash-sub">{{ card.sub }}</div>
        </a>
      </div>
    </div>
    <div class="admin-tip mt-4 p-3 rounded">
      <i class="bi bi-lightbulb text-warning me-2"></i>
      <span class="text-muted small">All changes are saved to localStorage and reflected on the portfolio instantly. No refresh needed.</span>
    </div>
  `,
  styles: [`
    .dash-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem; transition: all 0.3s; }
    .dash-card:hover { border-color: rgba(108,99,255,0.5); background: rgba(108,99,255,0.07); transform: translateY(-3px); }
    .dash-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(108,99,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
    .dash-icon i { font-size: 1.2rem; color: #6c63ff; }
    .dash-title { color: #fff; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; }
    .dash-sub { color: rgba(255,255,255,0.35); font-size: 0.75rem; }
    .admin-tip { background: rgba(255,193,7,0.05); border: 1px solid rgba(255,193,7,0.15); }
  `]
})
export class AdminDashboardComponent {
  cards = [
    { title: 'Hero', sub: 'Name, roles, tagline', icon: 'bi-person-badge', route: '/admin/hero' },
    { title: 'About', sub: 'Bio & summary', icon: 'bi-info-circle', route: '/admin/about' },
    { title: 'Skills', sub: 'Categories & tags', icon: 'bi-lightning', route: '/admin/skills' },
    { title: 'Experience', sub: 'Work history', icon: 'bi-briefcase', route: '/admin/experience' },
    { title: 'Projects', sub: 'Portfolio items', icon: 'bi-folder2-open', route: '/admin/projects' },
    { title: 'Education', sub: 'Degrees & courses', icon: 'bi-mortarboard', route: '/admin/education' }
  ];
}
