/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssessmentReportService } from './assessmentReport.service';

describe('Service: AssessmentReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentReportService]
    });
  });

  it('should ...', inject([AssessmentReportService], (service: AssessmentReportService) => {
    expect(service).toBeTruthy();
  }));
});