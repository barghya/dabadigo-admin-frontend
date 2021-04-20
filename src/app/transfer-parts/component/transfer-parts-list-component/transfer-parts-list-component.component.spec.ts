import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPartsListComponentComponent } from './transfer-parts-list-component.component';

describe('TransferPartsListComponentComponent', () => {
  let component: TransferPartsListComponentComponent;
  let fixture: ComponentFixture<TransferPartsListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPartsListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPartsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
