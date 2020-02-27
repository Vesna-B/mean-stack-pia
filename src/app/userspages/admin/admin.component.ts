import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/usermodel';
import { UserService } from '../user.service';
import { SignupService } from 'src/app/signup/signup.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private signupService: SignupService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .subscribe(responseData => {
        this.users = responseData.users;
      });
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
  }


  logout() {
    this.signupService.logout();
  }

}
