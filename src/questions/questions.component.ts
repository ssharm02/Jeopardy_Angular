import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { JeopardyService } from 'src/services/getQuestions';
import { LogMeIn } from '../login/login.component';
import { Observable, Subscription, timer } from 'rxjs';
import { UserInfoService } from 'src/services/getUserInfo';
import { map, take } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'jeo-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class JeoQuestions implements OnInit, OnDestroy {
  public jeoSub: Subscription;
  public nameSub: Subscription;
  public categories;
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
  @ViewChild(LogMeIn) playerNameRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(public jeotest: JeopardyService, public getUserInfoService: UserInfoService, private router: Router) {

    this.getUserInfoService.currentMessage.subscribe(data => this.name$ = data);
  }

  ngOnInit(): void {
    this.manipulateObject();
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
        console.log('closing modal')
        // this.closeModalEvent.emit(false);
      }
    }, 1000);
  }
  public getServiceData() {
    this.jeoSub = this.jeotest.getItems().subscribe(data => {
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
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
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
    return this.category1[i].disabled = !this.category1[i].disabled;
  }
  public navigateToScore(): void {
    if (this.questionCounter === 5) {
      this.getUserInfoService.getUserScore(this.userScore);
      this.router.navigateByUrl('/userScore');
    }
  }
  public userButtonClicked(event): void {

    const firstCategory1Q = this.category1[0].question;
    const firstCategory1INQ = this.category1[0].incorrect_answers;
    const firstCategory2Q = this.category1[1].question;
    const firstCategory2INQ = this.category1[1].incorrect_answers;
    const firstCategory3Q = this.category1[2].question;
    const firstCategory3INQ = this.category1[2].incorrect_answers;
    const firstCategory4Q = this.category1[3].question;
    const firstCategory4INQ = this.category1[3].incorrect_answers;
    const firstCategory5Q = this.category1[4].question;
    const firstCategory5INQ = this.category1[4].incorrect_answers;

    const secondCategory1Q = this.category2[0].question;
    const secondCategory1INQ = this.category2[0].incorrect_answers;
    const secondCategory2Q = this.category2[1].question;
    const secondCategory2INQ = this.category2[1].incorrect_answers;
    const secondCategory3Q = this.category2[2].question;
    const secondCategory3INQ = this.category2[2].incorrect_answers;
    const secondCategory4Q = this.category2[3].question;
    const secondCategory4INQ = this.category2[3].incorrect_answers;
    const secondCategory5Q = this.category2[4].question;
    const secondCategory5INQ = this.category2[4].incorrect_answers;

    const thirdCategory1Q = this.category3[0].question;
    const thirdCategory1INQ = this.category3[0].incorrect_answers;
    const thirdCategory2Q = this.category3[1].question;
    const thirdCategory2INQ = this.category3[1].incorrect_answers;
    const thirdCategory3Q = this.category3[2].question;
    const thirdCategory3INQ = this.category3[2].incorrect_answers;
    const thirdCategory4Q = this.category3[3].question;
    const thirdCategory4INQ = this.category3[3].incorrect_answers;
    const thirdCategory5Q = this.category3[4].question;
    const thirdCategory5INQ = this.category3[4].incorrect_answers;

    const fourthCategory1Q = this.category4[0].question;
    const fourthCategory1INQ = this.category4[0].incorrect_answers;
    const fourthCategory2Q = this.category4[1].question;
    const fourthCategory2INQ = this.category4[1].incorrect_answers;
    const fourthCategory3Q = this.category4[2].question;
    const fourthCategory3INQ = this.category4[2].incorrect_answers;
    const fourthCategory4Q = this.category4[3].question;
    const fourthCategory4INQ = this.category4[3].incorrect_answers;
    const fourthCategory5Q = this.category4[4].question;
    const fourthCategory5INQ = this.category4[4].incorrect_answers;

    const fifthCategory1Q = this.category5[0].question;
    const fifthCategory1INQ = this.category5[0].incorrect_answers;
    const fifthCategory2Q = this.category5[1].question;
    const fifthCategory2INQ = this.category5[1].incorrect_answers;
    const fifthCategory3Q = this.category5[2].question;
    const fifthCategory3INQ = this.category5[2].incorrect_answers;
    const fifthCategory4Q = this.category5[3].question;
    const fifthCategory4INQ = this.category5[3].incorrect_answers;
    const fifthCategory5Q = this.category5[4].question;
    const fifthCategory5INQ = this.category5[4].incorrect_answers;
    this.navigateToScore();
    this.btnPressed = (event.target as Element).id;
    switch (this.btnPressed) {
      case 'cat1-btn1':
        this.startTimer();
        this.modalId = 'cat1';
        this.cat = firstCategory1Q;
        this.incorrectAnswers = firstCategory1INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[0].disabled = true;
        }, 2000);
        break;
      case 'cat1-btn2':
        this.startTimer();
        this.modalId = 'cat2';
        this.cat = firstCategory2Q;
        this.incorrectAnswers = firstCategory2INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[1].disabled = true;
        }, 2000);
        break;
      case 'cat1-btn3':
        this.startTimer();
        this.modalId = 'cat3';
        this.cat = firstCategory3Q;
        this.incorrectAnswers = firstCategory3INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[2].disabled = true;
        }, 2000);
        break;
      case 'cat1-btn4':
        this.modalId = 'cat4';
        this.cat = firstCategory4Q;
        this.incorrectAnswers = firstCategory4INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[3].disabled = true;
        }, 2000);
        break;
      case 'cat1-btn5':
        this.modalId = 'cat5';
        this.cat = firstCategory5Q;
        this.incorrectAnswers = firstCategory5INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category1[4].disabled = true;
        }, 2000);
        break;
      case 'cat2-btn1':
        this.modalId = 'cat1a';
        this.cat = secondCategory1Q;
        this.incorrectAnswers = secondCategory1INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[0].disabled = true;
        }, 2000);
        break;
      case 'cat2-btn2':
        this.modalId = 'cat2a';
        this.cat = secondCategory2Q;
        this.incorrectAnswers = secondCategory2INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[1].disabled = true;
        }, 2000);
        break;
      case 'cat2-btn3':
        this.modalId = 'cat3a';
        this.cat = secondCategory3Q;
        this.incorrectAnswers = secondCategory3INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[2].disabled = true;
        }, 2000);
        break;
      case 'cat2-btn4':
        this.modalId = 'cat4a';
        this.cat = secondCategory4Q;
        this.incorrectAnswers = secondCategory4INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[3].disabled = true;
        }, 2000);
        break;
      case 'cat2-btn5':
        this.modalId = 'cat5a';
        this.cat = secondCategory5Q;
        this.incorrectAnswers = secondCategory5INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category2[4].disabled = true;
        }, 2000);
        break;
      case 'cat3-btn1':
        this.modalId = 'cat1b';
        this.cat = thirdCategory1Q;
        this.incorrectAnswers = thirdCategory1INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[0].disabled = true;
        }, 2000);
        break;
      case 'cat3-btn2':
        this.modalId = 'cat2b';
        this.cat = thirdCategory2Q;
        this.incorrectAnswers = thirdCategory2INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[1].disabled = true;
        }, 2000);
        break;
      case 'cat3-btn3':
        this.modalId = 'cat3b';
        this.cat = thirdCategory3Q;
        this.incorrectAnswers = thirdCategory3INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[2].disabled = true;
        }, 2000);
        break;
      case 'cat3-btn4':
        this.modalId = 'cat4b';
        this.cat = thirdCategory4Q;
        this.incorrectAnswers = thirdCategory4INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[3].disabled = true;
        }, 2000);
        break;
      case 'cat3-btn5':
        this.modalId = 'cat5b';
        this.cat = thirdCategory5Q;
        this.incorrectAnswers = thirdCategory5INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category3[4].disabled = true;
        }, 2000);
        break;
      case 'cat4-btn1':
        this.modalId = 'cat1aa';
        this.cat = fourthCategory1Q;
        this.incorrectAnswers = fourthCategory1INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[0].disabled = true;
        }, 2000);
        break;
      case 'cat4-btn2':
        this.modalId = 'cat2aa';
        this.cat = fourthCategory2Q;
        this.incorrectAnswers = fourthCategory2INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[1].disabled = true;
        }, 2000);
        break;
      case 'cat4-btn3':
        this.modalId = 'cat3aa';
        this.cat = fourthCategory3Q;
        this.incorrectAnswers = fourthCategory3INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[2].disabled = true;
        }, 2000);
        break;
      case 'cat4-btn4':
        this.modalId = 'cat4aa';
        this.cat = fourthCategory4Q;
        this.incorrectAnswers = fourthCategory4INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[3].disabled = true;
        }, 2000);
        break;
      case 'cat4-btn5':
        this.modalId = 'cat5aa';
        this.cat = fourthCategory5Q;
        this.incorrectAnswers = fourthCategory5INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category4[4].disabled = true;
        }, 2000);
        break;
      case 'cat5-btn1':
        this.modalId = 'cat1bb';
        this.cat = fifthCategory1Q;
        this.incorrectAnswers = fifthCategory1INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[0].disabled = true;
        }, 2000);
        break;
      case 'cat5-btn2':
        this.modalId = 'cat2bb';
        this.cat = fifthCategory2Q;
        this.incorrectAnswers = fifthCategory2INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[1].disabled = true;
        }, 2000);
        break;
      case 'cat5-btn3':
        this.modalId = 'cat3bb';
        this.cat = fifthCategory3Q;
        this.incorrectAnswers = fifthCategory3INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[2].disabled = true;
        }, 2000);
        break;
      case 'cat5-btn4':
        this.modalId = 'cat4bb';
        this.cat = fifthCategory4Q;
        this.incorrectAnswers = fifthCategory4INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[3].disabled = true;
        }, 2000);
        break;
      case 'cat5-btn5':
        this.modalId = 'cat5bb';
        this.cat = fifthCategory5Q;
        this.incorrectAnswers = fifthCategory5INQ;
        this.questionCounter++;
        setTimeout(() => {
          this.category5[4].disabled = true;
        }, 2000);
        break;
    }
    // tslint:disable-next-line:radix
    this.dollarAmount = parseInt(event.target.value);
  }
  public onSelectionChange(event) {
    this.userChoice = event.target.value;
  }
  public checkAnswerGiveDollars() {
    this.closeModalEvent.emit(false);
    // tslint:disable-next-line: quotemark
    if (this.btnPressed === "cat1-btn1") {
      if (this.userChoice === this.category1[0].correct_answer) {
        this.userScore += this.dollarAmount;
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat1-btn2') {
      if (this.userChoice === this.category1[1].correct_answer) {
        this.userScore += this.dollarAmount;
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat1-btn3') {
      if (this.userChoice === this.category1[2].correct_answer) {
        this.userScore += this.dollarAmount;
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat1-btn4') {
      if (this.userChoice === this.category1[3].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat1-btn5') {
      if (this.userChoice === this.category1[4].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn1') {
      if (this.userChoice === this.category2[0].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn2') {
      if (this.userChoice === this.category2[1].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn3') {
      if (this.userChoice === this.category2[2].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn4') {
      if (this.userChoice === this.category2[3].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat2-btn5') {
      if (this.userChoice === this.category2[4].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat3-btn1') {
      if (this.userChoice === this.category3[0].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat3-btn2') {
      if (this.userChoice === this.category3[1].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat3-btn3') {
      if (this.userChoice === this.category3[2].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat3-btn4') {
      if (this.userChoice === this.category3[3].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat3-btn5') {
      if (this.userChoice === this.category3[4].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat4-btn1') {
      if (this.userChoice === this.category4[0].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat4-btn2') {
      if (this.userChoice === this.category4[1].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat4-btn3') {
      if (this.userChoice === this.category4[2].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat4-btn4') {
      if (this.userChoice === this.category4[3].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat4-btn5') {
      if (this.userChoice === this.category4[4].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat5-btn1') {
      if (this.userChoice === this.category5[0].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat5-btn2') {
      if (this.userChoice === this.category5[1].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat5-btn3') {
      if (this.userChoice === this.category5[2].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat5-btn4') {
      if (this.userChoice === this.category5[3].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
    if (this.btnPressed === 'cat5-btn5') {
      if (this.userChoice === this.category5[4].correct_answer) {
      } else {
        this.userScore -= this.dollarAmount;
      }
    }
  }
}
