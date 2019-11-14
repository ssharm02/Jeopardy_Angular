import { Component, OnInit } from '@angular/core';
import { JeopardyService } from 'src/services/getQuestions';
import { Subscription } from 'rxjs';
@Component({
  selector: "jeo-questions",
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class JeoQuestions implements OnInit {
  public jeoSub: Subscription;
  public categories;
  public allQuestions = new Array();
  public GET_QUESTIONS = 4;
  public clicked = false;
  public dollarAmount;
  public btnPressed: string;
  public userChoice: string;
  public category1 = new Object();
  public category2 = new Object();
  public category3 = new Object();
  public category4 = new Object();
  public category5 = new Object();
  public userScore: number;
  public userAnswer: string;
  public jeopardyQuestion = new Array();
  public possibleAnswers = new Array();

  constructor(public jeotest: JeopardyService) {}

  ngOnInit(): void {
    this.manipulateObject();
  }

  getServiceData = async () => {
    this.jeoSub = await this.jeotest.getItems().subscribe(async data => {

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
  public mutateObject(data) {
    data.forEach(e => {
      e.incorrect_answers.push(e.correct_answer);
    });
    return data;
  }
  public filterCategories(data) {
    data.filter(el => {
      if (el.type === 'multiple') {
        this.jeopardyQuestion.push(el.question);
      }
    });
  }

  public userButtonClicked(event) {
    this.btnPressed = (event.target as Element).id;
    // tslint:disable-next-line:radix
    this.dollarAmount = parseInt(event.target.value);
    this.clicked = true;
  }
  public onSelectionChange(event) {
    this.userChoice = event.target.value;
  }
  public checkAnswerGiveDollars() {

    // tslint:disable-next-line: quotemark
    if (this.btnPressed === "cat2-btn1") {
      if (this.userChoice === this.category2[0].correct_answer) {
        this.userScore += this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn2') {
      if (this.userChoice === this.category2[1].correct_answer) {
        this.userScore += this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn3') {
      if (this.userChoice === this.category2[2].correct_answer) {
        this.userScore += this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn4') {
      if (this.userChoice === this.category2[3].correct_answer) {
      }
    }
    if (this.btnPressed === 'cat2-btn5') {
      if (this.userChoice === this.category2[4].correct_answer) {
      }
    }
  }
}
