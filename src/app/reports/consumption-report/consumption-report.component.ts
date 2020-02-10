import { Component,  Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import { MeterTypesService } from '../../admin/meter-types/meter-types.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;
const now = new Date();
export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  selector: 'app-consumption-report',
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.scss']
})
export class ConsumptionReportComponent implements OnInit {

  public model: any;
  modelCustomDay: any;
  metersTypeList: any;
  loading: boolean;
  displayMonths = 3;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  userForm: FormGroup;
  formHeader: string;
  submitted = false;
  @Input() testRangeDate: Date;
  public date: {year: number, month: number};

  dtExportButtonOptions: any = {};
  dtColumnsReorderOptions: any = {};
  dtResponsiveOptions: any = {};
  dtRowSelectOptions: any = {};
  dtRouterLinkOptions: any = {};
  constructor(private http: HttpClient,public parserFormatter: NgbDateParserFormatter,  private formBuilder: FormBuilder, private meterTypeService: MeterTypesService, public calendar: NgbCalendar, public cpService: ColorPickerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 30);
   }

  ngOnInit() {
    this.dtExportButtonOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [{
        title: 'Name',
        data: 'name'
      }, {
        title: 'Position',
        data: 'position'
      }, {
        title: 'Office',
        data: 'office'
      }, {
        title: 'Age',
        data: 'age'
      }, {
        title: 'Start Date',
        data: 'date'
      }, {
        title: 'Salary',
        data: 'salary'
      }],
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'csv'
      ]
    };
    this.getMeterTypeList();
    this.userForm = this.formBuilder.group({
      modelPopup: new FormControl('', [Validators.required]),
      modelPopupTo: new FormControl('', [Validators.required]),
    });
   
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  get f() { return this.userForm.controls; }
  getMeterTypeList(): void {
    this.meterTypeService.getAll().subscribe(
      data => {
        if (data['success'] === true) {

          this.metersTypeList = data['result'];
         // this.dtTrigger.next();
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
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    else
    {
      user.modelPopup;
      user.modelPopupTo;
      let FromDate=user.modelPopup.year+'-'+user.modelPopup.month+'-'+user.modelPopup.day;
      let ToDate=user.modelPopup.year+'-'+user.modelPopup.month+'-'+user.modelPopup.day;
      let formData: FormData = new FormData();
      formData.append('fromDate','2020-01-27');
      formData.append('toDate','2020-01-27');
      let url=`${environment.baseUrl}/reports/consumptionReport`;
      this.http.post(url, formData).pipe(map(res => res)).subscribe((data: any) => {
      // this.http.post(url,formData).pipe(
      //   tap(data =>
      //     console.log(data)),
      //   catchError(this.errorHandler)
      //   );
      debugger
      console.log(data);
       } );
     
    }
  }
  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    debugger
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, Error Message: ${err.statusText}`;
    }
    return throwError(errorMessage);
  }
}
