import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/answer/answer.service';
import { Poll } from 'src/app/answer/poll';
import { SignupService } from 'src/app/signup/signup.service';
import { Test } from 'src/app/answer/test';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  polls: Poll[] = [];
  tests: Test[] = [];

  constructor(private anwserService: AnswerService, private signupService: SignupService) { }

  ngOnInit() {
    this.getPolls();
    this.getTests();
  }

  getPolls() {
    this.anwserService.getPolls()
      .subscribe(responseData => {
        this.polls = responseData.polls;
        //console.log(this.polls);
      });
  }

  fillPoll(poll) {
    //console.log(this.polls);
    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
    //console.log(fetchedPoll);
    this.anwserService.fillPoll(fetchedPoll);  
  }

  getTests() {
    this.anwserService.getTests()
    .subscribe(responseData => {
      //this.tests = responseData.tests;
      //console.log(this.tests);
    });
  }

  logout() {
    this.signupService.logout();
  }

}
