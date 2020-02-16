import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup/signup.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private signupService: SignupService) { }

  ngOnInit() {
  }


  logout() {
    this.signupService.logout();
  }


}
