import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/answer/answer.service';
import { Poll } from 'src/app/answer/poll';
import { SignupService } from 'src/app/signup/signup.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private anwserService: AnswerService, private signupService: SignupService) { }

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
    this.anwserService.getPolls()
      .subscribe(responseData => {
        this.polls = responseData.polls;
        console.log(this.polls);
      });
  }

  fillPoll(poll) {
    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
    this.anwserService.fillPoll(fetchedPoll);  
  }

  logout() {
    this.signupService.logout();
  }

}
