import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParkCategoryComponent } from './delete-park-category.component';

describe('DeleteParkCategoryComponent', () => {
  let component: DeleteParkCategoryComponent;
  let fixture: ComponentFixture<DeleteParkCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteParkCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteParkCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
