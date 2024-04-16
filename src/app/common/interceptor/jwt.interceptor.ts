import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../auth/loader.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService, private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isLoggedIn() && this.authenticationService.isImpersonate()) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getTokenImpersonate()}`)
            })
        }
        
        if (this.authenticationService.isLoggedIn() && !this.authenticationService.isImpersonate()) {
            request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
        })
        }
        return next.handle(request);
    }
    
}