import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { JeopardyService } from "src/services/getQuestions";
import { LogMeIn } from "../login/login.component";
import { Observable, Subscription, timer } from "rxjs";
import { UserInfoService } from "src/services/getUserInfo";
import { map, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { User } from "../models/User";
@Component({
  selector: "jeo-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})

// tslint:disable-next-line:component-class-suffix
export class JeoQuestions implements OnInit, OnDestroy {
  // Move all fieds to a seperate class
  public jeoSub: Subscription;
  public nameSub: Subscription;
  public subscription: Subscription;

  public showSpinner = true;
  public GET_QUESTIONS = 4;
  public questionCounter = 0;
  public dollarAmount = 0;

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

  public userScore = 0;
  public userAnswer: string;

  public allQuestions = new Array();
  public jeopardyQuestion = new Array();
  public possibleAnswers = new Array();

  public name$: any;
  public counter$: Observable<number>;
  public timeLeft;
  public interval;
  public count = 60;
  public dailyDoubleNum1: number;
  public dailyDoubleNum2: number;
  @ViewChild(LogMeIn) playerNameRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(
    public jeotest: JeopardyService,
    public getUserInfoService: UserInfoService,
    private router: Router
  ) {
    this.getUserInfoService.currentMessage.subscribe(
      data => (this.name$ = data)
    );
  }

  ngOnInit(): void {
    this.manipulateObject();
    this.dailyDoubleNum1 = this.launchDailyDouble(15, 1);
    this.dailyDoubleNum2 = this.launchDailyDouble(22, 1);
    if (this.dailyDoubleNum1 === this.dailyDoubleNum2) {
      this.dailyDoubleNum1 = this.launchDailyDouble(22, 1);
    }
    console.log("daily double 1 is ", this.dailyDoubleNum1);
    console.log("daily double 2 is ", this.dailyDoubleNum2);
  }
  ngOnDestroy(): void {
    this.jeoSub.unsubscribe();
    // this.nameSub.unsubscribe();
  }
  public startTimer() {
    this.timeLeft = 15;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.closeModalEvent.emit(false);
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
  public manipulateObject() {
    for (let i = 0; i <= this.GET_QUESTIONS; i++) {
      this.getServiceData();
    }
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
      e.question = this.parseHtmlEntities(e.question);
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
      this.getUserInfoService.getUserScore(this.userScore);
      this.router.navigateByUrl("/userScore");
    }
    if (this.dailyDoubleNum1 === this.questionCounter) {
      this.router.navigateByUrl("dailyD");
    }
    if (this.dailyDoubleNum2 === this.questionCounter) {
      this.router.navigateByUrl("dailyD");
    }
  }
  public launchDailyDouble(maximum, minimum): number {
    const randomNum =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNum;
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
  public userButtonClicked(event): void {
    this.navigateToScore();
    this.btnPressed = (event.target as Element).id;
    switch (this.btnPressed) {
      case "cat1-btn1":
        this.startTimer();
        this.modalId = "cat1";
        this.cat = this.traverseCategories(this.category1, 0).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category1,
          0
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[0].disabled = true;
        }, 2000);
        break;
      case "cat1-btn2":
        this.startTimer();
        this.modalId = "cat2";
        this.cat = this.traverseCategories(this.category1, 1).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category1,
          1
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[1].disabled = true;
        }, 2000);
        break;
      case "cat1-btn3":
        this.startTimer();
        this.modalId = "cat3";
        this.cat = this.traverseCategories(this.category1, 2).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category1,
          2
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[2].disabled = true;
        }, 2000);
        break;
      case "cat1-btn4":
        this.modalId = "cat4";
        this.cat = this.traverseCategories(this.category1, 3).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category1,
          3
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[3].disabled = true;
        }, 2000);
        break;
      case "cat1-btn5":
        this.modalId = "cat5";
        this.cat = this.traverseCategories(this.category1, 4).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category1,
          4
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[4].disabled = true;
        }, 2000);
        break;
      case "cat2-btn1":
        this.modalId = "cat1a";
        this.cat = this.traverseCategories(this.category2, 0).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category2,
          0
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[0].disabled = true;
        }, 2000);
        break;
      case "cat2-btn2":
        this.modalId = "cat2a";
        this.cat = this.traverseCategories(this.category2, 1).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category2,
          1
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[1].disabled = true;
        }, 2000);
        break;
      case "cat2-btn3":
        this.modalId = "cat3a";
        this.cat = this.traverseCategories(this.category2, 2).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category2,
          2
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[2].disabled = true;
        }, 2000);
        break;
      case "cat2-btn4":
        this.modalId = "cat4a";
        this.cat = this.traverseCategories(this.category2, 3).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category2,
          3
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[3].disabled = true;
        }, 2000);
        break;
      case "cat2-btn5":
        this.modalId = "cat5a";
        this.cat = this.traverseCategories(this.category2, 4).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category2,
          4
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[4].disabled = true;
        }, 2000);
        break;
      case "cat3-btn1":
        this.modalId = "cat1b";
        this.cat = this.traverseCategories(this.category3, 0).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category3,
          0
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[0].disabled = true;
        }, 2000);
        break;
      case "cat3-btn2":
        this.modalId = "cat2b";
        this.cat = this.traverseCategories(this.category3, 1).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category3,
          1
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[1].disabled = true;
        }, 2000);
        break;
      case "cat3-btn3":
        this.modalId = "cat3b";
        this.cat = this.traverseCategories(this.category3, 2).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category3,
          2
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[2].disabled = true;
        }, 2000);
        break;
      case "cat3-btn4":
        this.modalId = "cat4b";
        this.cat = this.traverseCategories(this.category3, 3).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category3,
          3
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[3].disabled = true;
        }, 2000);
        break;
      case "cat3-btn5":
        this.modalId = "cat5b";
        this.cat = this.traverseCategories(this.category3, 4).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category3,
          4
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[4].disabled = true;
        }, 2000);
        break;
      case "cat4-btn1":
        this.modalId = "cat1aa";
        this.cat = this.traverseCategories(this.category4, 0).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category4,
          0
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[0].disabled = true;
        }, 2000);
        break;
      case "cat4-btn2":
        this.modalId = "cat2aa";
        this.cat = this.traverseCategories(this.category4, 1).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category4,
          1
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[1].disabled = true;
        }, 2000);
        break;
      case "cat4-btn3":
        this.modalId = "cat3aa";
        this.cat = this.traverseCategories(this.category4, 2).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category4,
          2
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[2].disabled = true;
        }, 2000);
        break;
      case "cat4-btn4":
        this.modalId = "cat4aa";
        this.cat = this.traverseCategories(this.category4, 3).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category4,
          3
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[3].disabled = true;
        }, 2000);
        break;
      case "cat4-btn5":
        this.modalId = "cat5aa";
        this.cat = this.traverseCategories(this.category4, 4).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category4,
          4
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[4].disabled = true;
        }, 2000);
        break;
      case "cat5-btn1":
        this.modalId = "cat1bb";
        this.cat = this.traverseCategories(this.category5, 0).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category5,
          0
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[0].disabled = true;
        }, 2000);
        break;
      case "cat5-btn2":
        this.modalId = "cat2bb";
        this.cat = this.traverseCategories(this.category5, 1).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category5,
          1
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[1].disabled = true;
        }, 2000);
        break;
      case "cat5-btn3":
        this.modalId = "cat3bb";
        this.cat = this.traverseCategories(this.category5, 2).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category5,
          2
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[2].disabled = true;
        }, 2000);
        break;
      case "cat5-btn4":
        this.modalId = "cat4bb";
        this.cat = this.traverseCategories(this.category5, 3).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category5,
          3
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[3].disabled = true;
        }, 2000);
        break;
      case "cat5-btn5":
        this.modalId = "cat5bb";
        this.cat = this.traverseCategories(this.category5, 4).categoryQuestion;
        this.incorrectAnswers = this.traverseCategories(
          this.category5,
          4
        ).incorrectOptions;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[4].disabled = true;
        }, 2000);
        break;
    }
    // tslint:disable-next-line:radix
    this.dollarAmount = parseInt(event.target.value);
  }
  public onSelectionChange(event): void {
    this.userChoice = event.target.value;
  }
  public checkAnswerGiveDollars(): void {
    this.closeModalEvent.emit(false);
    // tslint:disable-next-line: quotemark
    const catOnebuttonArray = [
      "cat1-btn1",
      "cat1-btn2",
      "cat1-btn3",
      "cat1-btn4",
      "cat1-btn5",
    ];
    const catTwobuttonArray = [
      "cat2-btn1",
      "cat2-btn2",
      "cat2-btn3",
      "cat2-btn4",
      "cat2-btn5"
    ];
    const catThreebuttonArray = [
      "cat3-btn1",
      "cat3-btn2",
      "cat3-btn3",
      "cat3-btn4",
      "cat3-btn5",
    ];
    const catFourbuttonArray = [
      "cat4-btn1",
      "cat4-btn2",
      "cat4-btn3",
      "cat4-btn4",
      "cat4-btn5",
    ]
    const catFivebuttonArray = [
      "cat5-btn1",
      "cat5-btn2",
      "cat5-btn3",
      "cat5-btn4",
      "cat5-btn5"
    ];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < catOnebuttonArray.length; i++) {
      if (this.btnPressed === catOnebuttonArray[i]) {
        if (this.userChoice === this.category1[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
    for (let i = 0; i < catTwobuttonArray.length; i++) {
      if (this.btnPressed === catTwobuttonArray[i]) {
        if (this.userChoice === this.category2[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
    for (let i = 0; i < catThreebuttonArray.length; i++) {
      if (this.btnPressed === catThreebuttonArray[i]) {
        if (this.userChoice === this.category3[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
    for (let i = 0; i < catFourbuttonArray.length; i++) {
      if (this.btnPressed === catFourbuttonArray[i]) {
        if (this.userChoice === this.category4[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
    for (let i = 0; i < catFivebuttonArray.length; i++) {
      if (this.btnPressed === catFivebuttonArray[i]) {
        if (this.userChoice === this.category5[i].correct_answer) {
          this.userScore += this.dollarAmount;
        } else {
          this.userScore -= this.dollarAmount;
        }
      }
    }
  }
}
