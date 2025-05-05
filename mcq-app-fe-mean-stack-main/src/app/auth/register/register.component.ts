import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', role: 'user' };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.message)
    });
  }
}
