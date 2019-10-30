import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterTypesComponent } from './meter-types.component';

describe('MeterTypesComponent', () => {
  let component: MeterTypesComponent;
  let fixture: ComponentFixture<MeterTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
