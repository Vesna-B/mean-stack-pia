import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './signup/login/login.component';
import { RegistrationComponent } from './signup/registration/registration.component';
import { AdminComponent } from './userspages/admin/admin.component';
import { AuthorComponent } from './userspages/author/author.component';
import { BasicComponent } from './userspages/basic/basic.component';
import { CreatepollComponent } from './create/createpoll/createpoll.component';
import { CreatetestComponent } from './create/createtest/createtest.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'createpoll', component: CreatepollComponent },
  { path: 'createtest', component: CreatetestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
