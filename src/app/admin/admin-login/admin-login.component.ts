import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div class="login-card">
        <div class="login-header text-center mb-4">
          <div class="login-logo">KD</div>
          <h4 class="mt-3">Admin Panel</h4>
          <p class="text-muted small">Portfolio Management</p>
        </div>
        <div class="alert alert-danger py-2 small" *ngIf="error">{{ error }}</div>
        <div class="mb-3">
          <label class="form-label small fw-semibold">Email</label>
          <input type="email" class="form-control form-control-dark" [(ngModel)]="email"
            placeholder="admin@example.com" (keyup.enter)="login()">
        </div>
        <div class="mb-4">
          <label class="form-label small fw-semibold">Password</label>
          <input type="password" class="form-control form-control-dark" [(ngModel)]="password"
            placeholder="Enter password" (keyup.enter)="login()">
        </div>
        <button class="btn btn-login w-100" (click)="login()" [disabled]="loading">
          <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i *ngIf="!loading" class="bi bi-box-arrow-in-right me-2"></i>
          {{ loading ? 'Signing in…' : 'Sign In' }}
        </button>
        <div class="text-center mt-3">
          <a href="#/" class="text-muted small text-decoration-none">
            <i class="bi bi-arrow-left me-1"></i>Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page { background: #0a0a14; }
    .login-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 420px; }
    .login-logo { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, #6c63ff, #a29bfe); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0 auto; }
    h4 { color: #fff; font-weight: 700; }
    .form-label { color: rgba(255,255,255,0.7); }
    .form-control-dark { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; }
    .form-control-dark:focus { background: rgba(255,255,255,0.08); border-color: #6c63ff; box-shadow: 0 0 0 3px rgba(108,99,255,0.2); color: #fff; }
    .form-control-dark::placeholder { color: rgba(255,255,255,0.3); }
    .btn-login { background: linear-gradient(135deg, #6c63ff, #a29bfe); color: #fff; border: none; padding: 0.75rem; border-radius: 10px; font-weight: 600; }
    .btn-login:hover:not(:disabled) { opacity: 0.9; color: #fff; }
    .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      this.error = 'Please enter your email and password.';
      return;
    }
    this.loading = true;
    this.error = '';
    const success = await this.auth.login(this.email, this.password);
    this.loading = false;
    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = 'Invalid credentials. Check your email and password.';
    }
  }
}
