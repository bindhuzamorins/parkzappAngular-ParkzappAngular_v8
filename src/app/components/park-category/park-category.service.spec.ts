import { TestBed, inject } from '@angular/core/testing';

import { ParkCategoryService } from './park-category.service';

describe('ParkCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkCategoryService]
    });
  });

  it('should be created', inject([ParkCategoryService], (service: ParkCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
