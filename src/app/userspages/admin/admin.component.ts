import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/signup/usermodel';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { NodeInjectorFactory } from '@angular/core/src/render3/interfaces/injector';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

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


  accept(id: string) {
    this.userService.acceptUser(id);
  }


  reject(id: string) {

  }


  delete(id: string) {
    this.userService.deleteUser(id);
  }


}
