import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddMeterTypeComponent } from './add-meter-type/add-meter-type.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-meter-types',
  templateUrl: './meter-types.component.html',
  styleUrls: ['./meter-types.component.scss']
})
export class MeterTypesComponent implements OnInit {
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add Meter Type";
  isEditing: boolean;
  submitted = false;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      // backdropClass: 'customBackdrop',
      size: "lg"
    };
  }

  ngOnInit() {
    this.tabHeader = 'Add Meter Type';
    this.formHeader = 'Meter Type Details';
    this.buttonType = 'Add';
    this.userForm = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      attribute: new FormControl('', [Validators.required]),
      // isBillable: new FormControl(true, [Validators.required]),
      // isCommon: new FormControl(true, [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }



  userModal(type, data) {
    debugger
    this.formHeader = 'Edit Meter Type Details';
    this.buttonType = 'Update';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      type: new FormControl(data.type, [Validators.required]),
      attribute: new FormControl(data.attribute, [Validators.required]),
      // isBillable: new FormControl(data.isBillable, [Validators.required]),
      // isCommon: new FormControl(data.isCommon, [Validators.required]),
      description: new FormControl(data.description, [Validators.required])
    });

    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    // const activeModal = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
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

  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Meter Type';
      this.formHeader = 'Meter Type Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
    }


  }

}
