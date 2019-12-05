import { Component } from "@angular/core";
import { Observable, Subscription } from "rxjs";
@Component({
  selector: "jeo-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class JeopardyBoard {
  public jeoSub: Subscription;
  public nameSub: Subscription;
  public categories;
  public showSpinner = true;
  public allQuestions = new Array();
  public GET_QUESTIONS = 4;
  public questionCounter = 0;
  public selectCategory: string;
  public dollarAmount = 0;
  public cat: string;
  public incorrectAnswers;
  public modalId: string;
  public btnPressed: string;
  public userChoice: string;
  public category1 = new Object();
  public category2 = new Object();
  public category3 = new Object();
  public category4 = new Object();
  public category5 = new Object();
  public allCategories = new Object();
  public userScore = 0;
  public userAnswer: string;
  public jeopardyQuestion = new Array();
  public possibleAnswers = new Array();
  public lastClicked;
  name$: any;
  subscription: Subscription;
  public timeLeft;
  public interval;
  counter$: Observable<number>;
  count = 60;
  public dailyDoubleNum1;
  public dailyDoubleNum2;
}
