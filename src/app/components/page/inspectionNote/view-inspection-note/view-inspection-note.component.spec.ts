import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionNoteComponent } from './view-inspection-note.component';

describe('ViewInspectionNoteComponent', () => {
  let component: ViewInspectionNoteComponent;
  let fixture: ComponentFixture<ViewInspectionNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInspectionNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInspectionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
