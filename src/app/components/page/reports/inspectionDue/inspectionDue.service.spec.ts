/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionDueService } from './inspectionDue.service';

describe('Service: InspectionDue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionDueService]
    });
  });

  it('should ...', inject([InspectionDueService], (service: InspectionDueService) => {
    expect(service).toBeTruthy();
  }));
});