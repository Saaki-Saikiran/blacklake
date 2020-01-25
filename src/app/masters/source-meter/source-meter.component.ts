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
  selector: 'app-source-meter',
  templateUrl: './source-meter.component.html',
  styleUrls: ['./source-meter.component.scss']
})
export class SourceMeterComponent implements OnInit {

  
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string='Add';
  tabHeader: any = "Add Source";
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
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.formHeader="Add Source Details";
    this.getDeptMeter();
    this.userForm = this.formBuilder.group({
      //sourceTypeId: new FormControl('', [Validators.required]),
      isAutomated: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isUtilitySupported: new FormControl('', [Validators.required]),
      isGeneratorSupported: new FormControl('', [Validators.required]),
      sourceType: new FormControl('', [Validators.required]),
         });
  }

  userModal(type, data) {
    this.Userdata = data;
    this.formHeader = 'Edit Source';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Source';
    this.isEditing = true;

    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
     // sourceTypeId: new FormControl(data.sourceTypeId, [Validators.required]),
      isAutomated: new FormControl(data.isAutomated, [Validators.required, Validators.minLength(3)]),
      isUtilitySupported: new FormControl(data.isUtilitySupported, [Validators.required]),
      isGeneratorSupported: new FormControl(data.isGeneratorSupported, [Validators.required]),
      sourceType: new FormControl(data.sourceType, [Validators.required])
    });
  
  }
  beforeChange($event: NgbTabChangeEvent) {
    debugger;
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Source ';
      this.formHeader = 'Add Source Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset();
      this.router.navigateByUrl('/masters/source-meter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/masters/source-meter']);
      });
    }
  }
    getDeptMeter(): void {
      debugger
      this.MasterService.getAllSource().subscribe(
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
      var stringValue = user.isAutomated;;
      var boolValue = (stringValue =="true"); 
      user.isAutomated=boolValue;
      var stringValue = user.isUtilitySupported;;
      var boolValue = (stringValue =="true"); 
      user.isUtilitySupported=boolValue;
      var stringValue = user.isGeneratorSupported;;
      var boolValue = (stringValue =="true"); 
      user.isGeneratorSupported=boolValue;

      this.submitted = true;
      if (this.userForm.invalid) {
        return;
      }
      if (user._id === undefined) {
        user.role = 'Admin';
        this.MasterService.createSource(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Source  Added Successfully !', 'success');
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
        this.MasterService.updateSource(user).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Source  Updated Successfully !', 'success');
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
        this.MasterService.deleteSource(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Source deleted Successfully!', 'success');
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
