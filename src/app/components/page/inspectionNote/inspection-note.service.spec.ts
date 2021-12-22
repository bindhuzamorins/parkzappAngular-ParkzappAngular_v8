import { TestBed, inject } from '@angular/core/testing';

import { InspectionNoteService } from './inspection-note.service';

describe('InspectionNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionNoteService]
    });
  });

  it('should be created', inject([InspectionNoteService], (service: InspectionNoteService) => {
    expect(service).toBeTruthy();
  }));
});
