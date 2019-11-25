import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { forEach } from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: "root"
})
export class JeopardyService {
  constructor(public http: HttpClient) {}

  // The following methods return an observables
  public categoryArray = [
    32,
    31,
    29,
    28,
    27,
    26,
    25,
    24,
    22,
    21,
    20,
    19,
    18,
    17,
    16,
    15,
    14,
    13,
    12,
    11,
    10,
    9
  ];

  public selectRandomCategory(maximum, minimum) {
    const num = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    this.categoryArray.splice(num, 1);
    console.log('splice val', this.categoryArray.splice(num, 1));
    return num;
  }

  public createRandomSet() {
    const uniqueSet = new Set();
    while (uniqueSet.size < 5) {
      const category = this.selectRandomCategory(32, 9);
      uniqueSet.add(category);
    }
    return uniqueSet.values();
  }
  public getItems(): Observable<any> {
    const category = this.selectRandomCategory(32, 9);
    const NUMBER_OF_QUESTIONS = 5;
    return this.http
      .get(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${category}`
      )
      .pipe(map(data => data["results"]));
  }
}
