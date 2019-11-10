import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddRoleComponent } from './add-role/add-role.component';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  rolesList: any;
  loading: boolean;

  constructor(private modalService: NgbModal,
    private roleService: RolesService) {
  }

  ngOnInit() {
    this.getRoles();
  }

  userModal(type, data) {
    const initialState = {
      header: type,
      data: data
    };
    const activeModal = this.modalService.open(AddRoleComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
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

}
