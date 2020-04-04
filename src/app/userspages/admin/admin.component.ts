import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/usermodel';
import { UserService } from '../user.service';
import { SignupService } from 'src/app/signup/signup.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  users: User[] = [];
  _users: Subscription;
  currentUser: string;

  constructor(private userService: UserService, private signupService: SignupService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.userService.getUsers();
    this._users = this.userService.users$
      .subscribe(responseData => {
        this.users = responseData;
      })
  }

  
  accept(user: User) {
    let userForChange = user;
    userForChange.approved = 'approved';
    this.userService.acceptUser(userForChange);
  }


  reject(user:User) {
    let userForChange = user;
    userForChange.approved = 'rejected';
    this.userService.rejectUser(userForChange);
  }


  delete(id: string) {
    console.log(id);
    this.userService.deleteUser(id);
    this.userService.getUsers();
  }


  ngOnDestroy() {
    this._users.unsubscribe();
  }

}
