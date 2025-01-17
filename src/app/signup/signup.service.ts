import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usermodel';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../userspages/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  isLoggedIn = false;
  isLoggedInSub = new Subject<boolean>();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private userService: UserService
  ) { }

  getIsLoggedIn() {
    return this.isLoggedInSub.asObservable();
  }

  register(user: User) {
    this.http.post<{ message: string, user: string }>('http://localhost:3000/users', user)
      .subscribe(response => {
        console.log(response); 
        this.userService.getUsers();
        if (localStorage.getItem('currentUserType') == 'admin') {
          alert('Uspešno ste dodali novog korisnika');
          this.router.navigate(['admin']);
        } else {
          alert('Uspešno ste se registrovali, čeka se da admin prihvati Vaš zahtev')
          this.router.navigate(['login']);
        }
      });
  }

  login(username: string, password: string) {
    this.http.post<{user: User, message: string}>('http://localhost:3000/users/login', {username, password})
      .subscribe(response => {
        if (response.user.userType == 'admin') {
          this.isLoggedIn = true;
          this.isLoggedInSub.next(true);
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['admin']);
        }
        if (response.user.userType == 'author' && response.user.approved == 'approved') {
          this.isLoggedIn = true;
          this.isLoggedInSub.next(true);
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['author']);
        }
        if (response.user.userType == 'basic' && response.user.approved == 'approved') {
          this.isLoggedIn = true;
          this.isLoggedInSub.next(true);
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['basic']);
        }
        //return response.message;
      }, err => {
        alert(err.error.message);
      });
  }


  changePassword(id: string, oldPass: string, newPass: string) {
    return this.http.put('http://localhost:3000/users/password', {id, oldPass, newPass})
  }


  logout() {
    this.isLoggedIn = false;
    this.isLoggedInSub.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
    if (localStorage.getItem('authorReview')) {
      localStorage.removeItem('authorReview');
    }
    this.router.navigate(['login']);
  }

}
