import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleContainerComponent } from './edit-role-container.component';

describe('EditRoleContainerComponent', () => {
  let component: EditRoleContainerComponent;
  let fixture: ComponentFixture<EditRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
