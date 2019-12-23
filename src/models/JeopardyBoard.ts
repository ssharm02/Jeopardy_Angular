import { Subscription, Observable } from "rxjs";

export interface JeopardyBoard {
  jeoSub: Subscription;
  nameSub: Subscription;
  subscription: Subscription;
  showSpinner: boolean;
  GET_QUESTIONS: number;
  questionCounter: number;
  dollarAmount: number;
  userScore: number;
  count: number;
  selectCategory: string;
  modalId: string;
  btnPressed: string;
  userChoice: string;

  cat: object;
  category1: object;
  category2: object;
  category3: object;
  category4: object;
  category5: object;
  incorrectAnswers: object;
  allCategories: object;

  userAnswer: string;

  allQuestions: Array<any>;
  jeopardyQuestion: Array<any>;
  possibleAnswers: Array<any>;

  name$: any;
  counter$: Observable<number>;
  timeLeft;
  interval;
  dailyDoubleNum1: number;
  dailyDoubleNum2: number;
}
