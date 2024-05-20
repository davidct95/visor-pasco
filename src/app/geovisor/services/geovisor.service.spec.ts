import { TestBed } from '@angular/core/testing';

import { GeovisorService } from './geovisor.service';

describe('GeovisorService', () => {
  let service: GeovisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeovisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
