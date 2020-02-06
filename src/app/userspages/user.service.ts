import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../signup/usermodel';
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


  acceptUser(id: string) {
    this.http.patch("http://localhost:3000/users", id)
      .subscribe(res => {
        console.log("User updated successfully");
        console.log(res);
      });
  }


  deleteUser(id: string) {
    this.http.delete(`http://localhost:3000/users/${id}`)
      .subscribe(() => {
        console.log("Deleted");
      });
  }



}
