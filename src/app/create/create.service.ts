import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient, private router: Router) { }


  createPoll(data) {
    console.log('This info is from frontend service - poll')
    console.log(data);
    this.http.post<{ message: string }>('http://localhost:3000/polls', data)
      .subscribe(res => {
        console.log(res.message);
        this.router.navigate(['author']);
      });
  }

  createTest(data) {
    console.log('This info is from frontend service - test')
    console.log(data);
    this.http.post<{ message: string }>('http://localhost:3000/tests', data)
      .subscribe(res => {
        console.log(res.message);
        this.router.navigate(['author']);
      });
  }


  deletePoll(id: string) {
    this.http.delete("http://localhost:3000/polls/" + id)
      .subscribe(() => {
        console.log("Poll deleted");
      });
  }

  deleteTest(id: string) {
    this.http.delete("http://localhost:3000/tests/" + id)
      .subscribe(() => {
        console.log("Test deleted");
      });
  }

}
