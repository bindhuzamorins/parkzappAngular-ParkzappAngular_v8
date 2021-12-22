/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResetpasswordService } from './resetpassword.service';

describe('Service: Resetpassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetpasswordService]
    });
  });

  it('should ...', inject([ResetpasswordService], (service: ResetpasswordService) => {
    expect(service).toBeTruthy();
  }));
});