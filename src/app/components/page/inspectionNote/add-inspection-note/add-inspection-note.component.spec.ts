import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionNoteComponent } from './add-inspection-note.component';

describe('AddInspectionNoteComponent', () => {
  let component: AddInspectionNoteComponent;
  let fixture: ComponentFixture<AddInspectionNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInspectionNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInspectionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
