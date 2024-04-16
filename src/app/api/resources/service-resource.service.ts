import { Injectable } from '@angular/core';
import { ResourceAction, IResourceMethodObservable, Resource, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType, IResourceMethodObservableStrict } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IService } from '../models/i-services';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/services`
})

export class ServiceResourceService extends Resource {

	@ResourceAction({
		method: ResourceRequestMethod.Post,
		path: '/ping-service',
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Text
	})
	pingService: IResourceMethodObservable<IService, string>;

	@ResourceAction({
		method: ResourceRequestMethod.Post,
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	})
	post: IResourceMethodObservable<IService, IService>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/all',
		responseBodyType: ResourceResponseBodyType.Json
	})
	getAll: IResourceMethodObservable<void, IService[]>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/by-user',
		responseBodyType: ResourceResponseBodyType.Json
	})
	getServicesByUser: IResourceMethodObservable<void, IService[]>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/{id}',
		responseBodyType: ResourceResponseBodyType.Json
	})
	getService: IResourceMethodObservable<{id: number}, IService>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		path: '/{!id}',
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	})
	update: IResourceMethodObservableStrict<IService, null, {id: number}, IService>;
	
	@ResourceAction({
		method: ResourceRequestMethod.Delete,
		path: '/{!id}',
    	responseBodyType: ResourceResponseBodyType.Text
	})
	delete: IResourceMethodObservableStrict<IService, {keepWebsites: boolean}, {id: number}, string>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		path: '/reindex/{!id}',
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	  })
	reindex: IResourceMethodObservableStrict<IService, null, {id: number}, IService>;
}
