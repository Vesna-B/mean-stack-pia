import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { confirmPasswordValidator } from '../validators';
import { Router } from '@angular/router';

import { User } from 'src/app/models/usermodel';
import { UserService } from 'src/app/userspages/user.service';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  currentUser: User = null;
  message = '';
  form: FormGroup;

  


  constructor(
    private userService: UserService,
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      oldPass: new FormControl('', Validators.required),
      newPass: new FormControl('', [
        Validators.required,
        //Validators.pattern('^(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z].{7,}$')   
      ]),
      newPassCon: new FormControl('', [
        Validators.required
      ])
    }); //, { validators: confirmPasswordValidator }

    let user = localStorage.getItem('currentUser');
    this.userService.getUser(user)
      .subscribe(response => {
        this.currentUser = response.user;
      })
    this.message = '';
  }

  get oldPass() { return this.form.get('oldPass') }
  get newPass() { return this.form.get('newPass') }
  get newPassCon() { return this.form.get('newPassCon') }

  submit() {

    console.log(this.form.value);
    console.log(this.form.value.oldPass);
    console.log(this.form.value.newPass);

    if (this.form.value.oldPass != this.currentUser.password) {
      this.message = 'Niste uneli korektnu staru lozinku';
    }
    if (this.form.value.oldPass == this.currentUser.password) {
      this.signupService.changePassword(this.currentUser._id, this.form.value.oldPass, this.form.value.newPass)
        .subscribe(() => {
          alert('Lozinka je uspešno promenjena');
          this.signupService.logout();
        }, err => {
          alert(err.error.message);
        })
    }

  }


  quit() {
    let currentUserType = localStorage.getItem('currentUserType');
    if (localStorage.getItem('authorReview')) {
      localStorage.removeItem('authorReview');
    }
    switch(currentUserType) {
      case 'admin': this.router.navigate(['admin']); break;
      case 'author': this.router.navigate(['author']); break;
      case 'basic': this.router.navigate(['basic']); break;
    }
  }

}