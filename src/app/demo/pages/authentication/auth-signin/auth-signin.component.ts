import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthSigninService } from './auth-signin.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  forgotPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: AuthSigninService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.loginService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        if (data['success'] === true) {
          this.router.navigate(['/dashboard/analytics']);
        } else {
          alert('Invalid Credentials');
          this.loading = false;
        }
      },
      error => {
        alert(error);
        this.loading = false;
      });
  }

  forgotPasswordClicked() {
    this.forgotPassword = !this.forgotPassword;
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  CancelForgotPassword() {
    this.forgotPassword = false;
  }

  // SubmitForgotPassword() {
  //   if (this.forgotPasswordForm.invalid) {
  //     return;
  //   } else {
  //     this.loginService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
  //       data => {
  //         if (data['success'] === true) {
  //           this.snackBar.open(data['result'], '', {
  //             duration: 3000,
  //             panelClass: ['success'],
  //             horizontalPosition: 'right',
  //             verticalPosition: 'bottom'
  //           });
  //           this.forgotPassword = false;
  //         } else {
  //           this.snackBar.open('Invalid Email', '', {
  //             duration: 3000,
  //             panelClass: ['error'],
  //             horizontalPosition: 'right',
  //             verticalPosition: 'bottom'
  //           });
  //         }
  //       },
  //       error => {
  //         this.snackBar.open(error, 'Close', {
  //           duration: 3000,
  //           panelClass: ['error'],
  //           horizontalPosition: 'right',
  //           verticalPosition: 'bottom'
  //         });
  //       });
  //   }
  // }

}
