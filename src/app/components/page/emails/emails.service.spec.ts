/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmailsService } from './emails.service';

describe('Service: Emails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailsService]
    });
  });

  it('should ...', inject([EmailsService], (service: EmailsService) => {
    expect(service).toBeTruthy();
  }));
});