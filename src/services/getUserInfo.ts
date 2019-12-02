import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {
    private userName = new BehaviorSubject<string>('Default Player');
    private userScore = new BehaviorSubject<number>(0);
    currentMessage = this.userName.asObservable();
    currentScore = this.userScore.asObservable();

    constructor() {}

    getUserName(message: string) {
      this.userName.next(message);
    }
    getUserScore(score: number) {
        this.userScore.next(score);
    }

}
