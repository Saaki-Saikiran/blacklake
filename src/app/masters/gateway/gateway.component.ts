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
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string = 'Add';
  tabHeader: any = "Add Gateway  ";
  isEditing: boolean;
  Userdata: any;
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
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.formHeader = "Add Gateway  Details";
    this.getDeptMeter();
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    this.userForm = this.formBuilder.group({
      gatewayId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gatewayModel: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      tcp_COM_Type: new FormControl('', [Validators.required]),
      ip: new FormControl('', [Validators.required,Validators.pattern(ipformat)]),
      tcp_COM_PortNo: new FormControl('', [Validators.required]),
      baudRate: new FormControl('', [Validators.required]),
      parity: new FormControl('', [Validators.required]),
      stopBits: new FormControl('', [Validators.required]),
      dataSize: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
    });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Gateway ';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Gateway ';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      gatewayId: new FormControl(data.gateway, [Validators.required]),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
      gatewayModel: new FormControl(data.gatewayModel, [Validators.required]),
      location: new FormControl(data.location, [Validators.required]),
      tcp_COM_Type: new FormControl(data.tcp_COM_Type, [Validators.required]),
      ip: new FormControl(data.ip, [Validators.required]),
      tcp_COM_PortNo: new FormControl(data.tcp_COM_PortNo, [Validators.required]),
      baudRate: new FormControl(data.baudRate, [Validators.required]),
      parity: new FormControl(data.parity, [Validators.required]),
      stopBits: new FormControl(data.stopBits, [Validators.required]),
      dataSize: new FormControl(data.dataSize, [Validators.required]),
      comments: new FormControl(data.comments, [Validators.required]),
    });

  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Gateway ';
      this.formHeader = 'Add Gateway  Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/masters/gateway', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/masters/gateway']);
      });
    }
  }
 
  getDeptMeter(): void {
    debugger
    this.MasterService.getAllGateway().subscribe(
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
      this.MasterService.createGateway(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Gateway  Added Successfully !', 'success');
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
      this.MasterService.updateGateway(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Gateway  Updated Successfully !', 'success');
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
        this.MasterService.deleteGateway(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Gateway  deleted Successfully!', 'success');
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

