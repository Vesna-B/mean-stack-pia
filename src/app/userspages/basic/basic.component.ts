import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { UserService } from '../user.service';
import { AnswerService } from 'src/app/answer/answer.service';
import { ReviewService } from 'src/app/review/review.service';

import { Poll } from 'src/app/models/poll';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/usermodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit, OnDestroy {

  polls: Poll[] = [];
  tests: Test[] = [];
  currentUser: User = null;
  today: Date;
  _currentUser: Subscription;
  
  displayedColumnsPoll: string[] = ['name', 'startDate', 'endDate', 'fill'];
  displayedColumnsTest: string[] = ['name', 'startDate', 'endDate', 'duration', 'fill'];
  dataSourcePoll = null;
  dataSourceTest = null;
  
  @ViewChild('sortPoll') sortPoll: MatSort;
  @ViewChild('sortTest') sortTest: MatSort;

  constructor(
    private userService: UserService,
    private answerService: AnswerService, 
    private reviewService: ReviewService
  ) { }
  

  ngOnInit() {
    this.today = new Date();
    this.userService.getUser();
    this._currentUser = this.userService.currentUser$
      .subscribe(user => {
        this.currentUser = user
      })
    this.getPolls();
    this.getTests();
  }


  getPolls() {
    this.answerService.getPolls()
      .subscribe(responseData => {
        this.polls = responseData.polls;
        this.polls.forEach(poll => {
          poll.startDate = new Date(poll.startDate);
          poll.endDate = new Date(poll.endDate);
        })
        this.dataSourcePoll = new MatTableDataSource(this.polls);
        this.dataSourcePoll.sort = this.sortPoll;
      });
  }
  

  isPollFilledByThisUser(poll) {
    return this.currentUser.answeredPolls.find(item => item.pollId === poll._id);
  }

  fillPoll(poll) {
    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
    this.answerService.fillPoll(fetchedPoll);  
  }

  reviewPoll(poll) {
    let answer = this.currentUser.answeredPolls.find(({ pollId}) => pollId === poll._id)
    this.reviewService.getAnsweredPoll(answer.answerId);
  }



  getTests() {
    this.answerService.getTests()
    .subscribe(responseData => {
      this.tests = responseData.tests;
      this.tests.forEach(test => {
        test.startDate = new Date(test.startDate);
        test.endDate = new Date(test.endDate);
      })
      this.dataSourceTest = new MatTableDataSource(this.tests);
      this.dataSourceTest.sort = this.sortTest;
    });
  }


  isTestFilledByThisUser(test) {
    return this.currentUser.answeredTests.find(item => item.testId === test._id);
  }

  fillTest(test) {
    this.answerService.fillTest(test);
  }

  reviewTest(test) {
    let answer = this.currentUser.answeredTests.find(({ testId}) => testId === test._id);
    this.reviewService.getAnsweredTest(answer.answerId);
  }


  ngOnDestroy() {
    this._currentUser.unsubscribe();
  }

}
