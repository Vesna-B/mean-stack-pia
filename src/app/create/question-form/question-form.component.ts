import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  questionForm: FormGroup;

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      question: [],
      answers: this.formBuilder.array([this.formBuilder.group({point:''})])
    });
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.formBuilder.group({point:''}));
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

}
