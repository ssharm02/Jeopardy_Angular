import { Component, OnInit, Input } from "@angular/core";
import { JeopardyService } from 'src/services/getQuestions';
import { UserInfoService } from 'src/services/getUserInfo';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn } from "@angular/forms";
@Component({
  selector: "dailyD",
  templateUrl: "./dailyD.component.html",
  styleUrls: ["./dailyD.component.css"]
})
export class DailyDComponent implements OnInit, Validator {

  score$: any;
  private _validator: ValidatorFn;
  public questionsData$: Subscription;
  public allQuestions = new Array();
  public dailyD1 = new Object();
  public dailyD2 = new Object();
  @Input() public set minDailyDoubleBet (value: string) {
    this._validator = Validators.min(parseInt(value, this.score$));
  }
  constructor(public getJeopardyData: JeopardyService, public getUserInfoService: UserInfoService, private router: Router) {

    this.getUserInfoService.currentScore.subscribe(data => this.score$ = data);
  }
  validate(control: AbstractControl): import("@angular/forms").ValidationErrors {
    return this._validator(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    console.log('something is happening');
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.getAllQuestions();
    this.pickTwoCategories();
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

    console.log('dailyD1 ', this.dailyD1);
    console.log('dailyD2 ', this.dailyD2);
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
