import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFsqHubComponent } from './edit-fsq-hub.component';

describe('EditFsqHubComponent', () => {
  let component: EditFsqHubComponent;
  let fixture: ComponentFixture<EditFsqHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFsqHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFsqHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
