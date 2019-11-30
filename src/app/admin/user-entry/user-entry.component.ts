import { Component, ViewChild, OnDestroy, OnInit, Input } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersService } from './user-entry.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})

export class UserEntryComponent implements OnInit {

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



  constructor(
    private formBuilder: FormBuilder
    , private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) {
    this.modalOptions = {
      backdrop: 'static',
      // backdropClass: 'customBackdrop',
      size: "lg"
    };
  }

  ngOnInit() {
    debugger
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
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

        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add User';
      this.formHeader = 'Add User Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      
    }
  
   
  }
  userModal(type, data) {
    debugger
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

    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    // const activeModal = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
    // activeModal.componentInstance.data = initialState;
  }

  confirmAlert() {
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
        Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //vijay added
  onSubmit() {
    debugger
    const user = { ...this.userForm.value };

    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (this.Userdata === undefined) {
      user.role = 'Admin';
      this.userService.createUser(user).subscribe(
        data => {
          if (data['success'] === true) {
            location.reload();
            //  this.router.navigate(['/admin/user-entry']);
          } else {
            alert('Invalid User Creation');
            this.loading = false;
          }
        },
        error => {
          alert(error);
          this.loading = false;
        });
    } else {

      this.userService.updateUser(user).subscribe(
        data => {
          if (data['success'] === true) {
            location.reload();
            // this.router.navigate(['/dashboard/analytics']);
          } else {
            alert('Invalid User Creation');
            this.loading = false;
          }
        },
        error => {
          alert(error);
          this.loading = false;
        });

    }
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  hideModal(): void {

  }
}
