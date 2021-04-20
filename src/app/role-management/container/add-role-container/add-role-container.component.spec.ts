import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleContainerComponent } from './add-role-container.component';

describe('AddRoleContainerComponent', () => {
  let component: AddRoleContainerComponent;
  let fixture: ComponentFixture<AddRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
