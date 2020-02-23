import { Component, OnInit, ViewChild } from '@angular/core';
import { AnswerService } from 'src/app/answer/answer.service';
import { Poll } from 'src/app/answer/poll';
import { SignupService } from 'src/app/signup/signup.service';
import { Test } from 'src/app/answer/test';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  polls: Poll[] = [];
  tests: Test[] = [];
  
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'fill'];
  dataSource = null;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private anwserService: AnswerService, private signupService: SignupService) { }
  
  ngOnInit() {
    this.getPolls();
    
    //this.getTests();
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

        //console.log(this.polls[0].questions[1]);
      });

  }

  fillPoll(poll) {
    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
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
