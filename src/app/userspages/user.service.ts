import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usermodel';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  currentUser: User;
  private _users$ = new Subject<User[]>();
  private _currentUser$ = new Subject<User>();


  constructor(private http: HttpClient, private router: Router) { }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }

  get users$() {
    return this._users$.asObservable();
  }


  getUsers() {
    this.http.get<{ users: User[] }>("http://localhost:3000/users")
      .subscribe(response => {
        this.users = response.users;
        this._users$.next(this.users);
      })
      
  }

  getUser() {
    let username = localStorage.getItem('currentUser');
    this.http.post<{ user: User }>("http://localhost:3000/users/user", { username })
      .subscribe(response => {
        this.currentUser = response.user;
        this._currentUser$.next(this.currentUser);
      })
  }


  acceptUser(user: User) {
    this.http.put("http://localhost:3000/users", user)
      .subscribe(res => {
        console.log("User approved (user service)");
        console.log(res);
      });
  }


  rejectUser(user: User) {
    this.http.put("http://localhost:3000/users", user)
      .subscribe(res => {
        console.log("User rejected (user service)");
        console.log(res);
      });
  }


  deleteUser(id) {
    this.http.delete("http://localhost:3000/users/" + id)
      .subscribe(response => {
        console.log("Deleted");
        console.log(response);
      });
  }


  addPollAnswer(pollId: string, answerId: string, user: string) {
    this.http.put<{ user: any, message: string }>("http://localhost:3000/users/pollanswers", {pollId, answerId, user})
      .subscribe(response => {
        console.log(response.message);
        this.currentUser = response.user;
        this._currentUser$.next(this.currentUser);
        this.router.navigate([`${this.currentUser.userType}`]);
      }, err => {
        console.log(err);
      })
  }


  addTestAnswer(testId: string, answerId: string, user: string) {
    this.http.put<{ user: any, message: string }>("http://localhost:3000/users/testanswers", {testId, answerId, user})
      .subscribe(response => {
        console.log(response.message);
        this.currentUser = response.user;
        this._currentUser$.next(this.currentUser);
        this.router.navigate([`${this.currentUser.userType}`]);
      }, err => {
        console.log(err);
      })
  }
  

}
