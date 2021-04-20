import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartsContainerComponent } from './edit-parts-container.component';

describe('EditPartsContainerComponent', () => {
  let component: EditPartsContainerComponent;
  let fixture: ComponentFixture<EditPartsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
