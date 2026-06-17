import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-white fw-bold mb-1">About Section</h4>
        <p class="text-muted small mb-0">Edit your professional summary</p>
      </div>
      <button class="btn btn-sm btn-save" (click)="save()"><i class="bi bi-check2 me-1"></i>Save</button>
    </div>
    <div class="alert alert-success py-2 small" *ngIf="saved">✓ Saved!</div>
    <div class="field-group">
      <label>Professional Summary</label>
      <textarea class="form-ctrl" rows="8" [(ngModel)]="about"></textarea>
      <div class="text-muted small mt-1">{{ about.length }} characters</div>
    </div>
  `,
  styles: [`
    label { color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.4rem; }
    .form-ctrl { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 0.6rem 0.85rem; font-size: 0.875rem; outline: none; resize: vertical; line-height: 1.7; }
    .form-ctrl:focus { border-color: #6c63ff; }
    .btn-save { background: linear-gradient(135deg,#6c63ff,#a29bfe); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-save:hover { opacity: 0.9; color: #fff; }
  `]
})
export class AdminAboutComponent implements OnInit {
  about = '';
  saved = false;
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.about = this.svc.data.about; }
  save() { this.svc.updateAbout(this.about); this.saved = true; setTimeout(() => this.saved = false, 3000); }
}
