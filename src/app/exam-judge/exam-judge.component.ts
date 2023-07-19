import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicService } from '../service/services.service';
import { ModalPopServiceService } from '../service/modal-pop-service.service';

@Component({
  selector: 'app-exam-judge',
  templateUrl: './exam-judge.component.html',
  styleUrls: ['./exam-judge.component.css']
})
export class ExamJudgeComponent {
 
 remainingTime: number = 18000;
 hours = Math.floor(this.remainingTime / 3600);
 minutes = Math.floor((this.remainingTime % 3600) / 60);
 seconds = this.remainingTime % 60;
 flag_verify_examcode=true;
 remainingTimeFormatted = `${this.hours} hrs : ${this.minutes} min : ${this.seconds} sec`;


 
 constructor(private router: Router,private service:ServicService,private popup:ModalPopServiceService) {
    this.startCountdown();
   this.flag_verify_examcode=true
  }

 startCountdown() {
   const interval = setInterval(() => {
     this.remainingTime--;
     this.hours = Math.floor(this.remainingTime / 3600);
     this.minutes = Math.floor((this.remainingTime % 3600) / 60);
     this.seconds = this.remainingTime % 60;

     this.remainingTimeFormatted = `${this.hours} hrs : ${this.minutes} min : ${this.seconds} sec`;

     if (this.remainingTime === 0) {
       clearInterval(interval);
     }
   }, 1000);
 }



 send_code(input:any){

  // this.service.send_exam_code(input).subscribe(
  //   x=>{
  //     if(x.success==true){

  //       //x.exam
  //       this.flag_verify_examcode=false;
  //     }
  //     else{
  //       this.popup.open_error("verification code is wrong !");
  //     }

  // })
  console.log(input)
}








}
