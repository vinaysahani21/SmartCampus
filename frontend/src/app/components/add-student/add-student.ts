import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../services/student'; 
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DepartmentService } from '../../services/department';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent implements OnInit { // Implemented OnInit
  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    course: new FormControl('', [Validators.required])
  });

  departments: any[] = []; 

  constructor(
    private deptService: DepartmentService,
    private studentService: StudentService, 
    private router: Router,
    private cdr: ChangeDetectorRef // Injected to fix the "visibility" bug
  ) {}

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.deptService.getDepartments().subscribe({
      next: (data) => {
        // Map the data to ensure we have names, handling MongoDB _id if necessary
        this.departments = data || [];
        // Force Angular to see the new data immediately
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Failed to load departments from DB:', err);
      }
    });
  }

  onSubmit() {
  if (this.studentForm.valid) {
    // Use 'as any' or 'as Student' to bypass the strict ID requirement for new records
    const newStudent = {
      name: this.studentForm.value.name!,
      email: this.studentForm.value.email!,
      course: this.studentForm.value.course!,
      status: 'Active'
    } as any; // Changing to 'as any' tells the compiler to relax
    
    this.studentService.addStudent(newStudent).subscribe({
      next: () => this.router.navigate(['/view-students']),
      error: (err) => alert('Registration failed. Check backend connection.')
    });
  }
}
}