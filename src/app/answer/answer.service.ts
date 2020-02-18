import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Poll } from './poll';
import { Router } from '@angular/router';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  pollToAnswer: Poll;

  constructor(private http: HttpClient, private router: Router) { }


  getPolls(): Observable<{ message: string, polls: Poll[] }> {
    return this.http.get<{ message: string, polls: Poll[] }>('http://localhost:3000/polls')
  }

  fillPoll(poll: Poll) {
    this.pollToAnswer = poll;
    this.router.navigate(['answerpoll'])
  }

  getTests(): Observable<{ message: string, tests: Test[] }> {
    return this.http.get<{ message: string, tests: Test[] }>('http://localhost:3000/tests')
  }

}
