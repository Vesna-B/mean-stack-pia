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
    // this.questionForm = this.formBuilder.group({
    //   question: [],
    //   answers: this.formBuilder.array([this.formBuilder.group({point:''})])
    // });

    this.questionForm = this.formBuilder.group({
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

  // get answers() {
  //   return this.questionForm.get('answers') as FormArray;
  // }

  // addAnswer() {
  //   this.answers.push(this.formBuilder.group({point:''}));
  // }

  // deleteAnswer(index) {
  //   this.answers.removeAt(index);
  // }

}
