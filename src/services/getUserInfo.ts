import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {
    private messageSource = new BehaviorSubject<string>('Default Player');
    currentMessage = this.messageSource.asObservable();

    constructor() {}

    getUserName(message: string) {
      this.messageSource.next(message);
    }

}
