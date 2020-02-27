import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { AnswerService } from 'src/app/answer/answer.service';
import { SignupService } from 'src/app/signup/signup.service';
import { UserService } from '../user.service';

import { Poll } from 'src/app/models/poll';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/usermodel';
import { ReviewService } from 'src/app/review/review.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  polls: Poll[] = [];
  tests: Test[] = [];
  currentUser: User = null;
  today: Date;
  
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'fill'];
  dataSource = null;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private anwserService: AnswerService, 
    private signupService: SignupService,
    private userService: UserService,
    private reviewService: ReviewService
  ) { }
  
  ngOnInit() {
    let user = localStorage.getItem('currentUser');
    this.today = new Date();
    this.getUser(user);
    this.getPolls();
    
    //this.getTests();
  }


  getUser(username) {
    this.userService.getUser(username)
      .subscribe(response => {
        this.currentUser = response.user;
        console.log(this.currentUser);
      })
  }


  getPolls() {
    this.anwserService.getPolls()
      .subscribe(responseData => {
        this.polls = responseData.polls;
        this.polls.forEach(poll => {
          poll.startDate = new Date(poll.startDate);
          poll.endDate = new Date(poll.endDate);
        })
        this.dataSource = new MatTableDataSource(this.polls);
        this.dataSource.sort = this.sort;
      });

  }
  

  isPollFilledByThisUser(poll) {
    return this.currentUser.answeredPolls.find(item => item.pollId === poll._id);
  }


  fillPoll(poll) {
    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
    this.anwserService.fillPoll(fetchedPoll);  
  }


  reviewPoll(poll) {
    let answer = this.currentUser.answeredPolls.find(({ pollId}) => pollId === poll._id)
    this.reviewService.getAnsweredPoll(answer.answerId);
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
