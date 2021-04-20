import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMainContainerComponent } from './action-main-container.component';

describe('ActionMainContainerComponent', () => {
  let component: ActionMainContainerComponent;
  let fixture: ComponentFixture<ActionMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
