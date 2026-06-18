import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, Education } from '../../services/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-white fw-bold mb-1">Education</h4>
        <p class="text-muted small mb-0">Manage degrees and courses</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-add" (click)="add()"><i class="bi bi-plus me-1"></i>Add</button>
        <button class="btn btn-sm btn-save" (click)="save()"><i class="bi bi-check2 me-1"></i>Save</button>
      </div>
    </div>
    <div class="alert alert-success py-2 small" *ngIf="saved">✓ Education saved!</div>
    <div class="edu-block" *ngFor="let edu of education; let i = index">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="block-num">Entry {{ i + 1 }}</span>
        <button class="btn-del" (click)="remove(i)"><i class="bi bi-trash3"></i></button>
      </div>
      <div class="row g-2">
        <div class="col-12">
          <label>Degree / Certification</label>
          <input type="text" [(ngModel)]="edu.degree" class="form-ctrl w-100" (ngModelChange)="isDirty = true">
        </div>
        <div class="col-md-6">
          <label>Institution</label>
          <input type="text" [(ngModel)]="edu.institution" class="form-ctrl w-100" (ngModelChange)="isDirty = true">
        </div>
        <div class="col-md-3">
          <label>Period</label>
          <input type="text" [(ngModel)]="edu.period" class="form-ctrl w-100" placeholder="2022 – 2026" (ngModelChange)="isDirty = true">
        </div>
        <div class="col-md-3">
          <label>Location</label>
          <input type="text" [(ngModel)]="edu.location" class="form-ctrl w-100" (ngModelChange)="isDirty = true">
        </div>
      </div>
    </div>
    <div class="empty-state text-center py-5" *ngIf="education.length === 0">
      <i class="bi bi-mortarboard text-muted fs-1"></i>
      <p class="text-muted mt-2">No education entries yet</p>
      <button class="btn btn-sm btn-add" (click)="add()">Add Entry</button>
    </div>
  `,
  styles: [`
    .edu-block { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
    .block-num { color: #a29bfe; font-size: 0.8rem; font-weight: 700; }
    label { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-weight: 600; display: block; margin-bottom: 0.3rem; }
    .form-ctrl { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 0.55rem 0.8rem; font-size: 0.85rem; outline: none; }
    .form-ctrl:focus { border-color: #6c63ff; }
    .btn-save { background: linear-gradient(135deg,#6c63ff,#a29bfe); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-save:hover { opacity: 0.9; color: #fff; }
    .btn-add { background: rgba(108,99,255,0.15); color: #a29bfe; border: 1px solid rgba(108,99,255,0.3); padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-del { background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.2); color: #ff6b6b; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .btn-del:hover { background: rgba(255,107,107,0.25); }
  `]
})
export class AdminEducationComponent implements OnInit, OnDestroy {
  education: Education[] = [];
  saved = false;
  isDirty = false; // ✅ track user edits
  private sub!: Subscription;

  constructor(private svc: PortfolioService) {}

  ngOnInit() {
    // ✅ FIX: Use isDirty flag — old bug used array.length check which
    // would reload from Firestore if user deleted all entries
    this.sub = this.svc.data$.subscribe(d => {
      if (!this.isDirty) {
        this.education = JSON.parse(JSON.stringify(d.education));
      }
    });
  }

  ngOnDestroy() {
    // ✅ FIX: Unsubscribe to prevent memory leaks
    this.sub?.unsubscribe();
  }

  add() {
    this.isDirty = true;
    this.education.push({ id: Date.now().toString(), degree: '', institution: '', period: '', location: '' });
  }

  remove(i: number) {
    this.isDirty = true;
    this.education.splice(i, 1);
  }

  save() {
    this.svc.updateEducation(this.education);
    this.saved = true;
    this.isDirty = false; // ✅ allow Firestore to sync back after save
    setTimeout(() => this.saved = false, 3000);
  }
}