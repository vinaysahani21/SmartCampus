import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  // Save the 'VIP Pass'
  login(token: string) {
    localStorage.setItem('auth_token', token);
    this.router.navigate(['/dashboard']);
  }

  // Check if we are logged in
  isLoggedIn(): boolean {
    // Check if we are in the browser (prevents SSR errors)
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  // Destroy the 'VIP Pass'
  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}