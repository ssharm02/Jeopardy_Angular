import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LogMeIn {
  @ViewChild('nameInput') nameInput: ElementRef;
  @Input() public playerName: string;
  @Output() changeName = new EventEmitter();

  addPlayer() {
    // you can access the input value via the following syntax.
    this.playerName = this.nameInput.nativeElement.value;
    console.log('player name: ', this.nameInput.nativeElement.value);
    this.changeName.emit(this.playerName);
  }
}
