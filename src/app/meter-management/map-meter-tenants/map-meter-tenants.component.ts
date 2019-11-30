import 'sweetalert2/src/sweetalert2.scss';
import { AddMapMeterTenantsComponent } from './add-map-meter-tenants/add-map-meter-tenants.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MetersService } from '../meters/meters.service';
import { UsersService } from 'src/app/admin/user-entry/user-entry.service';
import { MapMeterTenantsService } from './map-meter-tenants.service';

@Component({
  selector: 'app-map-meter-tenants',
  templateUrl: './map-meter-tenants.component.html',
  styleUrls: ['./map-meter-tenants.component.scss']
})
export class MapMeterTenantsComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;

  @Input() public data;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add Map Meter Tenant";
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
  deptMeters: { "_id": string; "deptMeterNumber": number; }[];
  FloorList: any[];
  TenantsList: any[];
  mapmetersList: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private meterService: MapMeterTenantsService,
    private meterService1: MetersService) {
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
    this.getDeptMeters();
    this.getMeters();
    this.getFloors();
    this.getTenants();
    this.formHeader = 'Add Map Meter Tenant Details';
    this.buttonType = 'Add';
    this.isEditing = false;
    this.userForm = this.formBuilder.group({
      deptMeterNumberID: new FormControl('', [Validators.required]),
      meterSerialNumberID: new FormControl('', [Validators.required, Validators.minLength(3)]),
      meterType: new FormControl('', [Validators.required]),
      gatewayName: new FormControl('', [Validators.required]),
      block: new FormControl('', [Validators.required]),
      floorID: new FormControl('', [Validators.required]),
      tenantID: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      started: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.userForm.controls; }

  getUsers(): void {
    this.meterService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.mapmetersList = data['result'];
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

  getDeptMeters() {
    this.deptMeters = [{
      "_id": "UdTRq7vs",
      "deptMeterNumber": 1234567890
    }, {
      "_id": "yOSx5$Sf",
      "deptMeterNumber": 123456789099999.0
    },
    {
      "_id": "DmnWcP$J",
      "deptMeterNumber": 123498658595.0
    }];
    // this.meterService.getAll().subscribe(
    //   data => {
    //     if (data['success'] === true) {
    //       this.metersList = data['result'];
    //       this.dtTrigger.next();
    //     } else {
    //       Swal.fire('', data['error'], 'error');
    //     }
    //     this.loading = false;
    //   },
    //   error => {
    //     this.loading = false;
    //     Swal.fire('', error, 'error');
    //   }
    // );
  }

  getMeters() {
    this.meterService1.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.metersList = data['result'];
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

  getFloors() {
    this.FloorList = [
      {
        "_id": "zPuMYQgr",
        "block": "block",
        "floor": "floor"
      },
      {
        "_id": "0jw8JZ7I",
        "block": "block11",
        "floor": "floor111",
      },
      {
        "_id": "SFLtxNDk",
        "block": "block11 555",
        "floor": "floor111 555",
      }
    ];
  }

  getTenants() {
    this.TenantsList = [
      {
        "_id": "M0fpfKjM",
        "tenantName": "saikiran11 666",
      },
      {
        "_id": "Is5Ie67g",
        "tenantName": "saikiran11",
      }
    ];
  }

  beforeChange($event: NgbTabChangeEvent) {
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Map Meter Tenant';
      this.formHeader = 'Add Map Meter Tenant Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/meter-management/map-meter-tenants', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/meter-management/map-meter-tenants']);
      });
    }
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Map Meter Tenant Details';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Map Meter Tenant';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      deptMeterNumberID: new FormControl(data.deptMeterNumberID._id, [Validators.required]),
      meterSerialNumberID: new FormControl(data.meterSerialNumberID._id, [Validators.required, Validators.minLength(3)]),
      meterType: new FormControl(data.meterType, [Validators.required]),
      gatewayName: new FormControl(data.gatewayName, [Validators.required]),
      block: new FormControl(data.block, [Validators.required]),
      floorID: new FormControl(data.floorID._id, [Validators.required]),
      tenantID: new FormControl(data.tenantID._id, [Validators.required]),
      contactNumber: new FormControl(data.contactNumber, [Validators.required]),
      started: new FormControl(data.started, [Validators.required])
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
              Swal.fire('', 'Map Meter Tenant deleted Successfully!', 'success');
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
            Swal.fire('', 'Map Meter Tenant Added Successfully !', 'success');
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
            Swal.fire('', 'Map Meter Tenant Updated Successfully !', 'success');
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
