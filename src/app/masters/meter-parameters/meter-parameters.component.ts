import { Component, OnInit, ViewChild } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MastersService } from '../masters.service'

@Component({
  selector: 'app-meter-parameters',
  templateUrl: './meter-parameters.component.html',
  styleUrls: ['./meter-parameters.component.scss']
})
export class MeterParametersComponent implements OnInit {

  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string = 'Add';
  tabHeader: any = "Add Meter Parameters ";
  isEditing: boolean;
  Userdata: any;
  MeterModelList: any;
  submitted = false;
  DeptMetersList: string;
  loading: boolean;
  mySubscription: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private MasterService: MastersService) {
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
    this.formHeader = "Add Meter Parameters Details";
    this.getDeptMeter();
    this.getMeterModel();
    var decimalformat=/^\d*\.?\d{4,5}$/g;
    this.userForm = this.formBuilder.group({
     // meterParamsId: new FormControl('', [Validators.required]),
      meterModelId: new FormControl('', [Validators.required, Validators.minLength(3)]),
      parameterName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      units: new FormControl('', [Validators.required]),
      dataType: new FormControl('', [Validators.required]),
      scaling: new FormControl('', [Validators.required]),
      modRegister: new FormControl('', [Validators.required]),
      registerLength: new FormControl('', [Validators.required]),
      isSupported: new FormControl('', [Validators.required]),
    });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Meter Parameters';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Meter Parameters';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
     // meterParamsId: new FormControl(data.meterParamsId, [Validators.required]),
      meterModelId: new FormControl(data.meterModelId._id, [Validators.required, Validators.minLength(3)]),
      parameterName: new FormControl(data.parameterName, [Validators.required]),
      description: new FormControl(data.description, [Validators.required]),
      units: new FormControl(data.units, [Validators.required]),
      dataType: new FormControl(data.dataType, [Validators.required]),
      scaling: new FormControl(data.scaling, [Validators.required]),
      modRegister: new FormControl(data.modRegister, [Validators.required]),
      registerLength: new FormControl(data.registerLength, [Validators.required]),
      isSupported: new FormControl(data.isSupported, [Validators.required]),
    });

  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Meter Parameters ';
      this.formHeader = 'Add Meter Parameters Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/masters/meter-parameters', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/masters/meter-parameters']);
      });
    }
  }
  getDeptMeter(): void {
    debugger
    this.MasterService.getAllMeterParameters().subscribe(
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
  getMeterModel(): void {
    debugger
    this.MasterService.getAllMeterModelMaster().subscribe(
      data => {
        if (data['success'] === true) {
          this.MeterModelList = data['result'];
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
    var stringValue = user.isSupported;;
    var boolValue = (stringValue == "true");
    user.isSupported = boolValue;
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (user._id === undefined) {
      user.role = 'Admin';
      this.MasterService.createMeterParameters(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Parameters Added Successfully !', 'success');
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
      this.MasterService.updateMeterParameters(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Parameters Updated Successfully !', 'success');
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
        this.MasterService.deleteMeterParameters(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter Parameters deleted Successfully!', 'success');
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

