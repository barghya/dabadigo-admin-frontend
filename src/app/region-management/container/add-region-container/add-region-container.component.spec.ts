import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegionContainerComponent } from './add-region-container.component';

describe('AddRegionContainerComponent', () => {
  let component: AddRegionContainerComponent;
  let fixture: ComponentFixture<AddRegionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
