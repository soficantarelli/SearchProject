import { Injectable } from '@angular/core';
import { IResourceMethodObservable, IResourceMethodObservableStrict, Resource, ResourceAction, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IWebsite } from '../models/i-website';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/websites`
})

export class WebsiteResourceService extends Resource {

    @ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/validate'
	})
	validate: IResourceMethodObservable<{url: string}, void>;
  
    @ResourceAction({
		method: ResourceRequestMethod.Post,
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	})
	post: IResourceMethodObservable<IWebsite, IWebsite>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		responseBodyType: ResourceResponseBodyType.Json
	})
	getAll: IResourceMethodObservable<{id: number}, IWebsite[]>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/own',
		responseBodyType: ResourceResponseBodyType.Json
	})
	getOwn: IResourceMethodObservable<void, IWebsite[]>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/{id}',
		responseBodyType: ResourceResponseBodyType.Json
	})
	getWebsite: IResourceMethodObservable<{id: number}, IWebsite>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	})
	update: IResourceMethodObservable<IWebsite, IWebsite>;
	
	@ResourceAction({
		method: ResourceRequestMethod.Delete,
		path: '/{!id}'
	})
	delete: IResourceMethodObservable<{id: number}, void>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		path: '/reindex/{id}'
	  })
	reindex: IResourceMethodObservable<{id: number}, IWebsite>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		path: '/up'
	})
	up: IResourceMethodObservable<IWebsite, IWebsite>;
}
