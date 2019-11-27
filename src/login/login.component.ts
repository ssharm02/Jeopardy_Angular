import {
  Component,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LogMeIn {
  @ViewChild('nameInput') nameInput: ElementRef;
  @Input() public playerName: string;
  public messageSource;
  public currentMessage;
  public addPlayer(): Observable<any> {
    this.playerName = this.nameInput.nativeElement.value;
    this.messageSource = new BehaviorSubject(this.playerName);
    this.currentMessage = this.messageSource.asObservable();
    return this.currentMessage;
  }
  getUrl() {
    return 'url(\'../assets/images/jeopardyBak.jpg\')';
  }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
