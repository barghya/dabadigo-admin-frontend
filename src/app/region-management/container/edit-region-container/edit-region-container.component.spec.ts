import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegionContainerComponent } from './edit-region-container.component';

describe('EditRegionContainerComponent', () => {
  let component: EditRegionContainerComponent;
  let fixture: ComponentFixture<EditRegionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
