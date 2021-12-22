/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionRequestService } from './inspectionRequest.service';

describe('Service: InspectionRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionRequestService]
    });
  });

  it('should ...', inject([InspectionRequestService], (service: InspectionRequestService) => {
    expect(service).toBeTruthy();
  }));
});