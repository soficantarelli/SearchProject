import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loader, LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  private _loaded: boolean = false;
  private _suscritor: Subscription;

  constructor(private _service: LoaderService) { }

  ngOnInit(): void {
    this._suscritor = this._service.getObservable().subscribe((loader:Loader)=>{
      this._loaded = loader.loaded;
    })
  }

  ngOnDestroy(): void {
    this._suscritor.unsubscribe();
  }

  get loaded(): boolean{
    return this._loaded;
  }

}
