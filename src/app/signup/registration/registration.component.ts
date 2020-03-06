import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usermodel';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isAdmin = false;

  name: string;
  surname: string;
  username: string;
  password: string;
  repeatPassword: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  identNum: string;
  phone: string;
  email: string;
  userType: string;

  user: User;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.user = new User();
    if (localStorage.getItem('currentUserType') == 'admin') {
      this.isAdmin = true;
    }
  }

  register() {
    this.user._id = null;
    this.user.name = this.name;
    this.user.surname = this.surname;
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.dateOfBirth = this.dateOfBirth;
    this.user.placeOfBirth = this.placeOfBirth;
    this.user.identNum = this.identNum;
    this.user.phone = this.phone;
    this.user.email = this.email;

    if (this.isAdmin) {
      this.user.userType = this.userType;
      this.user.approved = 'approved';
    } else {
      this.user.userType = 'basic';
      this.user.approved = 'waiting';
    }

    this.user.answeredPolls = [];
    this.user.answeredTests = [];
    
    this.signupService.register(this.user);   
  }

}
