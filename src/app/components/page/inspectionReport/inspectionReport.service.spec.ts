/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionReportService } from './inspectionReport.service';

describe('Service: InspectionReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionReportService]
    });
  });

  it('should ...', inject([InspectionReportService], (service: InspectionReportService) => {
    expect(service).toBeTruthy();
  }));
});