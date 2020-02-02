import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }

  login() {
    this.signupService.login(this.username, this.password);
  }

}
