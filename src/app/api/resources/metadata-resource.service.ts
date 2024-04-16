import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IMetadata } from '../models/i-metadata';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/metadata`
})

export class MetadataResourceService extends Resource {

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    responseBodyType: ResourceResponseBodyType.Json
  })
  get: IResourceMethodObservable<void, IMetadata[]>;

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/approved',
    responseBodyType: ResourceResponseBodyType.Json
  })
  getApproved: IResourceMethodObservable<void, IMetadata[]>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    requestBodyType: ResourceRequestBodyType.JSON,
    responseBodyType: ResourceResponseBodyType.Text
  })
  update: IResourceMethodObservable<IMetadata, string>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    path: '/batch',
    requestBodyType: ResourceRequestBodyType.JSON,
    responseBodyType: ResourceResponseBodyType.Text
  })
  updateBatch: IResourceMethodObservable<IMetadata[], string>;

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/{!id}',
    requestBodyType: ResourceRequestBodyType.JSON,
    responseBodyType: ResourceResponseBodyType.Text
  })
  delete: IResourceMethodObservable<{id: string}, string>; 

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/batch',
    requestBodyType: ResourceRequestBodyType.JSON,
    responseBodyType: ResourceResponseBodyType.Text
  })
  deleteBatch: IResourceMethodObservable<IMetadata[], string>;
}
