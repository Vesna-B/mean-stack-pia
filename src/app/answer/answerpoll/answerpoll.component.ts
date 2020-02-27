import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userspages/user.service';
import { User } from 'src/app/models/usermodel';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit {

  poll = null;
  answers = new Array<{ questionId: string; answerTitle: string }>();
  currentUser: User = null;
  
  constructor(
    private answerService: AnswerService, 
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
    let username = localStorage.getItem('currentUser');
    this.getUser(username);
    this.poll = this.answerService.pollToAnswer;
    for (let i = 0; i < this.poll.questions.length; i++) {
      let a = { questionId: this.poll.questions[i].id, answerTitle: ""};
      this.answers.push(a);
    } 
  }


  getUser(username: string) {
    this.userService.getUser(username)
      .subscribe(response => {
        this.currentUser = response.user;
      });
  }

  
  submit() { 
    let answerForm = {
      pollId: this.poll._id,
      userFirstName: '',
      userLastName: '',
      userDateOfBirth: null,
      answers: this.answers
    };

    if (this.poll.pollType == 'personal') {
      answerForm.userFirstName = this.currentUser.name;
      answerForm.userLastName = this.currentUser.surname;
      answerForm.userDateOfBirth = this.currentUser.dateOfBirth;
    }

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
