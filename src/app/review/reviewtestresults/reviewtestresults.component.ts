import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AnswerService } from 'src/app/answer/answer.service';

@Component({
  selector: 'app-reviewtestresults',
  templateUrl: './reviewtestresults.component.html',
  styleUrls: ['./reviewtestresults.component.css']
})
export class ReviewtestresultsComponent implements OnInit {

  testAnswers = [];
  maxPoints = 0;
  isLoading = true;
  isEmpty = false;

  displayedColumns: string[] = ['name', 'points'];
  dataSource = null;

  @ViewChild('sort') sort: MatSort;

  constructor(
    private reviewService: ReviewService, 
    private answerService: AnswerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.testAnswers = this.reviewService.answeredTests;

    if (this.testAnswers.length == 0) {
      this.isEmpty = true;
    }

    this.dataSource = new MatTableDataSource(this.testAnswers);
    this.dataSource.sort = this.sort;

    if (this.testAnswers.length != 0) {
      let id = this.testAnswers[0].testId;
      let condition = 0;
      let numberOfQuestions = 0;

      this.answerService.getTest(id)
        .subscribe(response => {
          numberOfQuestions = response.questions.length;
            response.questions.forEach(questionId => {
              this.answerService.getTestQuestion(questionId)
              .subscribe(response => {
                this.maxPoints = this.maxPoints + response.points;
                condition = condition + 1;
                
                if (condition == numberOfQuestions) {
                  this.isLoading = false;
                }
              })
            });
          })
    }
  }


  goBack() {
    this.router.navigate(['author']);
  }

}
