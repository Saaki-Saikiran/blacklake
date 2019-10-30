import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupantSummaryComponent } from './occupant-summary.component';

describe('OccupantSummaryComponent', () => {
  let component: OccupantSummaryComponent;
  let fixture: ComponentFixture<OccupantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
