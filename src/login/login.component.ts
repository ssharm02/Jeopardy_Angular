import { Component, ElementRef, Input, ViewChild, OnInit } from "@angular/core";
import { UserInfoService } from "src/services/getUserInfo";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LogMeIn implements OnInit {
  @ViewChild("nameInput") nameInput: ElementRef;
  @Input() public playerName: string;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    public getUserInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      playerName: ["", Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  public addPlayer(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.playerName = this.nameInput.nativeElement.value;
      this.getUserInfoService.getUserName(this.playerName);
      sessionStorage.setItem("name", this.playerName);
      this.router.navigateByUrl("jeopardyBoard");
    }
  }
  public getUrl(): string {
    return 'url(\'../assets/images/jeopardyBak.jpg\')';
  }
}
