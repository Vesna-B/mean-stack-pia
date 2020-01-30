import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './usermodel';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url = 'http://localhost:3000';  //ispravi ovo

  constructor(private http: HttpClient) { }

  register(user: User) {
    this.http.post('http://localhost:3000/users', user)
      .subscribe(responseMsg => {
        console.log(responseMsg);
      });

  }

  // login(username) {
  //   this.http.post<string>('http://localhost:3000/users', {username})
  //   .subscribe(responseData => {
  //     console.log(responseData);
  //   });
  // }


}
