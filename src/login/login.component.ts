import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
@Injectable()
export class LogMeIn {
  @ViewChild("nameInput") nameInput: ElementRef;
  @Input() public playerName: string;
  @Output()
  public input: EventEmitter<string> = new EventEmitter<string>();

  public addPlayer() {
    this.playerName = this.nameInput.nativeElement.value;
    console.log("player name is ", this.playerName);
    return this.playerName;
  }
  public getUrl(): string {
    return 'url(\'../assets/images/jeopardyBak.jpg\')';
  }
  public onInputChanges() {
    this.input.emit(this.playerName)
  }
}
