import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnswerService } from '../answer/answer.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  answeredPoll = null;
  

  constructor(
    private http: HttpClient, 
    private router: Router,
    private answerService: AnswerService
  ) { }

  getAnsweredPoll(id: string) {
    this.http.get<{ answer: any }>('http://localhost:3000/polls/answers/' + id)
      .subscribe(response => {
        let condition = 0;
        let answer = response.answer;
        const qaArray = new Array<{ questionTitle: string, answerTitle: string }>();

        for (let i = 0; i < answer.answers.length; i++) {
          let qa = {
            questionTitle: '',
            answerTitle: answer.answers[i].answerTitle
          }
          this.answerService.getPollQuestion(answer.answers[i].questionId)
            .subscribe(response => {
              qa.questionTitle = response.questionTitle
              qaArray[i] = qa;
              condition = condition + 1;

              if (condition == answer.answers.length) {
                this.answeredPoll = {
                  pollId: answer._id,
                  userFirstName: answer.userFirstName,
                  userLastName: answer.userLastName,
                  userDateOfBirth: new Date(answer.userDateOfBirth),
                  answers: qaArray
                }
                this.router.navigate(['reviewpoll'])
              }
            })
        }
      }, err => {
        console.log(err)
      })
  }
}
