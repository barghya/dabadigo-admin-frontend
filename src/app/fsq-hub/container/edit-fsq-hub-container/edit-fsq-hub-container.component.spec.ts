import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFsqHubContainerComponent } from './edit-fsq-hub-container.component';

describe('EditFsqHubContainerComponent', () => {
  let component: EditFsqHubContainerComponent;
  let fixture: ComponentFixture<EditFsqHubContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFsqHubContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFsqHubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
