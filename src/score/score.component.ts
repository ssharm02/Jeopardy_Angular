import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserInfoService } from 'src/services/getUserInfo';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: "score-component",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.css"]
})
export class ScoreComponent implements OnInit, OnDestroy {
  public nameSub: Subscription;
  public scoreSub: Subscription;
  public name$: any;
  public score$: any;
  constructor(public getUserInfoService: UserInfoService, private router: Router) {}

  ngOnInit(): void {
    this.nameSub = this.getUserInfoService.currentMessage.subscribe(data => this.name$ = data);
    this.scoreSub = this.getUserInfoService.currentScore.subscribe(data => this.score$ = data);
  }
  ngOnDestroy(): void {
    this.nameSub.unsubscribe();
    this.scoreSub.unsubscribe();
  }

  public getUrl(): string {
    return 'url(\'../assets/images/cashmoney.jpg\')';
  }
  public backToMain() {
    console.log('clearing session storage')
    this.router.navigateByUrl('')
    sessionStorage.clear();
  }
}
