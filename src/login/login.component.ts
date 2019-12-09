import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserInfoService } from 'src/services/getUserInfo';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogMeIn {
  @ViewChild('nameInput') nameInput: ElementRef;
  @Input() public playerName: string;

  constructor(
    public getUserInfoService: UserInfoService
  ) {}

  public addPlayer(): void {
    this.playerName = this.nameInput.nativeElement.value;
    this.getUserInfoService.getUserName(this.playerName);
    sessionStorage.setItem('name', this.playerName);
  }
  public getUrl(): string {
    return 'url(\'../assets/images/jeopardyBak.jpg\')';
  }
}
