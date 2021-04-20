import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorporateContainerComponent } from './add-corporate-container.component';

describe('AddCorporateContainerComponent', () => {
  let component: AddCorporateContainerComponent;
  let fixture: ComponentFixture<AddCorporateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorporateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorporateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
