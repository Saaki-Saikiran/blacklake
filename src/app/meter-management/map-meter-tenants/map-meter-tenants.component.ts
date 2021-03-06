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
import { DeptMetersService } from '../dept-meters/dept-meters.service';
import { TenantsService } from '../tenants/tenants.service';
import { FloorsService } from '../floors/floors.service';
import { OrderByPipe } from '../../_pipes/orderby-pipe';
import { MeterTypesService } from 'src/app/admin/meter-types/meter-types.service';
import { MastersService } from 'src/app/masters/masters.service';

@Component({
  selector: 'app-map-meter-tenants',
  templateUrl: './map-meter-tenants.component.html',
  styleUrls: ['./map-meter-tenants.component.scss'],
  providers: [OrderByPipe]
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
  deptMeters: any[];
  FloorList: any[];
  TenantsList: any[];
  mapmetersList: any;
  tenantdata: any[];
  mappedMeterTenantsList: any;
  tenant: any;
  tenantID123: string;
  model;
  searchText;
  Allbtn: boolean = false;
  Activebtn: boolean = false;
  InActivebtn: boolean = false;
  mappedMeterTenantsListOriginal: any;
  GatewayList: any;
  metersTypeList: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private meterService: MapMeterTenantsService,
    private meterService1: MetersService,
    private deptmeterService: DeptMetersService,
    private TenantService: TenantsService,
    private floorService: FloorsService,
    private meterTypeService: MeterTypesService,
    private MasterService: MastersService,
    private capitalize: OrderByPipe) {
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
    // this.getUsers();
    this.getGateway();
    this.getMeterTypeList();
    this.getDeptMeters();
    this.getMeters();
    this.getFloors();
    this.getTenants();
    this.getmappedMeterTenants();
    this.formHeader = 'Map Meter Tenant Details';
    this.buttonType = 'Map';
    this.isEditing = false;
    this.tenantID123 = "tenantID";
    this.userForm = this.formBuilder.group({
      // deptMeterNumberID: new FormControl('', [Validators.required]),
      meterSerialNumberID: new FormControl('', [Validators.required, Validators.minLength(3)]),
      buildingBlock: new FormControl('', [Validators.required]),
      // gatewayName: new FormControl('', [Validators.required]),
      // block: new FormControl('', [Validators.required]),
      floorID: new FormControl('', [Validators.required]),
      assignTenant: new FormControl('yes', [Validators.required]),
      assignTenantActive: new FormControl('yes', [Validators.required]),
      tenantID: new FormControl(''),
      inactiveTenant: new FormControl(''),
      // contactNumber: new FormControl('', [Validators.required]),
      // started: new FormControl('', [Validators.required])
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

  getGateway(): void {
    this.MasterService.getAllGateway().subscribe(
      data => {
        if (data['success'] === true) {
          this.GatewayList = data['result'];
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

  getMeterTypeList(): void {
    this.meterTypeService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.metersTypeList = data['result'];
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

  filterValue(obj, key, value) {
    console.log(obj);
    console.log(key);
    console.log(value);
    return obj.find(function (v) { return v[key] === value });
  }

  Search(searchText) {
    debugger
    const val = searchText;

    if (val == '') {
      this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
    }
    else {
      this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
      if (val && val.trim() != '') {
        this.mappedMeterTenantsList = this.mappedMeterTenantsList.filter((item) => {
          return (item.tenantName.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    // if(searchText.length==0)
    // {
    //   this.mappedMeterTenantsList=this.mappedMeterTenantsListOriginal;
    // }
    // else
    // {
    // //  this.mappedMeterTenantsList=this.mappedMeterTenantsList.filter( this.mappedMeterTenantsList => (this.mappedMeterTenantsList.tenantName === searchText));
    //   this.mappedMeterTenantsList =  this.mappedMeterTenantsList.filter(e => e.tenantName === searchText);  
    // }
  }
  getmappedMeterTenants() {
    this.meterService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.mappedMeterTenantsList = data['result'];
          this.mappedMeterTenantsListOriginal = data['result'];
          this.data = this.capitalize.transform(this.mappedMeterTenantsList, 'tenantName');
          this.tenant = this.mappedMeterTenantsList[0].tenantName;
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
    this.meterService1.getMetersForMapMeterTenant().subscribe(
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
    this.floorService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.FloorList = data['result'];
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

  getTenants() {
    this.TenantsList = [];
    this.TenantService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.TenantsList = data['result'];
          this.tenantdata = this.TenantsList;
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

    // this.userForm = this.formBuilder.group({
    //   _id: new FormControl(data._id),
    //   deptMeterNumberID: new FormControl(data.deptMeterNumberID._id, [Validators.required]),
    //   meterSerialNumberID: new FormControl(data.meterSerialNumberID._id, [Validators.required, Validators.minLength(3)]),
    //   meterType: new FormControl(data.meterType, [Validators.required]),
    //   gatewayName: new FormControl(data.gatewayName, [Validators.required]),
    //   block: new FormControl(data.block, [Validators.required]),
    //   floorID: new FormControl(data.floorID._id, [Validators.required]),
    //   tenantID: new FormControl(data.tenantID._id, [Validators.required]),
    //   contactNumber: new FormControl(data.contactNumber, [Validators.required]),
    //   started: new FormControl(data.started, [Validators.required])
    // });
  }

  // confirmAlert(id) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Once deleted, you will not be able to recover this imaginary file!',
  //     type: 'warning',
  //     showCloseButton: true,
  //     showCancelButton: true
  //   }).then((willDelete) => {
  //     if (willDelete.dismiss) {
  //       Swal.fire('', 'Your imaginary file is safe!', 'error');
  //     } else {
  //       this.meterService.deleteMeter(id).subscribe(
  //         data => {
  //           if (data['success'] === true) {
  //             Swal.fire('', 'Map Meter Tenant deleted Successfully!', 'success');

  //           } else {
  //             Swal.fire('', data['error'], 'error');
  //           }
  //         },
  //         error => {
  //           Swal.fire('', error, 'error');
  //         }
  //       );
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    if (this.dtTrigger)
      this.dtTrigger.unsubscribe();
  }
  handleChangeActive(evt) {
    debugger
    let target = evt.target;
    if (target.value === 'All') {
      this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
      // if(target.checked === true)
      // {
      //   // this.InActivebtn=false;
      //   // this.Activebtn=false;
      //   this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
      // }
      // else
      // {
      //   // this.InActivebtn=true;
      //   // this.Activebtn=true;
      //   this.mappedMeterTenantsList ="";
      // }

    }
    if (target.value === 'Active') {
      this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal.filter(one => one.tenantStatus === true);
      // if(target.checked === true)
      // {
      //   // this.Allbtn=true;
      //   // this.InActivebtn=false;
      // this.mappedMeterTenantsList =  this.mappedMeterTenantsListOriginal.filter(one => one.active === true);
      // }
      // else
      // {
      //   // this.Allbtn=false;
      //   // this.InActivebtn=false;
      //   this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
      // }
    }

    if (target.value === 'InActive') {
      this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal.filter(one => one.tenantStatus === false);
      // if(target.checked === true)
      // {
      //   // this.Allbtn=true;
      //   // this.Activebtn=false;
      // this.mappedMeterTenantsList =this.mappedMeterTenantsListOriginal.filter(one => one.active === false);
      // }
      // else
      // {
      //   // this.Allbtn=false;
      //   // this.Activebtn=false;
      //   this.mappedMeterTenantsList = this.mappedMeterTenantsListOriginal;
      // }
    }
  }
  handleChange(evt) {
    // this.TenantsList = [];
    let target = evt.target;
    if (target.value === 'yes') {
      this.tenantID123 = "tenantID";
      this.tenantdata = this.TenantsList;
    }
    if (target.value === 'no') {
      this.tenantID123 = "inactiveTenant";

      this.tenantdata = [{
        _id: "common",
        tenantName: "Common"
      }, {
        _id: "chiller",
        tenantName: "Chiller"
      }];
    }
  }

  onSubmit() {
    console.log(this.userForm.value);
    const user = { ...this.userForm.value };
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    user.role = 'Admin';
    this.meterService.createMeter(user).subscribe(
      data => {
        if (data['success'] === true) {

          this.meterService1.updateMeter({ "_id": user.meterSerialNumberID, "assignedToTenant": true }).subscribe(
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
          Swal.fire('', data['error'], 'error');
          this.loading = false;
        }
      },
      error => {
        Swal.fire('', error, 'error');
        this.loading = false;
      });
  }

  changeVacateTime(data, date) {
    console.log(data);
    console.log(date, new Date(date.year, date.month, date.day));
    let user = data;
    user.vacatedOn = new Date(date.year, date.month, date.day);
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
  Cancel() {
    this.myTabSet.select('UserlistId');
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  tenantSelected(value) {
    console.log(value, '--value--')
    this.tenant = value;
  }

  confirmAlertDelete(data) {
    let meterId = data.meterSerialNumberID._id;

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
        this.meterService.deleteMeter(data._id).subscribe(
          data => {
            if (data['success'] === true) {

              this.meterService1.updateMeter({ "_id": meterId, "assignedToTenant": false }).subscribe(
                data => {
                  if (data['success'] === true) {
                    Swal.fire('', 'Map Meter Tenant Updated Successfully !', 'success');
                    this.getMeters();
                    this.getFloors();
                    this.getTenants();
                    this.getmappedMeterTenants();
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
