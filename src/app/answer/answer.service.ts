import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Poll, PollToAnswer } from '../models/poll';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  pollToAnswer: PollToAnswer;

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


  
  getTests(): Observable<{ message: string, tests: any }> {
    return this.http.get<{ message: string, tests: any }>('http://localhost:3000/tests')
  }


  getPollQuestion(id: string) {
    return this.http.post<{ questionTitle: string }>('http://localhost:3000/polls/questions', {id})
  }


  saveFilledPoll(poll) {
    return this.http.post<{ answerId:string, message: string }>('http://localhost:3000/polls/answers', poll)
  }

}
