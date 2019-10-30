import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantBillsComponent } from './tenant-bills.component';

describe('TenantBillsComponent', () => {
  let component: TenantBillsComponent;
  let fixture: ComponentFixture<TenantBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
