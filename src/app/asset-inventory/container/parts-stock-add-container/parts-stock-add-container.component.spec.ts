import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsStockAddContainerComponent } from './parts-stock-add-container.component';

describe('PartsStockAddContainerComponent', () => {
  let component: PartsStockAddContainerComponent;
  let fixture: ComponentFixture<PartsStockAddContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsStockAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsStockAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
