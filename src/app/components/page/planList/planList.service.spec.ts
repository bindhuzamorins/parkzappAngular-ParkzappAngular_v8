/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanListService } from './planList.service';

describe('Service: PlanList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanListService]
    });
  });

  it('should ...', inject([PlanListService], (service: PlanListService) => {
    expect(service).toBeTruthy();
  }));
});