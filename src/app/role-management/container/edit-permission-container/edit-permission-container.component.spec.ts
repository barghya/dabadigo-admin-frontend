import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissionContainerComponent } from './edit-permission-container.component';

describe('EditPermissionContainerComponent', () => {
  let component: EditPermissionContainerComponent;
  let fixture: ComponentFixture<EditPermissionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermissionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermissionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
