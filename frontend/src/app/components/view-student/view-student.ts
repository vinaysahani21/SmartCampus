import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { DepartmentService } from '../../services/department'; 

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './view-student.html',
  styleUrl: './view-student.css'
})
export class ViewStudent implements OnInit {
  students: Student[] = [];
  isEditModalOpen = false;
  selectedStudent: any = null;
  searchTerm: string = '';
  departments: any[] = []; 

  constructor(
    private studentService: StudentService,
    private deptService: DepartmentService, 
    private cdr: ChangeDetectorRef,
    public authService: AuthService

  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadDepartments(); 
  }

  loadDepartments() {
    this.deptService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Dept Fetch error:', err)
    });
  }

  loadData() {
    this.studentService.getStudents().subscribe({
      next: (data: any[]) => {
        // Map the data
        this.students = data.map(s => ({
          ...s,
          id: s._id || s.id 
        }));
        
        // console.log('Data mapped in memory:', this.students);
        
        // FORCE UI RE-RENDER
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Fetch error:', err)
    });
  }

  deleteStudent(id: any) {
    if (!id) {
      alert("Error: Student ID not found");
      return;
    }
    if (confirm('Are you sure you want to delete this record?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  openEditModal(student: Student) {
    this.selectedStudent = { ...student };
    this.isEditModalOpen = true;
  }

  saveEdit() {
  if (this.selectedStudent) {
    // MongoDB uses _id. If your frontend uses 'id', check both.
    const studentId = this.selectedStudent._id || this.selectedStudent.id; 
    
    // console.log("Updating ID:", studentId); // Add this to debug
    
    this.studentService.updateStudent(studentId, this.selectedStudent).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }
}

  closeModal() {
    this.isEditModalOpen = false;
    this.selectedStudent = null;
  }

    onLogout() {
  this.authService.logout();
}

// Add these variables to your class
selectedDepartment: string = '';
get filteredStudents() {
    let results = this.students;

    // Filter by Department (Matching string name)
    if (this.selectedDepartment) {
      results = results.filter(s => s.course === this.selectedDepartment);
    }

    // Filter by Search Term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      results = results.filter(s => 
        s.name?.toLowerCase().includes(term) || 
        s.email?.toLowerCase().includes(term)
      );
    }

    return results;
  }

// Optional: Add a clear filter method
clearFilters() {
  this.searchTerm = '';
  this.selectedDepartment = '';
}
}