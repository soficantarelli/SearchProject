import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IService } from "src/app/api/models/i-services";
import { ServiceResourceService } from "src/app/api/resources/service-resource.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ServicesResolver implements Resolve<IService[]> {

    constructor(private api: ServiceResourceService, private authService: AuthService) { }

    resolve(): IService[] | Observable<IService[]> | Promise<IService[]> {
        const rol = this.authService.getRole().role;
        if (rol == "ADMIN" && !this.authService.isImpersonate()) {
            return this.api.getAll();
        } else {
            return this.api.getServicesByUser();
        }
    }
}