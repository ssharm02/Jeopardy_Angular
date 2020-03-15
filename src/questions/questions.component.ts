import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit
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
import * as _ from "underscore";
import { Howl } from "howler";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";

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
  public showSpinner: boolean = true;
  public timer: boolean = false;
  public IsmodelShow: boolean = false;
  public successBtn: boolean = false;
  public GET_QUESTIONS: number = 4;
  public questionCounter: number = 0;
  public dollarAmount: number = 0;
  public userScore: number = 0;
  public count: number = 60;

  public correctAnswerCount = 0;
  public incorrectAnswerCount = 0;

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
  public dailyDoubleNum1: number;
  public dailyDoubleNum2: number;
  myForm = new FormGroup({}); // Instantiating our form
  get f() {
    return this.myForm.controls;
  }
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
  public doubleCopy = [...this.categoryArray];

  @ViewChild(LogMeIn, { static: false }) playerNameRef;
  @ViewChild("savebutton", { static: false }) savebutton: ElementRef;

  constructor(
    public jeotest: JeopardyService,
    public getUserInfoService: UserInfoService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    super();
    // let dailyDBet = this.dailyDouble();
    this.getUserInfoService.currentMessage.subscribe(
      data => (this.name$ = data)
    );
  }
  public dailyDouble(): number {
    let betAmount = 0;
    if (this.userScore < 0) {
      betAmount = 1000;
    } else if (this.userScore < 1000) {
      betAmount = 1000;
    } else {
      betAmount = this.userScore;
    }
    console.log("bet amount is ", betAmount);
    return betAmount;
  }
  ngOnInit(): void {
    let counter = 0;
    if ("userDollars" in sessionStorage && this.userScore === 0) {
      const updateScore = setInterval(() => {
        this.userScore = this.getSessionStorageScore();
        this.questionCounter = this.getSessionCounter();
        this.correctAnswerCount = this.getCorrectAns();
        this.incorrectAnswerCount = this.getIncorrectAns();
        this.ref.markForCheck();
        counter++;
        if (counter === 10) {
          clearInterval(updateScore);
        }
      }, 100);
    }
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
      this.getCorrectAns();
      this.getIncorrectAns();
      this.getSessionCounter();
    } else {
      this.manipulateObject();
      this.fetchApiData();
    }
    if ("dailyDouble1" in sessionStorage && "dailyDouble2" in sessionStorage) {
      console.log("daily double is in session");
    }
    const name = this.getSessionStorageName();
    // tslint:disable-next-line:radix
    if (this.name$ === "Default Player") {
      this.name$ = name;
    }
  }
  ngOnDestroy(): void {
    // this.jeoSub.unsubscribe();
    // this.nameSub.unsubscribe();
  }
  public selectRandomCategory2() {
    let arr = [];
    const maxArrNum = Math.max(...this.doubleCopy);
    const minArrNum = Math.min(...this.doubleCopy);
    while (arr.length < 5) {
      const num =
        Math.floor(Math.random() * (maxArrNum - minArrNum + 1)) + minArrNum;
      if (arr.indexOf(num) === -1) {
        arr.push(num);
      }
    }
    return arr;
  }
  public getSessionStorageName(): string {
    const sessionName = sessionStorage.getItem("name");
    return sessionName;
  }
  public getSessionStorageScore(): number {
    // tslint:disable-next-line: radix
    const sessionScore = parseInt(sessionStorage.getItem("userDollars"));
    return sessionScore;
  }
  public startTimer() {
    const sound = new Howl({
      src: ["../assets/audio/Jeopardy_Theme_Song.mp3"],
      html5: true
    });
    this.timeLeft = 30;
    this.playTimerSound(sound);
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.timer || this.timeLeft === 0) {
        this.timeLeft = 30;
        this.stopTimerSound(sound);
        this.savebutton.nativeElement.click();
        clearInterval(interval);
      }
    }, 1000);
    this.timer = false;
  }

  public getServiceData(cat) {
    this.jeoSub = this.jeotest.getItems(cat).subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
      }, 7000);

      this.allQuestions.push(data);
      return this.allQuestions;
    });
  }

  public playTimerSound(sound) {
    return sound.play();
  }
  public stopTimerSound(sound) {
    return sound.stop();
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
  public getSessionCounter(): number {
    const counter = JSON.parse(sessionStorage.getItem("questionCounter"));
    return counter;
  }
  public getCorrectAns(): number {
    const correctCount = JSON.parse(sessionStorage.getItem("correctAnsws"));
    return correctCount;
  }
  public getIncorrectAns(): number {
    const incorrectCount = JSON.parse(sessionStorage.getItem("incorrectAns"));
    return incorrectCount;
  }
  public fetchApiData() {
    const catArr = this.selectRandomCategory2();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < catArr.length; i++) {
      this.getServiceData(catArr[i]);
    }
  }
  public setAllQuestions(): void {
    sessionStorage.setItem("allQuestions", JSON.stringify(this.allQuestions));
  }
  public setCat1(): void {
    sessionStorage.setItem("category1", JSON.stringify(this.category1));
  }
  public setCat2(): void {
    sessionStorage.setItem("category2", JSON.stringify(this.category2));
  }
  public setCat3(): void {
    sessionStorage.setItem("category3", JSON.stringify(this.category3));
  }
  public setCat4(): void {
    sessionStorage.setItem("category4", JSON.stringify(this.category4));
  }
  public setCat5(): void {
    sessionStorage.setItem("category5", JSON.stringify(this.category5));
  }
  public setCorrectAns(): void {
    sessionStorage.setItem(
      "correctAnsws",
      JSON.stringify(this.correctAnswerCount)
    );
  }
  public setIncorrectAns(): void {
    sessionStorage.setItem(
      "incorrectAns",
      JSON.stringify(this.incorrectAnswerCount)
    );
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
      this.setAllQuestions();
      this.setCat1();
      this.setCat2();
      this.setCat3();
      this.setCat4();
      this.setCat5();
      this.sendDailyDoubleToCat(this.category1, 2);
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
    }, 7000);
  }

  public mutateObject(data) {
    data.forEach(e => {
      e.question = _.unescape(e.question);
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
  public getDailyD(): string {
    return 'url(\'../assets/images/dailyDouble.jpg\')';
  }
  public changeActiveButtons(i) {
    return (this.category1[i].disabled = !this.category1[i].disabled);
  }
  public navigateToScore(): void {
    if (this.questionCounter === 25) {
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
    sessionStorage.setItem(
      "questionCounter",
      JSON.stringify(this.questionCounter)
    );
    this.startTimer();
    this.navigateToScore();
    this.btnPressed = (event.target as Element).id;
    this.modalId = event.target.getAttribute("data-target").substr(1);
    this.cat = this.traverseCategories(category, arrVal).categoryQuestion;
    this.incorrectAnswers = this.traverseCategories(
      category,
      arrVal
    ).incorrectOptions;
    // tslint:disable-next-line:radix
    this.dollarAmount = parseInt(event.target.value);
    setTimeout(() => {
      this.disableButton(category, arrVal);
      this.disableSessionButtons(event);
    }, 2000);
  }
  public onSelectionChange(event): void {
    return (this.userChoice = event.target.value);
  }

  public checkAnswersGiveDollars2(buttonArr, category): void {
    const failSound = new Howl({
      src: ["../assets/audio/maximum_failure.mp3"],
      html5: true
    });
    const winSound = new Howl({
      src: ["../assets/audio/win_sound.mp3"],
      html5: true
    });
    for (let i = 0; i < buttonArr.length; i++) {
      if (this.btnPressed === buttonArr[i]) {
        if (this.userChoice === category[i].correct_answer) {
          this.userScore += this.dollarAmount;
          this.setCorrectAns();
          this.playTimerSound(winSound);
          this.correctAnswerCount++;
        } else {
          this.userScore -= this.dollarAmount;
          this.incorrectAnswerCount++;
          this.setIncorrectAns();
          this.playTimerSound(failSound);
        }
      }
    }
  }

  public checkAnswerGiveDollars(): void {
    if (this.timer) {
      return;
    }
    this.successBtn = true;
    this.checkAnswersGiveDollars2(this.catOnebuttonArray, this.category1);
    this.checkAnswersGiveDollars2(this.catTwobuttonArray, this.category2);
    this.checkAnswersGiveDollars2(this.catThreebuttonArray, this.category3);
    this.checkAnswersGiveDollars2(this.catFourbuttonArray, this.category4);
    this.checkAnswersGiveDollars2(this.catFivebuttonArray, this.category5);
    sessionStorage.setItem("userDollars", JSON.stringify(this.userScore));
    this.timer = true;
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
  public formatOne = () => `${this.timeLeft}`;

  open(content) {
    const dailyDoubleSound = new Howl({
      src: ["../assets/audio/daily-double.mp3"],
      html5: true
    });
    this.playTimerSound(dailyDoubleSound);
    this.myForm = this.formBuilder.group({
      dailyD: ["", [Validators.min(0), Validators.max(this.dailyDouble())]]
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          // this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  public keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
