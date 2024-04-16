import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export declare type Loader = {
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _subject = new Subject<Loader>();
  
  public getObservable(): Observable<Loader>{
    return this._subject.asObservable();
  }

  public start(): void{
    this._subject.next(<Loader>{loaded: true});
  }

  public complete(): void{
    this._subject.next(<Loader>{loaded: false});
  }

}