import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-wrap d-flex">
      <aside class="admin-sidebar d-flex flex-column">
        <div class="sidebar-brand">
          <div class="brand-logo">KD</div>
          <div>
            <div class="brand-name">Kalash Date</div>
            <div class="brand-sub">Portfolio Admin</div>
          </div>
        </div>
        <nav class="sidebar-nav flex-grow-1">
          <div class="nav-section">MENU</div>
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <i class="bi bi-grid"></i><span>Dashboard</span>
          </a>
          <a routerLink="/admin/hero" routerLinkActive="active" class="nav-item">
            <i class="bi bi-person-badge"></i><span>Hero</span>
          </a>
          <a routerLink="/admin/about" routerLinkActive="active" class="nav-item">
            <i class="bi bi-info-circle"></i><span>About</span>
          </a>
          <a routerLink="/admin/skills" routerLinkActive="active" class="nav-item">
            <i class="bi bi-lightning"></i><span>Skills</span>
          </a>
          <a routerLink="/admin/experience" routerLinkActive="active" class="nav-item">
            <i class="bi bi-briefcase"></i><span>Experience</span>
          </a>
          <a routerLink="/admin/projects" routerLinkActive="active" class="nav-item">
            <i class="bi bi-folder2-open"></i><span>Projects</span>
          </a>
          <a routerLink="/admin/education" routerLinkActive="active" class="nav-item">
            <i class="bi bi-mortarboard"></i><span>Education</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <a href="#/" class="nav-item"><i class="bi bi-eye"></i><span>View Site</span></a>
          <button class="nav-item btn-logout w-100 text-start border-0" (click)="logout()">
            <i class="bi bi-box-arrow-left"></i><span>Logout</span>
          </button>
        </div>
      </aside>
      <div class="admin-main flex-grow-1">
        <div class="admin-topbar d-flex align-items-center justify-content-between px-4 py-3">
          <h6 class="m-0 text-white fw-semibold">Portfolio Admin Panel</h6>
          <div class="d-flex align-items-center gap-3">
            <a href="#/" target="_blank" class="btn btn-sm btn-outline-light px-3">
              <i class="bi bi-eye me-1"></i>Preview
            </a>
            <div class="admin-avatar">KD</div>
          </div>
        </div>
        <div class="admin-content p-4">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-wrap { min-height: 100vh; background: #0a0a14; }
    .admin-sidebar { width: 240px; min-height: 100vh; background: rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.07); padding: 0; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; }
    .sidebar-brand { display: flex; align-items: center; gap: 0.75rem; padding: 1.25rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .brand-logo { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg,#6c63ff,#a29bfe); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 0.9rem; flex-shrink: 0; }
    .brand-name { color: #fff; font-weight: 700; font-size: 0.9rem; }
    .brand-sub { color: rgba(255,255,255,0.35); font-size: 0.7rem; }
    .sidebar-nav { padding: 1rem 0.75rem; }
    .nav-section { color: rgba(255,255,255,0.3); font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.5rem 0.75rem 0.5rem; }
    .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 0.75rem; border-radius: 8px; color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.875rem; font-weight: 500; margin-bottom: 2px; transition: all 0.2s; background: transparent; cursor: pointer; }
    .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
    .nav-item.active { background: rgba(108,99,255,0.2); color: #a29bfe; }
    .nav-item i { font-size: 1rem; width: 18px; }
    .sidebar-footer { padding: 1rem 0.75rem; border-top: 1px solid rgba(255,255,255,0.07); }
    .btn-logout { color: rgba(255,255,255,0.4) !important; }
    .btn-logout:hover { color: #ff6b6b !important; background: rgba(255,107,107,0.1) !important; }
    .admin-main { margin-left: 240px; }
    .admin-topbar { background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.07); }
    .admin-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#6c63ff,#a29bfe); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #fff; }
    .admin-content { min-height: calc(100vh - 60px); }
  `]
})
export class AdminLayoutComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}
