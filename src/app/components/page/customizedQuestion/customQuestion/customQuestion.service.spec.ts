/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomQuestionService } from './customQuestion.service';

describe('Service: CustomQuestion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomQuestionService]
    });
  });

  it('should ...', inject([CustomQuestionService], (service: CustomQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
