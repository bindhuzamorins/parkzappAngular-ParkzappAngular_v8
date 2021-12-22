/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionSetService } from './QuestionSet.service';

describe('Service: QuestionSet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionSetService]
    });
  });

  it('should ...', inject([QuestionSetService], (service: QuestionSetService) => {
    expect(service).toBeTruthy();
  }));
});
