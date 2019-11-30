import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions,NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleComponent } from './add-role/add-role.component';
import { RolesService } from './roles.service';
import { FormBuilder, FormGroup, Validators, FormControl ,FormArray} from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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
  
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, 
    private roleService: RolesService) {
  }

  ngOnInit() {
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
      "Roles"
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
  console.log(this.userForm.value);
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
   
  }
}

  userModal(type, data) {
    debugger
    this.Userdata = data;
    this.tabHeader='Edit Role';
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
    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // const activeModal = this.modalService.open(AddRoleComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
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

  getRoles(): void {
    this.roleService.getRoles().subscribe(
      data => {
        if (data['success'] === true) {
          this.rolesList = data['result'];
          console.log(this.rolesList, '========');
        } else {

        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
  editPatch() {
    let data =  this.Userdata.menus.options;
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
  debugger
  const user = {  ...this.userForm.value };

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
                this.myTabSet.select('UserlistId');
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
  } else {

      this.roleService.updateRole(user).subscribe(
          data => {
              if (data['success'] === true) {
                this.myTabSet.select('UserlistId');
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
}
