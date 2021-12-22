import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkCategoryComponent } from './park-category.component';

describe('ParkCategoryComponent', () => {
  let component: ParkCategoryComponent;
  let fixture: ComponentFixture<ParkCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
