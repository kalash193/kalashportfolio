import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top" [class.scrolled]="scrolled">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#home">
          <span class="brand-text">KD</span>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <i class="bi bi-list text-white fs-4"></i>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto gap-1">
            <li class="nav-item" *ngFor="let link of links">
              <a class="nav-link" [href]="'#' + link.id">{{ link.label }}</a>
            </li>
            <li class="nav-item ms-2">
              <a class="btn btn-outline-light btn-sm px-3" href="#/admin">Admin</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar { background: transparent; transition: all 0.3s ease; padding: 1rem 0; }
    .navbar.scrolled { background: rgba(10,10,20,0.95); backdrop-filter: blur(10px); padding: 0.5rem 0; box-shadow: 0 2px 20px rgba(0,0,0,0.3); }
    .brand-text { color: #6c63ff; font-size: 1.5rem; letter-spacing: 1px; }
    .nav-link { color: rgba(255,255,255,0.85) !important; font-weight: 500; font-size: 0.9rem; transition: color 0.2s; letter-spacing: 0.3px; }
    .nav-link:hover { color: #6c63ff !important; }
  `]
})
export class NavbarComponent {
  scrolled = false;
  links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 50; }
}
