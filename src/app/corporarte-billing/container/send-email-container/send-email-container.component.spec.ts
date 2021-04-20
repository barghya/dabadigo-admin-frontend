import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailContainerComponent } from './send-email-container.component';

describe('SendEmailContainerComponent', () => {
  let component: SendEmailContainerComponent;
  let fixture: ComponentFixture<SendEmailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendEmailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
