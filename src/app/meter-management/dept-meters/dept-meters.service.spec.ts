import { TestBed } from '@angular/core/testing';

import { DeptMetersService } from './dept-meters.service';

describe('DeptMetersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeptMetersService = TestBed.get(DeptMetersService);
    expect(service).toBeTruthy();
  });
});
