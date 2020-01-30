import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }

  // login() {
  //   console.log('Message sent');
  //   this.signupService.login(this.username);
  // }

}
