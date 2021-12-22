/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParksService } from './parks.service';

describe('Service: Parks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParksService]
    });
  });

  it('should ...', inject([ParksService], (service: ParksService) => {
    expect(service).toBeTruthy();
  }));
});