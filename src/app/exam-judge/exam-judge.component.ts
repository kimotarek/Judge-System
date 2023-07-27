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
  remainingTime: number = 0;
  flag_verify_examcode: boolean;
  remainingTimeFormatted: any;
  flag_ten_minute: boolean;
  flag_ten_more_popup: boolean;
  flag_answers: boolean;
  flag_show_answers: any;

  constructor(
    private router: Router,
    private service: ServicService,
    private popup: ModalPopServiceService
  ) {
    //init false
    this.flag_ten_more_popup = false;
    this.flag_show_answers = false;
    this.flag_answers = false;
    //init true
    this.flag_verify_examcode = true;
    this.flag_ten_minute = true;
  }
  answer: any[] = [9, 9];
  percentage: any = 90;
  exam: any = {
    mcq: [
      {
        question: {
          _id: '64b56f99458fdc58f340f993',
          description: 'if(true)print 9 else print 4',
          choices: ['9', '4', 'Error'],
          weight: '2',
        },
        user_answer: '4',
      },
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

  language: any = [
    {
      lan: '',
      id: '',
      starter_code: '',
    },
    {
      lan: 'C++',
      _id: '54',
      starter_code:
        '#include <iostream>\n\n int main() {\n std::cout << "Hello World!\\n";\n}',
    },
    {
      lan: 'C',
      _id: '50',
      starter_code:
        '#include <stdio.h>\n\n int main(void) {\n\n return 0;\n}\n',
    },
    {
      lan: 'C#',
      _id: '51',
      starter_code:
        'using System;\n\nclass Program {\n  public static void Main(string[] args) {\n Console.WriteLine("Hello World");\n }\n}',
    },
    {
      lan: 'java',
      _id: '91',
      starter_code:
        'public class Main {\n public static void main(String[] args) {\n //System.out.println("Hello world!");\n   }\n }',
    },
    {
      lan: 'Python',
      _id: '71',
      starter_code: '',
    },
  ];

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
          this.flag_ten_minute = false;
        } else if (this.flag_show_answers == false) {
          this.flag_show_answers = true;
          this.submit();
        } else {
          this.router.navigate(['']);
        }
      }
    }, 1000);
  }

  startCountdownFromTenMinutes() {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const endTime = new Date(Date.now() + tenMinutes);

    this.startCountdown(endTime);
  }

  startCountdownFromFiveMinutes() {
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const endTime = new Date(Date.now() + tenMinutes);

    this.startCountdown(endTime);
  }
  // Example usage:

  change_answer(value: any, mcq_id: any, questions: any) {
    console.log(value);
    questions.user_answer = value;
    this.service.save_answer(this.exam._id, mcq_id, value).subscribe((x) => {});
  }

  send_code(input: any) {
    this.service.send_exam_code(input).subscribe((x) => {
      if (x.success == true) {
        this.exam = x.exam;
        console.log(x.exam);
        //x.exam
        this.flag_verify_examcode = false;
        let endTime = this.formatTime(this.exam.appointment);
        this.startCountdown(endTime);
      } else {
        this.popup.open_error(x.error);
      }
    });
  }

  need_more_time(value: any) {
    this.flag_ten_more_popup = false;

    if (value == 'YES') {
      this.startCountdownFromTenMinutes();
      this.flag_ten_minute = false;
    } else {
      //submit exam
      this.flag_ten_minute = false;
      this.submit();
    }
  }

  submit() {
    this.service.submit(this.exam._id).subscribe((x) => {
      console.log(x);
      if (x.success == true) {
        this.startCountdownFromFiveMinutes();
        this.answer = x.result.mcq_answers;
        this.percentage = x.result.percentage;
        this.flag_answers=true
        this.flag_verify_examcode=false
      } else {
        this.popup.open_error('Error Occured! Try Agian Or Talk To Admin  ');
      }
    });
  }

  check_answer_coding(value: any, coding_id: any, id_lang: any) {
    this.service
      .check_answer(this.exam._id, coding_id, value, id_lang)
      .subscribe((x) => {
        console.log(x);
        if (x.success == true) {
          this.popup.open_error(x.result);
        } else {
          this.popup.open_error(x.error);
        }
      });
  }
}
