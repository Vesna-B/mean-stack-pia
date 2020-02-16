import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private createService: CreateService) { }

  questionForm: FormGroup;

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      author: [localStorage.getItem('currentUser')],
      name: [''],
      info: [''],
      startDate: [Date],
      endDate: [Date],
      duration: [Number],
      questions: this.formBuilder.array([
        this.initQuestion()
      ])
    });
  }

  initQuestion() {
    return this.formBuilder.group({
      questionTitle: [],
      questionType: [],
      options: new FormArray([
        this.initOptions()
      ])
    });
  }

  initOptions() {
    return this.formBuilder.group({
      optionTitle: ['']
    });
  }


  addQuestion() {
    const questionArray = <FormArray>this.questionForm.get('questions');
    questionArray.push(this.initQuestion());
  }

  addOption(i) {
    const optionArray = <FormArray>this.questionForm.get(['questions', i, 'options']);
    optionArray.push(this.initOptions());
  }


  getQuestions(form) {
    return form.controls.questions.controls;
  }

  getOptions(question) {
    return question.controls.options.controls;
  }


  removeQuestion(i) {
    const questionArray = <FormArray>this.questionForm.get('questions');
    questionArray.removeAt(i);
  }

  removeOption(i, j) {
    const optionArray = <FormArray>this.questionForm.get(['questions', i, 'options']);
    optionArray.removeAt(j);
  }


  submit() {
    console.log('This is from component');
    console.log(this.questionForm.value);

    console.log(localStorage.getItem('currentUser'));
    
    this.createService.createTest(this.questionForm.value);
  }

}
