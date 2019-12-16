import { Component, OnInit ,ViewChild} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions ,NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import {FloorsService} from '../floors/floors.service';
@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Floor";
  isEditing: boolean;
  Userdata:any;
  submitted = false;
  FloorsList:string;
  loading: boolean;
  mySubscription: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router, private floorService: FloorsService){
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
    this.formHeader="Add Floor Details";
    this.getFloors();
    this.userForm = this.formBuilder.group({
      building: new FormControl('', [Validators.required, Validators.minLength(3)]),
      block: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      occupantNumber: new FormControl('', [Validators.required]),
      sqFts: new FormControl('', [Validators.required])
      // isActive: new FormControl(true, [Validators.required])
    });
  }
  get f() { return this.userForm.controls; }

  userModal(type, data) {
    debugger
    this.Userdata = data;
    this.formHeader = 'Edit Floor';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit  Floor';
    this.isEditing = true;
    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      building: new FormControl(data.building, [Validators.required, Validators.minLength(3)]),
      block: new FormControl(data.block, [Validators.required]),
      floor: new FormControl(data.floor, [Validators.required]),
      occupantNumber: new FormControl(data.occupantNumber, [Validators.required]),
      sqFts: new FormControl(data.sqFts, [Validators.required]),
      // isActive: new FormControl(this.data.isActive, [Validators.required])
    });
    // const initialState = {
    //   header: type,
    //   data: data
    // };
    // // const activeModal = this.modalService.open(AddUserComponent, this.modalOptions);
    // const activeModal = this.modalService.open(AddFloorsComponent, { size: 'lg', backdrop: 'static', windowClass: 'animated slideInDown' });
    // activeModal.componentInstance.data = initialState;
  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Floor';
      this.formHeader = 'Add Floor Details';
      this.buttonType = 'Add';
      this.submitted = false;
     this.userForm.reset();
     this.router.navigateByUrl('/meter-management/floors', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/meter-management/floors']);
    });
    }
  
   
  }
  getFloors(): void {
    debugger
    this.floorService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.FloorsList = data['result'];
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
      this.floorService.createFloor(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Floor Added Successfully !', 'success');
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
      this.floorService.updateFloor(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Floor Updated Successfully !', 'success');
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
        this.floorService.deleteFloor(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Floor deleted Successfully!', 'success');
              this.getFloors();
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
