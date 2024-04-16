import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IPreferences } from "src/app/api/models/i-preferences";
import { PreferenceResourceService } from "src/app/api/resources/preference-resource.service";

@Injectable({
    providedIn: 'root'
})
export class PreferencesResolver implements Resolve<IPreferences> {
    constructor(private api: PreferenceResourceService) { }

    resolve(): IPreferences | Observable<IPreferences> | Promise<IPreferences> {
        return this.api.get();
    }
}