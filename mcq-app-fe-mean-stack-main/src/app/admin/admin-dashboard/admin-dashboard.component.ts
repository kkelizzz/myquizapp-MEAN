import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  goToTests() {
    this.router.navigate(['/admin/test-management']);
  }

  goToReports() {
    this.router.navigate(['/admin/admin-report']);
  }
}

