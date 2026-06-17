import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  constructor(private router: Router) {
    // Track Firebase auth state across page refreshes
    onAuthStateChanged(auth, (user) => {
      this._user.next(user);
    });
  }

  /** Sign in with Firebase Email/Password auth */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      this._user.next(cred.user);
      return true;
    } catch (err: any) {
      console.error('Login failed:', err.code);
      return false;
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this._user.next(null);
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return this._user.value !== null;
  }

  get currentUser(): User | null {
    return this._user.value;
  }
}
