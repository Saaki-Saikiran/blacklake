import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  loggedUser: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')).result[0];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }
  ChangePassword()
  {
    this.router.navigate(['/auth/change-password']);
  }
}
