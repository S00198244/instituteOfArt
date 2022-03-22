import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  authError = false;
  authErrorMsg!: string;

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  signup: any;

  constructor(private router: Router, private session: SessionService, private sessionQuery: SessionQuery) { }

  ngOnInit() { 

  }

  onSubmit() {
    this.submitted = true; 

    if (this.signupForm.invalid) {
      return;
    }

    this.session.signup(this.signupForm.value)
      .subscribe((res) => {
        // Successful signup
        console.log(res),
        console.log(this.sessionQuery.name$);
        this.router.navigate(['/']);
      },
      (error) => {
        // Failed signup
        this.authError = true;
        (this.authErrorMsg = error.error.msg)
      });
  }
}
