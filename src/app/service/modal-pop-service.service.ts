import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalPopServiceService {
  constructor() {}
  error_message: any = '';
  title: any = '';

  name_course: any = '';
  discription: any = '';

  public open_error_login() {
    this.error_message =
      "Sorry, we couldn't log you in. The email or password you entered was not found in our system. Please make sure you have entered the correct email and password and try again.";
    this.title = 'Login Error Message !';
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
      errorMessageElement.textContent = this.error_message;
    }
    const title_message = document.getElementById('error-title');
    if (title_message) {
      title_message.textContent = this.title;
    }
    const modal = document.getElementById('ERROR_login');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  public open_error(message:any) {
    this.error_message =message;
    this.title = 'Error Message !';
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
      errorMessageElement.textContent = this.error_message;
    }
    const title_message = document.getElementById('error-title');
    if (title_message) {
      title_message.textContent = this.title;
    }
    const modal = document.getElementById('ERROR_login');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  
  public close_error() {
    const modal = document.getElementById('ERROR_login');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
