import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupComponent } from './add-setup.component';

describe('AddSetupComponent', () => {
  let component: AddSetupComponent;
  let fixture: ComponentFixture<AddSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
