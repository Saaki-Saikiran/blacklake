import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { MeterTypesService } from './meter-types.service';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-meter-types',
  templateUrl: './meter-types.component.html',
  styleUrls: ['./meter-types.component.scss']
})
export class MeterTypesComponent implements OnInit, OnDestroy {
  @ViewChild('myTabSet', { static: false }) public myTabSet: NgbTabset;

  modalOptions: NgbModalOptions;
  userForm: FormGroup;
  formHeader: string;
  buttonType: string;
  tabHeader: any = "Add Meter Type";
  isEditing: boolean;
  submitted = false;
  loading: boolean;
  Userdata: any;
  meterTypesList: any;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mySubscription: any;
  dropdownList: { item_id: number; item_text: string; }[];
  selectedItems: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private metertypeService: MeterTypesService) {

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
    this.dropdownList = [
      { item_id: 1, item_text: 'isBillable' },
      { item_id: 2, item_text: 'isCommon' },
    ];

    this.selectedItems = [
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
      this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getMeterTypes();
    this.tabHeader = 'Add Meter Type';
    this.formHeader = 'Add Meter Type Details';
    this.buttonType = 'Add';
    this.userForm = this.formBuilder.group({
      type: new FormControl('', [Validators.required]),
      attribute: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  get f() { return this.userForm.controls; }

  getMeterTypes(): void {
    console.log(this.dtTrigger);
    this.metertypeService.getAll().subscribe(
      data => {
        if (data['success'] === true) {
          this.meterTypesList = data['result'];
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

  beforeChange($event: NgbTabChangeEvent) {
    // dont do anything if id matches
    if ($event.activeId === 'AdduserId') {
      this.tabHeader = 'Add Meter Type';
      this.formHeader = 'Meter Type Details';
      this.buttonType = 'Add';
      this.submitted = false;
      this.userForm.reset(); this.router.navigateByUrl('/admin/meter-types', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/meter-types']);
      });

    }
  }

  userModal(type, data) {
    this.formHeader = 'Edit Meter Type Details';
    this.buttonType = 'Update';
    this.tabHeader = 'Edit Meter Type';
    this.isEditing = true;
    this.userForm = this.formBuilder.group({
      _id: new FormControl(data._id),
      type: new FormControl(data.type, [Validators.required]),
      attribute: new FormControl(data.attribute, [Validators.required]),
      // attribute: this.formBuilder.group({
      //   isBillable: new FormControl('', [Validators.required]),
      //   isCommon: new FormControl('', [Validators.required])
      // }),
      description: new FormControl(data.description, [Validators.required])
    });
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
        this.metertypeService.deleteMeterType(id).subscribe(
          data => {
            if (data['success'] === true) {
              Swal.fire('', 'Meter Type deleted Successfully!', 'success');
              this.getMeterTypes();
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



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    if (this.dtTrigger)
      this.dtTrigger.unsubscribe();
  }

  onSubmit() {
    const user = { ...this.userForm.value };
    console.log(user, '----user=----------');
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (user._id === undefined) {
      user.role = 'Admin';
      console.log(user, '----user=----------');

      // user.attribute = {
      //   isBillable: true,
      //   isCommon: true
      // };
      this.metertypeService.createMeterType(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Type Added Successfully !', 'success');
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
      this.metertypeService.updateMeterType(user).subscribe(
        data => {
          if (data['success'] === true) {
            Swal.fire('', 'Meter Type Updated Successfully !', 'success');
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

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

}
