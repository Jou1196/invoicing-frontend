// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/login/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout(); // Limpia el token y roles del Session Storage
    this.router.navigate(['/login']); // Redirige al login
  }
}