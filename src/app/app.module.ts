import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './signup/login/login.component';
import { RegistrationComponent } from './signup/registration/registration.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminComponent } from './userspages/admin/admin.component';
import { AuthorComponent } from './userspages/author/author.component';
import { BasicComponent } from './userspages/basic/basic.component';
import { CreatepollComponent } from './create/createpoll/createpoll.component';
import { CreatetestComponent } from './create/createtest/createtest.component';
import { QuestionFormComponent } from './create/question-form/question-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    AuthorComponent,
    BasicComponent,
    CreatepollComponent,
    CreatetestComponent,
    QuestionFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
