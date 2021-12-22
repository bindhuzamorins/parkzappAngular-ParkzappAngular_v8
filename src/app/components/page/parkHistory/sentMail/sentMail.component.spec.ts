/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SentMailComponent } from './sentMail.component';

describe('SentMailComponent', () => {
  let component: SentMailComponent;
  let fixture: ComponentFixture<SentMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
