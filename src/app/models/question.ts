export class PollQuestion {
    id: string;
    questionTitle: string;
}

export class TestQuestion {
    questionTitle: string;
    //correctAnswer: string;
    options: Options[];
}

export class Options {
    title: string;
}