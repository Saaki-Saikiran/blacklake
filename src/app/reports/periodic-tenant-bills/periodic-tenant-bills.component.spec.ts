import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicTenantBillsComponent } from './periodic-tenant-bills.component';

describe('PeriodicTenantBillsComponent', () => {
  let component: PeriodicTenantBillsComponent;
  let fixture: ComponentFixture<PeriodicTenantBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicTenantBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicTenantBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
