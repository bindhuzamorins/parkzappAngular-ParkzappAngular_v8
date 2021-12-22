import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkAreaComponent } from './edit-park-area.component';

describe('EditParkAreaComponent', () => {
  let component: EditParkAreaComponent;
  let fixture: ComponentFixture<EditParkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
