import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterOccupancyComponent } from './meter-occupancy.component';

describe('MeterOccupancyComponent', () => {
  let component: MeterOccupancyComponent;
  let fixture: ComponentFixture<MeterOccupancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterOccupancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
