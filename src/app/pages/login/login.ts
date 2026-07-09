import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private dataService = inject(MockDataService);

  username = '';
  password = '';
  selectedRole = '';
  roles = ['Receptionist', 'Doctor', 'Manager'];
  errorMessage = '';

  private readonly predefinedUsers = [
    { username: 'receptionist', password: 'receptionist123', role: 'Receptionist' },
    { username: 'doctor', password: 'doctor123', role: 'Doctor' },
    { username: 'manager', password: 'manager123', role: 'Manager' },
  ];

  login() {
    const normalizedUsername = this.username.trim().toLowerCase();
    const user = this.predefinedUsers.find(
      (entry) =>
        entry.username === normalizedUsername &&
        entry.password === this.password &&
        entry.role === this.selectedRole
    );

    if (!user) {
      this.errorMessage = 'Invalid role, username or password.';
      return;
    }

    this.errorMessage = '';
    localStorage.setItem('loggedInRole', this.selectedRole);
    this.dataService.setActiveRole(this.selectedRole);
    this.router.navigate(['/dashboard']);
  }
}
