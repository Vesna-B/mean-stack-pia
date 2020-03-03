import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Poll, PollToAnswer } from '../models/poll';
import { Test, TestToAnswer, TestQuestion } from '../models/test';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  pollToAnswer: PollToAnswer;
  testToAnswer: TestToAnswer;

  constructor(private http: HttpClient, private router: Router) { }



  getPolls(): Observable<{ message: string, polls: Poll[] }> {
    return this.http.get<{ message: string, polls: Poll[] }>('http://localhost:3000/polls')
  }

  fillPoll(poll: Poll) {
    let condition = 0;
    const questions = new Array<{ id: string, questionTitle: string }>();

    for (let i = 0; i < poll.questions.length; i++) {
      const q = {
        id: poll.questions[i],
        questionTitle: null
      }
      this.getPollQuestion(poll.questions[i]).subscribe(response => {
        q.questionTitle = response.questionTitle;
        questions[i] = q;
        condition = condition + 1;

        if (condition == poll.questions.length) {
          this.pollToAnswer = {
            _id: poll._id,
            author: poll.author,
            name: poll.name,
            info: poll.info,
            startDate: poll.startDate,
            endDate: poll.endDate,
            pollType: poll.pollType,
            questions: questions
          }
          this.router.navigate(['/answerpoll']);
        }
      });
    }
  }

  getPollQuestion(id: string) {
    return this.http.post<{ questionTitle: string }>('http://localhost:3000/polls/questions', {id})
  }

  saveFilledPoll(poll) {
    return this.http.post<{ answerId:string, message: string }>('http://localhost:3000/polls/answers', poll)
  }



  getTests(): Observable<{ message: string, tests: Test[] }> {
    return this.http.get<{ message: string, tests: Test[] }>('http://localhost:3000/tests')
  }

  fillTest(test) {
    let condition = 0;
    const questions = new Array<TestQuestion>()

    for (let i = 0; i < test.questions.length; i++) {
      const q = {
        id: test.questions[i],
        questionTitle: null,
        points: null,
        options: null
      }
      this.getTestQuestion(test.questions[i]).subscribe(response => {
        q.questionTitle = response.title;
        q.points = response.points;
        q.options = response.options;
        questions[i] = q;
        condition = condition + 1;

        if (condition == test.questions.length) {
          this.testToAnswer = {
            _id: test._id,
            author: test.author,
            name: test.name,
            info: test.info,
            startDate: test.startDate,
            endDate: test.endDate,
            duration: test.duration,
            questions: questions
          }
          this.router.navigate(['answertest']);
        }
      })
    }
  }

  getTestQuestion(id: string) {
    return this.http.post<any>('http://localhost:3000/tests/questions', {id})
  }

  saveFilledTest(test) {
    return this.http.post<{ answerId:string, message: string }>('http://localhost:3000/tests/answers', test)
  }


  getTest(id: string) {
    return this.http.get<Test>('http://localhost:3000/tests/' + id)
  }

}
