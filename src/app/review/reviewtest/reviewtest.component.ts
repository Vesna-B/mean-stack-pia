import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewtest',
  templateUrl: './reviewtest.component.html',
  styleUrls: ['./reviewtest.component.css']
})
export class ReviewtestComponent implements OnInit {

  answeredTest = null;

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit() {
    this.answeredTest = this.reviewService.answeredTest;
    console.log(this.answeredTest);
  }


  goBack() {
    let currentUserType = localStorage.getItem('currentUserType');
    switch(currentUserType) {
      case 'admin': this.router.navigate(['admin']);
      case 'author': this.router.navigate(['author']);
      case 'basic': this.router.navigate(['basic']);
    }
  }

}
