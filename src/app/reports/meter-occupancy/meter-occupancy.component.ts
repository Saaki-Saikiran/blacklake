import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meter-occupancy',
  templateUrl: './meter-occupancy.component.html',
  styleUrls: ['./meter-occupancy.component.scss']
})
export class MeterOccupancyComponent implements OnInit {
  dtExportButtonOptions: any = {};
  dtColumnsReorderOptions: any = {};
  dtResponsiveOptions: any = {};
  dtRowSelectOptions: any = {};
  dtRouterLinkOptions: any = {};
  constructor() { }

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
  }

}

