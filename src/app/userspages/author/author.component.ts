import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }
  

  createPoll() {
    this.router.navigate(['createpoll']);
  }

  createTest() {
    this.router.navigate(['createtest']);
  }

}
