import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReadingsOfABillComponent } from './meter-readings-of-a-bill.component';

describe('MeterReadingsOfABillComponent', () => {
  let component: MeterReadingsOfABillComponent;
  let fixture: ComponentFixture<MeterReadingsOfABillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterReadingsOfABillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReadingsOfABillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
