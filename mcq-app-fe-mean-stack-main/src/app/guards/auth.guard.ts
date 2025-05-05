import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   if (!this.auth.isLoggedIn()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (this.auth.isLoggedIn()) {
  //     return true;
  //   }
  //   localStorage.setItem('redirectAfterLogin', state.url);
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.auth.getRole();
  
    if (this.auth.isLoggedIn()) {
      // Block admin from accessing user-only routes
      if (state.url.startsWith('/user/tests') && role !== 'user') {
        localStorage.setItem('redirectAfterLogin', state.url);
        alert('Only users can access this page');
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      localStorage.setItem('redirectAfterLogin', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
