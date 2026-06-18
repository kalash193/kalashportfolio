import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, Skill } from '../../services/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-white fw-bold mb-1">Skills</h4>
        <p class="text-muted small mb-0">Manage skill categories and tags</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-add" (click)="add()"><i class="bi bi-plus me-1"></i>Add Category</button>
        <button class="btn btn-sm btn-save" (click)="save()"><i class="bi bi-check2 me-1"></i>Save</button>
      </div>
    </div>
    <div class="alert alert-success py-2 small" *ngIf="saved">✓ Skills saved!</div>
    <div class="skill-block" *ngFor="let skill of skills; let i = index">
      <div class="skill-block-header d-flex align-items-center gap-2 mb-2">
        <input type="text" [(ngModel)]="skill.category" class="form-ctrl flex-grow-1" placeholder="Category name" (ngModelChange)="isDirty = true">
        <button class="btn-del" (click)="remove(i)" title="Delete"><i class="bi bi-trash3"></i></button>
      </div>
      <div class="field-group">
        <label>Skills (comma-separated)</label>
        <input type="text" class="form-ctrl" [value]="skill.items.join(', ')" (input)="onItemsChange($event, skill)" placeholder="HTML5, CSS3, JavaScript">
      </div>
      <div class="skill-preview mt-2">
        <span class="stag" *ngFor="let item of skill.items">{{ item }}</span>
      </div>
    </div>
  `,
  styles: [`
    .skill-block { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
    label { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-weight: 600; display: block; margin-bottom: 0.3rem; }
    .form-ctrl { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 0.55rem 0.8rem; font-size: 0.85rem; outline: none; }
    .form-ctrl:focus { border-color: #6c63ff; }
    .btn-save { background: linear-gradient(135deg,#6c63ff,#a29bfe); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-save:hover { opacity: 0.9; color: #fff; }
    .btn-add { background: rgba(108,99,255,0.15); color: #a29bfe; border: 1px solid rgba(108,99,255,0.3); padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-del { background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.2); color: #ff6b6b; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
    .btn-del:hover { background: rgba(255,107,107,0.25); }
    .stag { background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.25); color: #a29bfe; padding: 0.2rem 0.55rem; border-radius: 5px; font-size: 0.73rem; margin-right: 0.3rem; margin-bottom: 0.3rem; display: inline-block; }
  `]
})
export class AdminSkillsComponent implements OnInit, OnDestroy {
  skills: Skill[] = [];
  saved = false;
  isDirty = false; // ✅ track user edits
  private sub!: Subscription;

  constructor(private svc: PortfolioService) {}

  ngOnInit() {
    // ✅ FIX: Use isDirty flag instead of checking array length
    // Old bug: if (!this.skills.length) would re-load even after user deleted all items
    this.sub = this.svc.data$.subscribe(d => {
      if (!this.isDirty) {
        this.skills = JSON.parse(JSON.stringify(d.skills));
      }
    });
  }

  ngOnDestroy() {
    // ✅ FIX: Unsubscribe to prevent memory leaks
    this.sub?.unsubscribe();
  }

  onItemsChange(e: Event, skill: Skill) {
    this.isDirty = true;
    skill.items = (e.target as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean);
  }

  add() {
    this.isDirty = true;
    this.skills.push({ id: Date.now().toString(), category: 'New Category', items: [] });
  }

  remove(i: number) {
    this.isDirty = true;
    this.skills.splice(i, 1);
  }

  save() {
    this.svc.updateSkills(this.skills);
    this.saved = true;
    this.isDirty = false; // ✅ allow Firestore to sync back after save
    setTimeout(() => this.saved = false, 3000);
  }
}