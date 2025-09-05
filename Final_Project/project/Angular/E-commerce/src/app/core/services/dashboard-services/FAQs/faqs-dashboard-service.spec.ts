import { TestBed } from '@angular/core/testing';

import { FaqsDashboardService } from './faqs-dashboard-service';

describe('FaqsDashboardService', () => {
  let service: FaqsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
