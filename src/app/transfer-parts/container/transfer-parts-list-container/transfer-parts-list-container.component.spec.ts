import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPartsListContainerComponent } from './transfer-parts-list-container.component';

describe('TransferPartsListContainerComponent', () => {
  let component: TransferPartsListContainerComponent;
  let fixture: ComponentFixture<TransferPartsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPartsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPartsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
