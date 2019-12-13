import { Component, OnInit ,ViewChild} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions ,NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import{MastersService} from '../masters.service'

@Component({
  selector: 'app-meter-model',
  templateUrl: './meter-model.component.html',
  styleUrls: ['./meter-model.component.scss']
})
export class MeterModelComponent implements OnInit {

  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Meter Model ";
  isEditing: boolean;
  Userdata:any;
  submitted = false;
  DeptMetersList:string;
  loading: boolean;
  mySubscription: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private route: ActivatedRoute,
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
    this.formHeader="Add Meter Model Details";
    this.getDeptMeter();
    this.userForm = this.formBuilder.group({
      meterModelName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      manufacturer: new FormControl('', [Validators.required]),
      startingRegister: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      dataType: new FormControl('', [Validators.required]),
      isSupported: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required])
    });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Meter Model';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Meter Model';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      meterModelName: new FormControl(data.meterModelName, [Validators.required, Validators.minLength(3)]),
      manufacturer: new FormControl(data.manufacturer, [Validators.required]),
      startingRegister: new FormControl(data.startingRegister, [Validators.required]),
      length: new FormControl(data.length, [Validators.required]),
      dataType: new FormControl(data.dataType, [Validators.required]),
      isSupported: new FormControl(data.isSupported, [Validators.required]),
      comments: new FormControl(data.comments, [Validators.required])
    });
  
  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Meter Model ';
      this.formHeader = 'Add Meter Model Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/masters/meter-model', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/masters/meter-model']);
      });
    }
  }
    getDeptMeter(): void {
      debugger
      this.MasterService.getAllMeterModelMaster().subscribe(
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
      var stringValue = user.isSupported;;
      var boolValue = (stringValue =="true"); 
      user.isSupported=boolValue;
      this.submitted = true;
      if (this.userForm.invalid) {
        return;
      }
      if (user._id === undefined) {
        user.role = 'Admin';
        this.MasterService.createMeterModelMaster(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter Model  Added Successfully !', 'success');
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
        this.MasterService.updateMeterModelMaster(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter Model  Updated Successfully !', 'success');
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
        this.MasterService.deleteMeterModelMaster(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter Model deleted Successfully!', 'success');
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
