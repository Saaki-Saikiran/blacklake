import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterModelComponent } from './meter-model.component';

describe('MeterModelComponent', () => {
  let component: MeterModelComponent;
  let fixture: ComponentFixture<MeterModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
