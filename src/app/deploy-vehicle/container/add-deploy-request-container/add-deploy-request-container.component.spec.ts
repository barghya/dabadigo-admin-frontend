import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeployRequestContainerComponent } from './add-deploy-request-container.component';

describe('AddDeployRequestContainerComponent', () => {
  let component: AddDeployRequestContainerComponent;
  let fixture: ComponentFixture<AddDeployRequestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeployRequestContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeployRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
