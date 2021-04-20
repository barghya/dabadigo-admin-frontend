import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCorporateContainerComponent } from './edit-corporate-container.component';

describe('EditCorporateContainerComponent', () => {
  let component: EditCorporateContainerComponent;
  let fixture: ComponentFixture<EditCorporateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorporateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorporateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
