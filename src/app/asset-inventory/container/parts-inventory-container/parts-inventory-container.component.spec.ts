import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsInventoryContainerComponent } from './parts-inventory-container.component';

describe('PartsInventoryContainerComponent', () => {
  let component: PartsInventoryContainerComponent;
  let fixture: ComponentFixture<PartsInventoryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsInventoryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsInventoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
