import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPartsCreateComponent } from './transfer-parts-create.component';

describe('TransferPartsCreateComponent', () => {
  let component: TransferPartsCreateComponent;
  let fixture: ComponentFixture<TransferPartsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPartsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPartsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
