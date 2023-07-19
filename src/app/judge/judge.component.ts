import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent {
  constructor(private router: Router) {}

  remainingTime: number = 18000;
  hours = Math.floor(this.remainingTime / 3600);
  minutes = Math.floor((this.remainingTime % 3600) / 60);
  seconds = this.remainingTime % 60;

  remainingTimeFormatted = `${this.hours} hrs : ${this.minutes} min : ${this.seconds} sec`;

  ngOnInit() {
    this.startCountdown();
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
}
