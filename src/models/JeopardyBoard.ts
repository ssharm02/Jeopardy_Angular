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
}
