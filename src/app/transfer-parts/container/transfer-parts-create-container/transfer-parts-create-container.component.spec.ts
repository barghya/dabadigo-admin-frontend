import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPartsCreateContainerComponent } from './transfer-parts-create-container.component';

describe('TransferPartsCreateContainerComponent', () => {
  let component: TransferPartsCreateContainerComponent;
  let fixture: ComponentFixture<TransferPartsCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPartsCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPartsCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
