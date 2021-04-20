import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPenaltyContainerComponent } from './add-penalty-container.component';

describe('AddPenaltyContainerComponent', () => {
  let component: AddPenaltyContainerComponent;
  let fixture: ComponentFixture<AddPenaltyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPenaltyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPenaltyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
