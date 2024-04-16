import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/api/models/i-user';
import { UserResourceService } from 'src/app/api/resources/user-resource.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {   
   
  public currentUser: Observable<IUser>
  private currentUserSubject: BehaviorSubject<IUser>
    

  constructor(private _http: HttpClient, private api: UserResourceService, private router: Router) {
    //const token = JSON.stringify(localStorage.getItem('token'));
    const token = JSON.stringify(sessionStorage.getItem('token'));
    const value = JSON.parse(token!);
    this.currentUserSubject = new BehaviorSubject<IUser>(value);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    //this.currentUser.next(this.getRole().role);
  }


    getUsername() {
      console.log(this.currentUserSubject.value.username);
        return this.currentUserSubject.value.username;
    }

    getUsernameImpersonate() {
        const token = sessionStorage.getItem('impersonateToken')!;
        var base64Url = token.split('.')[1];
        var a = JSON.parse(window.atob(base64Url))

        const user: IUser = {
            idUser: a['id'],
            username: a['username'],
            role: a['role']
        };
        return user.username;
    }
  
   isAdmin() {
    return this.currentUser && this.getRole().role == "ADMIN";
  }

  login(user: IUser) {
    this.api.login(user).subscribe((response: any) => {
        //localStorage.setItem('token', response);
        sessionStorage.setItem('token', response);
        this.currentUserSubject.next(user);

        if (this.getRole().role != "USER") {
            this.router.navigate(['statistics']);
        } else {
            this.router.navigate(['statistics']);
        }
    });
}

logout() {
    //localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('impersonateToken');
    this.router.navigate(['/']);
}

isLoggedIn(): boolean {
    return this.getToken() != null;
}

getToken(): any {
    //return localStorage.getItem('token');
    return sessionStorage.getItem('token');
}


isCompany() {
    return this.currentUser && this.getRole().role == "COMPANY";
}

isUser() {
    return this.currentUser && this.getRole().role == "USER";
}

isPublic() {
    return !this.isLoggedIn();
}

getRole() {
    //const token = localStorage.getItem('token')!;
    const token = sessionStorage.getItem('token')!;
    var base64Url = token.split('.')[1];
    var a = JSON.parse(window.atob(base64Url))

    const user: IUser = {
        idUser: a['id'],
        username: a['username'],
        role: a['role']
      };
    
    return user;
}

impersonate(idUser) {
    //localStorage.setItem('impersonateToken', idUser);
    sessionStorage.setItem('impersonateToken', idUser);
}

isImpersonate() {
    //return localStorage.getItem('impersonateToken');   
    return sessionStorage.getItem('impersonateToken');   
}

impersonateEnd() {
    //localStorage.removeItem('impersonateToken');
    sessionStorage.removeItem('impersonateToken');
    this.router.navigate(['statistics']);
}

getTokenImpersonate(): any {
    //return localStorage.getItem('impersonateToken');
    return sessionStorage.getItem('impersonateToken');
}

getRoleImpersonate() {
    //const token = localStorage.getItem('impersonateToken')!;
    const token = sessionStorage.getItem('impersonateToken')!;
    var base64Url = token.split('.')[1];
    var a = JSON.parse(window.atob(base64Url))

    const user: IUser = {
        idUser: a['id'],
        username: a['username'],
        role: a['role']
      };
   
    return user;
}


}