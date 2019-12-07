import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterParametersComponent } from './meter-parameters.component';

describe('MeterParametersComponent', () => {
  let component: MeterParametersComponent;
  let fixture: ComponentFixture<MeterParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
