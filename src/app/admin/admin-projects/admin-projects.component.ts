import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-white fw-bold mb-1">Projects</h4>
        <p class="text-muted small mb-0">Manage your portfolio projects</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-add" (click)="add()"><i class="bi bi-plus me-1"></i>Add Project</button>
        <button class="btn btn-sm btn-save" (click)="save()"><i class="bi bi-check2 me-1"></i>Save</button>
      </div>
    </div>
    <div class="alert alert-success py-2 small" *ngIf="saved">✓ Projects saved!</div>
    <div class="proj-block" *ngFor="let proj of projects; let i = index">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="block-num">Project {{ i + 1 }}</span>
        <button class="btn-del" (click)="remove(i)"><i class="bi bi-trash3"></i></button>
      </div>
      <div class="row g-2">
        <div class="col-md-8">
          <label>Project Title</label>
          <input type="text" [(ngModel)]="proj.title" class="form-ctrl w-100">
        </div>
        <div class="col-md-4">
          <label>Tech Stack (comma-separated)</label>
          <input type="text" class="form-ctrl w-100" [value]="proj.tech.join(', ')" (input)="onTechChange($event, proj)">
        </div>
        <div class="col-12">
          <label>Short Description</label>
          <input type="text" [(ngModel)]="proj.description" class="form-ctrl w-100">
        </div>
        <div class="col-md-6">
          <label>GitHub URL</label>
          <input type="text" [(ngModel)]="proj.github" class="form-ctrl w-100">
        </div>
        <div class="col-md-6">
          <label>Live URL</label>
          <input type="text" [(ngModel)]="proj.live" class="form-ctrl w-100" placeholder="https://...">
        </div>
        <div class="col-12">
          <label>Bullet Points (one per line)</label>
          <textarea class="form-ctrl w-100" rows="4" [value]="proj.bullets.join('\\n')" (input)="onBulletsChange($event, proj)"></textarea>
        </div>
      </div>
    </div>
    <div class="empty-state text-center py-5" *ngIf="projects.length === 0">
      <i class="bi bi-folder2-open text-muted fs-1"></i>
      <p class="text-muted mt-2">No projects added yet</p>
      <button class="btn btn-sm btn-add" (click)="add()">Add First Project</button>
    </div>
  `,
  styles: [`
    .proj-block { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
    .block-num { color: #a29bfe; font-size: 0.8rem; font-weight: 700; }
    label { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-weight: 600; display: block; margin-bottom: 0.3rem; }
    .form-ctrl { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 0.55rem 0.8rem; font-size: 0.85rem; outline: none; resize: vertical; }
    .form-ctrl:focus { border-color: #6c63ff; }
    .btn-save { background: linear-gradient(135deg,#6c63ff,#a29bfe); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-save:hover { opacity: 0.9; color: #fff; }
    .btn-add { background: rgba(108,99,255,0.15); color: #a29bfe; border: 1px solid rgba(108,99,255,0.3); padding: 0.4rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; }
    .btn-del { background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.2); color: #ff6b6b; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .btn-del:hover { background: rgba(255,107,107,0.25); }
  `]
})
export class AdminProjectsComponent implements OnInit {
  projects: Project[] = [];
  saved = false;
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.projects = JSON.parse(JSON.stringify(this.svc.data.projects)); }
  onTechChange(e: Event, proj: Project) { proj.tech = (e.target as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean); }
  onBulletsChange(e: Event, proj: Project) { proj.bullets = (e.target as HTMLTextAreaElement).value.split('\n').filter(b => b.trim()); }
  add() { this.projects.push({ id: Date.now().toString(), title: '', tech: [], description: '', github: '', live: '', bullets: [] }); }
  remove(i: number) { this.projects.splice(i, 1); }
  save() { this.svc.updateProjects(this.projects); this.saved = true; setTimeout(() => this.saved = false, 3000); }
}
