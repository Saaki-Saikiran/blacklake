import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMeterComponent } from './source-meter.component';

describe('SourceMeterComponent', () => {
  let component: SourceMeterComponent;
  let fixture: ComponentFixture<SourceMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
