import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicService } from '../service/services.service';
import { ModalPopServiceService } from '../service/modal-pop-service.service';

@Component({
  selector: 'app-exam-judge',
  templateUrl: './exam-judge.component.html',
  styleUrls: ['./exam-judge.component.css'],
})
export class ExamJudgeComponent {
  remainingTime: number=0;
  flag_verify_examcode :boolean;
  remainingTimeFormatted :any;
  flag_ten_minute :boolean;
  flag_ten_more_popup :boolean;
  select_language:any;
  constructor(
    private router: Router,
    private service: ServicService,
    private popup: ModalPopServiceService
  ) {
    this.flag_verify_examcode = false;
    this.flag_ten_more_popup=false;
    this.flag_ten_minute = true;
  }

  exam: any = {
    mcq: [
      {
        question: {
          _id: '64b56f99458fdc58f340f993',
          description: 'if(true)print 9 else print 4',
          choices: ['9', '4', 'Error'],
          weight: '2',
        },
        user_answer: '9',
      },
    ],
    coding: [
      {
        question: {
          _id: '64b56fa9458fdc58f340f996',
          title: 'efdfsad',
          description: 'sadawd',
          input_format: 'dasdaw',
          output_format: 'asdasd',
          constraints: 'dasdasd',
          weight: 10,
        },
      },
    ],
    title: 'java',
    appointment: '11:03 PM',
    _id: '64b87d34bc3216c6de05dcd1',
  };

  formatTime(time: any) {
    const timeComponents = time.split(' ');
    const timeStr = timeComponents[0];
    const ampm = timeComponents[1].toUpperCase();

    const [hoursStr, minutesStr] = timeStr.split(':');
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    if (ampm === 'PM') {
      hours = hours === 12 ? 12 : hours + 12;
    } else if (ampm === 'AM') {
      hours = hours === 12 ? 0 : hours;
    } else {
      throw new Error(
        "Invalid time format. Please use '12:12 PM' or '12:12 AM'."
      );
    }

    const endTime = new Date();
    endTime.setHours(hours);
    endTime.setMinutes(minutes);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);

    return endTime;
  }

  startCountdown(endTime: any) {
    const endTimestamp = endTime.getTime();

    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      let remainingTime = Math.max(
        0,
        Math.floor((endTimestamp - currentTimestamp) / 1000)
      );

      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      this.remainingTimeFormatted = `${hours} hrs : ${minutes} min : ${seconds} sec`;

      // Update the display or do anything with the remainingTimeFormatted value

      if (remainingTime === 0) {
        clearInterval(interval);
        console.log('Countdown finished!');
        if (this.flag_ten_minute) {
          this.flag_ten_more_popup = true;
        }
      }
    }, 1000);
  }

  startCountdownFromTenMinutes() {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const endTime = new Date(Date.now() + tenMinutes);

    console.log(
      `Countdown from 10 minutes started. It will end at ${endTime.toLocaleTimeString()}`
    );
    this.startCountdown(endTime);
  }
  // Example usage:

  change_answer(event: any, mcq_id: any,questions:any) {
    console.log(event);
    questions.user_answer=event;
    // this.service.save_answer(this.exam._id,mcq_id,event).subscribe(
    //   x=>{
    // })
  }

  on_language_select(event:any){
    this.select_language = (event.target as HTMLSelectElement).value;
    
  }

  send_code(input: any) {
    // this.service.send_exam_code(input).subscribe(
    //   x=>{
    //     if(x.success==true){
    //       this.exam=x.exam
    //       console.log(x.exam);
    //       //x.exam
    // let endTime = this.formatTime(this.exam.appointment);
    // this.startCountdown(endTime);
    //   this.flag_verify_examcode=false;
    //     }
    //     else{
    //       this.popup.open_error("verification code is wrong !");
    //     }
    // })
  }

  submit() {}

  need_more_time(value: any) {
    this.flag_ten_more_popup = false;

    if (value == 'YES') {
      this.startCountdownFromTenMinutes();
      this.flag_ten_minute = false;
    } else {
      //submit exam
    }

  }
}
