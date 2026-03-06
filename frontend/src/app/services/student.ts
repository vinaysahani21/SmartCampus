import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // Add this inside your StudentService class
updateStudent(id: any, student: Student): Observable<Student> {
  // This produces: http://localhost:3000/api/students/69a9968...
  return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
}

getDashboardStats(): Observable<any> {
return this.http.get(`${this.apiUrl}/dashboard-stats`);}

}