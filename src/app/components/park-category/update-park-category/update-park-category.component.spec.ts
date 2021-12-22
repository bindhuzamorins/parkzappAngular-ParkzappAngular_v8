import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParkCategoryComponent } from './update-park-category.component';

describe('UpdateParkCategoryComponent', () => {
  let component: UpdateParkCategoryComponent;
  let fixture: ComponentFixture<UpdateParkCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateParkCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
