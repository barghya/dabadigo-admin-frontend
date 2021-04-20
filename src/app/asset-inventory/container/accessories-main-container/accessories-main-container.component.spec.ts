import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesMainContainerComponent } from './accessories-main-container.component';

describe('AccessoriesMainContainerComponent', () => {
  let component: AccessoriesMainContainerComponent;
  let fixture: ComponentFixture<AccessoriesMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
