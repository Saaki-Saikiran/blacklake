import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalComponentsComponent } from './additional-components.component';

describe('AdditionalComponentsComponent', () => {
  let component: AdditionalComponentsComponent;
  let fixture: ComponentFixture<AdditionalComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
