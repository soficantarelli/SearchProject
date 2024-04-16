import { Injectable } from '@angular/core';
import { IResourceMethodObservable, IResourceMethodObservableStrict, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/users`
})

export class UserResourceService extends Resource {

	@ResourceAction({
		method: ResourceRequestMethod.Post,
		path: '/login',
		requestBodyType: ResourceRequestBodyType.JSON,
    	responseBodyType: ResourceResponseBodyType.Text
	})								
	login: IResourceMethodObservable<IUser, string>

	@ResourceAction({
		method: ResourceRequestMethod.Post,
		path: '/signup',
		requestBodyType: ResourceRequestBodyType.JSON,
    	responseBodyType: ResourceResponseBodyType.Json
	})								
	signup: IResourceMethodObservable<IUser, IUser>

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	})
	get: IResourceMethodObservable<void, IUser[]>

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/company',
		responseBodyType: ResourceResponseBodyType.Json
	  })
	getUserCompany: IResourceMethodObservable<void, IUser[]>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/{!id}',
		responseBodyType: ResourceResponseBodyType.Json
	  })
	getUser: IResourceMethodObservable<{id: number}, IUser>;

	@ResourceAction({
		method: ResourceRequestMethod.Get,
		path: '/info',
		responseBodyType: ResourceResponseBodyType.Json
	  })
	getInfo: IResourceMethodObservable<void, IUser>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	  })
	update: IResourceMethodObservable<IUser, IUser>;

	@ResourceAction({
		method: ResourceRequestMethod.Delete,
		path: '/{!id}'
	})
	deleteUser: IResourceMethodObservable<{id: number}, void>;

	@ResourceAction({
		method: ResourceRequestMethod.Put,
		path: '/password',
		requestBodyType: ResourceRequestBodyType.JSON,
		responseBodyType: ResourceResponseBodyType.Json
	  })
	updatePass: IResourceMethodObservable<IUser, IUser>;
	
	@ResourceAction({
		method: ResourceRequestMethod.Post,
		path: '/impersonate/{!id}',
		responseBodyType: ResourceResponseBodyType.Text
	  })
	impersonate: IResourceMethodObservable<{id: number}, string>;
}
