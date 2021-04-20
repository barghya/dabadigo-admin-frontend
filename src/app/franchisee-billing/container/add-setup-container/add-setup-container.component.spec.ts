import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupContainerComponent } from './add-setup-container.component';

describe('AddSetupContainerComponent', () => {
  let component: AddSetupContainerComponent;
  let fixture: ComponentFixture<AddSetupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
