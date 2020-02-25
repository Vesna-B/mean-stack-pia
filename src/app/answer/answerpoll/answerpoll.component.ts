import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userspages/user.service';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit {

  poll = null;
  answers = new Array<{ questionId: string; answerTitle: string }>()
  
  constructor(
    private answerService: AnswerService, 
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
    this.poll = this.answerService.pollToAnswer;
    for (let i = 0; i < this.poll.questions.length; i++) {
      let a = { questionId: this.poll.questions[i].id, answerTitle: ""};
      this.answers.push(a);
    } 
  }

  
  submit() { 
    let answerForm = {
      pollId: this.poll._id,
      user: localStorage.getItem('currentUser'),
      answers: this.answers
    };

    console.log(answerForm);

    this.answerService.saveFilledPoll(answerForm)
      .subscribe(response => {
        let user = localStorage.getItem('currentUser');
        this.userService.addPollAnswer(this.poll._id, response.answerId, user)
          .subscribe(response => {
            console.log(response.message);
            this.router.navigate(['basic']);
          }, err => {
            console.log(err);
          })
      });
  }


  quit() {
    this.router.navigate(['basic']);
  }

}
