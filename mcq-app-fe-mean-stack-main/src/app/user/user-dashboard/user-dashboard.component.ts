import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
 

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})

export class UserDashboardComponent {

  constructor(public authService: AuthService, public router: Router) {}
  

  logout() {
    this.authService.logout();
  }

  goToTests() {
    this.router.navigate(['/user/user-test']);
  }

  goToReports() {
    this.router.navigate(['/user/user-report']);
  }
}
