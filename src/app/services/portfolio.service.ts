import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';

export interface HeroData {
  name: string; tagline: string; roles: string[];
  email: string; phone: string; location: string;
  github: string; linkedin: string; resumeLink: string;
}
export interface Skill { id: string; category: string; items: string[]; }
export interface Experience { id: string; role: string; company: string; period: string; location: string; type: string; bullets: string[]; }
export interface Project { id: string; title: string; tech: string[]; description: string; github: string; live: string; bullets: string[]; }
export interface Education { id: string; degree: string; institution: string; period: string; location: string; }
export interface PortfolioData { hero: HeroData; about: string; skills: Skill[]; experience: Experience[]; projects: Project[]; education: Education[]; }

const DEFAULT_DATA: PortfolioData = {
  hero: {
    name: 'Kalash Date',
    tagline: 'Building fast, modern web apps with React & Angular',
    roles: ['React.js Developer', 'Full-Stack Web Developer', 'B.Sc. IT Final Year'],
    email: 'Kalashdate62@gmail.com',
    phone: '+91-7499031395',
    location: 'Nagpur, Maharashtra',
    github: 'https://github.com/kalash193',
    linkedin: '',
    resumeLink: '#'
  },
  about: 'Motivated React.js developer and B.Sc. IT final-year student with real-world internship experience building full-stack web applications. Proven ability to deliver production-ready projects — including a complete e-commerce platform with authentication, cart, and admin panel — using React, PHP, MySQL, and Git. Adept at writing clean, maintainable code and collaborating across teams. Actively seeking a frontend developer role where I can contribute immediately and grow professionally.',
  skills: [
    { id: '1', category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Angular', 'Bootstrap', 'Responsive Design', 'DOM Manipulation'] },
    { id: '2', category: 'Backend', items: ['PHP', 'REST API Integration', 'Server-side Scripting'] },
    { id: '3', category: 'Database', items: ['MySQL', 'Schema Design', 'CRUD Operations', 'Relational Databases'] },
    { id: '4', category: 'Tools & DevOps', items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify', 'Chrome DevTools'] },
    { id: '5', category: 'Soft Skills', items: ['Problem-solving', 'Quick Learner', 'Team Collaboration', 'Attention to Detail'] }
  ],
  experience: [
    {
      id: '1', role: 'Full Stack Developer Intern', company: 'Annushree Technology',
      period: 'December 2025 – April 2026', location: 'Nagpur, Maharashtra', type: 'Full-time Internship',
      bullets: [
        'Designed and developed 3+ responsive web applications using HTML5, CSS3, and JavaScript',
        'Built and integrated backend APIs using PHP with MySQL, supporting CRUD operations, user sessions, and role-based access control',
        'Architected relational MySQL database schemas with normalized tables for products, orders, and users',
        'Debugged and improved page performance, reducing reported bugs by 40%',
        'Collaborated with senior developers using Git and GitHub — handled branching, pull requests, and merge conflict resolution'
      ]
    }
  ],
  projects: [
    {
      id: '1', title: 'E-Commerce Web Application', tech: ['React.js', 'PHP', 'MySQL', 'CSS3'],
      description: 'Full-stack e-commerce platform with complete shopping experience',
      github: 'https://github.com/kalash193', live: '',
      bullets: [
        'Built a multi-page React.js frontend with dynamic routing and real-time cart state management using React hooks',
        'Implemented secure user authentication with PHP sessions, hashed passwords, and protected routes',
        'Designed a normalized MySQL database with 5+ relational tables covering users, products, categories, orders, and cart items',
        'Developed an admin dashboard for product management, order tracking, and user administration',
        'Achieved fully responsive design compatible across mobile, tablet, and desktop using CSS Flexbox and Grid'
      ]
    },
    {
      id: '2', title: 'Personal Portfolio Website', tech: ['HTML5', 'CSS3', 'JavaScript'],
      description: 'Responsive personal portfolio showcasing projects and skills',
      github: 'https://github.com/kalash193', live: '',
      bullets: [
        'Developed a fully responsive, mobile-first portfolio with smooth scroll animations and clean modern layout',
        'Optimized page load speed by minifying assets and using semantic HTML for better SEO and accessibility'
      ]
    }
  ],
  education: [
    { id: '1', degree: 'B.Sc. Information Technology', institution: 'RTMNU University', period: '2022 – 2026 (Final Year)', location: 'Nagpur, Maharashtra' },
    { id: '2', degree: 'Higher Secondary Certificate (HSC)', institution: '', period: '2023', location: '' },
    { id: '3', degree: 'Secondary School Certificate (SSC)', institution: '', period: '2021', location: '' }
  ]
};

const FIRESTORE_DOC = 'portfolio/data';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private _data = new BehaviorSubject<PortfolioData>(DEFAULT_DATA);

  // ✅ FIX 1: shareReplay(1) ensures every new subscriber immediately gets
  // the latest Firestore value — no stale data, no missed emissions
  data$ = this._data.asObservable().pipe(shareReplay(1));

  loading = new BehaviorSubject<boolean>(true);
  private seeded = false;

  get data(): PortfolioData { return this._data.value; }

  constructor() { this.subscribeToFirestore(); }

  private subscribeToFirestore() {
    const ref = doc(db, FIRESTORE_DOC);
    onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        this._data.next(snap.data() as PortfolioData);
        this.seeded = true;
      } else if (!this.seeded) {
        this.seeded = true;
        this.save(DEFAULT_DATA);
      }
      this.loading.next(false);
    }, (err) => {
      console.error('Firestore read error:', err);
      this.loading.next(false);
    });
  }

  async save(data: PortfolioData): Promise<void> {
    this._data.next(data);
    const ref = doc(db, FIRESTORE_DOC);
    await setDoc(ref, data);
  }

  updateHero(hero: HeroData)                 { return this.save({ ...this.data, hero }); }
  updateAbout(about: string)                 { return this.save({ ...this.data, about }); }
  updateSkills(skills: Skill[])              { return this.save({ ...this.data, skills }); }
  updateExperience(experience: Experience[]) { return this.save({ ...this.data, experience }); }
  updateProjects(projects: Project[])        { return this.save({ ...this.data, projects }); }
  updateEducation(education: Education[])    { return this.save({ ...this.data, education }); }
  reset()                                    { return this.save(DEFAULT_DATA); }
}