import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParkAreaComponent } from './delete-park-area.component';

describe('DeleteParkAreaComponent', () => {
  let component: DeleteParkAreaComponent;
  let fixture: ComponentFixture<DeleteParkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteParkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteParkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
