import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,  
  imports: [
    CommonModule
  ],  
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('active', this.isMenuOpen);
  }

  constructor(private router: Router) {}

  navigateToFormContato() {
    this.router.navigate(['/form-contato']);
  }
}
