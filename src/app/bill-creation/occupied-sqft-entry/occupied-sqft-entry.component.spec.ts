import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedSqftEntryComponent } from './occupied-sqft-entry.component';

describe('OccupiedSqftEntryComponent', () => {
  let component: OccupiedSqftEntryComponent;
  let fixture: ComponentFixture<OccupiedSqftEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupiedSqftEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupiedSqftEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
