import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptMetersComponent } from './dept-meters.component';

describe('DeptMetersComponent', () => {
  let component: DeptMetersComponent;
  let fixture: ComponentFixture<DeptMetersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptMetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
