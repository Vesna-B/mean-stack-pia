// import { TestQuestion } from './question';

export class TestQuestion {
    id: string;
    questionTitle: string;
    points: number;
    options: Option[];
}

export class Option {
    optionTitle: string;
    isCorrect: string;
}


export class Test {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    questions: string[];    //array od question ids
}

export class TestToAnswer {
    _id: string;
    author: string;
    name: string;
    info: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    questions: TestQuestion[];    
}