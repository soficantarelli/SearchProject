import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceParams, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IStatistics } from '../models/i-statistics';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/statistics`
})

export class StatisticsResourceService extends Resource {

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/by-user',
    responseBodyType: ResourceResponseBodyType.Json
  })
  getStatistic: IResourceMethodObservable<void, IStatistics>;
}