/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapServicesService } from './mapServices.service';

describe('Service: MapServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapServicesService]
    });
  });

  it('should ...', inject([MapServicesService], (service: MapServicesService) => {
    expect(service).toBeTruthy();
  }));
});