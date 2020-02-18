import { TestQuestion } from '../create/question';

export class Test {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    questions: TestQuestion[];
}