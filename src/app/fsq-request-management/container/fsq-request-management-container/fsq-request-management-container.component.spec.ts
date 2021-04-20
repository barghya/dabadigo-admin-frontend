import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqRequestManagementContainerComponent } from './fsq-request-management-container.component';

describe('FsqRequestManagementContainerComponent', () => {
  let component: FsqRequestManagementContainerComponent;
  let fixture: ComponentFixture<FsqRequestManagementContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqRequestManagementContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqRequestManagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
