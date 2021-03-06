import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddMeterComponent } from './add-meter/add-meter.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MetersService } from './meters.service';
import { UsersService } from 'src/app/admin/user-entry/user-entry.service';
import { DeptMetersService } from '../dept-meters/dept-meters.service';
import { MastersService } from '../../masters/masters.service';
import { MeterTypesService } from '../../admin/meter-types/meter-types.service'
@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss']
})
export class MetersComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;

  @Input() public data;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add Meter";
  isEditing: boolean;
  submitted = false;
  user: string;
  Userdata: any;
  modalOptions: NgbModalOptions;
  loading: boolean;
  usersList: any;
  SourceType: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  mySubscription: any;
  metersList: any;
  deptMeters: any[];
  PanelList: any;
  GatewayList: any;
  MetersList: any;
  MeterModelList: any;
  metersTypeList: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private meterService: MetersService,
    private meterTypeService: MeterTypesService,
    private deptmeterService: DeptMetersService, private MasterService: MastersService) {
     
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
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getUsers();
    this.getDeptMeters();
    this.getSourceType();
    this.getPanel();
    this.getGateway();
    //this.getMeterList();
    this.getMeterModel();
    this.getMeterTypeList();
    this.formHeader = 'Add Meter Details';
    this.buttonType = 'Add';
    this.isEditing = false;
    this.userForm = this.formBuilder.group({
      meterSerialNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required]),
      meterType: new FormControl('', [Validators.required]),
      deptMeterNumberID: new FormControl('', [Validators.required]),
      sourceType: new FormControl('', [Validators.required]),
      panel: new FormControl('', []),
      gateway: new FormControl('', [Validators.required]),
      provider: new FormControl('', []),
      multifyingFactor: new FormControl('', [Validators.required]),
      comments: new FormControl('', []),
    });
  }

  get f() { return this.userForm.controls; }
  getMeterTypeList(): void {
    this.meterTypeService.getAll().subscribe(
      data => {
        if (data['success'] === true) {

          this.metersTypeList = data['result'];
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
  getUsers(): void {
    this.meterService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          debugger
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
  getMeterModel() {
    this.MasterService.getAllMeterModelMaster().subscribe(
      data => {
        if (data['success'] === true) {
          this.MeterModelList = data['result'];
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
  getDeptMeters() {
    this.deptmeterService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.deptMeters = data['result'];
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
  getSourceType(): void {

    this.MasterService.getAllSource().subscribe(
      data => {
        if (data['success'] === true) {
          this.SourceType = data['result'];
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
  getPanel(): void {

    this.MasterService.getAllPanel().subscribe(
      data => {
        if (data['success'] === true) {
          this.PanelList = data['result'];
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
  getGateway(): void {

    this.MasterService.getAllGateway().subscribe(
      data => {
        if (data['success'] === true) {
          this.GatewayList = data['result'];
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
  // getMeterList(): void {

  //   this.MasterService.getAllMeterModelMaster().subscribe(
  //     data => {
  //       if (data['success'] === true) {
  //         debugger
  //         this.MetersList = data['result'];
  //         this.dtTrigger.next();
  //       } else {
  //         Swal.fire('', data['error'], 'error');
  //       }
  //       this.loading = false;
  //     },
  //     error => {
  //       this.loading = false;
  //       Swal.fire('', error, 'error');
  //     }
  //   );
  // }
  beforeChange($event: NgbTabChangeEvent) {
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Meter';
      this.formHeader = 'Add Meter Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/meter-management/meters', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/meter-management/meters']);
      });
    }
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Meter Details';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Meter';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      meterSerialNumber: new FormControl(data.meterSerialNumber, [Validators.required, Validators.minLength(3)]),
      model: new FormControl(data.model._id, [Validators.required]),
      meterType: new FormControl(data.meterType._id, [Validators.required]),
      deptMeterNumberID: new FormControl(data.deptMeterNumberID._id, [Validators.required]),
      sourceType: new FormControl(data.sourceType._id, [Validators.required]),
      panel: new FormControl((data.panel) ? data.panel._id : '', []),
      gateway: new FormControl(data.gateway._id, [Validators.required]),
      provider: new FormControl(data.provider, []),
      multifyingFactor: new FormControl(data.multifyingFactor, [Validators.required]),
      comments: new FormControl(data.comments, []),
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
        this.meterService.deleteMeter(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter deleted Successfully!', 'success');
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
      this.meterService.createMeter(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Added Successfully !', 'success');
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
      this.meterService.updateMeter(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Updated Successfully !', 'success');
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
