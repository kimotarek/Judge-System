import { Component } from '@angular/core';
import { users } from '../objects/users';
import { ServicService } from '../service/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user_login: any;
  power = -1;
  pop_up: any;
  constructor(
    user: users,
    private service: ServicService,
    private router: Router,
    // private pop_service: ModalPopServiceService,
    private route: ActivatedRoute
  ) {
    this.user_login = user;
    
  }

  ngOnInit() {
   
  }

  submit() {
    //  service with user_login
    this.service.login(this.user_login).subscribe((x) => {
      if (x.success == 2) {
        this.router.navigate(['/admin_home/admin_location']);
      } else if (x.success == 1) {
        this.router.navigate(['/home/home_bar']);
      } else {
        // this.pop_service.open_error_login();
      }

      error: (error: HttpErrorResponse) => {
        alert(error.message);
      };
    });
  }
}
