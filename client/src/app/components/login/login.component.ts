import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  authError = false;
  authErrorMsg!: string;

  loginForm = new FormGroup({
    email: new FormControl([''], Validators.required),
    password: new FormControl([''], Validators.required),
  });

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.sessionService.login(this.loginForm.value)
      .subscribe(() => {
          // Successful login
          this.router.navigate(['/']);
        },
        (error) => {
          // Failed login
          this.authError = true;
          (this.authErrorMsg = error.error.msg)
        });
  }

}
