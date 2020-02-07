import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CreateService } from '../create.service';
import { Question } from '../question';

@Component({
  selector: 'app-createpoll',
  templateUrl: './createpoll.component.html',
  styleUrls: ['./createpoll.component.css']
})
export class CreatepollComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private createService: CreateService) { }

  questionForm: FormGroup;

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      author: [localStorage.getItem('currentUser')],
      name: ['', Validators.required],
      info: ['', Validators.required],
      startDate: [Date, Validators.required],
      endDate: [Date, Validators.required],
      questions: this.formBuilder.array([
        this.initQuestion()
      ])
    });
  }


  initQuestion() {
    return this.formBuilder.group({
      questionTitle: ['']
      // questionType: [''],
      // options: new FormArray([
      //   this.initOptions()
      // ])
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
    
    this.createService.createPoll(this.questionForm.value);
  }

}
