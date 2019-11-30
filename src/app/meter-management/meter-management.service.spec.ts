import { TestBed } from '@angular/core/testing';

import { MeterManagementService } from './meter-management.service';

describe('MeterManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeterManagementService = TestBed.get(MeterManagementService);
    expect(service).toBeTruthy();
  });
});
