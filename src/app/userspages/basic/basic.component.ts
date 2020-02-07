import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/answer/answer.service';
import { Poll } from 'src/app/answer/poll';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private anwserService: AnswerService) { }

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
    // console.log('Dohvati formu')
    // let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id)
    // //console.log(this.polls[0].questions[0].questionTitle);
    // console.log(fetchedPoll);
    // for (let i = 0; i < fetchedPoll.questions.length; i++) {
    //   console.log(fetchedPoll.questions[i].questionTitle)
    // }


    let fetchedPoll = this.polls.find(({ _id }) => _id === poll._id);
    this.anwserService.fillPoll(fetchedPoll);
    
  }

}
