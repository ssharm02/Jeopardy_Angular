import { ValueProvider } from '@angular/core';

export abstract class Jeopardy {
    abstract getSessionStorageName(): string;
    abstract getSessionStorageScore(): void;
    abstract startTimer(): void;
    abstract getServiceData(): void;
    abstract manipulateObject(): void;
    abstract mutateObject(data): void;
    abstract filterCategories(data): void;
    abstract getUrl(): string;
    abstract changeActiveButtons(i): boolean;
    abstract navigateToScore(): void;
    abstract launchDailyDouble(num, num2): number;
    abstract traverseCategories(category, index): object;
    abstract disableButton(catobject, val, sessionKey): void;
    abstract clickButtonTakeAction(event$): void;
    abstract onSelectionChange(event$): void;
    abstract checkAnswersGiveDollars2(buttonArr, cat): void;
    abstract checkAnswerGiveDollars(event): void;
    abstract returnCategory(event): object;
    abstract getArrValToPass(event): number;
    abstract fetchApiData(): void;
    abstract getSessionDailyD(): void;
    abstract getSessionAllQuestions(): void;
    abstract getSessionCat1(): void;
    abstract getSessionCat2(): void;
    abstract getSessionCat3(): void;
    abstract getSessionCat4(): void;
    abstract getSessionCat5(): void;

}
