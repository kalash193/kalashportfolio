import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, HeroData } from '../../services/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-white fw-bold mb-1">Hero Section</h4>
        <p class="text-muted small mb-0">Edit your name, roles, tagline and contact info</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" (click)="reset()">Reset</button>
        <button class="btn btn-sm btn-save" (click)="save()">
          <i class="bi bi-check2 me-1"></i>Save Changes
        </button>
      </div>
    </div>
    <div class="alert alert-success py-2 small" *ngIf="saved">✓ Hero section saved successfully!</div>
    <div *ngIf="hero" class="row g-3">
      <div class="col-md-6">
        <div class="field-group">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="hero.name" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>Tagline</label>
          <input type="text" [(ngModel)]="hero.tagline" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="hero.email" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>Phone</label>
          <input type="text" [(ngModel)]="hero.phone" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>Location</label>
          <input type="text" [(ngModel)]="hero.location" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>GitHub URL</label>
          <input type="text" [(ngModel)]="hero.github" class="form-ctrl">
        </div>
      </div>
      <div class="col-md-6">
        <div class="field-group">
          <label>LinkedIn URL</label>
          <input type="text" [(ngModel)]="hero.linkedin" class="form-ctrl">
        </div>
      </div>
      <div class="col-12">
        <div class="field-group">
          <label>Roles (one per line)</label>
          <textarea class="form-ctrl" rows="3" [value]="hero.roles.join('\n')" (input)="onRolesChange($event)"></textarea>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .field-group { margin-bottom: 0; }
    label { color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.4rem; }
    .form-ctrl { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 0.6rem 0.85rem; font-size: 0.875rem; outline: none; transition: border-color 0.2s; }
    .form-ctrl:focus { border-color: #6c63ff; background: rgba(108,99,255,0.08); }
    .btn-save { background: linear-gradient(135deg,#6c63ff,#a29bfe); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-save:hover { opacity: 0.9; color: #fff; }
  `]
})
export class AdminHeroComponent implements OnInit, OnDestroy {
  hero: HeroData | null = null;
  saved = false;
  private sub!: Subscription;
  private isDirty = false; // ✅ track if user has started editing

  constructor(private svc: PortfolioService) {}

  ngOnInit() {
    // ✅ FIX: Only load from Firestore if user hasn't started editing
    // Uses isDirty flag instead of checking if hero exists
    this.sub = this.svc.data$.subscribe(d => {
      if (!this.isDirty) {
        this.hero = JSON.parse(JSON.stringify(d.hero));
      }
    });
  }

  ngOnDestroy() {
    // ✅ FIX: Always unsubscribe to prevent memory leaks
    this.sub?.unsubscribe();
  }

  onRolesChange(e: Event) {
    if (this.hero) {
      this.isDirty = true;
      this.hero.roles = (e.target as HTMLTextAreaElement).value.split('\n').filter(r => r.trim());
    }
  }

  onInput() { this.isDirty = true; }

  save() {
    if (!this.hero) return;
    this.svc.updateHero(this.hero);
    this.saved = true;
    this.isDirty = false; // ✅ after save, allow Firestore to sync back
    setTimeout(() => this.saved = false, 3000);
  }

  reset() {
    this.isDirty = false;
    this.hero = JSON.parse(JSON.stringify(this.svc.data.hero));
  }
}