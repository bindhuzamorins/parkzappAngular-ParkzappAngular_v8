/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewServicesService } from './newServices.service';

describe('Service: NewServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewServicesService]
    });
  });

  it('should ...', inject([NewServicesService], (service: NewServicesService) => {
    expect(service).toBeTruthy();
  }));
});