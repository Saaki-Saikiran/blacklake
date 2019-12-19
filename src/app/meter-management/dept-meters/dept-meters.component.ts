import { Component, OnInit ,ViewChild} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions ,NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { AddDeptMetersComponent } from './add-dept-meters/add-dept-meters.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import {DeptMetersService} from '../dept-meters/dept-meters.service';

@Component({
  selector: 'app-dept-meters',
  templateUrl: './dept-meters.component.html',
  styleUrls: ['./dept-meters.component.scss']
})
export class DeptMetersComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Department  Meter";
  isEditing: boolean;
  Userdata:any;
  submitted = false;
  DeptMetersList:string;
  loading: boolean;
  mySubscription: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router, private DeptMeterService: DeptMetersService) {
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
  get f() { return this.userForm.controls; }
  ngOnInit() {
      this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.formHeader="Add Department  Meter Details";
    this.getDeptMeter();
    this.userForm = this.formBuilder.group({
      deptMeterNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      location: new FormControl('', []),
      provider: new FormControl('', []),
      description: new FormControl('', []),
      // isActive: new FormControl(true, [Validators.required])
    });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Department  Meter';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Department  Meter';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      deptMeterNumber: new FormControl(data.deptMeterNumber, [Validators.required, Validators.minLength(3)]),
      location: new FormControl(data.location, []),
      provider: new FormControl(data.provider, []),
      description: new FormControl(data.description, []),
      // isActive: new FormControl(this.data.isActive, [Validators.required])
    });
    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    // const activeModal = this.modalService.open(AddDeptMetersComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
    // activeModal.componentInstance.data = initialState;
  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Department  Meter';
      this.formHeader = 'Add Department  Meter Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/meter-management/dept-meters', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/meter-management/dept-meters']);
      });
    }
  }
    getDeptMeter(): void {
      debugger
      this.DeptMeterService.getAll().subscribe(
        data => {
          if (data['success'] === true) {
            this.DeptMetersList = data['result'];
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
    onSubmit() {
      debugger
      const user = { ...this.userForm.value };
      this.submitted = true;
      if (this.userForm.invalid) {
        return;
      }
      if (user._id === undefined) {
        user.role = 'Admin';
        this.DeptMeterService.createDeptMeter(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Department  Meter Added Successfully !', 'success');
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
        this.DeptMeterService.updateDeptMeter(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Department  Meter Updated Successfully !', 'success');
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
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      if (this.dtTrigger)
        this.dtTrigger.unsubscribe();
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
  confirmAlertDelete(id) {
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
        this.DeptMeterService.deleteMeter(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Department  Meter deleted Successfully!', 'success');
              this.getDeptMeter();
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
}
