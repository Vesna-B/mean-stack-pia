import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../poll';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit {

  //@Input() poll: Poll = null;
  poll: Poll = null;

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.poll = this.answerService.pollToAnswer;
  }

}
