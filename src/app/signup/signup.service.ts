import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './usermodel';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private router: Router) { }

  //loginMsg = '';

  register(user: User) {
    this.http.post('http://localhost:3000/users', user)
      .subscribe(response => {
        console.log(response); 
      });

  }

  login(username: string, password: string) {
    this.http.post<{username: string, type: string, approved: string, message: string}>('http://localhost:3000/users/login', {username, password})
      .subscribe(response => {
        if (response.type == 'admin') {
          localStorage.setItem('currentUser', response.username);
          this.router.navigate(['admin']);
        }
        if (response.type == 'author' && response.approved == 'approved') {
          localStorage.setItem('currentUser', response.username);
          this.router.navigate(['author']);
        }
        if (response.type == 'basic' && response.approved == 'approved') {
          localStorage.setItem('currentUser', response.username);
          this.router.navigate(['basic']);
        }
        //this.loginMsg = response.message;
        return response.message;
      });
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
