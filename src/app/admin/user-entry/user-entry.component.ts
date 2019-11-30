import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './user-entry.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})

export class UserEntryComponent implements OnInit, OnDestroy {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;

  @Input() public data;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add User";
  isEditing: boolean;
  submitted = false;
  user: string;
  Userdata: any;
  modalOptions: NgbModalOptions;
  loading: boolean;
  usersList: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  mySubscription: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService) {
    this.modalOptions = {
      backdrop: 'static',
      // backdropClass: 'customBackdrop',
      size: "lg"
    };
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    // console.log(this.myTabSet, '-------sai----------');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getUsers();
    this.formHeader = 'Add User Details';
    this.buttonType = 'Add';
    this.isEditing = false;
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      // isActive: new FormControl(true, [Validators.required])
    });
  }

  get f() { return this.userForm.controls; }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        if (data['success'] === true) {
          this.usersList = data['result'];
          this.dtTrigger.next();
        } else {
          Swal.fire('', data['error'], 'error');
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        Swal.fire('', error, 'error');
      }
    );
  }

  beforeChange($event: NgbTabChangeEvent) {
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add User';
      this.formHeader = 'Add User Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      // this.router.navigateByUrl('/admin/user-entry', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/admin/user-entry']);
      // });
    }
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit User Details';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  User';
    this.isEditing = true;
    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      phone: new FormControl(data.phone, [Validators.required]),
      password: new FormControl(data.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(data.confirmPassword, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(data.username, [Validators.required]),
      address: new FormControl(data.address, [Validators.required]),
      // isActive: new FormControl(this.data.isActive, [Validators.required])
    });
  }

  confirmAlert(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your imaginary file is safe!', 'error');
      } else {
        this.userService.deleteUser(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'User deleted Successfully!', 'success');
              this.getUsers();
            } else {
              Swal.fire('', data['error'], 'error');
            }
          },
          error => {
            Swal.fire('', error, 'error');
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    if (this.dtTrigger)
      this.dtTrigger.unsubscribe();
  }

  //vijay added
  onSubmit() {
    const user = { ...this.userForm.value };
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (user._id === undefined) {
      user.role = 'Admin';
      this.userService.createUser(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'User Added Successfully !', 'success');
            this.myTabSet.select('UserlistId');
          } else {
            Swal.fire('', data['error'], 'error');
            this.loading = false;
          }
        },
        error => {
          Swal.fire('', error, 'error');
          this.loading = false;
        });
    } else {
      this.userService.updateUser(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'User Updated Successfully !', 'success');
            this.myTabSet.select('UserlistId');
          } else {
            Swal.fire('', data['error'], 'error');
            this.loading = false;
          }
        },
        error => {
          Swal.fire('', error, 'error');
          this.loading = false;
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

}
