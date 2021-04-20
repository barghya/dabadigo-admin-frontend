import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPenaltyContainerComponent } from './edit-penalty-container.component';

describe('EditPenaltyContainerComponent', () => {
  let component: EditPenaltyContainerComponent;
  let fixture: ComponentFixture<EditPenaltyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPenaltyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPenaltyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
