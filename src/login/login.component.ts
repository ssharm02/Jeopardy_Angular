import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LogMeIn {
  @ViewChild('nameInput') nameInput: ElementRef;
  @Input() public playerName: string;
  public changeName = new EventEmitter();

  addPlayer() {
    this.playerName = this.nameInput.nativeElement.value;
    this.changeName.emit(this.playerName);
    return this.changeName;
  }
  getUrl()
{
  return "url('../assets/images/jeopardyBak.jpg')";
}
}
