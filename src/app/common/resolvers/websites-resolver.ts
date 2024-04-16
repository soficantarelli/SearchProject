import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IWebsite } from "src/app/api/models/i-website";
import { WebsiteResourceService } from "src/app/api/resources/website-resource.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class WebsitesResolver implements Resolve<IWebsite[]>{

    constructor (private api: WebsiteResourceService, private authService: AuthService) { }

    resolve(): IWebsite[] | Observable<IWebsite[]> | Promise<IWebsite[]> {
        const rol = this.authService.getRole().role;
        console.log(rol);
        if (rol == "ADMIN" && !this.authService.isImpersonate()) {
            return this.api.getAll();
        } else {
            return this.api.getOwn();
        }
    }
}