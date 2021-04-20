import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParameterContainerComponent } from './edit-parameter-container.component';

describe('EditParameterContainerComponent', () => {
  let component: EditParameterContainerComponent;
  let fixture: ComponentFixture<EditParameterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParameterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParameterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
