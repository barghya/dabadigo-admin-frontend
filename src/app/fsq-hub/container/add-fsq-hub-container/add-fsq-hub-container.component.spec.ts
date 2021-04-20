import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFsqHubContainerComponent } from './add-fsq-hub-container.component';

describe('AddFsqHubContainerComponent', () => {
  let component: AddFsqHubContainerComponent;
  let fixture: ComponentFixture<AddFsqHubContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFsqHubContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFsqHubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
