import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { StudentService } from '../../services/student';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats: any = {
    totalStudents: 0,
    activeDepartments: 0,
    recentActivity: []
  };

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef ,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.studentService.getDashboardStats().subscribe({
      next: (data) => {
        console.log('Dashboard Data Received:', data);
        this.stats = data;
        // 3. Force the UI to show the numbers
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Dashboard load failed. Is the URL correct?', err);
      }
    });
  }

  onLogout() {
  this.authService.logout();
}
}