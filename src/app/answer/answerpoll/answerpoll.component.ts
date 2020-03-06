import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userspages/user.service';
import { User } from 'src/app/models/usermodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answerpoll',
  templateUrl: './answerpoll.component.html',
  styleUrls: ['./answerpoll.component.css']
})
export class AnswerpollComponent implements OnInit, OnDestroy {

  poll = null;
  answers = new Array<{ questionId: string; answerTitle: string }>();
  currentUser: User = null;
  _currentUser: Subscription;
  
  constructor(
    private answerService: AnswerService, 
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this._currentUser = this.userService.currentUser$
      .subscribe(user => {
        this.currentUser = user;
      })

    this.poll = this.answerService.pollToAnswer;
    for (let i = 0; i < this.poll.questions.length; i++) {
      let a = { questionId: this.poll.questions[i].id, answerTitle: ""};
      this.answers.push(a);
    } 
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

    this.answerService.saveFilledPoll(answerForm)
      .subscribe(response => {
        let user = localStorage.getItem('currentUser');
        this.userService.addPollAnswer(this.poll._id, response.answerId, user)
      });
  }


  quit() {
    this.router.navigate([`${this.currentUser.userType}`]);
  }


  ngOnDestroy() {
    this._currentUser.unsubscribe();
  }

}
