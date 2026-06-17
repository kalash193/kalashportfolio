import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/portfolio-shell/portfolio-shell.component').then(m => m.PortfolioShellComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'hero', loadComponent: () => import('./admin/admin-hero/admin-hero.component').then(m => m.AdminHeroComponent) },
      { path: 'about', loadComponent: () => import('./admin/admin-about/admin-about.component').then(m => m.AdminAboutComponent) },
      { path: 'skills', loadComponent: () => import('./admin/admin-skills/admin-skills.component').then(m => m.AdminSkillsComponent) },
      { path: 'experience', loadComponent: () => import('./admin/admin-experience/admin-experience.component').then(m => m.AdminExperienceComponent) },
      { path: 'projects', loadComponent: () => import('./admin/admin-projects/admin-projects.component').then(m => m.AdminProjectsComponent) },
      { path: 'education', loadComponent: () => import('./admin/admin-education/admin-education.component').then(m => m.AdminEducationComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
