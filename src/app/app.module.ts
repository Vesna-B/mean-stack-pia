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
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminComponent } from './userspages/admin/admin.component';
import { AuthorComponent } from './userspages/author/author.component';
import { BasicComponent } from './userspages/basic/basic.component';
import { CreatepollComponent } from './create/createpoll/createpoll.component';
import { CreatetestComponent } from './create/createtest/createtest.component';
import { QuestionFormComponent } from './create/question-form/question-form.component';
import { AnswerpollComponent } from './answer/answerpoll/answerpoll.component';
import { AnswertestComponent } from './answer/answertest/answertest.component';
import { ReviewpollComponent } from './review/reviewpoll/reviewpoll.component';
import { ReviewtestComponent } from './review/reviewtest/reviewtest.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReviewpollresultsComponent } from './review/reviewpollresults/reviewpollresults.component';
import { ReviewtestresultsComponent } from './review/reviewtestresults/reviewtestresults.component';
import { PasswordComponent } from './signup/password/password.component';

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
    AnswerpollComponent,
    AnswertestComponent,
    ReviewpollComponent,
    ReviewtestComponent,
    HeaderComponent,
    FooterComponent,
    ReviewpollresultsComponent,
    ReviewtestresultsComponent,
    PasswordComponent,
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
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
