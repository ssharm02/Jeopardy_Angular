export class JeopardyServiceClass {
    public category: string;
    public type: string;
    public difficulty: string;
    public incorrect_answers = Array();

    constructor(data?: any) {
        const defaults: any = {
            ...data
        };
        this.category = defaults.category;
        this.type = defaults.type;
        this.difficulty = defaults.difficulty;
        this.incorrect_answers = defaults.incorrect_answers;
    }
}
