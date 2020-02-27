import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usermodel';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>("http://localhost:3000/users")
      .pipe(tap(response => { this.users = response.users }));
  }


  getUser(username) {
    return this.http.post<{ user: User }>("http://localhost:3000/users/user", { username })
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
      .subscribe(() => {
        console.log("Deleted");
      });
  }


  addPollAnswer(pollId: string, answerId: string, user: string) {
    return this.http.put<{ user: any, message: string }>("http://localhost:3000/users/pollanswers", {pollId, answerId, user})
  }



}
