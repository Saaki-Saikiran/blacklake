import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleComponent } from './add-role/add-role.component';
import { RolesService } from './roles.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  rolesList: any;
  loading: boolean;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add  Role";
  isEditing: boolean;
  Userdata: any;
  submitted = false;
  userForm: FormGroup;
  menus: any;
  menuNameItems: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mySubscription: any;
  modalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private roleService: RolesService) {
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
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.buttonType = 'Add';
    this.formHeader = "Add Role Details";
    this.getRoles();
    this.menus = [
      "User Entry",
      "Meter Types",
      "Dept Meters",
      "Meters",
      "Tenants",
      "Floors",
      "DGs",
      "Map Meters Tenants",
      "Dept Bill",
      "DG Units Entry",
      "Edit Bill Closing Readings",
      "Occupied Sqft Entry",
      "Additional-Components",
      "Bill Generation",
      "Consumption Report",
      "Meter Log Report",
      "Occupant Summary",
      "Tenant Bills",
      "Meter Readings of a Bill",
      "Periodic Tenant Bills",
      "Meter Occupancy",
      "Roles",
      "Meter Model",
      "Meter Parameters",
      "Source Type",
      "Gateway",
      "Panel"

    ];
    this.menuNameItems = [];

    if (this.menus) {
      var arrkeys = Object.values(this.menus);
      arrkeys.map((key, value) => {
        this.menuNameItems.push({
          "slug": key,
          "link": true,
          "add": true,
          "edit": true,
          "delete": true
        });
      });
    }
    this.formHeader = 'Add Role Details';
    this.buttonType = 'Add';
    this.isEditing = false;

    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isActive: new FormControl(true, [Validators.required]),
      menus: this.formBuilder.group({
        options: this.formBuilder.array([]) // create empty form array   
      }),
    });
    this.patch();
  }

  patch() {
    const control = <FormArray>this.userForm.get('menus.options');
    this.menuNameItems.forEach(x => {
      control.push(
        this.formBuilder.group({
          add: x.add,
          delete: x.delete,
          link: x.link,
          update: x.edit,
          slug: x.slug
        })
      )
    });
  }

  get f() { return this.userForm.controls; }

  beforeChange($event: NgbTabChangeEvent) {
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add User';
      this.formHeader = 'Add User Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/usermanagement/roles', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/usermanagement/roles']);
      });
    }
  }

  userModal(type, data) {
    this.Userdata = data;
    this.tabHeader = 'Edit Role';
    this.formHeader = 'Edit Role Details';
    this.buttonType = 'Update';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
      isActive: new FormControl(data.isActive, [Validators.required]),
      menus: this.formBuilder.group({
        options: this.formBuilder.array([]) // create empty form array   
      }),

    });
    this.editPatch();
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
        this.roleService.deleteRole(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Role deleted Successfully!', 'success');
              this.getRoles();
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

  getRoles(): void {
    this.roleService.getRoles().subscribe(
      data => {
        if (data['success'] === true) {
          this.rolesList = data['result'];
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
  editPatch() {
    let data = this.Userdata.menus.options;
    const control = <FormArray>this.userForm.get('menus.options');
    data.forEach((x, value) => {
      console.log(x.add, value);
      control.push(
        this.formBuilder.group({
          add: x.add,
          delete: x.delete,
          link: x.link,
          update: x.update,
          slug: x.slug
        })
      )
    });

  }
  onSubmit() {
    const user = { ...this.userForm.value };

    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (user._id === undefined) {
      user.role = 'Admin';
      this.roleService.createRole(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Role Added Successfully !', 'success');
            this.myTabSet.select('UserlistId');
            // this.router.navigate(['/dashboard/analytics']);
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

      this.roleService.updateRole(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Role Updated Successfully !', 'success');
            this.myTabSet.select('UserlistId');
            // this.router.navigate(['/dashboard/analytics']);
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    if (this.dtTrigger)
      this.dtTrigger.unsubscribe();
  }
}
