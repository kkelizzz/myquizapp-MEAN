import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mcq-frontend';


  // logout function added globally
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  isLoggedin(){
    this.authService.isLoggedIn();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
   
  
}
