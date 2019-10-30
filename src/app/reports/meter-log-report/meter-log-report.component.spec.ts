import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterLogReportComponent } from './meter-log-report.component';

describe('MeterLogReportComponent', () => {
  let component: MeterLogReportComponent;
  let fixture: ComponentFixture<MeterLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
