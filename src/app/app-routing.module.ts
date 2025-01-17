import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './signup/login/login.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { AdminComponent } from './userspages/admin/admin.component';
import { AuthorComponent } from './userspages/author/author.component';
import { BasicComponent } from './userspages/basic/basic.component';
import { CreatepollComponent } from './create/createpoll/createpoll.component';
import { CreatetestComponent } from './create/createtest/createtest.component';
import { AnswerpollComponent } from './answer/answerpoll/answerpoll.component';
import { AnswertestComponent } from './answer/answertest/answertest.component';
import { ReviewpollComponent } from './review/reviewpoll/reviewpoll.component';
import { ReviewtestComponent } from './review/reviewtest/reviewtest.component';
import { ReviewpollresultsComponent } from './review/reviewpollresults/reviewpollresults.component';
import { ReviewtestresultsComponent } from './review/reviewtestresults/reviewtestresults.component';
import { PasswordComponent } from './signup/password/password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'createpoll', component: CreatepollComponent },
  { path: 'createtest', component: CreatetestComponent },
  { path: 'answerpoll', component: AnswerpollComponent },
  { path: 'answertest', component: AnswertestComponent },
  { path: 'reviewpoll', component: ReviewpollComponent },
  { path: 'reviewtest', component: ReviewtestComponent },
  { path: 'reviewpollresults', component: ReviewpollresultsComponent },
  { path: 'reviewtestresults', component: ReviewtestresultsComponent },
  { path: 'password', component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
