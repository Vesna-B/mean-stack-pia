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

}
