/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecurrenceService } from './recurrence.service';

describe('Service: Recurrence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecurrenceService]
    });
  });

  it('should ...', inject([RecurrenceService], (service: RecurrenceService) => {
    expect(service).toBeTruthy();
  }));
});