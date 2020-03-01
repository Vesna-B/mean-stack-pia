import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from '../signup/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private isLoggedInSub: Subscription;

  constructor(private signupService: SignupService) { }

  ngOnInit() {
    let user = localStorage.getItem('currentUser');
    this.isLoggedIn = this.signupService.isLoggedIn;
    this.isLoggedInSub = this.signupService.getIsLoggedIn()
      .subscribe(response => {
        this.isLoggedIn = response;
      });
    if (user) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.signupService.logout();
  }

  ngOnDestroy() {
    this.isLoggedInSub.unsubscribe();
  }

}
