import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../poll';
import { AnswerService } from '../answer.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit {

  poll = null;
  questionForm: FormGroup;

  constructor(private answerService: AnswerService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.poll = this.answerService.pollToAnswer;
  }



}
