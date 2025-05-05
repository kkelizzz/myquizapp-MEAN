import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(public auth: AuthService, private router: Router) {}

  // login() {
  //   this.auth.login(this.user).subscribe({
  //     next: (res: any) => {
  //       this.auth.saveToken(res.token, res.role, res.userId);
  //       if (res.role === 'admin') {
  //         this.router.navigate(['/admin']);
  //       } else {
  //         this.router.navigate(['/user']);
  //       }
  //     },
  //     error: (err) => alert(err.error.message)
  //   });
  // }

  login() {
    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token, res.role, res.userId);
  
        // ⏩ Check if user was trying to access a specific page before login
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        //console.log('Redirect URL:', redirectUrl);
  
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
          localStorage.removeItem('redirectAfterLogin');
        } else {
          if (res.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        }
      },
      error: (err) => alert(err.error.message)
    });
  }
  

  onLogout() {
    this.auth.logout();
  }
}

