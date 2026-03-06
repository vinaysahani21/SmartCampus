import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this

@Component({
  selector: 'app-home',
  standalone: true, // Ensure this is here
  imports: [RouterLink], // Add this so routerLink works
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}