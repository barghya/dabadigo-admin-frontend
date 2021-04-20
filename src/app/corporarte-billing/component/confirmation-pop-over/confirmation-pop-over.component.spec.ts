import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPopOverComponent } from './confirmation-pop-over.component';

describe('ConfirmationPopOverComponent', () => {
  let component: ConfirmationPopOverComponent;
  let fixture: ComponentFixture<ConfirmationPopOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPopOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
