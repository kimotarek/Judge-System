import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { users } from './objects/users';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ServicService } from './service/services.service';
import { ExamJudgeComponent } from './exam-judge/exam-judge.component';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExamJudgeComponent,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxTypedJsModule,
    
    
  ],
  providers: [ServicService, users],
  bootstrap: [AppComponent],
})
export class AppModule {}
