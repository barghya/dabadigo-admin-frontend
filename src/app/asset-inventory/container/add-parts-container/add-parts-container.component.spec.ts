import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartsContainerComponent } from './add-parts-container.component';

describe('AddPartsContainerComponent', () => {
  let component: AddPartsContainerComponent;
  let fixture: ComponentFixture<AddPartsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
