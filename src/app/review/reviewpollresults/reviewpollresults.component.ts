import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../review.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewpollresults',
  templateUrl: './reviewpollresults.component.html',
  styleUrls: ['./reviewpollresults.component.css']
})
export class ReviewpollresultsComponent implements OnInit {

  pollAnswers = [];

  displayedColumns: string[] = ['name', 'date', 'view'];
  dataSource = null;

  @ViewChild('sort') sort: MatSort;

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit() {
    this.pollAnswers = this.reviewService.answeredPolls;
    let condition = 0;
    this.pollAnswers.forEach(answer => {
      answer.userDateOfBirth = new Date(answer.userDateOfBirth);
      condition = condition + 1;

      if (condition == this.pollAnswers.length) {
        this.dataSource = new MatTableDataSource(this.pollAnswers);
        this.dataSource.sort = this.sort;
      }
    })
  }


  reviewAnswer(answer) {
    this.reviewService.getAnsweredPoll(answer._id);
    localStorage.setItem('authorReview', 'yes');
  }

  goBack() {
    this.router.navigate(['author']);
  }

}
