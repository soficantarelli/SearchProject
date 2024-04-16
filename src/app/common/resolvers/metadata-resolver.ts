import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IMetadata } from "src/app/api/models/i-metadata";
import { MetadataResourceService } from "src/app/api/resources/metadata-resource.service";

@Injectable({
    providedIn: 'root'
})
export class MetadataResolver implements Resolve<IMetadata[]>{
    
    constructor(private api: MetadataResourceService) { }
    
    resolve(): IMetadata[] | Observable<IMetadata[]> | Promise<IMetadata[]> {
        return this.api.get();
    }
}