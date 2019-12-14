export abstract class Jeopardy {
    abstract getSessionStorage(): string;
    abstract startTimer(): void;
    abstract getServiceData(): void;
    abstract manipulateObject(): void;
    abstract parseHtmlEntities(str): string;
    abstract mutateObject(data): void;
    abstract filterCategories(data): void;
    abstract getUrl(): string;
    abstract changeActiveButtons(i): boolean;
    abstract navigateToScore(): void;
    abstract launchDailyDouble(num, num2): number;
    abstract traverseCategories(category, index): object;
    abstract disableButton(catobject, val, sessionKey): void;
    abstract userButtonClicked(event$): void;
    abstract onSelectionChange(event$): void;
    abstract checkAnswersGiveDollars2(buttonArr, cat): void;
    abstract checkAnswerGiveDollars(): void;
}
