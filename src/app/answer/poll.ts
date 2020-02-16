import { Question, Options } from '../create/question';

export class Poll {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    questions: Question[]
}