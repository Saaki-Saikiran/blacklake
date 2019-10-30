import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUnitsEntryComponent } from './dg-units-entry.component';

describe('DgUnitsEntryComponent', () => {
  let component: DgUnitsEntryComponent;
  let fixture: ComponentFixture<DgUnitsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgUnitsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUnitsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
