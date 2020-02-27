import { Component, OnInit, Input } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message = '';

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.signupService.login(this.username, this.password)
      .subscribe(response => {
        console.log(response.user);

        if (response.user.userType == 'admin') {
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['admin']);
        }
        if (response.user.userType == 'author' && response.user.approved == 'approved') {
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['author']);
        }
        if (response.user.userType == 'basic' && response.user.approved == 'approved') {
          localStorage.setItem('currentUser', response.user.username);
          localStorage.setItem('currentUserType', response.user.userType);
          this.router.navigate(['basic']);
        }
        this.message = response.message
        console.log(this.message);
      });
  }

}
