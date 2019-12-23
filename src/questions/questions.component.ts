import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription, timer } from "rxjs";
import { map, take } from "rxjs/operators";
import { JeopardyService } from "src/services/getQuestions";
import { UserInfoService } from "src/services/getUserInfo";
import { JeopardyBoard } from "../models/JeopardyBoard";
import { LogMeIn } from "../login/login.component";
import { Jeopardy } from "../models/jeopardy.abstract";
import { JeopardyServiceClass } from "../models/jeopardy.service.class";
import { User } from "../models/User";

@Component({
  selector: "jeo-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})

// tslint:disable-next-line:component-class-suffix
export class JeoQuestions extends Jeopardy
  implements OnInit, OnDestroy, JeopardyBoard {
  jeopardyboard: JeopardyBoard[];

  // Move all fieds to a seperate class
  public jeoSub: Subscription;
  public nameSub: Subscription;
  public subscription: Subscription;

  public showSpinner = true;
  public GET_QUESTIONS = 4;
  public questionCounter = 0;
  public dollarAmount = 0;
  public userScore = 0;
  public count = 60;

  public selectCategory: string;
  public modalId: string;
  public btnPressed: string;
  public userChoice: string;

  public cat = new Object();
  public category1 = new Object();
  public category2 = new Object();
  public category3 = new Object();
  public category4 = new Object();
  public category5 = new Object();
  public incorrectAnswers = new Object();
  public allCategories = new Object();

  public userAnswer: string;

  public allQuestions = new Array();
  public jeopardyQuestion = new Array();
  public possibleAnswers = new Array();

  public name$: any;
  public counter$: Observable<number>;
  public timeLeft;
  public interval;
  public dailyDoubleNum1: number;
  public dailyDoubleNum2: number;

  public catOnebuttonArray = [
    "cat1-btn1",
    "cat1-btn2",
    "cat1-btn3",
    "cat1-btn4",
    "cat1-btn5"
  ];
  public catTwobuttonArray = [
    "cat2-btn1",
    "cat2-btn2",
    "cat2-btn3",
    "cat2-btn4",
    "cat2-btn5"
  ];
  public catThreebuttonArray = [
    "cat3-btn1",
    "cat3-btn2",
    "cat3-btn3",
    "cat3-btn4",
    "cat3-btn5"
  ];
  public catFourbuttonArray = [
    "cat4-btn1",
    "cat4-btn2",
    "cat4-btn3",
    "cat4-btn4",
    "cat4-btn5"
  ];
  public catFivebuttonArray = [
    "cat5-btn1",
    "cat5-btn2",
    "cat5-btn3",
    "cat5-btn4",
    "cat5-btn5"
  ];

  @ViewChild(LogMeIn) playerNameRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(
    public jeotest: JeopardyService,
    public getUserInfoService: UserInfoService,
    private router: Router
  ) {
    super();
    this.getUserInfoService.currentMessage.subscribe(
      data => (this.name$ = data)
    );
  }

  ngOnInit(): void {
    console.log("on init is running now");
    this.pickRandomCategory();
    if (
      "category1" in sessionStorage &&
      "category2" in sessionStorage &&
      "category3" in sessionStorage &&
      "category4" in sessionStorage &&
      "category5" in sessionStorage &&
      "userDollars" in sessionStorage
    ) {
      this.getSessionDailyD();
      this.getSessionAllQuestions();
      this.getSessionCat1();
      this.getSessionCat2();
      this.getSessionCat3();
      this.getSessionCat4();
      this.getSessionCat5();
      this.getSessionCounter();
      this.getSessionStorageScore();
    } else {
      this.manipulateObject();
      this.fetchApiData();
    }
    if ("dailyDouble1" in sessionStorage && "dailyDouble2" in sessionStorage) {
      console.log("daily double is in session");
    }
    // if ("userDollars" in sessionStorage) {
    //     this.getSessionStorageScore();
    //     console.log('session dollars are ', this.userScore)
    //     console.log('dollars are in session')
    // }
    const name = this.getSessionStorageName();
    // tslint:disable-next-line:radix
    // this.userScore = this.getSessionStorageScore();
    if (this.name$ === "Default Player") {
      this.name$ = name;
    }
    console.log("daily double 1 is ", this.dailyDoubleNum1);
    console.log("daily double 2 is ", this.dailyDoubleNum2);
  }
  ngOnDestroy(): void {
    // this.jeoSub.unsubscribe();
    // this.nameSub.unsubscribe();
  }
  public getSessionStorageName(): string {
    const sessionName = sessionStorage.getItem("name");
    return sessionName;
  }
  public getSessionStorageScore(): void {
    // tslint:disable-next-line: radix
    this.userScore = parseInt(sessionStorage.getItem("userDollars"));
  }
  public startTimer() {
    this.timeLeft = 15;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.closeModalEvent.emit(false);
      }
    }, 1000);
  }
  public getServiceData() {
    this.jeoSub = this.jeotest.getItems().subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);

      this.allQuestions.push(data);
      return this.allQuestions;
    });
  }
  public getSessionDailyD(): void {
    this.showSpinner = false;
    this.dailyDoubleNum1 = JSON.parse(sessionStorage.getItem("dailyDouble1"));
    this.dailyDoubleNum2 = JSON.parse(sessionStorage.getItem("dailyDouble2"));
  }
  public getSessionAllQuestions(): void {
    this.allQuestions = JSON.parse(sessionStorage.getItem("allQuestions"));
  }
  public getSessionCat1(): void {
    this.category1 = JSON.parse(sessionStorage.getItem("category1"));
  }
  public getSessionCat2(): void {
    this.category2 = JSON.parse(sessionStorage.getItem("category2"));
  }
  public getSessionCat3(): void {
    this.category3 = JSON.parse(sessionStorage.getItem("category3"));
  }
  public getSessionCat4(): void {
    this.category4 = JSON.parse(sessionStorage.getItem("category4"));
  }
  public getSessionCat5(): void {
    this.category5 = JSON.parse(sessionStorage.getItem("category5"));
  }
  public getSessionCounter(): void {
    this.questionCounter = JSON.parse(
      sessionStorage.getItem("questionCounter")
    );
  }
  public fetchApiData() {
    for (let i = 0; i <= this.GET_QUESTIONS; i++) {
      this.getServiceData();
    }
  }
  public manipulateObject() {
    setTimeout(() => {
      this.category1 = this.allQuestions[0];
      this.category2 = this.allQuestions[1];
      this.category3 = this.allQuestions[2];
      this.category4 = this.allQuestions[3];
      this.category5 = this.allQuestions[4];

      this.mutateObject(this.category1);
      this.mutateObject(this.category2);
      this.mutateObject(this.category3);
      this.mutateObject(this.category4);
      this.mutateObject(this.category5);
      this.sendDailyDoubleToCat(this.category1, 2)
      console.log('category 1 super modified ', this.category1)
      sessionStorage.setItem("allQuestions", JSON.stringify(this.allQuestions));
      sessionStorage.setItem("category1", JSON.stringify(this.category1));
      sessionStorage.setItem("category2", JSON.stringify(this.category2));
      sessionStorage.setItem("category3", JSON.stringify(this.category3));
      sessionStorage.setItem("category4", JSON.stringify(this.category4));
      sessionStorage.setItem("category5", JSON.stringify(this.category5));
      this.dailyDoubleNum1 = this.launchDailyDouble(15, 1);
      this.dailyDoubleNum2 = this.launchDailyDouble(22, 1);
      sessionStorage.setItem(
        "dailyDouble1",
        JSON.stringify(this.dailyDoubleNum1)
      );
      sessionStorage.setItem(
        "dailyDouble2",
        JSON.stringify(this.dailyDoubleNum2)
      );
      if (this.dailyDoubleNum1 === this.dailyDoubleNum2) {
        this.dailyDoubleNum1 = this.launchDailyDouble(22, 1);
      }
    }, 5000);
  }

  public parseHtmlEntities(str): string {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
  }
  public mutateObject(data) {
    data.forEach(e => {
      e.incorrect_answers.push(e.correct_answer);
    });
    data.map(ele => (ele.disabled = false));
    return data;
  }
  public filterCategories(data) {
    data.filter(el => {
      // tslint:disable-next-line: quotemark
      if (el.type === "multiple") {
        this.jeopardyQuestion.push(el.question);
      }
    });
  }
  public getUrl(): string {
    return 'url(\'../assets/images/jeoback.png\')';
  }

  public changeActiveButtons(i) {
    return (this.category1[i].disabled = !this.category1[i].disabled);
  }
  public navigateToScore(): void {
    if (this.questionCounter === 25) {
      console.log("moving to score screen");
      console.log("question counter ", this.questionCounter);
      this.getUserInfoService.getUserScore(this.userScore);
      setTimeout(() => {
        this.router.navigateByUrl("/userScore");
      }, 10000);
    }
  }
  public redirectToDailyDouble(): void {
    // if (this.dailyDoubleNum1 === this.questionCounter) {
    //   this.router.navigateByUrl("dailyD");
    // }
    // if (this.dailyDoubleNum2 === this.questionCounter) {
    //   this.router.navigateByUrl("dailyD");
    // }
  }
  public launchDailyDouble(maximum, minimum): number {
    const randomNum =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNum;
  }
  public sendDailyDoubleToCat(data, ran) {
    data.map(ele => (ele.dailyDouble = ran));
    return data;
  }
  public pickRandomCategory() {
    const randomCats = Math.floor(Math.random() * (5 - 3 + 1) + 3);
    const randomCats2 = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    const dailyD = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  }
  public traverseCategories(
    categoryX,
    i
  ): {
    categoryQuestion: object;
    incorrectOptions: object;
    disabledButton: boolean;
  } {
    const categoryQuestion = categoryX[i].question;
    const incorrectOptions = categoryX[i].incorrect_answers;
    const disabledButton = categoryX[i].disabled;
    return {
      categoryQuestion,
      incorrectOptions,
      disabledButton
    };
  }
  public disableButton(categoryObject, val) {
    categoryObject[val].disabled = true;
  }
  public getArrValToPass(event): number {
    let arrVal = 0;
    // tslint:disable-next-line:radix
    const value = parseInt(event.target.getAttribute("value"));
    if (value === 100) {
      arrVal = 0;
    } else if (value === 200) {
      arrVal = 1;
    } else if (value === 300) {
      arrVal = 2;
    } else if (value === 400) {
      arrVal = 3;
    } else if (value === 500) {
      arrVal = 4;
    }
    return arrVal;
  }
  public returnCategory(event): object {
    const btnCat = event.target.getAttribute("category");
    if (btnCat === "this.category1") {
      return this.category1;
    } else if (btnCat === "this.category2") {
      return this.category2;
    } else if (btnCat === "this.category3") {
      return this.category3;
    } else if (btnCat === "this.category4") {
      return this.category4;
    } else if (btnCat === "this.category5") {
      return this.category5;
    }
  }
  public disableSessionButtons(event) {
    const btnCat = event.target.getAttribute("category");
    const category = this.returnCategory(event);
    if (btnCat === "this.category1") {
      sessionStorage.setItem("category1", JSON.stringify(category));
    } else if (btnCat === "this.category2") {
      sessionStorage.setItem("category2", JSON.stringify(category));
    } else if (btnCat === "this.category3") {
      sessionStorage.setItem("category3", JSON.stringify(category));
    } else if (btnCat === "this.category4") {
      sessionStorage.setItem("category4", JSON.stringify(category));
    } else if (btnCat === "this.category5") {
      sessionStorage.setItem("category5", JSON.stringify(category));
    }
  }
  public clickButtonTakeAction(event): void {
    const category = this.returnCategory(event);
    const arrVal = this.getArrValToPass(event);
    this.questionCounter++;
    this.navigateToScore();
    this.btnPressed = (event.target as Element).id;
    this.modalId = event.target.getAttribute("data-target").substr(1);
    this.cat = this.traverseCategories(category, arrVal).categoryQuestion;
    this.incorrectAnswers = this.traverseCategories(
      category,
      arrVal
    ).incorrectOptions;
    this.startTimer();
    // tslint:disable-next-line:radix
    this.dollarAmount = parseInt(event.target.value);
    setTimeout(() => {
      this.disableButton(category, arrVal);
      this.disableSessionButtons(event);
    }, 2000);
  }
  public onSelectionChange(event): void {
    this.userChoice = event.target.value;
  }

  public checkAnswersGiveDollars2(buttonArr, category): void {
    for (let i = 0; i < buttonArr.length; i++) {
      if (this.btnPressed === buttonArr[i]) {
        if (this.userChoice === category[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
  }

  public pickRandomObject(questionArr) {
    const keys = Object.keys(questionArr);
    const n = keys.length;
    const index = Math.floor(Math.random() * n);
    const randomKey = keys[index];
    const randomQuestion = questionArr[randomKey];
    const randomQuestionIsDisabled = questionArr[randomKey].disabled;
    return { randomQuestion, randomQuestionIsDisabled };
  }

  public checkAnswerGiveDollars(): void {
    this.closeModalEvent.emit(false);
    this.checkAnswersGiveDollars2(this.catOnebuttonArray, this.category1);
    this.checkAnswersGiveDollars2(this.catTwobuttonArray, this.category2);
    this.checkAnswersGiveDollars2(this.catThreebuttonArray, this.category3);
    this.checkAnswersGiveDollars2(this.catFourbuttonArray, this.category4);
    this.checkAnswersGiveDollars2(this.catFivebuttonArray, this.category5);
    sessionStorage.setItem("userDollars", JSON.stringify(this.userScore));
    sessionStorage.setItem(
      "questionCounter",
      JSON.stringify(this.questionCounter)
    );
  }
}
