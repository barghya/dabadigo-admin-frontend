import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeployRequestComponent } from './add-deploy-request.component';

describe('AddDeployRequestComponent', () => {
  let component: AddDeployRequestComponent;
  let fixture: ComponentFixture<AddDeployRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeployRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeployRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
