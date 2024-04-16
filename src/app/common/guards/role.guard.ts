import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot  } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor (private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {    
    //console.log(this.authService.getRole().role!.includes(route.data['roles']));
    return route.data['roles'].includes(this.authService.getRole().role);
  }
}