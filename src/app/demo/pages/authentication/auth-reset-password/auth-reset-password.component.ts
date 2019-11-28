import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthSigninService } from '../auth-signin/auth-signin.service';
@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  ResetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ChangePasswordService:AuthSigninService
    ) { }

  ngOnInit() {
    this.ResetPasswordForm = this.formBuilder.group({
      Email: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.ResetPasswordForm.controls; }

  onSubmit() {
    debugger
    this.submitted = true;
    if (this.ResetPasswordForm.invalid) {
      return;
    }
    this.loading = true;

  this.ChangePasswordService.ResetPassworrd(this.f.Email.value).subscribe(
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
}
