import { Component, OnInit } from "@angular/core";
import { JeopardyService } from "src/services/getQuestions";
import { Subscription } from "rxjs";
@Component({
  selector: "jeo-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class JeoQuestions implements OnInit {
  public jeoSub: Subscription;
  public categories;
  public allQuestions = new Array();
  public GET_QUESTIONS = 4;
  public category1 = new Object();
  public category2 = new Object();
  public category3 = new Object();
  public category4 = new Object();
  public category5 = new Object();
  public jeopardyQuestion = new Array();
  public possibleAnswers = new Array();

  constructor(public jeotest: JeopardyService) {}

  ngOnInit(): void {
    this.manipulateObject();
  }

  getServiceData = async () => {
    this.jeoSub = await this.jeotest.getItems().subscribe(async data => {
      this.allQuestions.push(data);
      console.log("all questions", this.allQuestions);

      return this.allQuestions;
    });
  };

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

      console.log(this.category1);
      this.filterCategories(this.category1);
    }, 5000);
  }

  public filterCategories(data) {
    data.filter(el => {
      if (el.type === "multiple") {
        this.jeopardyQuestion.push(el.question);
        this.possibleAnswers.push(
          el.incorrect_answers + "," + " " + el.correct_answer
        );
        console.log("possible answers", this.possibleAnswers);
        console.log("questions are ", this.jeopardyQuestion);
      }
    });
  }
}
