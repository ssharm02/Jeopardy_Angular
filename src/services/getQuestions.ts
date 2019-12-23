import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { first, map } from "rxjs/operators";
import { JeopardyServiceClass } from "../models/jeopardy.service.class";
@Injectable({
  providedIn: "root"
})
export class JeopardyService {
  constructor(public http: HttpClient) {}
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  display(value: boolean) {
    this.status.next(value);
  }

  public selectRandomCategory(maximum, minimum) {
    const num = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    this.categoryArray.splice(num, 1);
    this.randomizeArray(this.categoryArray).then(() => {
      this.spliceArray(this.categoryArray);
    });
    return this.categoryArray[
      Math.floor(Math.random() * this.categoryArray.length)
    ];
  }

  async randomizeArray(arr) {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
  }
  async spliceArray(arr) {
    return arr.splice(-12);
  }
  returnUniqueElement() {
    const shuffled = this.categoryArray.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    const uniqueElement = selected[Math.floor(Math.random() * selected.length)];
    return uniqueElement;
  }

  public createRandomSet() {
    let setIterator;
    let firstValueInSet;
    let valueToEject;
    const uniqueSet = new Set();
    while (uniqueSet.size < 5) {
      const category = this.selectRandomCategory(32, 9);
      uniqueSet.add(category);
    }
    setIterator = uniqueSet.values();
    firstValueInSet = setIterator.next();
    valueToEject = firstValueInSet.value;
    return valueToEject;
  }
  // Observable shouldn't be any
  public getItems(): Observable<JeopardyServiceClass> {
    const category = this.returnUniqueElement();
    const NUMBER_OF_QUESTIONS = 5;
    return this.http
      .get(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${category}`
      )
      .pipe(map(jeopardyData => jeopardyData["results"]));
  }
}
