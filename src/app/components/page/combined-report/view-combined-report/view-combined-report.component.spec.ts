import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCombinedReportComponent } from './view-combined-report.component';

describe('ViewCombinedReportComponent', () => {
  let component: ViewCombinedReportComponent;
  let fixture: ComponentFixture<ViewCombinedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCombinedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCombinedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
