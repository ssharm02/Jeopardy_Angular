import { Component, OnInit, Input } from "@angular/core";
import { JeopardyService } from "src/services/getQuestions";
import { UserInfoService } from "src/services/getUserInfo";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  Validator,
  AbstractControl,
  NG_VALIDATORS,
  Validators,
  ValidatorFn
} from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "dailyD",
  templateUrl: "./dailyD.component.html",
  styleUrls: ["./dailyD.component.css"]
})
export class DailyDComponent implements OnInit {
  dailyDoubleForm: FormGroup;
  submitted = false;
  public score$: any;
  public questionsData$: Subscription;
  public allQuestions = new Array();
  public dailyD1 = new Object();
  public dailyD2 = new Object();

  constructor(
    public getJeopardyData: JeopardyService,
    public getUserInfoService: UserInfoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getUserInfoService.currentScore.subscribe(
      data => (this.score$ = data)
    );
  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.pickTwoCategories();
    this.dailyDoubleForm = this.formBuilder.group({
      dollarScore: [0, Validators.required]
    });
  }
  get f() {
    return this.dailyDoubleForm.controls;
  }
  public getUrl(): string {
    return 'url(\'../assets/images/dailyDouble.jpg\')';
  }
  public getAllQuestions() {
    this.questionsData$ = this.getJeopardyData.getItems().subscribe(data => {
      this.allQuestions.push(data);
      return this.allQuestions;
    });
  }

  public pickTwoCategories() {
    for (let i = 0; i < 2; i++) {
      this.getAllQuestions();
    }
    setTimeout(() => {
      this.dailyD1 = this.allQuestions[0];
      this.dailyD2 = this.allQuestions[1];

      console.log("dailyD1 ", this.dailyD1);
      console.log("dailyD2 ", this.dailyD2);
      this.pickRandomObject(this.dailyD1);
    }, 5000);
  }
  public mutateObject(data) {
    data.forEach(e => {
      e.incorrect_answers.push(e.correct_answer);
    });
    return data;
  }
  public pickRandomObject(questionArr) {
    const keys = Object.keys(questionArr);
    const n = keys.length;
    const index = Math.floor(Math.random() * n);
    const randomKey = keys[index];
    const randomQuestion = questionArr[randomKey];
    console.log(randomQuestion);
    return randomQuestion;
  }
}
