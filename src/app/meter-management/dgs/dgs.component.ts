import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddDgsComponent } from './add-dgs/add-dgs.component';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/admin/user-entry/user-entry.service';
import { MetersService } from '../meters/meters.service';
import { DgsService } from './dgs.service';
@Component({
  selector: 'app-dgs',
  templateUrl: './dgs.component.html',
  styleUrls: ['./dgs.component.scss']
})
export class DgsComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;

  @Input() public data;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add DG";
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
  metersList: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: DgsService,
    private meterService: MetersService) {
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
    this.getMeters();
    this.formHeader = 'Add DG Details';
    this.buttonType = 'Add';
    this.isEditing = false;
    this.userForm = this.formBuilder.group({
      dgSerialNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required]),
      meterSerialNumberID: new FormControl('', [Validators.required]),
      yearMake: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.userForm.controls; }

  getUsers(): void {
    this.userService.getAll().subscribe(
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

  getMeters() {
    this.meterService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.metersList = data['result'];
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
      this.tabHeader = 'Add DG';
      this.formHeader = 'Add DG Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/meter-management/dgs', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/meter-management/dgs']);
      });
    }
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit DG Details';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit DG';
    this.isEditing = true;
    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      dgSerialNumber: new FormControl(data.dgSerialNumber, [Validators.required, Validators.minLength(3)]),
      model: new FormControl(data.model, [Validators.required]),
      meterSerialNumberID: new FormControl(data.meterSerialNumberID._id, [Validators.required]),
      yearMake: new FormControl(data.yearMake, [Validators.required]),
      description: new FormControl(data.description, [Validators.required])
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
        this.userService.deleteDg(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'DG deleted Successfully!', 'success');
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
      this.userService.createDg(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'DG Added Successfully !', 'success');
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
      this.userService.updateDg(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'DG Updated Successfully !', 'success');
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
