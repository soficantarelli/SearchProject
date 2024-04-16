import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/api/models/i-user';
import { UserResourceService } from 'src/app/api/resources/user-resource.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<IUser[]>{

    constructor(private api: UserResourceService, private authService: AuthService) {}

    resolve(): IUser[] | Observable<IUser[]> | Promise<IUser[]> {
        const rol = this.authService.getRole().role;
        
        if (rol == "ADMIN" && !this.authService.isImpersonate()) {
            return this.api.get();
        } else {
            return this.api.getUserCompany();
        }
    }
}