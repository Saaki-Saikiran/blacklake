import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddTenantsComponent } from './add-tenants/add-tenants.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add Tenant";
  isEditing: boolean;
  Userdata:any;
  submitted = false;
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router,) {
    this.modalOptions = {
      backdrop: 'static',
      // backdropClass: 'customBackdrop',
      size: "lg"
    };
  }

  ngOnInit() {
    debugger
    this.buttonType='Add';
    this.formHeader="Add Tenant Details";
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Tenant';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Tenant';
    this.isEditing = true;
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
     // this.userForm.reset();
    }
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
}
