export class Question {
    id: string;
    questionTitle: string;
    // type: string;
    // options: Options[];
}

export class TestQuestion {
    questionTitle: string;
    //type: string;
    options: Options[];
}

export class Options {
    title: string;
}