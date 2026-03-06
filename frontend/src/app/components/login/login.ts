import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router'; 

import { FormsModule } from '@angular/forms'; // CRITICAL: For [(ngModel)]
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Ensure path is correct
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink], // Added imports
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = { username: '', password: '' };
  errorMessage: string = '';
  isLoading: boolean = false; // New property for loader

  constructor(
    private router: Router, 
    private authService: AuthService,
    private http: HttpClient
  ) {}

  onLogin() {
    this.errorMessage = '';
    
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = "Please enter both username and password.";
      return;
    }

    this.isLoading = true; // Start loader

    this.http.post('http://localhost:3000/api/login', this.loginData).subscribe({
      next: (res: any) => {
        // Successful Login
        this.authService.login(res.token); 
        
        // Wait 1 second before redirecting
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']); 
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false; // Stop loader
        console.error("Login failed", err);
        this.errorMessage = err.error?.message || "Invalid credentials. Please try again.";
      }
    });
  }
}