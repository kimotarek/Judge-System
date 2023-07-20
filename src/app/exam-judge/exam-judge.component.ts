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
   this.flag_verify_examcode=true
  }

  exam:any = {
    mcq: [
        {
            question: {
                _id: "64b56f99458fdc58f340f993",
                description: "if(true)print 9 else print 4",
                choices: [
                    "9",
                    "4",
                    "Error"
                ],
                weight: 2
            },
            user_answer: ""
        }
    ],
    coding: [
        {
            question: {
                _id: "64b56fa9458fdc58f340f996",
                title: "efdfsad",
                description: "sadawd",
                input_format: "dasdaw",
                output_format: "asdasd",
                constraints: "dasdasd",
                weight: 10
            }
        }
    ],
    title: "java",
    appointment: "12:03 PM",
    _id: "64b87d34bc3216c6de05dcd1"
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


 change_answer(event:any,mcq_id:any) {

  this.service.save_answer(this.exam._id,mcq_id,event.value).subscribe(
    x=>{
  })

 }

 send_code(input:any){

  this.service.send_exam_code(input).subscribe(
    x=>{
      if(x.success==true){
       this.startCountdown();
        this.exam=x.exam

        //x.exam
        this.flag_verify_examcode=false;
      }
      else{
        this.popup.open_error("verification code is wrong !");
      }

  })
}


submit(){

}








}
