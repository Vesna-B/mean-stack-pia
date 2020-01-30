import { Component, OnInit } from '@angular/core';
import { User } from '../usermodel';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

  user: User;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    this.user = new User();
  }

  register() {
    this.user.name = this.name;
    this.user.surname = this.surname;
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.dateOfBirth = this.dateOfBirth;
    this.user.placeOfBirth = this.placeOfBirth;
    this.user.identNum = this.identNum;
    this.user.phone = this.phone;
    this.user.email = this.email;
    this.user.userType = 'basic';
    
    this.signupService.register(this.user);
    console.log('This is from registration.component.ts');
    console.log(this.user);
  }

}
