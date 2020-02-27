import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usermodel';
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
    return this.http.post<{user: User, message: string}>('http://localhost:3000/users/login', {username, password})
      // .subscribe(response => {
      //   if (response.user.userType == 'admin') {
      //     localStorage.setItem('currentUser', response.user.username);
      //     localStorage.setItem('currentUserType', response.user.userType);
      //     this.router.navigate(['admin']);
      //   }
      //   if (response.user.userType == 'author' && response.user.approved == 'approved') {
      //     localStorage.setItem('currentUser', response.user.username);
      //     localStorage.setItem('currentUserType', response.user.userType);
      //     this.router.navigate(['author']);
      //   }
      //   if (response.user.userType == 'basic' && response.user.approved == 'approved') {
      //     localStorage.setItem('currentUser', response.user.username);
      //     localStorage.setItem('currentUserType', response.user.userType);
      //     this.router.navigate(['basic']);
      //   }
      //   return response.message;
      // });
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
    this.router.navigate(['login']);
  }

}
