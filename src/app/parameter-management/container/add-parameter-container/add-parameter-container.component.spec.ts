import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParameterContainerComponent } from './add-parameter-container.component';

describe('AddParameterContainerComponent', () => {
  let component: AddParameterContainerComponent;
  let fixture: ComponentFixture<AddParameterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParameterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParameterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
