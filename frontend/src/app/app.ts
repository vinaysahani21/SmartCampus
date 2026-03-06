import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Add Router here
import { CommonModule } from '@angular/common'; // Add CommonModule for *ngIf

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Add CommonModule here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(public router: Router) {} // This lets us check the current URL
}