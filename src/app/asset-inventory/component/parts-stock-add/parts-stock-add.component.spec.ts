import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsStockAddComponent } from './parts-stock-add.component';

describe('PartsStockAddComponent', () => {
  let component: PartsStockAddComponent;
  let fixture: ComponentFixture<PartsStockAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsStockAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsStockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
