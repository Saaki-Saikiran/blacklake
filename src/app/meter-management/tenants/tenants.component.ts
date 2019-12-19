import { Component, OnInit ,ViewChild} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions ,NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import {TenantsService} from '../tenants/tenants.service';
@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Tenant";
  isEditing: boolean;
  Userdata:any;
  submitted = false;
  TenantsList:string;
  loading: boolean;
  mySubscription: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router, private TenantService: TenantsService) {
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
      this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.buttonType='Add';
    this.formHeader="Add Tenant Details";
    this.getTenants();
    this.userForm = this.formBuilder.group({
      tenantName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contactPersonName: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', []),
      email: new FormControl('', [, Validators.email]),
      comments: new FormControl('', [])
      // isActive: new FormControl(true, [Validators.required])
    });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Tenant';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Tenant';
    this.isEditing = true;
    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      tenantName: new FormControl(data.tenantName, [Validators.required, Validators.minLength(3)]),
      contactPersonName: new FormControl(data.contactPersonName, [Validators.required]),
      contactNumber: new FormControl(data.contactNumber, []),
      email: new FormControl(data.email, []),
      comments: new FormControl(data.comments, []),
      // isActive: new FormControl(this.data.isActive, [Validators.required])
    });
    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    // const activeModal = this.modalService.open(AddTenantsComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
    // activeModal.componentInstance.data = initialState;
  }
  get f() { return this.userForm.controls; }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Tenant';
      this.formHeader = 'Add Tenant Details';
      this.buttonType = 'Add';
      this.submitted = false;
     this.userForm.reset();
     this.router.navigateByUrl('/meter-management/tenants', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/meter-management/tenants']);
    });
    }
  }
  getTenants(): void {
    debugger
    this.TenantService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.TenantsList = data['result'];
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
      this.TenantService.createTenant(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Tenant Added Successfully !', 'success');
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
      this.TenantService.updateTenant(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Tenant Updated Successfully !', 'success');
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
        this.TenantService.deleteTenant(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Tenants deleted Successfully!', 'success');
              this.getTenants();
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
