import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Poll, PollToAnswer } from './poll';
import { Router } from '@angular/router';
import { Test } from './test';
import { Question } from '../create/question';

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
    let questions = [];
    for (let i = 0; i < poll.questions.length; i++) {
      let q = {
        id: poll.questions[i],
        questionTitle: null
      }
      this.getPollQuestion(poll.questions[i]).subscribe(response => {
        q.questionTitle = response.questionTitle;
        questions.push(q);
      })
    }

    this.pollToAnswer = {
      _id: poll._id,
      author: poll.author,
      name: poll.name,
      info: poll.info,
      startDate: poll.startDate,
      endDate: poll.endDate,
      questions: questions
    }
    console.log(this.pollToAnswer)
    this.router.navigate(['/answerpoll']);
  }



  getTests(): Observable<{ message: string, tests: any }> {
    return this.http.get<{ message: string, tests: any }>('http://localhost:3000/tests')
  }


  getPollQuestion(id: string) {
    return this.http.post<{ questionTitle: string }>('http://localhost:3000/polls/questions', {id})
  }

}
