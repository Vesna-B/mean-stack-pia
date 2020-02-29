import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userspages/user.service';
import { User } from 'src/app/models/usermodel';

@Component({
  selector: 'app-answertest',
  templateUrl: './answertest.component.html',
  styleUrls: ['./answertest.component.css']
})
export class AnswertestComponent implements OnInit {

  test = null;
  answers = new Array<{ questionId: string, answerTitle: string, earnedPoints: number }>();
  currentUser: User = null;

  constructor(
    private answerService: AnswerService, 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let username = localStorage.getItem('currentUser');
    this.getUser(username);
    this.test = this.answerService.testToAnswer;
    for (let i = 0; i < this.test.questions.length; i++) {
      let a = { questionId: this.test.questions[i].id, answerTitle: "", earnedPoints: 0 }
      this.answers.push(a);
    }
  }


  getUser(username) {
    this.userService.getUser(username)
      .subscribe(response => {
        this.currentUser = response.user;
      });
  }


  submit() {
    let answerForm = null;
    let score = 0;

    for (let i = 0; i < this.answers.length; i++) {
      for (let j = 0; j < this.test.questions[i].options.length; j++) {
        if (this.answers[i].answerTitle == this.test.questions[i].options[j].optionTitle && 
            this.test.questions[i].options[j].isCorrect == 'yes') {
          this.answers[i].earnedPoints = this.test.questions[i].points;
          break;
        }
      }
    }

    for (let i = 0; i < this.answers.length; i++) {
      score = score + this.answers[i].earnedPoints;
    } 

    answerForm = {
      testId: this.test._id,
      userFirstName: this.currentUser.name,
      userLastName: this.currentUser.surname,
      userDateOfBirth: this.currentUser.dateOfBirth,
      score: score,
      answers: this.answers
    };

    console.log('Answer');
    console.log(answerForm)  

    this.answerService.saveFilledTest(answerForm)
      .subscribe(response => {
        let user = localStorage.getItem('currentUser');
        this.userService.addTestAnswer(this.test._id, response.answerId, user)
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
