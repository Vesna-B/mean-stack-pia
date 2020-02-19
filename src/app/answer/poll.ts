import { Question, Options } from '../create/question';

export class Poll {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    questions: string[]     //array of question ids
}


export class PollToAnswer {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    questions: Question[];
}