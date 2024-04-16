import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticateGuard implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate() {
      if (this.authService.isLoggedIn() != true) {
        window.alert("Access not allowed!");
        this.router.navigate(['/login'])
      }
      return true;
  }
}