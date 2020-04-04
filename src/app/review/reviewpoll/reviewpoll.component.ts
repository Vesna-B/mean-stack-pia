import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewpoll',
  templateUrl: './reviewpoll.component.html',
  styleUrls: ['./reviewpoll.component.css']
})
export class ReviewpollComponent implements OnInit {

  answeredPoll = null;

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit() {
    this.answeredPoll = this.reviewService.answeredPoll;
    console.log(this.answeredPoll)
  }


  goBack() {
    let currentUser = localStorage.getItem('currentUser');
    let currentUserType = localStorage.getItem('currentUserType');
    switch(currentUserType) {
      case 'admin': this.router.navigate(['admin']); break;
      case 'author': {
        let authorReview = localStorage.getItem('authorReview');
        if (authorReview) {
          localStorage.removeItem('authorReview');
          this.router.navigate(['reviewpollresults']); 
          break;
        }
        else {
          this.router.navigate(['author']); 
          break;
        }
      }
      case 'basic': this.router.navigate(['basic']); break;
    }
  }

}
