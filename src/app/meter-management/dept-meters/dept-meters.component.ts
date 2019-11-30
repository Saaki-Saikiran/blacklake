import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddDeptMetersComponent } from './add-dept-meters/add-dept-meters.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dept-meters',
  templateUrl: './dept-meters.component.html',
  styleUrls: ['./dept-meters.component.scss']
})
export class DeptMetersComponent implements OnInit {
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Dept Meter";
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
    this.formHeader="Add Dept Meter Details";
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Dept Meter';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Dept Meter';
    this.isEditing = true;
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
      this.tabHeader = 'Add Dept Meter';
      this.formHeader = 'Add Dept Meter Details';
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
