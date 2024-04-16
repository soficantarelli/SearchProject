import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor (private router: Router ,private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()){
        this.router.navigate(['dashboard']);
        return false;
      }
      return true;
  }
}