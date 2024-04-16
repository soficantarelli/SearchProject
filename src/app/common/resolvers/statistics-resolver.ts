import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IStatistics } from "src/app/api/models/i-statistics";
import { StatisticsResourceService } from "src/app/api/resources/statistics-resource.service";

@Injectable({
    providedIn: 'root'
})
export class StatisticsResolver implements Resolve<IStatistics> {
    constructor(private api: StatisticsResourceService) { }

    resolve(): IStatistics | Observable<IStatistics> | Promise<IStatistics> {
        console.log("entre");
        return this.api.getStatistic();
    }
}
