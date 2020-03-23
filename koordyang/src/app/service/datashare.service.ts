import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private Message = new BehaviorSubject('');
  sharingEvent = this.Message.asObservable();
  constructor() { }

  nextMessage(Message: string) {
    this.Message.next(Message);
  }
}
