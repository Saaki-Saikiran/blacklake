import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddMapMeterTenantsComponent } from './add-map-meter-tenants/add-map-meter-tenants.component';

@Component({
  selector: 'app-map-meter-tenants',
  templateUrl: './map-meter-tenants.component.html',
  styleUrls: ['./map-meter-tenants.component.scss']
})
export class MapMeterTenantsComponent implements OnInit {
  modalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      // backdropClass: 'customBackdrop',
      size: "lg"
    };
  }

  ngOnInit() {
  }

  userModal(type, data) {
    const initialState = {
      header: type,
      data: data
    };
    // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    const activeModal = this.modalService.open(AddMapMeterTenantsComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
    activeModal.componentInstance.data = initialState;
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
