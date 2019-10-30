import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillClosingReadingsComponent } from './edit-bill-closing-readings.component';

describe('EditBillClosingReadingsComponent', () => {
  let component: EditBillClosingReadingsComponent;
  let fixture: ComponentFixture<EditBillClosingReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillClosingReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillClosingReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
