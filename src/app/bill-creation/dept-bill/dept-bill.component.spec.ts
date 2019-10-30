import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptBillComponent } from './dept-bill.component';

describe('DeptBillComponent', () => {
  let component: DeptBillComponent;
  let fixture: ComponentFixture<DeptBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
