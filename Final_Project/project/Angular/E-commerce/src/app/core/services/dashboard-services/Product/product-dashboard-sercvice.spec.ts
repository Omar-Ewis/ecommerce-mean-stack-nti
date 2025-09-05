import { TestBed } from '@angular/core/testing';

import { ProductDashboardSercvice } from './product-dashboard-sercvice';

describe('ProductDashboardSercvice', () => {
  let service: ProductDashboardSercvice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDashboardSercvice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
