import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }


  createPoll(data) {
    console.log('This info is from frontend service - poll')
    console.log(data);
    this.http.post<{ message: string }>('http://localhost:3000/polls', data)
      .subscribe(res => {
        console.log(res.message)
      });
  }

  createTest(data) {
    console.log('This info is from frontend service - test')
    console.log(data);
    this.http.post<{ message: string }>('http://localhost:3000/tests', data)
      .subscribe(res => {
        console.log(res.message)
      });
  }

}
