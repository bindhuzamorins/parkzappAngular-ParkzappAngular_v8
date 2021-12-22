/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddNewMailService } from './AddNewMail.service';

describe('Service: AddNewMail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewMailService]
    });
  });

  it('should ...', inject([AddNewMailService], (service: AddNewMailService) => {
    expect(service).toBeTruthy();
  }));
});