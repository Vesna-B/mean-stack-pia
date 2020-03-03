import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnswerService } from '../answer/answer.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  answeredPoll = null;
  answeredTest = null;

  answeredPolls = [];
  answeredTests = [];
  
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


  getAnsweredTest(id: string) {
    this.http.get<{ answer: any }>('http://localhost:3000/tests/answers/' + id)
      .subscribe(response => {
        let condition = 0;
        let answer = response.answer;
        const qaArray = new Array<{ questionTitle: string, answerTitle: string, maxPoints: number, earnedPoints: number}>();
        
        for (let i = 0; i < answer.answers.length; i++) {
          let qa = {
            questionTitle: '',
            answerTitle: answer.answers[i].answerTitle,
            maxPoints: 0,
            earnedPoints: answer.answers[i].earnedPoints
          }
          this.answerService.getTestQuestion(answer.answers[i].questionId)
            .subscribe(response => {
              qa.questionTitle = response.title;
              qa.maxPoints = response.points;
              qaArray[i] = qa;
              condition = condition + 1;

              if (condition == answer.answers.length) {
                this.answeredTest = {
                  testId: answer._id,
                  userFirstName: answer.userFirstName,
                  userLastName: answer.userLastName,
                  userDateOfBirth: new Date(answer.userDateOfBirth),
                  score: answer.score,
                  answers: qaArray
                }
                this.router.navigate(['reviewtest'])
              }
            })
        }
      })
  }


  getAnsweredPolls(id: string) {
    this.http.get<any>('http://localhost:3000/polls/answersfor/' + id)
      .subscribe(response => {
        this.answeredPolls = response;
        this.router.navigate(['reviewpollresults']);
      })
  }


  getAnsweredTests(id: string) {
    this.http.get<any>('http://localhost:3000/tests/answersfor/' + id)
      .subscribe(response => {
        this.answeredTests = response;
        console.log(this.answeredTests)
        this.router.navigate(['reviewtestresults']);
      })
  }

}
