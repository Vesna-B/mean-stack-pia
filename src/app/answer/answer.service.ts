import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Poll } from './poll';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  //polls: Poll[];

  constructor(private http: HttpClient) { }


  getPolls(): Observable<{ message: string, polls: Poll[] }> {
    return this.http.get<{ message: string, polls: Poll[] }>('http://localhost:3000/polls')
      //.pipe(tap(responseData => this.polls = fetchedPolls.polls));
  }

}