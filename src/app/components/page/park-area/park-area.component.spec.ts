import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkAreaComponent } from './park-area.component';

describe('ParkAreaComponent', () => {
  let component: ParkAreaComponent;
  let fixture: ComponentFixture<ParkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
