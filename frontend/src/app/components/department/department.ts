import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <-- ADD THIS
import { DepartmentService } from '../../services/department';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-department',
  standalone: true,
  // Added RouterLink and RouterLinkActive to imports
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive], 
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  departments: any[] = [];
  newDeptName: string = '';

  constructor(
    private deptService: DepartmentService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef // 2. Inject it here
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.deptService.getDepartments().subscribe({
      next: (data) => {
        this.departments = (data || []).map(d => ({ 
          ...d, 
          id: d._id || d.id 
        }));
        this.cdr.detectChanges(); // 3. Force the UI to repaint NOW
      },
      error: (err) => console.error('Fetch error:', err)
    });
  }

  addDept() {
    if (!this.newDeptName.trim()) return;
    this.deptService.addDepartment(this.newDeptName).subscribe({
      next: () => {
        this.newDeptName = '';
        this.loadDepartments();
      },
      error: (err) => alert('Could not add department. Check backend.')
    });
  }

  deleteDept(id: string) {
    if (!id) return; // Guard against undefined IDs
    if (confirm('Are you sure? This will remove the faculty from registration options.')) {
      this.deptService.deleteDepartment(id).subscribe({
        next: () => this.loadDepartments(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  onLogout() {
    this.authService.logout();
  }
}