export class User {
    _id: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    identNum: string;
    phone: string;
    email: string;
    userType: string;
    approved: string;
    answeredPolls: { pollId: string, answerId: string }[];
    answeredTests: { testId: string, answerId: string }[];
}