import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMeterTenantsComponent } from './map-meter-tenants.component';

describe('MapMeterTenantsComponent', () => {
  let component: MapMeterTenantsComponent;
  let fixture: ComponentFixture<MapMeterTenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMeterTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMeterTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
