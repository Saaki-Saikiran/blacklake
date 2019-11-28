import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthSigninService } from '../auth-signin/auth-signin.service';
@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.scss']
})
export class AuthChangePasswordComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ChangePasswordService:AuthSigninService
    ) { }

  ngOnInit() {
    this.ChangePasswordForm = this.formBuilder.group({
      CurrentPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.ChangePasswordForm.controls; }

  onSubmit() {
    debugger
    this.submitted = true;
    this.f.CurrentPassword.value
    if (this.ChangePasswordForm.invalid) {
      return;
    }
    this.loading = true;
if(this.f.NewPassword.value==this.f.ConfirmPassword.value)
{
  this.ChangePasswordService.ChangePassworrd(this.f.CurrentPassword.value, this.f.NewPassword.value).subscribe(
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
else
{
  alert('Please Enter new password & confirm password must be same '); 
}
   
  }
}
