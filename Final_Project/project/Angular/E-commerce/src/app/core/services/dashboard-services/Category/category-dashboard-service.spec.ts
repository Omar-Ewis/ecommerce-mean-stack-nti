import { TestBed } from '@angular/core/testing';

import { CategoryDashboardService } from './category-dashboard-service';

describe('CategoryDashboardService', () => {
  let service: CategoryDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
