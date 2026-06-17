import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer text-center py-4">
      <div class="container">
        <div class="footer-links mb-3">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <p class="footer-copy">Designed & Built by <span class="highlight">Kalash Date</span> &copy; {{ year }}</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #050510; border-top: 1px solid rgba(255,255,255,0.06); }
    .footer-links { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
    .footer-links a { color: rgba(255,255,255,0.4); font-size: 0.85rem; text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: #6c63ff; }
    .footer-copy { color: rgba(255,255,255,0.3); font-size: 0.8rem; margin: 0; }
    .highlight { color: #6c63ff; font-weight: 600; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
