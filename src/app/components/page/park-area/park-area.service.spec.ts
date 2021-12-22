import { TestBed, inject } from '@angular/core/testing';

import { ParkAreaService } from './park-area.service';

describe('ParkAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkAreaService]
    });
  });

  it('should be created', inject([ParkAreaService], (service: ParkAreaService) => {
    expect(service).toBeTruthy();
  }));
});
