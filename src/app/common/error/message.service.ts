import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IMessage } from './i-message';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private modal: NgbModal) { }

  public showMessage(message: IMessage): void {
    Swal.fire(message.title, message.text, 'error');
  }

}
