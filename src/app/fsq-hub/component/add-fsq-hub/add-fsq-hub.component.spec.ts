import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFsqHubComponent } from './add-fsq-hub.component';

describe('AddFsqHubComponent', () => {
  let component: AddFsqHubComponent;
  let fixture: ComponentFixture<AddFsqHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFsqHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFsqHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
