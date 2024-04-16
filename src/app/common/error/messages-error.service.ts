import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';
import { IMessage } from './i-message';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesErrorService implements ErrorHandler {

  private _service: MessageService;

  constructor(private _injector: Injector, private _ngZone: NgZone, private router: Router, private authService: AuthService) { }

  handleError(error: any): void {
    let message: IMessage;
    if (!this._service) {
      this._service = this._injector.get(MessageService);
    }
    if (error.rejection) {
      error = error.rejection;
    }

    if (error.body) {
      console.log(error.body);
      if (error.body.error) {
        message = { text: error.body.error, num: error.status };
      }
      else if (error.body.message) {
        message = { text: error.body.message, num: error.status };
      }
      else {
        if (error.status === 0) {
          message = { text: 'Error al conectarse al servicio', num: error.status };
        } else if (error.status === 401){
          message = { text: "No Autorizado", num: error.status };
          //this.authService.logout();
          this._ngZone.run(() => this.router.navigateByUrl('/login'));
        } else {
          message = { text: error.body, num: error.status };
        }
      }
    } else if (error.error) {
      message = { text: error.error, num: error.status };
    } else if (error.message) {
      message = { text: error.message, num: error.status };
    } else {
      message = { text: error, num: error.status };
    }

    this._ngZone.run(() => this._service.showMessage(message), 0);
  }
}
