import { Answer } from "./answer";

export class Question {

    category: string;
    type: string;
    difficulty: string;
    question: string;
    answers: Answer[];

    constructor(cat: string = '', type: string = '', difficulty: string, question: string, answers: Answer[]) {
        this.difficulty = difficulty;
        this.question = question;
        this.answers = answers;
    }
}
