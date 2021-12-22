/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AmenitiesService } from './amenities.service';

describe('Service: Amenities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmenitiesService]
    });
  });

  it('should ...', inject([AmenitiesService], (service: AmenitiesService) => {
    expect(service).toBeTruthy();
  }));
});