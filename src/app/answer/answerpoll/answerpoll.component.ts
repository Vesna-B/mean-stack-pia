import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit {

  poll = null;
  answers = new Array<{ questionId: string; answerTitle: string }>()
  
  constructor(private answerService: AnswerService, private router: Router) { }


  ngOnInit() {
    this.poll = this.answerService.pollToAnswer;

    for (let i = 0; i < this.poll.questions.length; i++) {
      let a = { questionId: this.poll.questions[i].id, answerTitle: ""};
      this.answers.push(a);
    }


    console.log(this.answers);

    // console.log(this.poll);

    // this.answerForm = this.formBuilder.group({
    //   poll_id: [this.poll._id],
    //   user: [localStorage.getItem('currentUser')],
    //   answers: this.formBuilder.array([
    //     //this.initAnswers()
    //     // this.formBuilder.group({
    //     //   question_id: ['sth'],
    //     //   answerTitle: ['answ']
    //     // }),
    //     // this.formBuilder.group({
    //     //   question_id: ['sth2'],
    //     //   answerTitle: ['answ2']
    //     // })
    //   ])
    // })

    //this.initAnswers();


    // this.poll.questions.forEach(question => {
    //   console.log(question._id);
    //   (this.answerForm.get('answers') as FormArray).push(
    //     this.formBuilder.group({
    //       question_id: [question._id],
    //       answerTitle: ['answ']
    //     })
    //   );
    //});

   

    //console.log(this.answerForm.value.answers[0].question_id);

  }


  // initAnswers() {
  //   let answerArray = <FormArray>this.answerForm.controls.answers;
  //   this.poll.questions.forEach(question => {
  //     answerArray.push(
  //       this.formBuilder.group({
  //         question_id: question._id,
  //         answerTitle: ''
  //       })
  //     );
  //   })
     
  // }


  





  submit() { 
    console.log(this.answers)  
    let answerForm = {
      pollId: this.poll._id,
      user: localStorage.getItem('currentUser'),
      answers: this.answers
    };

    console.log(answerForm);
    this.answerService.saveFilledPoll(answerForm);

  }

  quit() {
    this.router.navigate(['/basic']);
  }

}
