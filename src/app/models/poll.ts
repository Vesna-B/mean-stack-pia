import { PollQuestion } from './question';

export class Poll {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    pollType: string;
    questions: string[]     //array of question ids
}


export class PollToAnswer {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    pollType: string;
    questions: PollQuestion[];
}