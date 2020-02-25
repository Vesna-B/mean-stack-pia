import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './usermodel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private router: Router) { }


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
          localStorage.setItem('currentUserType', response.type);
          this.router.navigate(['admin']);
        }
        if (response.type == 'author' && response.approved == 'approved') {
          localStorage.setItem('currentUser', response.username);
          localStorage.setItem('currentUserType', response.type);
          this.router.navigate(['author']);
        }
        if (response.type == 'basic' && response.approved == 'approved') {
          localStorage.setItem('currentUser', response.username);
          localStorage.setItem('currentUserType', response.type);
          this.router.navigate(['basic']);
        }
        return response.message;
      });
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
    this.router.navigate(['login']);
  }

}
