import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { first, map, catchError } from "rxjs/operators";
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
  results1 = {};
  results2 = {};
  results3 = {};
  results4 = {};
  results5 = {};
  public doubleCopy = [...this.categoryArray];
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
  public selectRandomCategory2() {
    const maxArrNum = Math.max(...this.doubleCopy);
    const minArrNum = Math.min(...this.doubleCopy);
    const num =
      Math.floor(Math.random() * (maxArrNum - minArrNum + 1)) + minArrNum;
    this.doubleCopy.splice(num, 1);
    return num;
  }
  public pickRandomCat(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public getItems(category): Observable<JeopardyServiceClass>{
    const NUMBER_OF_QUESTIONS = 5;

    return this.http
      .get(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${category}`
      )
      .pipe(map(jeopardyData => jeopardyData["results"]));
  }
}


/*


    // const randomCatOne = this.http.get(
    //   `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${this.selectRandomCategory2()}`
    // );
    // const randomCatTwo = this.http.get(
    //   `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${this.selectRandomCategory2()}`
    // );
    // const randomCat3 = this.http.get(
    //   `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${this.selectRandomCategory2()}`
    // );
    // const randomCatFour = this.http.get(
    //   `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${this.selectRandomCategory2()}`
    // );
    // const randomCatFive = this.http.get(
    //   `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${this.selectRandomCategory2()}`
    // );

    // forkJoin([
    //   randomCatOne,
    //   randomCatTwo,
    //   randomCat3,
    //   randomCatFour,
    //   randomCatFive
    // ]).subscribe(
    //   results => {
    //     this.results1 = results[0]["results"],
    //     this.results2 = results[1]["results"],
    //     this.results3 = results[2]["results"],
    //     this.results4 = results[3]["results"],
    //     this.results5 = results[4]["results"]
    //     // console.log("results are ", JSON.stringify(results));
    //   },
    //   error => console.log(`Error making request ${error}`),
    //   () => {
    //     console.log("fork join completed");
    //     return [
    //       this.results1,
    //       this.results2,
    //       this.results3,
    //       this.results4,
    //       this.results5
    //     ];
    //   }
    //   );
*/